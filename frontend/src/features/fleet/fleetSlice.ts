import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Depot, Fleet, Vehicle } from "./types"

const initialState: Fleet = {
  depot: {
    address: '',
    startTime: '2022-05-03T06:30:00.000Z',
    endTime: '2022-05-03T23:00:00.000Z',
    location: {
      lat: 0,
      lng: 0
    },
  },
  vehicles: [],
}
export const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload);
    },
    updateDepot: (state, action: PayloadAction<Depot>) => {
      state.depot = action.payload
    }
  }
})

export const {updateDepot, addVehicle} = fleetSlice.actions;