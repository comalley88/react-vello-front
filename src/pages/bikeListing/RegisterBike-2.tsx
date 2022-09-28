import { Button, Container, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react'
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import { FormDatePicker } from '../../components/forms/FormDatePicker';
import { FormInputText } from '../../components/forms/FormInputText'
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import dayjs from 'dayjs';
import { getAllListings, getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';

const RegisterBike2 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { listingDraft,} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });
console.log("listingdraft is", listingDraft)
    const {control, handleSubmit, formState: {errors} } = useForm<IListingFormValues>({defaultValues: { 
      brand: "",
      model: "",
      yearPurchased: dayjs(),
      description: "",
      options: []
    }});

    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(getAllListings())
      console.log("data is", data)
      dispatch(setNewListing({...listingDraft, yearPurchased: dayjs(data.yearPurchased).get('year'), description: data.description}));
      navigate("./../page3");
      };
console.log("today is", dayjs().get('year'))
  return (
    <>
    <Container>
    <SimplePaper>
    <ProgressMobileStepper/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormDatePicker
        name="yearPurchased"
        control={control}/>

        {errors.yearPurchased?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
        <FormInputText 
        sx={
          {mt: 2}
        } 
        name='description' 
        label='description' 
        control={control}/>
        {errors.description?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
    <Button sx={{my:2}} color='primary' variant="contained" type="submit">
      SUBMIT
    </Button>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike2