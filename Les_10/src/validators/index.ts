import { Request, Response } from "express";

function validateStation(req: Request, res: Response, next) {
    const station = req.body;
    if (station.hasOwnProperty('address') && station.hasOwnProperty('status')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

function validateMetric(req: Request, res: Response, next) {
    const station = req.body;
    if (station.hasOwnProperty('value')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

export {
    validateStation,
    validateMetric
}