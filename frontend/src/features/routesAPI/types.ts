import type { Location } from "../jobs/types"

export type Matrix = number[][]

export interface MatrixQueryBody  {
  origins: Location[],
  destinations: Location[],
}

export interface solverQueryBody {
  matrix_result: RouteMatrixResult
  fleet: Fleet
}

export interface RouteMatrixResult {
  format_version: string
  matrix: RouteMatrix[][]
  summary: Summary2
}


export interface RouteMatrix {
  status_code: number
  response: Response
}


export interface Response {
  summary: Summary
}


export interface Summary {
  length_in_meters: number
  travel_time_in_seconds: number
  traffic_delay_in_seconds: number
  departure_time: string
  arrival_time: string
  no_traffic_travel_time_in_seconds: any
  historic_traffic_travel_time_in_seconds: any
  live_traffic_incidents_travel_time_in_seconds: any
  fuel_consumption_in_liters: any
  battery_consumption_in_kw_h: any
}

export interface Summary2 {
  successful_routes: number
  total_routes: number
}