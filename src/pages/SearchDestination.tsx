import { Box, Button, Typography } from '@mui/material';
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../common/state/hooks';
import GoogleMaps from '../components/forms/GoogleMaps';
import ProgressMobileStepper from '../components/forms/Stepper';
import { IDestinationCoordinates, setDestinationCoords } from '../features/destination/destinationSlice';
import image from ".././images/cyclingMountains.jpg"

const SearchDestination = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {control, handleSubmit} = useForm<IDestinationCoordinates>({
    defaultValues: { 
    latitude: 0,
    longitude: 0,
    }
  })

   const onSubmit = (data: any) => {
    console.log(data)
    navigate("/results")
   } 


  return (
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '92vh',
          width: '100%'
        }}
      >
        <Box
        sx={{
            display: 'flex',
            backgroundColor: '#009688',
            width: "55%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <form
         style={{
            width: "inherit",
          }}
        onSubmit={handleSubmit(onSubmit)}>
    <Typography variant='h4' sx={{color: "#002171"}}>Louez une velo dans deux minutes pour votre prochaine vacances! </Typography>
    <GoogleMaps name={'Destination'} defaultValue={''} control={control} setCoords/>
    <Button sx={{my:2}} color='primary' variant="contained" type="submit">
      SUBMIT
    </Button>
  </form>
        </Box>
        <Box
        sx={{
        width: "45%",
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'blue',
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          aspectRatio: "4/3",
          backgroundPosition: 'center'
        }}
      >
    </Box>
    </Box>
 
   
  )
}

export default SearchDestination