import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';
import http from "../http"

interface SignupFormInputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }
  
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
    const { handleSubmit, control } = useForm<SignupFormInputs>();
    const [errorMessage, setErrorMessage] = React.useState(null)
    const onSubmit = async (data: SignupFormInputs) => {
      setErrorMessage(null)
      http
      .post('/api/auth/local/register', {...data, username: data.email})
      .then(response => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error.message);
        console.log('An error occurred:', error.response.data.error.message);
      });
    };
    
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextInput 
            fullWidth
            required
            autoComplete="given-name"
            name="firstName"
            control={control}
            id="firstName"
            label="First Name"
            variant={'outlined'}
            autoFocus
            />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextInput 
            fullWidth
            required
            control={control}
            variant={'outlined'}
            autoFocus
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            />
              </Grid>
              <Grid item xs={12}>
              <TextInput 
            fullWidth
            required
            id="email"
            label="Email Address"
            name="email"
            type="email"
            rules={{ required: true }}
            control={control}
            autoComplete="email"
            variant={'outlined'}
            autoFocus
            />
              </Grid>
              <Grid item xs={12}>
              <TextInput 
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            rules={{ required: true }}
            control={control}
            variant={'outlined'}
            autoFocus
            />
              </Grid>
            </Grid>
            <Typography>
            {errorMessage}
            </Typography>
            
            <Button
              type="submit"
              fullWidth
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}