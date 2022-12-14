import {  Container, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import React from 'react';
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import ComboBox from '../../components/forms/Autocomplete';
import { FormInputText } from '../../components/forms/FormInputText'
import GoogleMaps from '../../components/forms/GoogleMaps';
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import {  getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';


const RegisterBike4 = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [countries, setCountries] = React.useState([{label: 'France', code: 'FR'}])

  React.useEffect(() => {
      async function getCountries() {
          try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const data = response.data;
            const countryArray = data.map((item: { name: { common: string; } }) => {
              const {name: {common: countryName}} = item
              return countryName
            })
            setCountries(countryArray)
          } catch (error) {
            console.error(error);
          }
        } getCountries();
        
  }, [])

  const { listingDraft} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });

    const {control, handleSubmit, formState: {errors} } = useForm<IListingFormValues>({
      defaultValues: { 
      address: {
        addressLine1: sessionStorage.getItem("addressLine1") || "",
        addressLine2: sessionStorage.getItem("addressLine2") || "",
        postcode: sessionStorage.getItem("postcode") || "",
        city: sessionStorage.getItem("city") || "",
        country: sessionStorage.getItem("country") || "",
      }
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      sessionStorage.setItem("addressLine1", `${data.address.addressLine1}`)
      sessionStorage.setItem("addressLine2", `${data.address.addressLine2}`)
      sessionStorage.setItem("postcode", `${data.address.postcode}`)
      sessionStorage.setItem("city", `${data.address.city}`)
      sessionStorage.setItem("country", `${data.address.country}`)
      dispatch(setNewListing({...listingDraft, address: {addressLine1: data.address.addressLine1, addressLine2: data.address.addressLine2, postcode: data.address.postcode, country: data.address.country, city:data.address.city}}));
      navigate("./../page5");
      };

  return (
    <>
    <Container>
    <SimplePaper>
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
        autoComplete="new-password"
        sx={
          {my: 2}
        } 
        name='address.addressLine1' 
        label='Address Line 1' 
        control={control}/>
       {errors.address?.addressLine1?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
       <FormInputText 
       autoComplete="new-password"
        sx={
          {my: 2}
        } 
        name='address.addressLine2' 
        label='Address Line 2' 
        control={control}/>
       {errors.address?.addressLine2?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
       <FormInputText 
       autoComplete="new-password"
        sx={
          {my: 2}
        } 
        name='address.postcode' 
        label='Postal Code' 
        control={control}/>
        <GoogleMaps
        autoComplete="new-password"
        name="address.city"
        control={control}
        />
       {errors.address?.postcode?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
       <ComboBox
       disablePortal
       sx={
        {my: 2}
      } 
       countries={countries}
       control={control}
       name={'address.country'}
       label="Select Country"
       errors={errors}
       />
    <ProgressMobileStepper activeStep={3}/>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike4