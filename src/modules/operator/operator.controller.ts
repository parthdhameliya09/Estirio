import { Request, Response } from "express";

import {
  createOperator as createOperatorService,
  getOperator as getOperatorService,
  updateOperator as updateOperatorService,
} from "./operator.service";

export const createOperatorController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const operator = await createOperatorService(req.body, userId);

    return res.status(201).json({
      success: true,
      data: operator,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getOperatorController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const operator = await getOperatorService(id);

    return res.status(200).json({
      success: true,
      data: operator,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOperatorController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const operator = await updateOperatorService(req.body, id);

    return res.status(200).json({
      success: true,
      data: operator,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};