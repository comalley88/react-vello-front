import { Button, Container } from '@mui/material';
import React from 'react'
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import { FormInputText } from '../../components/forms/FormInputText'
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import { getAllListings, getListingDraft, IListingFormValues, IListingState, setNewListing } from '../../features/listing/state/listingSlice';

const RegisterBike2 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { listingDraft,} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });
console.log("listingdraft is", listingDraft)
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
      dispatch(setNewListing({...listingDraft, yearPurchased: data.yearPurchased, description: data.description}));
      navigate("/page2");
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
        name='yearPurchased' 
        label='year purchased' 
        control={control}/>
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

export default RegisterBike2