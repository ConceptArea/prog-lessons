import {Request, Response} from "express";
import {Metric, Station} from "../entities";
import {getRepository} from "typeorm";
import {errHandler} from "../plugins/err-handler";
import {sendMessageWS } from './websocket'

const METRIC_LAST_VALUE = 'Metric Last Value'

function createMetric(stationId: number, metricJson: Object, res: Response) {
    Station.findOne(stationId).then(station => {
        if (station != null) {
            const metric = new Metric();
            Metric.merge(metric, metricJson);
            metric.station = station;
            return metric.save().then(metric => {
                sendMessageWS({
                    type: METRIC_LAST_VALUE,
                    payload: {
                        value: metric.value,
                        station_id: metric.station.id
                    },
                })
                res.send(metric);
            })
        } else
            res.sendStatus(404);
    }).catch(errHandler(res));
}

function findStationMetric(stationId: number, res: Response) {
    Metric.find({ station: { id: stationId } }).then(metrics => {
        res.send(metrics);
    }).catch(errHandler(res));
}

function findActiveMetrics(res: Response) {
    getRepository(Metric)
        .createQueryBuilder('metric')
        .leftJoinAndSelect('metric.station', 'station')
        .where('station.status = true')
        .getMany().then(metrics => {
        res.send(metrics);
    }).catch(errHandler(res));
}

function findAverageMetrics(res: Response) {
    getRepository(Metric)
        .createQueryBuilder('metric')
        .select('avg(metric.value) as value')
        .leftJoinAndSelect('metric.station', 'station')
        .groupBy('station.id')
        .getRawMany().then(data => {
        res.send(data);
    }).catch(errHandler(res));
}



function findLatestMetrics(res: Response) {
    getRepository(Metric)
        .createQueryBuilder('metric')
        .select('station_id, avg(value) as value')
        .groupBy('station_id')
        .getRawMany().then(data => {
        res.send(data);
    }).catch(errHandler(res));
}


export {
    createMetric,
    findActiveMetrics,
    findStationMetric,
    findLatestMetrics,
    findAverageMetrics
}