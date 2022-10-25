import * as React from 'react';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { Controller } from 'react-hook-form';
import  {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { setDestinationCoords } from '../../features/destination/destinationSlice';
import { useAppDispatch } from '../../common/state/hooks';


function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }


  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export interface IGoogleMapsInputText {
    name: string;
    control: any;
    setCoords?: boolean;
    defaultValue?: string
  }

const API_Key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function GoogleMaps({name, control, setCoords, defaultValue, ...props}: IGoogleMapsInputText & TextFieldProps) {

  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${API_Key}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string, types: Array<string> },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        200,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue, types: ['geocode']}, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Controller
    defaultValue={defaultValue}
    name={name}
    control={control}
    render={({ field : {onChange, value}}) => (
    <Autocomplete

      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description 
      }
      isOptionEqualToValue={(option: any, value: any) => option ? option.description === value : option.description === ""}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList    
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        onChange(newValue?.structured_formatting.main_text);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        setCoords &&
        getGeocode({ address: inputValue }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          dispatch(setDestinationCoords({latitude: lat, longitude: lng}))
        });
      }
      }
      renderInput={(params) => (
        <TextField sx={{my:2}} {...params} {...props} label="City" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
    )}
    />
  );
}

