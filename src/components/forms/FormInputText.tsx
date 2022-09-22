import {Controller} from "react-hook-form";
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface IFormInputText {
  name: string;
  label: string;
  control: any
}

export const FormInputText = ({ name, control, label, ...props }: IFormInputText & TextFieldProps) => {

return (
  <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
          {...props}
          fullWidth
          variant={'outlined'}
          autoFocus
          onChange={onChange} value={value} label={label} />
        )}
      />
)
}