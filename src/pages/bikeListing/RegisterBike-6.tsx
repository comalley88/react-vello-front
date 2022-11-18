import { Alert, Box, Container, Typography } from '@mui/material';
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../api';
import { useAppDispatch } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import { DailyRateAdjust } from '../../components/forms/DailyRateAdjust';
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import {  getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';
import { BEARER } from '../../strapi/constant';
import { getToken } from '../../strapi/helpers';

const RegisterBike6 = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { listingDraft} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });

  const token = getToken()


    const {control, handleSubmit } = useForm<IListingFormValues>({
      defaultValues: { 
        dailyRate: 15
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(setNewListing({...listingDraft, dailyRate: data.dailyRate}))
      const finalListingDraft = listingDraft;
      async function setListing() {
        const config = {
          method: 'POST',
          headers: {
              "Authorization" : `${BEARER} ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({data: finalListingDraft})
      }
        const response = await fetch(`${baseUrl}/api/bike-listings`, config)
        const data = await response.json()
        console.log("data on listing submit is", data)
      } 
      setListing()
      sessionStorage.clear();
      };


  return (
    <>
    <Container>
    <SimplePaper>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h5' sx={{mt: 2}}>Inscrire mon Velo</Typography>
      <Typography variant='subtitle1' sx={{color: '#002171', mb: 3}}>Quelle est votre numero de telephone</Typography>
      <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}>
        <Box sx={{width: "70%", display: "inherit", my: 4}}>
        <DailyRateAdjust
        control={control}
        label="Daily Rate"
        name="dailyRate"
        />
        </Box>
        
      </Box>
      <Alert severity="info" sx={{mb: 4}}>vous serez contacte avec les info important. tinquite pas de spam!</Alert>
      <ProgressMobileStepper activeStep={5}/>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike6