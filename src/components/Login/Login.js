import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import { setAuth} from '../../hooks/useAuth';
const LOGIN_URL = '/user/login';
 
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
       titutasks
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    
     useEffect(() => {
        setErrMsg('');
    }, [email, password])

   //Handle Login Submit 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
            try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    email: data.get('email'),
                    password: data.get('password'),
                  }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            console.log("jh rh hu")
            setAuth(accessToken);
            console.log("aa gaya")
            console.log({accessToken})
            setEmail('');
            setpassword('');
            //navigate to task screen after login
            navigate('/tasks', { replace : true});
          
        } catch (err) {
          console.log({err})
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 411) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }else if (err.response?.status === 409) {
                setErrMsg('User not registered');
            }
             else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
  return (
  
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Grid item xs={12}>
          { errMsg?
        <Alert ref={errRef} severity="error">{errMsg}</Alert>:""
          }
        </Grid>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


























// import { useRef, useState, useEffect } from 'react';


// import axios from '../../api/axios';
// const LOGIN_URL = '/user/login';

// const Login = () => {
   
   
   
//     const userRef = useRef();
//     const errRef = useRef();

//     const [email, setEmail] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [email, pwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ email:email, password:pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );

//             const accessToken = response?.data?.accessToken;
//             console.log({accessToken})
//             setEmail('');
//             setPwd('');
          
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 411) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             }else if (err.response?.status === 409) {
//                 setErrMsg('User not registered');
//             }
//              else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }
//     }

//     return (

//         <section>
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="text"
//                     id="email"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChange={(e) => setEmail(e.target.value)}
//                     value={email}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                 />
//                 <button>Sign In</button>
//             </form>
//             <p>
//                 Need an Account?<br />
//                 <span className="line">
//                     <a href="/register">Sign Up</a>
//                 </span>
//             </p>
//         </section>

//     )
// }

// export default Login
