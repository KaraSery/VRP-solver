import type { FormEvent } from "react"
import { createRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { updateDepot } from "../fleetSlice"
import { PlaceAutocomplete } from "../../jobs/Components/PlaceAutocomplete/PlaceAutocomplete"
import "./DepotEditorForm.scss"

export function DepotEditorForm() {
  const dispatch = useAppDispatch()
  const depot = useAppSelector(state => state.fleet.depot)

  const [startTime, setStartTime] = useState<string>(depot.startTime)
  const [endTime, setEndTime] = useState<string>(depot.endTime)

  useState<google.maps.places.PlaceResult | null>(null)

  const [isEditing, setEditing] = useState<boolean>(false)
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null)

  const formRef = createRef<HTMLFormElement>()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let depotAddressAndLocation
    if (
      selectedPlace &&
      selectedPlace.formatted_address &&
      selectedPlace.geometry &&
      selectedPlace.geometry.location
    ) {
      const placeLocation = selectedPlace.geometry.location
      depotAddressAndLocation = {
        address: selectedPlace.formatted_address,
        location: {
          lat: placeLocation.lat(),
          lng: placeLocation.lng(),
        },
      }
    }
    const data = {
      ...depot,
      ...depotAddressAndLocation,
      ...{
        endTime: endTime,
        startTime: startTime,
      },
    }
    dispatch(updateDepot(data))
    setEditing(false)
  }

  return (
    <form
      data-testid="depot-editor-form"
      onSubmit={handleSubmit}
      ref={formRef}
      className={"depot-editor-form" + (isEditing ? " editing" : "")}
    >
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      <input
        data-testid="start-date-input"
        disabled={!isEditing}
        className="depot-editor-form__start-time"
        type="datetime-local"
        name="startTime"
        defaultValue={new Date(depot.startTime).toISOString().slice(0, 23)}
        onChange={e => setStartTime(e.target.value)}
      />
      <input
        data-testid="end-date-input"
        disabled={!isEditing}
        className="depot-editor-form__end-time"
        type="datetime-local"
        name="endTime"
        defaultValue={new Date(depot.endTime).toISOString().slice(0, 23)}
        onChange={e => setEndTime(e.target.value)}
      />
      <div className={"depot-editor-form__buttons"}>
        <div className={"edit-delete"}>
          <button
            aria-label="edit"
            name="edit"
            type="button"
            className={"edit"}
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>
        <div className={"confirm-cancel"}>
          <button type="submit" className={"confirm"}>
            Confirm
          </button>
          <button
            type="button"
            className={"cancel"}
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
