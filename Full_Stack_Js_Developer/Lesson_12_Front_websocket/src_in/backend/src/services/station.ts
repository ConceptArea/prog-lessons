import {Station} from "../entities";
import {Response} from "express";
import {errHandler} from "../plugins/err-handler";
import {stationProducer} from "../kafka/producer";
import {Server, WebSocket} from 'ws';
import {sendMessageWS} from "./websocket";


function findStations(res: Response) {
    Station.find().then(stations => {
        res.send(stations);
    }).catch(errHandler(res));
}

function findOneStation(id: number, res: Response) {
    Station.findOne(id).then(station => {
        if (station != null)
            res.send(station);
        else
            res.sendStatus(404);
    }).catch(errHandler(res));
}

function createStation(stationBody: Object, res: Response) {
    const station = new Station();
    stationProducer.sendStation(stationBody);
    Station.merge(station, stationBody);
    station.save().then(station => {
        sendMessageWS({address: station.address, status: station.status})
        res.send(station);
    }).catch(errHandler(res));
}

function updateStation(id: number, stationBody: Object, res: Response) {
    Station.findOne(id).then(station => {
        if (station != null) {
            Station.merge(station, stationBody);
            return station.save().then(station => {
                res.send(station);
            })
        }
        res.sendStatus(404);
    }).catch(errHandler(res));
}

function deleteStation(id: number, res: Response) {
    Station.findOne(id).then(station => {
        if (station != null)
            return station.remove().then(() => {
                res.sendStatus(204);
            });
        res.sendStatus(404);
    }).catch(errHandler(res));
}

export {
    findStations,
    findOneStation,
    createStation,
    updateStation,
    deleteStation
}