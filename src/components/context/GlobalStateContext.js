import { createContext } from "react";
import { useImmer } from "use-immer";


export const GlobalStateContext = ()=>{
    const [globalState, setGlobalState] = useImmer({
        DowContext: null,
        CoordinateStateContext: {latitude: 0 , longitude: 0},
    })
    return createContext({globalState, setGlobalState})
}