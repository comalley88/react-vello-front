import { LabelSharp } from '@mui/icons-material';
import { Button, Chip, Container } from '@mui/material';
import React from 'react'
import { Controller, useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import FormChipInput from '../../components/forms/FormChipInput';
import { FormInputText } from '../../components/forms/FormInputText'
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import { getAllListings, getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';

const RegisterBike3 = () => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const { listingDraft,} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });

    const {control, handleSubmit } = useForm<IListingFormValues>({defaultValues: { 
      brand: "",
      model: "",
      yearPurchased: 0,
      description: "",
      options: []
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(getAllListings())
      dispatch(setNewListing({...listingDraft, options: data.options}));
      navigate("tbc");
      };

  return (
    <>
    <Container>
    <SimplePaper>
    <ProgressMobileStepper/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormChipInput control={control}/>
        <FormInputText 
        sx={
          {my: 2}
        } 
        name='description' 
        label='description' 
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

export default RegisterBike3