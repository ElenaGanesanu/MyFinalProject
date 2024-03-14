import React  from 'react';
import './Css/Quiz.css';
import { useState, useRef, useContext } from 'react';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const { question, score, setScore, user, setScores} = useContext(Context);
    const [lock, setLock]= useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [result, setResult]= useState(false);
    const navigate = useNavigate();

    const option1= useRef(null);
    const option2= useRef(null);
    const option3= useRef(null);
    const option4= useRef(null);

    const optionsArray= [option1, option2, option3, option4];

    const checkAns = (e, ans, questionNum) => {
        question.forEach((element, index) =>{
            if(element.correct==ans && index===questionNum && lock===false ) {
                e.target.classList.add('correct');
                setLock(true)
                setScore(prev=>prev+1)
            } else if( index===questionNum && lock===false) {
                e.target.classList.add('wrong');
                setLock(true)
                optionsArray[element.correct-1].current.classList.add("correct");
            }
        })
    }

    const nextFunctionality= () => {
        if(lock===true) {
            if(questionNumber===question.length-1) {
                setResult(true);
                saveScores();
                return 0;
            }
            setQuestionNumber(prevQuestioNumber => prevQuestioNumber + 1);
            setLock(false);
            optionsArray.map((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
                return null;
            })
        }
    }

    const saveScores= () => {
        fetch("http://localhost:3004/scores", {
            method:"POST", body: JSON.stringify(userScore),
            headers: {
            "Content-Type": "application/json",
            }
        })
    }

    const userScore= {
        user: user?.username,
        score: score,
        category: question[0]?.category
    }

    return (
        question && question.length > 1 ? <div className='container'>
            <h1>Quiz App</h1>
            <hr/>
            {result? <></> : 
                <>
                    <h2>{question[questionNumber]?.description}</h2>
                    <ul>
                        <li ref={option1} onClick={(e)=> {checkAns(e, 1, questionNumber)}}>{question[questionNumber]?.raspuns1}</li>
                        <li ref={option2} onClick={(e)=> {checkAns(e, 2, questionNumber)}}>{question[questionNumber]?.raspuns2}</li>
                        <li ref={option3} onClick={(e)=> {checkAns(e, 3, questionNumber)}}>{question[questionNumber]?.raspuns3}</li>
                        <li ref={option4} onClick={(e)=> {checkAns(e, 4, questionNumber)}}>{question[questionNumber]?.raspuns4}</li>
                    </ul>
                    <button onClick={() => nextFunctionality()}>Next</button>
                    <div className='index'>{questionNumber+1} out of {question.length} questions</div>
                </>}
            {result ? 
                <>
                    <h2>You scored {score} out of {question.length}</h2>
                    <button onClick={() => {navigate("/Categories")}}>Try another quiz?</button>
                </> : <></>}
        </div> : <p>Loading...</p>
    )
}

export default Quiz;
