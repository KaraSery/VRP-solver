import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: Fleet = {
  depot: 0,
  vehicles: 1,
}
export const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    setDepot: (state, action: PayloadAction<number>) => {
      state.depot = action.payload;
    },
    setVehicles: (state, action: PayloadAction<number>) => {
      state.vehicles = action.payload;
    }
  }
})