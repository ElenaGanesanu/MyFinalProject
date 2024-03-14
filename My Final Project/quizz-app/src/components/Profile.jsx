import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import './Css/Profile.css';
import { useNavigate } from "react-router-dom";

//filter pt scores ca sa le arati pe cele mai mari doar pt userul current

const Profile= () => {
    
    const navigate= useNavigate();
    const { scores, user } = useContext(Context);

    const filteredScores= scores?.filter((el) => {
        return el.user===user?.username 
    })
    console.log(filteredScores)

    return (
        (scores && scores.length >= 1) ? <div className="profileContainer">
                <h1>Profile</h1>
                <hr/>
                <ul>
                    {scores?.map((element) => {
                            return <li key={element.id}>In the {element.category} category you have scored {element.score} points</li>
                    })}
                </ul>
            </div> : <div className="profileContainer">
                <h2>You do not have any scores yet</h2>
                <hr/>
                <button onClick={() => navigate("/Categories")}>Start a quiz!</button>
            </div>
    )
}

export default Profile;