import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Controller } from 'react-hook-form';
import { Checkbox, ListItemText } from '@mui/material';

const chips = ["bike lock", "lights (rear and front)", "panniers", "mud guards", "gps computer"]


export default function FormChipInput({control}: any) {

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Options (select multiple)</InputLabel>
        <Controller
        rules={{required: true}}
        control={control}
        name="options"
        render={({ field: { onChange, value} }) => (
          <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput id="select-multiple-chip" label="Options" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          
        >
          {chips.map((chip) => (
            <MenuItem
              key={chip}
              value={chip}
              
            >
              <Checkbox checked={value.indexOf(chip) > -1} />
              <ListItemText primary={chip} />
            </MenuItem>
          ))}
        </Select>
        )}
      />
      
      </FormControl>
    </div>
  );
}