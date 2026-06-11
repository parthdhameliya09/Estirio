export interface routeData{
    sourceId:string,
    destinationId:string,
    distanceKm:number,
    estimatedDurationMinutes:number,
    isActive:boolean
}
export interface UpdateRouteData{
    sourceId?:string,
    destinationId?:string,
    distanceKm?:number,
    estimatedDurationMinutes?:number,
    isActive?:boolean
}