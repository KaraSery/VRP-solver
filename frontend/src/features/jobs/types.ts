export interface Location {
    lat: number
    lng: number
}
export interface Job {
    address: string
    location: Location
    startTime: string
    endTime: string
    duration: number
}
