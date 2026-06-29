import {
    createCrew as createCrewDao,
    getCrewById as getCrewByIdDao,
    updateCrew as updateCrewDao,
    getAllCrewsByOperator as getAllCrewsByOperatorDao,
} from "./crew.dao";
import { CreateCrewRequest, UpdateCrewRequest } from "./crew.types";
import { Prisma } from "../../../generated/prisma/client";

export const createCrew = async ({role,userId,operatorId,licenseNumber,licenseExpiry,emergencyContact}: CreateCrewRequest) => {
    const data: Prisma.crewsCreateInput = {
        role,
        licenseNumber,
        licenseExpiry: new Date(licenseExpiry),
        emergencyContact,
        user: { connect: { id: userId } },
        bus_operator: { connect: { id: operatorId } },
    };

    const crew = await createCrewDao(data);
    return crew;
};

export const getCrew = async (id: string) => {
    const crew = await getCrewByIdDao(id);
    if (!crew) {
        throw new Error("Crew member not found");
    }
    return crew;
};

export const getCrewsByOperator = async (operatorId: string) => {
    const crews = await getAllCrewsByOperatorDao(operatorId);
    return crews;
};

export const updateCrew = async ({id,role,licenseNumber,licenseExpiry,emergencyContact,isActive}: UpdateCrewRequest) => {
    const updateData: Prisma.crewsUpdateInput = {};

    if (role !== undefined) updateData.role = role;
    if (licenseNumber !== undefined) updateData.licenseNumber = licenseNumber;
    if (licenseExpiry !== undefined) updateData.licenseExpiry = new Date(licenseExpiry);
    if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedCrew = await updateCrewDao({ id, updateData });
    return updatedCrew;
};
