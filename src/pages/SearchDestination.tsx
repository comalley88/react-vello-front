import { Box, Button, Typography } from '@mui/material';
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../common/state/hooks';
import GoogleMaps from '../components/forms/GoogleMaps';
import { getDestination, IDestinationSearchForm, setDestination } from '../features/destination/destinationSlice';
import image from ".././images/cyclingMountains.jpg"
import { FormDatePicker } from '../components/forms/FormDatePicker';
import { useSelector } from 'react-redux';
import { RootState } from '../common/state/store';
import dayjs from 'dayjs';

const SearchDestination = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {destination} = useSelector((state: RootState) => {
    return {
        destination: getDestination(state)
    }
  })

  const {control, handleSubmit} = useForm<IDestinationSearchForm>({
    defaultValues: { 
    destination: "",
    dates: {
        startDate: dayjs().valueOf(),
        endDate: dayjs().valueOf(),
    }
}
  })

   const onSubmit = (data: IDestinationSearchForm) => {
    dispatch(setDestination({...destination, destination: data.destination, 
        dates: {
            startDate: dayjs(data.dates.startDate).valueOf(),
            endDate: dayjs(data.dates.endDate).valueOf()
        }}))
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
    <GoogleMaps name={'destination'} control={control} setCoords/>
    <Box sx={{display: "flex"}}>
    <FormDatePicker sx={{mr: 2}} control={control} name={'dates.startDate'} label={'Start Date'} views={["year", "month", "day"]}/>
    <FormDatePicker control={control} name={'dates.endDate'} label={'End Date'} views={["year", "month", "day"]}/>
    </Box>
   
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