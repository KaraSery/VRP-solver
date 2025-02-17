import { useEffect, useState } from "react"

import { PlaceAutocomplete } from "../PlaceAutocomplete/PlaceAutocomplete"
import type { Job } from "../../types"
import { addJob } from "../../jobsSlice"
import { useAppDispatch } from "../../../../app/hooks"


export const JobAddForm = () => {
  const dispatch = useAppDispatch()

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [duration, setDuration] = useState<string | null>(null)

  useState<google.maps.places.PlaceResult | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selectedPlace &&
      selectedPlace.formatted_address &&
      selectedPlace.geometry &&
      selectedPlace.geometry.location &&
      endTime &&
      startTime &&
      duration) {
      const placeLocation = selectedPlace.geometry.location
      const job: Job = {
        address: selectedPlace.formatted_address,
        location: {
          lat: placeLocation.lat(),
          lng: placeLocation.lng()
        },
        startTime: startTime,
        endTime: endTime,
        duration: parseInt(duration)
      }
      dispatch(addJob(job))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      <input required type="datetime-local" name="startTime" onChange={(e)=>setStartTime(e.target.value)} />
      <input required type="datetime-local" name="endTime" onChange={(e)=>setEndTime(e.target.value)} />
      <input required type="number" name="duration" onChange={(e)=>setDuration(e.target.value)} />
      <input required type="submit" value="Add Job" />
    </form>
  );
};