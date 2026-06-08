export interface CreateOperatorRequest {
    name: string;
    gstNumber: string;
    email: string;
    phoneNumber: string;
    isPrivate: boolean;
}

export interface UpdateOperatorRequest {
    name?: string;
    phoneNumber?: string;
    isPrivate?: boolean;
    isActive?: boolean;
}

export interface OperatorResponse {
    id: string;
    name : string;
    gstNumber : string;
    email : string;
    phoneNumber : string;
    isPrivate : boolean;
    isActive : boolean;
    createdAt : Date;
    updatedAt : Date;
}
