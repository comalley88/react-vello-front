import { Container, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import FormChipInput from '../../components/forms/FormChipInput';
import ProgressMobileStepper from '../../components/forms/Stepper';
import SimplePaper from '../../components/Paper';
import {getListingDraft, IListingFormValues, setNewListing } from '../../features/listing/state/listingSlice';

const RegisterBike3 = () => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const { listingDraft,} = useSelector((state: RootState) => {
    return {
      listingDraft: getListingDraft(state),
    };
  });
  const sessionstorage = sessionStorage.getItem("options")
    const {control, handleSubmit, formState: {errors}} = useForm<IListingFormValues>({defaultValues: { 
      options: sessionstorage?.split(",") || []
    }});


    const onSubmit = (data: IListingFormValues) => {
      sessionStorage.setItem("options", `${data.options}`)
      dispatch(setNewListing({...listingDraft, options: data.options}));
      navigate("./../page4")
      };

  return (
    <>
    <Container>
    <SimplePaper>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormChipInput  control={control}/>
    {errors.options?.type === "required" && <Typography sx={{mb:1, color:red[500]}}>required field</Typography>}
    <ProgressMobileStepper activeStep={2}/>
  </form>

    </SimplePaper>
    </Container>
   
       
    </>
 
   
  )
}

export default RegisterBike3