import React from 'react'
import "./LoginPage.css"
const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className='login-panel'>
        <div className='greeting'> 
          <h1>Welcome Jimyy</h1>
          <h2>ご主人様 </h2>
          {/* <h3>ご主人様 </h3>
          <p>今日もやる気まんまんだよ</p> */}
        </div>
        <form className='login-form'>
          <input className='username-input'/>
          <input className='password-input'/>
          <div className = 'button-group'>
            <button className='demo-button'>demo</button>
            <button className='login-button'>log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
