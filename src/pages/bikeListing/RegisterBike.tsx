import { Button, Container, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { FormInputText } from '../../components/forms/FormInputText'
import SelectInput from '../../components/forms/SelectInput';
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import { getAllListings, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';

const RegisterBike = () => {
  const [bikeBrands, setBikeBrands] = useState([])
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    useEffect(() => {
     async function getBikeBrands() {
      const response = await fetch("http://localhost:1337/api/bike-brands")
      const data = await response.json()
      setBikeBrands(data.data)
     }
     getBikeBrands()
    }, [])

    const {control, handleSubmit, formState: {errors} } = useForm<IListingFormValues>({defaultValues: { 
      brand: sessionStorage.getItem("brand") || "",
      model: sessionStorage.getItem("model") || "",
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(getAllListings())
      sessionStorage.setItem("brand", `${data.brand}`)
      sessionStorage.setItem("model", `${data.model}`)
      dispatch(setNewListing(data));
      navigate("./page2");
      };

       const handleClick = () => {
        sessionStorage.setItem("brand", "value")
       }
  return (
    <>
    <Container>
    <SimplePaper>
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput name={'brand'} items={bikeBrands} label={'brand'} labelId={'brand-select-label'} id={'brand-select'} control={control}/>
        {errors.brand?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
        <FormInputText 
        sx={
          {my: 2}
        } 
        name='model' 
        label='model' 
        control={control}/>
         {errors.model?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
    <ProgressMobileStepper handleClick={handleClick} activeStep={0}/>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike