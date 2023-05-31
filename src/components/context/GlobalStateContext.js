import { createContext } from "react";

export const GlobalStateContext = createContext({
    dow: null,
    coordinatesState:{
        latitude: 0,
        longitude: 0
    },
    isMobile: null
})