export interface Location {
    lat: number
    lng: number
}
export interface Job {
    address: string
    index: number
    location: Location
    startTime: string
    endTime: string
    duration: number
}
