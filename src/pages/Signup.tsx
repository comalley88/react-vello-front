import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';
import { setToken } from '../strapi/helpers';
import { SignupFormInputs, useAuthContext } from '../context/AuthContext';
import { API } from '../strapi/constant';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function SignUp() {
    const { handleSubmit, control } = useForm<SignupFormInputs>();
    const [errorMessage, setErrorMessage] = useState(null)
    const [error, setError] = useState("");
    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const onSubmit = async (values: SignupFormInputs) => {
      const updatedValues = {...values, username: values.email} 
     
      setIsLoading(true);
        try {
          const response = await fetch(`${API}/auth/local/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedValues),
          });
    
          const data = await response.json();
          if (data?.error) {
            throw data?.error;
          } else {
            // set the token
            setToken(data.jwt);
    
            // set the user
            console.log("data is", data)
            setUser(data.user);
            <>
             <Alert severity="success">`Welcome to Vello ${data.user.username}!`</Alert>
            </>
           
            navigate("/destination", { replace: true });
          }
        } catch (error) {
          console.error(error);
          setError("Something went wrong!");
        } finally {
          setIsLoading(false);
        }
      };
    
    
  return (
      <Container component="main" maxWidth="xs">
        {error ? (
                  <Alert
                    severity="error"
                    onClose={() => setError("")}
                  >{error}</Alert>
                ) : null}
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
              endIcon={isLoading ? <CircularProgress /> : null}
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
      </Container>
  );
}