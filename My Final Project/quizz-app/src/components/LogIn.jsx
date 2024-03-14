import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';


export default function LogIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [users, setUsers] = useState();
    const { user, setUser } = useContext(Context);

    const saveUser = () =>{
        fetch("http://localhost:3004/currentUser", {
            method:"POST", body: JSON.stringify(userValue),
            headers: {
            "Content-Type": "application/json",
            }
        })
        .then(() => {
            fetch("http://localhost:3004/currentUser") 
            .then(response=>response.json())
            .then(data=> {setUser(data)})
        })
    };

    useEffect(() => {
        fetch("http://localhost:3004/users")
        .then(response=>response.json())
        .then(data=> {setUsers(data)});
    }, []);

    const validateUser = () => {
        const compare = users.filter((element)=> {
            return(element.username == userValue.username && element.password == userValue.password)
        
    }
    )
        if(compare.length > 0) {
            return true
        }else{
            return false
        }
    }
    const logIn = () => {
        if(validateUser() ==true && ((user && user.length === 0) || !user)){
            navigate("/Profile")
            saveUser()
        }else {
            alert("incorrect user")
        }
    }
    const userValue = {
        username: username,
        password: password,
    }
    return (
        !user ? <Box
            style={{display:"flex", justifyContent:"center"}}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', background: "white" },
            }}
            noValidate
            autoComplete="off">
            <div style={{display:"flex", flexDirection:"column"}}>
                <TextField value= {username} id="username" label="Username" type="text" onChange={(e)=>setUsername(e.target.value)}/>
                <TextField value= {password} id="password" label="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <FormControl sx={{ m: 1, width: "215.625px" }}></FormControl>
                <Button onClick={()=>{logIn()}} style={{width:"100px", marginLeft:"20px"}} variant="contained">Log In</Button >
            </div>
        </Box> : <p style={{display:"flex", justifyContent:"center", color:"white"}}>You are alredy logged in</p>
    );
}
