import { Loader } from "@googlemaps/js-api-loader";
import {createContext, ReactNode, useEffect, useState} from "react";

export const GoogleMapContext = createContext<boolean>(false)

export function GoogleMapProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(()=> {
        const loader = new Loader({
            apiKey: "AIzaSyBP6u8z1Wter_Uk1PEInnHBg8SV_f4Vxhk",
            version: "weekly",
        })
        loader.importLibrary("maps").then(_=> {
            setIsLoaded(true);
        })
    })
    return (
        <GoogleMapContext.Provider value={isLoaded}>
            {children}
        </GoogleMapContext.Provider>
    );
}