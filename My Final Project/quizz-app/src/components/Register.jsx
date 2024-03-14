import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [email, setEmail] = useState();
    const reg = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
    }
    const validator = () => {
        return username && password && confirmPassword && email && password == confirmPassword
    }
    const clear = () => {
        setUsername("")
        setPassword("")
        setconfirmPassword("")
        setEmail("")
    };

    const register = () =>{
        fetch("http://localhost:3004/users", {
            method:"POST", body: JSON.stringify(reg),
            headers: {
            "Content-Type": "application/json",
            }
        })
        .then(() => {
            clear()
            navigate("/Log In")
        }
        )
    }

    return (
        <Box
            style={{display:"flex", justifyContent:"center", background: "white"}}
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{display:"flex", flexDirection:"column", }}>
            <TextField value= {username} id="username" label="Username" type="text" onChange={(e)=>setUsername(e.target.value)}/>
            <TextField value= {password} id="password" label="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <TextField value= {confirmPassword} id="confirmPassword" label="ConfirmPassword" type="password" onChange={(e)=>setconfirmPassword(e.target.value)}/>
            <TextField value= {email} id="email" label="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
            <FormControl sx={{ m: 1, width: "215.625px" }}>
            </FormControl>
            <Button disabled={!validator()} onClick={()=>{register()}} style={{width:"100px", marginLeft:"20px"}} variant="contained">
                Register
            </Button >
            {!validator() && <p style={{ color:'red' }}>Please fill all fields <br/> Passwords need to match</p>}
            </div>
        </Box>
    );
}