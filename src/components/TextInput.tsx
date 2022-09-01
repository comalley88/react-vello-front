import {
   Controller, ControllerProps} from "react-hook-form";
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';

interface TextInputFormProps extends OutlinedTextFieldProps{
    name: string;
    control: any;
    rules?: object;
}
const TextInput = ({control, name, label,rules, ...props}: TextInputFormProps) => {

  return (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          // Material UI TextField already supports
          // `value` and `onChange`
          <TextField {...props} {...field} label={label} />
        )}
      />
  )
}

export default TextInput