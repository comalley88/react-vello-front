import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Controller } from 'react-hook-form';


export const FormDatePicker = ({control, name}: any) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <Controller
        rules={{required: true}}
        control={control}
        name={name}
        render={({ field: { onChange, value} }) => (
          <DatePicker
          openTo='year'
          views={['year']}
          label="Year puchased"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        )
        }
        />
        
    </LocalizationProvider>
  );
}
