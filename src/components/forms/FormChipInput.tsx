import { Chip, FormControlLabel } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const chips = ["bike lock", "lights (rear and front)", "panniers", "mud guards", "gps computer"]

const ChipInput = ({active, onClick, label}: any) => {
    return (
        <>
        {active ? <Chip onClick={onClick} label={label} variant='filled' color='primary'/> : <Chip onClick={onClick} label={label} variant='outlined' color='primary'/> }
        </>
    
    )
}

const ChipField = ({ value, onChange }: any) => {

    return (
        <>
        {
            chips.map((chip, index) => <ChipInput label={chip} key={index} active={value === chip} onClick={() => onChange(chip)} />
            )
        }
          
        </>
    )

}
    

const FormChipInput = ({control}: {control: any}) => {

  return (
    <>
      <Controller
      control={control}
      name="options"
      render={({ field }) => <ChipField {...field} />}
    />
    </>
   
  )
}

export default FormChipInput