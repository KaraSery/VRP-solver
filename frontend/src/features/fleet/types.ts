import type { Location } from '../types'
export interface Vehicle {
  name: string,
}
export interface Depot {
  address: string,
  location: Location,
  startTime: string,
  endTime: string,
}
export interface Fleet {
  // number of vehicles
  vehicles: Vehicle[],
  depot: Depot,
}