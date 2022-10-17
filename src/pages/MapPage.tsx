import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../common/state/store';
import CardComp from '../components/Card';
import Map from '../components/Map'
import { getDestinationCoords } from '../features/destination/destinationSlice';

const MapPage = () => {
    const {coords} = useSelector((state: RootState) => {
        return {
          coords: getDestinationCoords(state),
        };
      });
  return (
<div style={{position: "relative"}}>
    <Map latitide={coords.latitude} longitude={coords.longitude}/>
    <div style={{position: "absolute", bottom: "30%"}}>
    <CardComp/>
    </div>
    
</div>
  )
}

export default MapPage