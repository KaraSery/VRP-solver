import type { Loader } from "@googlemaps/js-api-loader";
import type {ReactNode} from "react";
import {createContext, useEffect, useState} from "react";

export const GoogleMapContext = createContext<boolean>(false)

export function GoogleMapProvider({ children, loader }: { children: ReactNode, loader: Loader }) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(()=> {
        loader.importLibrary("maps").then(() => {
            console.log("Google Maps API loaded ✅");
            setIsLoaded(true);
        })
            .catch((error) => {
                console.error("Failed to load Google Maps API ❌", error);
            });
    }, [])
    return (
        <GoogleMapContext.Provider value={isLoaded}>
            {children}
        </GoogleMapContext.Provider>
    );
}