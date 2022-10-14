import { useSelector } from 'react-redux';
import { RootState } from '../common/state/store';
import Map from '../components/Map'
import { getDestinationCoords } from '../features/destination/destinationSlice';

const MapPage = () => {
    const {coords} = useSelector((state: RootState) => {
        return {
          coords: getDestinationCoords(state),
        };
      });
  return (
<div>
    <Map latitide={coords.latitude} longitude={coords.longitude}/>
    </div>
  )
}

export default MapPage