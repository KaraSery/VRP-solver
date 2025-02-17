import type { Route } from "./types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"


const initialState: Route[] = []

export const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Route[]>) => action.payload,
  }
})
