import React from "react";
import "./App.css";
import {Routes, Route} from 'react-router-dom'
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
    return (
       <div className="app.css">
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                </Routes>
            {/* <HomePage/> */}
       </div>
    );
}

export default App;
 