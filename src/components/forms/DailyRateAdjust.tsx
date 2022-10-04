import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, TextField, TextFieldProps } from "@mui/material"
import React from "react";
import { Controller } from "react-hook-form"

const CounterField = ({value, onChange, ...props}: TextFieldProps & any) => {
    return (
        <>
        <IconButton
            onClick={() => {
                value ++
                onChange(value)
            }
        }
            aria-label="add">
            <AddCircleOutline />
        </IconButton>
        <TextField
                {...props}
                fullWidth
                variant={'outlined'}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                autoFocus
                onChange={onChange}
                value={value as number}
                 />
        <IconButton
            onClick={() => {
                value --
                onChange(value)
            } }
            aria-label="remove">
            <RemoveCircleOutline />
        </IconButton></>
    )
}


export const DailyRateAdjust = ({control, name, label}: any) => {

    return(
       
         <Controller
  control={control}
  name={name}
  render={({
    field
  }) => (
    <>
       <CounterField label={label} {...field}/>
    </>
        )}
        />    
            
           
    )
}

