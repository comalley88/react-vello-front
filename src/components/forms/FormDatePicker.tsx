import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider, DatePicker, CalendarPickerView } from "@mui/x-date-pickers";
import { Controller } from 'react-hook-form';

export interface IFormDatePicker {
  control: any;
  name: string;
  label: string;
  views: CalendarPickerView[]
}
export const FormDatePicker = ({control, name, label, views, ...props}: IFormDatePicker & TextFieldProps ) => {
 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <Controller
        rules={{required: true}}
        control={control}
        name={name}
        render={({ field: { onChange, value} }) => (
          <DatePicker
          openTo='year'
          views={views}
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField  {...props} {...params} helperText={null} />}
        />
        )
        }
        />
        
    </LocalizationProvider>
  );
}
