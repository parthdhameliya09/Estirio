import { Request, Response } from "express";
import {
    createBus as createBusService,
    getBus as getBusService,
    getBusesByOperator as getBusesByOperatorService,
    updateBus as updateBusService,
    createSeatConfig as createSeatConfigService,
    getSeatConfig as getSeatConfigService,
    getSeatConfigsByBus as getSeatConfigsByBusService,
    updateSeatConfig as updateSeatConfigService,
    deleteSeatConfig as deleteSeatConfigService,
} from "./bus.service";
import {
    getBusSchema,
    updateBusSchema,
    createSeatConfigSchema,
    getSeatConfigSchema,
    updateSeatConfigSchema,
} from "./bus.validation";


export const createBusController = async (req: Request, res: Response) => {
    try {
        const { operatorId, vehicleNumber, registrationNumber, type, totalSeats } = req.body;
        const bus = await createBusService({ operatorId, vehicleNumber, registrationNumber, type, totalSeats });

        return res.status(201).json({ success: true, data: bus });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getBusController = async (
    req: Request<getBusSchema["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const bus = await getBusService(id);

        return res.status(200).json({ success: true, data: bus });
    } catch (error: any) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

export const getBusesByOperatorController = async (
    req: Request<{ operatorId: string }>,
    res: Response
) => {
    try {
        const { operatorId } = req.params;
        const buses = await getBusesByOperatorService(operatorId);

        return res.status(200).json({ success: true, data: buses });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBusController = async (
    req: Request<updateBusSchema["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { vehicleNumber, registrationNumber, type, totalSeats, isActive } = req.body;
        const bus = await updateBusService({ id, vehicleNumber, registrationNumber, type, totalSeats, isActive });

        return res.status(200).json({ success: true, data: bus });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const createSeatConfigController = async (
    req: Request<createSeatConfigSchema["params"]>,
    res: Response
) => {
    try {
        const { busId } = req.params;
        const { seatNumber, seatType, deck, isWindow, isLadiesSeat } = req.body;
        const seat = await createSeatConfigService({ busId, seatNumber, seatType, deck, isWindow, isLadiesSeat });

        return res.status(201).json({ success: true, data: seat });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getSeatConfigsByBusController = async (
    req: Request<createSeatConfigSchema["params"]>,
    res: Response
) => {
    try {
        const { busId } = req.params;
        const seats = await getSeatConfigsByBusService(busId);

        return res.status(200).json({ success: true, data: seats });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getSeatConfigController = async (
    req: Request<getSeatConfigSchema["params"]>,
    res: Response
) => {
    try {
        const { seatId } = req.params;
        const seat = await getSeatConfigService(seatId);

        return res.status(200).json({ success: true, data: seat });
    } catch (error: any) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

export const updateSeatConfigController = async (
    req: Request<updateSeatConfigSchema["params"]>,
    res: Response
) => {
    try {
        const { seatId } = req.params;
        const { seatType, deck, isWindow, isLadiesSeat } = req.body;
        const seat = await updateSeatConfigService({ id: seatId, seatType, deck, isWindow, isLadiesSeat });

        return res.status(200).json({ success: true, data: seat });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteSeatConfigController = async (
    req: Request<getSeatConfigSchema["params"]>,
    res: Response
) => {
    try {
        const { seatId } = req.params;
        await deleteSeatConfigService(seatId);

        return res.status(200).json({ success: true, message: "Seat config deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
