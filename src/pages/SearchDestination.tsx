import { Google } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../common/state/hooks';
import { RootState } from '../common/state/store';
import { FormDatePicker } from '../components/forms/FormDatePicker';
import { FormInputText } from '../components/forms/FormInputText';
import GoogleMaps from '../components/forms/GoogleMaps';
import ProgressMobileStepper from '../components/forms/Stepper';
import SimplePaper from '../components/Paper';
import { IDestinationCoordinates, setDestinationCoords } from '../features/destination/destinationSlice';
import { getAllListings, setNewListing } from '../features/listing/state/listingSlice';

const SearchDestination = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {control, handleSubmit} = useForm<IDestinationCoordinates>({
    defaultValues: { 
    latitude: 0,
    longitude: 0,
    }
  })

   const onSubmit = () => {
    navigate("./results")
   } 


  return (
    <>
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
        sx={{
            backgroundColor: 'red'
          }}
        >
        <form onSubmit={handleSubmit(onSubmit)}>
    <GoogleMaps name={'Destination'} defaultValue={''} control={control} setCoords/>
    <Button sx={{my:2}} color='primary' variant="contained" type="submit">
      SUBMIT
    </Button>
  </form>
        </Box>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'blue',
        //   backgroundImage: `url(${Image})`
        }}
      >
    </Box>
    </Box>
    
    
   
       
    </>
 
   
  )
}

export default SearchDestination