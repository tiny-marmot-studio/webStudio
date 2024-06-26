import React from 'react'
import Live2DComponent from './PixiLive2DComponent';
import { useNavigate } from 'react-router-dom';


import "./LoginPage.css"
const LoginPage = () => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <div className='login-page'>
      <div className='canvas'>
        <Live2DComponent className="model">/</Live2DComponent>
      </div>
      <div className='login-panel'>
        <div className='greeting'> 
          <h1>Welcome Jimmy</h1>
          <h2>ご主人様</h2>
        </div>
        <form className='login-form'>
          <input className='username-input'/>
          <input className='password-input'/>
          <div className = 'button-group'>
            <button className='demo-button'>demo</button>
            <button className='login-button' onClick={()=>{handleClick("/home")}} >log in</button>
          </div>
        </form>
      </div>   
      <p>今日もやる気まんまんだよ <img className="marmot-logo" src='/assets/Default.png' alt=''/></p>
    </div>
  )
}

export default LoginPage
