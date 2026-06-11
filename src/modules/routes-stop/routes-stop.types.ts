export interface routeStopData{
    routeId:string,
    locationId:string,
    stopOrder:number
}

export interface updateRouteStopData{
    routeId?:string,
    locationId?:string,
    stopOrder?:number
}