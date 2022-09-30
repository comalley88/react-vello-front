import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';

export default function ComboBox({
    countries,
    label,
    renderInput,
    control,
    defaultValue,
    name,
    errors,
}: any) {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Autocomplete
          options={countries}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={errors[name]}
              helperText={errors[name] && errors[name].message}
            />
          )}
          {...field}
          isOptionEqualToValue={(option, value) =>
            value === undefined || value === "" || option === value
          }
          onChange={(_, data) => {
            console.log("data is", data);
            field.onChange(data)}}
        />
      )}
    />
  );
}


