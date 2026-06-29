import {Router} from "express";
import { createTrip as createTripController } from "./trip.controller";

export const tripRoute=Router();

tripRoute.post("/",createTripController);