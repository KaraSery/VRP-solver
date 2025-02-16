import {useContext, useEffect, useRef} from "react";
import {GoogleMapContext} from "../GoogleMapProvider/GoogleMapProvider";
import './google-map.scss'


export function GoogleMap() {
    const isLoaded = useContext(GoogleMapContext);
    const mapRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (isLoaded && mapRef.current)  {
            new google.maps.Map(mapRef.current, {
                mapId: "6f988384540e17a4",
                    center: {
                        lat: 45.7756392,
                        lng: 4.8037335

                    },
                    zoom: 17,
                    disableDefaultUI: true,
                    tilt: 50,
                    heading:50,
            })
        }
    }, [isLoaded, mapRef]);
    return (
        <div ref={mapRef} className="google-map"></div>
    )
}
