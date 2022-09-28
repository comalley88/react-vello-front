import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';


export const FormSelectInput = ({name, control, menuItems, label }: any) => {

  return (
    <Controller
        rules={{required: true}}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          onChange={onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems.map((item: any, i: any) => (
            <MenuItem key={i} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
        )
        }/>
  );
}
