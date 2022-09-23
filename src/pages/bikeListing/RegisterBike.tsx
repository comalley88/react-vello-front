import { Button, Container } from '@mui/material';
import React from 'react'
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { FormInputText } from '../../components/forms/FormInputText'
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import { getAllListings, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';

const RegisterBike = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    const {control, handleSubmit } = useForm<IListingFormValues>({defaultValues: { 
      brand: "",
      model: "",
      yearPurchased: 0,
      description: "",
      options: []
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(getAllListings())
      console.log("data is", data)
      dispatch(setNewListing(data));
      navigate("./page2");
      };

  return (
    <>
    <Container>
    <SimplePaper>
    <ProgressMobileStepper/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText sx={
          {my: 2}
        } 
        name='brand' 
        label='brand' 
        control={control}/>
        <FormInputText 
        sx={
          {my: 2}
        } 
        name='model' 
        label='model' 
        control={control}/>
    <Button color='primary' variant="contained" type="submit">
      SUBMIT
    </Button>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike