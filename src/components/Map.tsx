
import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";

const tokenValue: string = process.env.REACT_APP_MAPBOX_API 

mapboxgl.accessToken = tokenValue

interface IMap  {
  latitide: number,
  longitude: number
}

const Map = ({latitide, longitude}: IMap) => { 
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitide],
        zoom: zoom
        });
        });


  return (
    <div>
    <div style={{height: "92vh"}} ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map