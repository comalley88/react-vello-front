import { Box, Button} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';
import { RootState } from '../common/state/store';
import CardComp from '../components/Card';
import Map from '../components/Map'
import SearchBar from '../components/SearchBar';
import { getDestinationCoords } from '../features/destination/destinationSlice';

const MapPage = () => {
    const {coords} = useSelector((state: RootState) => {
        return {
          coords: getDestinationCoords(state),
        };
      });
  return (
<>
<SearchBar/>

<Box sx={{
    display: "flex",
    width: "100vw",
    height: "80vh"
}}>
<Box component="div" sx={{ overflow: 'auto', width: '50%' }} >
<Button variant="outlined" style={{display: "inline"}}>Test</Button>
  <Grid style={{paddingTop: "1em", paddingLeft: "1em"}} container columnSpacing={2} rowSpacing={2}>
{Array.from(Array(12)).map((_, index) => (
    <Grid xs={12} md={6} key={index}>
      <CardComp/>
    </Grid>
  ))}

</Grid>
</Box>




<Box sx={{
    width: "50%"
}}>
<Map latitide={coords.latitude} longitude={coords.longitude}/>

</Box>

</Box>
</>

    

  )
}

export default MapPage