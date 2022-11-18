import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';



export default function SelectInput({items, label, labelId, id, control, name}: {name: string, items: Array<string>, label: string, labelId: string, id: string, control: any}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
      <Controller
  control={control}
  name={name}
  render={({
    field: { onChange, value},
  }) => (
    <>
     <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
        >
            {items.map((item: any, index: number) => (
                <MenuItem key={index} value={item.attributes.name}>{item.attributes.name}</MenuItem>
            ))}
        </Select>
    </>
     
          )}
          />
      </FormControl>
    </Box>
  );
}
