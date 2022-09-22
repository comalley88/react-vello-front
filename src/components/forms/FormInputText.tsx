import { Control, Controller, FieldValues} from "react-hook-form";
import React from "react";
import { TextField } from "@mui/material";

export interface IFormInputText {
  name: string;
  label: string;
  control: any
}

export const FormInputText = ({ name, control, label }: IFormInputText) => {

return (
  <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
          fullWidth
          variant={'outlined'}
          autoFocus
          onChange={onChange} value={value} label={label} />
        )}
      />
)
}