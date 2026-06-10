export interface CreateCrewRequest {
    role: "driver" | "conductor";
    userId: string;
    operatorId: string;
    licenseNumber: string;
    licenseExpiry: string;
    emergencyContact: string;
}

export interface UpdateCrewRequest {
    id: string;
    role?: "driver" | "conductor";
    licenseNumber?: string;
    licenseExpiry?: string;
    emergencyContact?: string;
    isActive?: boolean;
}