import { useAppSelector } from "../../../app/hooks"
import { selectJobs } from "../../jobs/jobsSlice"
import { useLazyGetMatrixQuery, useLazySolveRouteQuery } from "../routesAPISlice"
import type { RootState } from "../../../app/store"
import { useEffect } from "react"
import { formatFleetForSolver, formatMatrixInput } from "../utils"

export function SolverButton () {
  const jobs = useAppSelector(selectJobs);
  const fleet = useAppSelector((state: RootState) => state.fleet);

  const [getMatrix, matrixResult] = useLazyGetMatrixQuery()
  const [solveRoutes, routes] = useLazySolveRouteQuery()
  useEffect(() => {
    if (matrixResult.data) {

      console.log(matrixResult.data)
      console.log('solve routes')
      solveRoutes({
        fleet: formatFleetForSolver(fleet),
        matrix_result: matrixResult.data,
      }).unwrap().then((payload=> {
        console.log(payload)
        console.log('routes solved')
      }))

    }
  }, [matrixResult])
  async function handleClick() {
    const locations = formatMatrixInput(jobs, fleet)
    await getMatrix({
      origins: locations,
      destinations: locations,
    }).unwrap()
    console.log(matrixResult.data)
  }
  return (
    <>
      <button
        onClick={async e => {
          e.preventDefault()
          await handleClick()
        }}
      >
        Solve
      </button>
      {routes.data && routes.data.length > 0 && (
        <div>
          {routes.data.map((route, i) => (
            <>
              {fleet.vehicles[i].name}: {route.map(stop => stop).join("-->")}</>
          ))}
        </div>
      )}
    </>
  )
}