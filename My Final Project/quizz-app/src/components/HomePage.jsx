import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import HomePageButton from "./HomePageButton";

export default function HomePage() {

    return (
        
    <Card style={{width:"60vh", height:"40vh", position:"fixed", left:"50%", top:"50%", transform:"translate(-50%, -50%)"}} sx={{ maxWidth: 700 }}>
        <CardActionArea>
        <CardContent>
            <Typography gutterBottom variant="h3" component="div">
            Welcome!
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Ready to test your knowledge?
            </Typography>
            <HomePageButton/>
        </CardContent>
        </CardActionArea>
    </Card>
    );
}
