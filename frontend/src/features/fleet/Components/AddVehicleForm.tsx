import type { FormEvent } from "react"
import { useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import type { Vehicle } from "../types"
import { addVehicle } from "../fleetSlice"



export const VehicleAddForm = () => {
  const dispatch = useAppDispatch()
  const [vehicleName, setVehicleName] = useState<string | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (vehicleName) {
      const vehicle: Vehicle = {
        name: vehicleName
      }
      dispatch((addVehicle(vehicle)))
    }

  }

  return (
    <form onSubmit={handleSubmit} className="vehicle-add-form">
      <input required name="name" onChange={(e)=>setVehicleName(e.target.value)} />
      <input required type="submit" value="Add Job" />
    </form>
  );
};