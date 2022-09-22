import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputText } from '../components/forms/FormInputText'
import ProgressMobileStepper from '../components/forms/Stepper';

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
       <ProgressMobileStepper/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText name='email' label='email' control={control}/>
        <FormInputText name='username' label='username' control={control}/>
    <input type="submit" />
  </form>
    </>
 
   
  )
}

export default RegisterBike