export interface CreateBusRequest {
    operatorId: string;
    vehicleNumber: string;
    registrationNumber: string;
    type: "ac" | "non_ac";
    totalSeats: number;
}

export interface UpdateBusRequest {
    id: string;
    vehicleNumber?: string;
    registrationNumber?: string;
    type?: "ac" | "non_ac";
    totalSeats?: number;
    isActive?: boolean;
}

export interface CreateSeatConfigRequest {
    busId: string;
    seatNumber: string;
    seatType: "seater" | "sleeper";
    deck: "upper" | "lower";
    isWindow: boolean;
    isLadiesSeat: boolean;
}

export interface UpdateSeatConfigRequest {
    id: string;
    seatType?: "seater" | "sleeper";
    deck?: "upper" | "lower";
    isWindow?: boolean;
    isLadiesSeat?: boolean;
}
