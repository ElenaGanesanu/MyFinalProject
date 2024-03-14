import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./Css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { Context } from '../Context/Context';
import { useContext } from 'react';



export default function Navbar() {

    const navigate = useNavigate();
    const { user, setUser} = useContext(Context);

    const erase = () => {   
        fetch(`http://localhost:3004/currentUser/${user?.id}`, { 
            method:"DELETE",
            headers: {
            "Content-Type": "application/json",
            }
        })
        .then(()=>{setUser(null)})
    }


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box 
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className='navbarStyle'
        >
        <List>
            <ListItem  disablePadding >
                <ListItemButton>
                <ListItemText primary={"Start game"} onClick={() => {navigate(`/Start game`)}}/>
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding >
                <ListItemButton>
                <ListItemText primary={"Categories"} onClick={() => {navigate(`/Categories`)}}/>
                </ListItemButton>
            </ListItem>
            {!user ? <ListItem  disablePadding >
                <ListItemButton>
                <ListItemText primary={"Register"} onClick={() => {navigate(`/Register`)}}/>
                </ListItemButton>
            </ListItem> : <></>}
            {!user ? <ListItem  disablePadding >
                <ListItemButton>
                <ListItemText primary={"Log In"} onClick={() => {navigate(`/Log In`)}}/>
                </ListItemButton>
            </ListItem> : <></>}
            {user ? <ListItem  disablePadding >
                <ListItemButton>
                <ListItemText primary={"Log out"} onClick={() => {
                    erase()
                    navigate(`/Log In`)}}/>
                </ListItemButton>
            </ListItem> : <></>}
            {user ? <ListItem  disablePadding >
                <ListItemButton>
                <ListItemText primary={"Profile"} onClick={() => {
                    navigate(`/Profile`)}}/>
                </ListItemButton>
            </ListItem> : <></>}
        </List>
        </Box>
    );

    return (
        <div>
        {['top'].map((anchor) => (
            <React.Fragment key={anchor}>
            <Button sx={{color:"purple"}} onClick={toggleDrawer(anchor, true)} >Menu</Button>
            <Drawer 
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
            </React.Fragment>
        ))}
        </div>
    );
    }