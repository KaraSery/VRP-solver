import { useAppSelector } from "../../../app/hooks"
import { selectJobs } from "../../jobs/jobsSlice"
import { useLazyGetMatrixQuery, useLazySolveRouteQuery } from "../routesAPISlice"
import type { RootState } from "../../../app/store"
import { useEffect } from "react"

export function SolverButton () {
  const jobs = useAppSelector(selectJobs);
  const fleet = useAppSelector((state: RootState) => state.fleet);

  const locations = jobs.map((job) => job.location)

  const [getMatrix, matrixResult] = useLazyGetMatrixQuery()
  const [solveRoutes, routes] = useLazySolveRouteQuery()
  useEffect(() => {
    if (matrixResult.data) {

      console.log(matrixResult.data)
      console.log('solve routes')
      solveRoutes({
        fleet: fleet,
        matrix_result: matrixResult.data,
      }).unwrap().then((payload=> {
        console.log(payload)
        console.log('routes solved')
      }))

    }
  }, [matrixResult])
  async function handleClick() {
    await getMatrix({
      origins: locations,
      destinations: locations,
    }).unwrap()
    console.log(matrixResult.data)
  }
  return (
    <button
      onClick={e => {
        e.preventDefault()
        handleClick()
      }}
    >
      Solve
    </button>
  )
}