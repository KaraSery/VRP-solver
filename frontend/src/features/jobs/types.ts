export interface Location {
    lat: number
    lng: number
}
export interface Delivery {
    location: Location
    duration: number
    times: number[]
}
export interface Job {
    address: string
    index: number
    delivery: Delivery
}
