import type  { Fleet } from "../fleet/types"
import type { Job } from "../jobs/types"

export function formatMatrixInput(jobs: Job[], fleet: Fleet) {
  return [fleet.depot.location, ...jobs.map(job=> job.location)]
}
export function formatFleetForSolver(fleet: Fleet) {
  return {
    depot: 0,
    vehicles: fleet.vehicles.length,
  }
}