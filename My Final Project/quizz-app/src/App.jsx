import React from 'react';
import Quiz from './components/Quiz';
import HomePage from './components/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './components/NoPage';
import LogIn from './components/LogIn';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import { Context } from './Context/Context';
import { useState, useEffect } from 'react';
import Register from './components/Register';
import Profile from './components/Profile';

const App = () => {

  const [questions, setQuestions]= useState([]);
  const [question, setQuestion]= useState([]);
  const [user, setUser] = useState([]);
  const [score, setScore]= useState(0);
  const [scores, setScores]= useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/scores") 
    .then(response=>response.json())
    .then(data=> {setScores(data)});
}, []);

  useEffect(() => {
      fetch("http://localhost:3004/questions") 
      .then(response=>response.json())
      .then(data=> {setQuestions(data)});
  }, []);

  useEffect(() => {
    fetch("http://localhost:3004/currentUser")
    .then(response=>response.json())
    .then(data=> {
      if(data){
        setUser(data[0])
      }else {
        setUser(null)
      }
    });
  }, []);
  
  return (
    <>
      <Context.Provider value={{scores, setScores, questions, setQuestions, question, setQuestion, user, setUser, score, setScore}}>
        <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path="/" index element={<HomePage/>}/>
              <Route path="/Start game" index element={<HomePage/>}/>
              <Route path="/Log In" element={<LogIn />} />
              <Route path="/Categories" element={<Categories/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  )
} 

export default App;