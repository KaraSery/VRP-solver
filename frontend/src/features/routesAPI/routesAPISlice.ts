import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MatrixQueryBody, RouteMatrixResult, solverQueryBody } from "./types"
import type { Route } from "../routes/types"

const BASE_URL = import.meta.env.VITE_ROUTE_API_BASE_URL;


export const routesAPISlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getMatrix: builder.query<RouteMatrixResult, MatrixQueryBody>({
      query: (body)=> ({
        url: 'get_matrix',
        method: 'POST',
        body
      })
    }),
    solveRoute: builder.query<Route[], solverQueryBody>({
      query: (body)=> ({
        url: 'solve',
        method: 'POST',
        body
      })
    }),
  }),
})

export const {
  useLazyGetMatrixQuery,
  useLazySolveRouteQuery
} = routesAPISlice
