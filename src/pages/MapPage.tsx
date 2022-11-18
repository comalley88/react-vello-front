import { Box, Button, Typography} from '@mui/material';
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
<Grid  container>
<Grid style={{height: "84vh", overflowY: "auto"}} md={4} lg={6} sx={{display: {xs: "none", md: "block"}}} >
<Box sx={{display: "flex",alignItems:"baseline", justifyContent: "space-between", padding: "1em"}}>
<Typography>12 results</Typography>
<Button variant="outlined" style={{display: "inline"}}>Filters</Button>
</Box>

<Grid style={{padding: "1em"}} container spacing={2}>
{Array.from(Array(12)).map((_, index) => (
    <Grid spacing={2} xs={12} lg={6} key={index}>
      <CardComp/>
    </Grid>
  ))}
</Grid>
</Grid>
<Grid xs={12} md={8} lg={6}>
<Map latitide={coords.latitude} longitude={coords.longitude}/>
</Grid>
</Grid>
</>
  )
}

export default MapPage