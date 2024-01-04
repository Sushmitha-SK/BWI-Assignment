import React, { useEffect, useState } from 'react'
import Styles from '../styles/Login.css'
import { Box, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography, Checkbox, Button } from '@mui/material';
import SignInImage from '../assets/signin.png'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../api/userApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/store/slice/userAuthSlice';
import logo from '../assets/logo.jpg'

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 0,
                m: 1,
                width: 450,
                textAlign: "center",
                ...sx,
            }}
            {...other}
        />
    );
}

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername && storedPassword) {
            setUsername(storedUsername);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const removeStoredCredentials = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    };

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const logindata = await loginUser(username, password);
            console.log('logindata', logindata.status)
            if (logindata.status === 200) {
                dispatch(loginSuccess(logindata));
                toast.success('Logged in successfully');

                if (rememberMe) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                } else {
                    removeStoredCredentials();
                }
                navigate('/home');
            } else if (logindata.status === 400) {
                const errorMessage = logindata.data.message;
                toast.error(errorMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container-area">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    component={Paper}
                    square
                    className="container-info"
                    sx={{
                        justify: "space-between",
                        alignItems: "100%",
                        overflowY: "auto",
                    }}
                >
                    <div style={{ marginTop: '5%' }}>
                        <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <span>&nbsp;</span>
                            <span style={{
                                marginLeft: "10%",
                                fontFamily: 'Lato',
                                fontSize: '24px',
                                fontWeight: 800,
                                color: '#9854CB'
                            }}>
                                <img src={logo} alt="Cart Ease" width="125px" />
                            </span>
                        </a>

                    </div>
                    <div
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                component="form"
                                noValidate
                                sx={{
                                    marginTop: "6%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Item sx={{ marginTop: "7%" }}>
                                    <Typography
                                        component="h1"
                                        className="heading"
                                        fontWeight={600}
                                        fontSize={34}
                                        fontFamily={"Lato"}
                                    >
                                        Sign In
                                    </Typography>
                                </Item>

                                <Item>
                                    <FormControl variant="outlined" sx={{
                                        width: "100%",
                                        "& label.Mui-focused": {
                                            color: "#9854CB"
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#9854CB"
                                            }
                                        }
                                    }} >
                                        <InputLabel
                                            sx={{ color: "#9CA3AF" }}
                                            required
                                            htmlFor="outlined-adornment-username"
                                        >
                                            Username
                                        </InputLabel>

                                        <OutlinedInput
                                            id="username"
                                            name="username"
                                            autoComplete="off"
                                            sx={Styles.text}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            label="Username"
                                            type="text"
                                        />
                                    </FormControl>
                                    {!username.trim() && errorFlag && (
                                        <Typography sx={{
                                            color: "red",
                                            fontFamily: "Roboto",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            marginTop: "2px"
                                        }}>
                                            Username required
                                        </Typography>
                                    )}
                                </Item>

                                <Item>
                                    <FormControl
                                        variant="outlined"
                                        sx={{
                                            width: "100%", marginTop: "6%",
                                            "& label.Mui-focused": {
                                                color: "#9854CB"
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#9854CB"
                                                }
                                            }
                                        }}
                                    >
                                        <InputLabel
                                            sx={{
                                                color: "#9CA3AF",
                                            }}
                                            htmlFor="outlined-adornment-password"
                                            required
                                        >
                                            Password
                                        </InputLabel>
                                        <OutlinedInput

                                            sx={{
                                                fontFamily: "Roboto",
                                                fontSize: "18px",
                                            }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="outlined-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </Item>

                                <Item>
                                    <Grid container marginTop={1}>
                                        <Grid item xs>
                                            <Box
                                                textAlign="left"
                                                width={251}
                                                display="flex"
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: "16px",
                                                        color: "#333",
                                                        fontFamily: 'Lato'

                                                    }}
                                                >
                                                    Remember Me
                                                </Typography>

                                                <Checkbox
                                                    checked={rememberMe}
                                                    onChange={(e) => {
                                                        setRememberMe(e.target.checked);
                                                        if (!e.target.checked) {
                                                            removeStoredCredentials();
                                                        }
                                                    }}
                                                    sx={{
                                                        marginTop: "-3%",
                                                        color: '#9854CB',
                                                        '&.Mui-checked': {
                                                            color: '#9854CB',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </Grid>


                                    </Grid>
                                </Item>

                                <Item sx={{ marginTop: "2%" }}>

                                    <Button
                                        onClick={handleSignin}
                                        type="submit"
                                        sx={{
                                            borderRadius: 3, marginTop: 3,
                                            backgroundColor: '#9854CB',
                                            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                                            width: '150px',
                                            '&:hover': {
                                                backgroundColor: '#784FB1',
                                            },
                                        }}
                                        variant="contained">
                                        Sign In
                                    </Button>
                                </Item>
                            </Box>

                        </div>
                    </div>
                </Grid >

                <Grid
                    className="container-main"
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundColor: "#E5E5E5",
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={SignInImage}
                        alt="SignUpImage"

                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />

                </Grid>
            </div >
        </>
    )
}

export default Login
