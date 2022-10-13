
import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from "react";

const tokenValue: string = process.env.REACT_APP_MAPBOX_API 

mapboxgl.accessToken = tokenValue


const Map = () => { 
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(5.36);
    const [lat, setLat] = useState(43.29);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
        });


  return (
    <div>
    <div style={{height: "400px"}} ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map