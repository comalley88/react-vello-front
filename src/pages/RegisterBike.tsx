import { autocompleteClasses, Button, Container } from '@mui/material';
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputText } from '../components/forms/FormInputText'
import ProgressMobileStepper from '../components/forms/Stepper';
import SimplePaper from '../components/Paper';

export type FormValues = {
    email: string,
    username: string,
}
const RegisterBike = () => {
    const {control, handleSubmit } = useForm<FormValues>({defaultValues: { email: "",
      username: "",}});
    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
  return (
    <>
    <Container>
    <SimplePaper>
    <ProgressMobileStepper/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText sx={
          {my: 2}
        } 
        name='email' 
        label='email' 
        control={control}/>
        <FormInputText 
        sx={
          {my: 2}
        } 
        name='username' 
        label='username' 
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