import React from "react";
import "./App.css";
import {Routes, Route} from 'react-router-dom'
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import TimerPage from "./Pages/TimerPage/TimerPage";
import DemoPage from "./Pages/Demo/DemoPage";

function App() {
    return (
       <div className="app.css">
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path = '/workstation' element={<TimerPage/>}/>
                    <Route path = '/demo' element={<DemoPage/>}/>
                </Routes>
            {/* <HomePage/> */}
       </div>
    );
}

export default App;
 