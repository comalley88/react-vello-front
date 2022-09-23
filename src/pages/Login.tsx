import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextInput from '../components/TextInput';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { errorSelector } from '../features/auth/state/appStateSlice';
import { AppDispatch, RootState } from '../common/state/store';
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, jwtSelector, signIn } from '../features/auth/state/auth';
import NavBar from '../components/NavBar';

interface LoginFormInputs {
    email: string,
    password: string,
    rememberme: boolean,
  }

export const LOGIN_COMPONENT_ID = "loginComponent";

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


export default function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token =  useSelector(currentUserSelector);
  console.log("token is", token)

  const { error, jwt, curUser } = useSelector((state: RootState) => {
    return {
      error: errorSelector(state, LOGIN_COMPONENT_ID),
      jwt: jwtSelector(state),
      curUser: currentUserSelector(state),
    };
  });
  console.log("current user", curUser, "and jwt", jwt)

  React.useEffect(() => {
    if (curUser && jwt && jwt !== "") {
      console.log("in function")
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curUser, jwt]);
  
  const { handleSubmit, formState: { errors }, control } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
      console.log(data)
    dispatch(signIn({ componentId: LOGIN_COMPONENT_ID, ...data }));
  };


  return (
    <>
    <NavBar/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextInput 
            fullWidth
            margin="normal"
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
            {errors.email && "email is required"}
            <TextInput 
            fullWidth
            margin="normal"
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
            {errors.password && "password is required"}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                color='primary'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
    
  );
}