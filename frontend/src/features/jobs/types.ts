import type { Location } from "../types"

export interface Job {
    address: string
    location: Location
    startTime: string
    endTime: string
    duration: number
}
