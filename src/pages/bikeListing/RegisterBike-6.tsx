import { AddCircleOutline, PlusOne, RemoveCircleOutline } from '@mui/icons-material';
import { Alert, Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Controller, useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import ComboBox from '../../components/forms/Autocomplete';
import { DailyRateAdjust } from '../../components/forms/DailyRateAdjust';
import { FormInputText } from '../../components/forms/FormInputText';
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import { getAllListings, getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';


const RegisterBike6 = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { listingDraft,} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });

    const {control, handleSubmit, formState: {errors} } = useForm<IListingFormValues>({
      defaultValues: { 
        dailyRate: 15
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(setNewListing({...listingDraft, dailyRate:  data.dailyRate}));
      navigate(".././page7");
      };

  return (
    <>
    <Container>
    <SimplePaper>
    <ProgressMobileStepper/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h5' sx={{mt: 2}}>Inscrire mon Velo</Typography>
      <Typography variant='subtitle1' sx={{color: '#002171', mb: 5}}>Quelle est votre numero de telephone</Typography>
      <Box sx={{
        width: "100%",
        display: "flex"
      }}>
        <DailyRateAdjust
        control={control}
        label="Daily Rate"
        name="dailyRate"
        />
      </Box>
      <Alert severity="info" sx={{mb: 4}}>vous serez contacte avec les info important. tinquite pas de spam!</Alert>
      <Button color='primary' variant="contained" type="submit">
      SUBMIT
    </Button>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike6