import React, {useEffect, useState} from "react"
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps"
import Axios from "../../../utils/axios";

function Map() {
    const [location, setLocation] = useState([]);
    useEffect(() => {
        let mounted = true;
        Axios.get("company/director/statistics/dashboard/fifth_block/").then((res) => {
            if(mounted) {
                setLocation(res.data)
            }
        });
        return () => {
            mounted = false;
        }
    },[]);
    return (
        <GoogleMap
            defaultZoom={3}
            defaultCenter={{lat: 45.2323, lng: -10.23232}}
        >
            {location.map(x => (
                <Marker position={{
                    lat: x.location.substring(0, x?.location.indexOf(',')),
                    lng: x?.location.substring(x?.location.indexOf('-'))
                }} key={x.id}/>
            ))}

            {/*<Marker position={{*/}
            {/*    lat: 55.378052,*/}
            {/*    lng: -3.435973*/}
            {/*}}/>*/}
            {/*<Marker position={{*/}
            {/*    lat: 61.524010,*/}
            {/*    lng: 105.318756*/}
            {/*}}/>*/}
        </GoogleMap>
    )
}
export const WrappedMap = withScriptjs(withGoogleMap(Map));