import {useEffect} from 'react'
import {useImmer} from "use-immer"

export default function useGeolocation(geoLocAvail) {
    const [location, setLocation] = useImmer({
        latitude:null,
        longitude:null
    })

    let geoLocationCoordinates = {
        latitude:null,
        longitude:null
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation((draft)=>{
                draft.latitude = position.coords.latitude
                draft.longitude = position.coords.longitude
            })
            geoLocationCoordinates.latitude = position.coords.latitude
            geoLocationCoordinates.longitude = position.coords.longitude
            // console.log("useGeolocation Latitude is :", position.coords.latitude);
            // console.log("useGeolocation Longitude is :", position.coords.longitude);
        });
    },[])

    const getGeoLocation = () =>{
        if ("geolocation" in navigator) {
            setLocation((draft)=>{
                draft.geoLocAvail = true
            })
            // console.log("Available");
            navigator.geolocation.getCurrentPosition(function(position) {
                setLocation((draft)=>{
                    draft.latitude = position.coords.latitude
                    draft.longitude = position.coords.longitude
                })
                // console.log("useGeolocation Latitude is :", position.coords.latitude);
                // console.log("useGeolocation Longitude is :", position.coords.longitude);
              });
        } else {
            setLocation((draft)=>{
                draft.geoLocAvail = false
            })
            // console.log("Not Available");
        }
    }

    // getGeoLocation()
    // console.log("getGeoLocation_location:",location)
    return location
}