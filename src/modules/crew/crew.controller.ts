import { Request, Response } from "express";
import {
    createCrew as createCrewService,
    getCrew as getCrewService,
    getCrewsByOperator as getCrewsByOperatorService,
    updateCrew as updateCrewService,
} from "./crew.service";
import { createCrewSchema,updateCrewSchema } from "./crew.validation";

export const createCrewController = async (req: Request, res: Response) => {
    try {
        const {role,userId,operatorId,licenseNumber,licenseExpiry,emergencyContact} = req.body;
        const crew = await createCrewService({role,userId,operatorId,licenseNumber,licenseExpiry,emergencyContact});

        return res.status(201).json({
            success: true,
            data: crew,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCrewController = async (
    req: Request<createCrewSchema["params"]>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const crew = await getCrewService(id);

        return res.status(200).json({
            success: true,
            data: crew,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCrewsByOperatorController = async (req: Request<createCrewSchema["params"]>, res: Response) => {
    try {
        const operatorId = req.params.id;
        const crews = await getCrewsByOperatorService(operatorId);

        return res.status(200).json({
            success: true,
            data: crews,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCrewController = async (
    req: Request<updateCrewSchema['params']>,
    res: Response
) => {
    try {
        const id = req.params.id;
        const {role,licenseNumber,licenseExpiry,emergencyContact,isActive} = req.body;
        const crew = await updateCrewService({id,role,licenseNumber,licenseExpiry,emergencyContact,isActive});

        return res.status(200).json({
            success: true,
            data: crew,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
