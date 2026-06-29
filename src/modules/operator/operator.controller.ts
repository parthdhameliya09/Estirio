import { Request, Response } from "express";
import {
  createOperator as createOperatorService,
  getOperator as getOperatorService,
  updateOperator as updateOperatorService,
} from "./operator.service";
import {updateOperatorSchema , getOperatorSchema} from "./operator.validation";

export const createOperatorController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const { name, gstNumber, email, phoneNumber, isPrivate } = req.body;

    const operator = await createOperatorService({name, gstNumber, email, phoneNumber, isPrivate,userId});

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
  req: Request<getOperatorSchema['params']>,res: Response
) => {
  try {
    const id = req.params.id;

    const operator = await getOperatorService(id);

    return res.status(200).json({
      success: true,
      data: operator,
    });
  } catch (error) {
    if(error instanceof Error){
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateOperatorController = async (
  req: Request<updateOperatorSchema['params']>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const {name,phoneNumber,isPrivate,isActive} = req.body;

    const operator = await updateOperatorService({id,name,phoneNumber,isPrivate,isActive});

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