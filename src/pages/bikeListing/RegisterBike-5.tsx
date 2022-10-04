import { Alert, Box, Button, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { wrap } from 'module';
import React from 'react';
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import ComboBox from '../../components/forms/Autocomplete';
import { FormInputText } from '../../components/forms/FormInputText';
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import { getAllListings, getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';


const RegisterBike5 = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [countries, setCountries] = React.useState([])

  React.useEffect(() => {
      async function getCountries() {
          try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const data = response.data;
            const countryArray = data.map((item: { 
              idd: {root: string, suffixes: Array<string>};
              name: { common: string; };
            }) => {
              const {idd: {root, suffixes}, name: {common: countryName}} = item
              return `${countryName} (${root}${suffixes})`
            })
            setCountries(countryArray)
          } catch (error) {
            console.error(error);
          }
        } getCountries();
        
  }, [])

  console.log("dialling codes are", countries)
  const { listingDraft,} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });

    const {control, handleSubmit, formState: {errors} } = useForm<IListingFormValues>({
      defaultValues: { 
      brand: "",
      model: "",
      yearPurchased: 0,
      description: "",
      options: [],
      address: {
        addressLine1: "",
        addressLine2: "",
        postcode: "",
        city: "",
        country: ""
        
      },
      telephone: {
        prefix: "",
        number: ""
      }
    }});
    
    const onSubmit = (data: IListingFormValues) => {
      dispatch(getAllListings())
      dispatch(setNewListing({...listingDraft, telephone:  {prefix: data.telephone.prefix, number: data.telephone.number}}));
      navigate(".././page6");
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
        <Box sx={{width: "50%", mr: 2}}>
        <ComboBox
    control={control}
    label="Country"
    countries={countries}
    name="telephone.prefix"
    errors={errors}
    /> 
        </Box>
      
    <FormInputText
    sx={{alignSelf: "center"}}
    name='telephone.number'
    label={"Mobile Number"}
    control={control}
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

export default RegisterBike5