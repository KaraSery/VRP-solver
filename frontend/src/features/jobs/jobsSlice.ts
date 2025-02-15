import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Job} from "./types";
import {RootState} from "../../app/store";


const initialState: Job[] = []
export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<Job>) => {
            state.push(action.payload)
        },
        deleteJob: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
        updateJob: (state, action: PayloadAction<{ index: number, job: Job }>) => {
          state[action.payload.index] = action.payload.job
          return state
        }
    }
})

export const {addJob, deleteJob, updateJob} = jobsSlice.actions;


export const selectJobs = (state: RootState) => state.jobs
export const selectJobById = createSelector(
    [
        selectJobs,
        (state: RootState, id) => id
    ],
    (jobs, id)=> jobs[id]
)

