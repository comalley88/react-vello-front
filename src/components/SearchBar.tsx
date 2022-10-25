import { Box, Button } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '../common/state/store'
import { getDestination, IDestinationSearchForm } from '../features/destination/destinationSlice'
import { FormDatePicker } from './forms/FormDatePicker'
import GoogleMaps from './forms/GoogleMaps'

const SearchBar = () => {
    const {destination} = useSelector((state: RootState) => {
        return {
            destination: getDestination(state)
        }
      })
    
      const {control, handleSubmit} = useForm<IDestinationSearchForm>({
        defaultValues: { 
        destination: "",
        dates: {
            startDate: destination.dates.startDate,
            endDate: destination.dates.endDate,
        }
    }
      })

      const onSubmit = (data: any) => {
      console.log(data)
       } 
      
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
<Box sx={{boxShadow: 1}} style={{backgroundColor: "white", opacity: "75%", height: "75px", display: "flex", paddingLeft: "35px", paddingRight: "35px", alignItems: "center", justifyContent: "center", width: "100vw"}}>
    <GoogleMaps style={{width: "700px", marginRight: "20px"}} defaultValue={destination.destination} name={'destination'} control={control} setCoords/>
    <FormDatePicker defaultValue={destination.dates.startDate}  sx={{mr: 2, maxWidth: "250px"}} control={control} name={'dates.startDate'} label={'Start Date'} views={["year", "month", "day"]}/>
    <FormDatePicker  defaultValue={destination.dates.endDate} style={{maxWidth: "250px", marginRight: "20px"}} control={control} name={'dates.endDate'} label={'End Date'} views={["year", "month", "day"]}/>
    <Button color='secondary' variant="contained" type="submit">
      SUBMIT
    </Button>
    </Box>
    </form>
    
  )
}

export default SearchBar