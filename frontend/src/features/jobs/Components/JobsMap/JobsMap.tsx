import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { useAppSelector } from "../../../../app/hooks"
import { selectJobById } from "../../jobsSlice"
import {Map} from '@vis.gl/react-google-maps';

export function JobMarker ({jobIdx}: {jobIdx: number})  {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const job = useAppSelector(state => selectJobById(state, jobIdx));

  return (
    <AdvancedMarker ref={markerRef} position={job.location}/>
  )
}

export function JobsMap({jobsIdx}:{jobsIdx: number[]}): JSX.Element {
  return (
    <Map
      mapId="6f988384540e17a4"
      defaultZoom={15}
         defaultCenter={{
           lat: 45.7756392,
           lng: 4.8037335
         }}
         gestureHandling={'greedy'}
         disableDefaultUI={true}>
      {jobsIdx.map(jobIdx => (
        <JobMarker key={`job-marker-${jobIdx}`} jobIdx={jobIdx} />
      ))}
    </Map>
  )
}