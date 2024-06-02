import React from 'react'
import "./HomePage.css"
const HomePage = () => {
  
    return (
    <div className='home-page'>
        <div className='header'>
                Exit
        </div >
        <div className='panel'>
            <div className='left-panel'>
                <div className='time-greeting'>
                    <h1>
                        Good Morning
                    </h1>
                </div>
                <div className='communicating'>
                    <h1>
                        How can I assist you today?
                    </h1>
                    <div className='divider'/>
                </div>
                <div className='working-reminder'>
                    <div className='square-point'/>
                    <h1>今日事宜</h1>
                </div>
                <div className='personal-reminder'>
                    <div className='square-point'/>
                    <h1>个人事宜</h1>
                </div>
            </div>
            <div className='middle-panel'>
                <img src = "/assets/Logo.png" alt=''></img>
                    <canvas>
                        {/* HERE IS CANVAS!!!!!!!! */}
                    </canvas>
            </div>
            <div className='right-panel'>
                <div className='time-clock'>
                    <h1>
                        12：30：00 
                    </h1>
                    
                </div>
                <div className='weather-panel'>
                    <h1>
                    土曜日 snowing -5c, 12c
                    </h1>
                    
                    <div className='divider'/>
                </div>
                <div className='notification'>
                    <div className='square-point'/>
                    <h1>今日信息</h1>
                </div>

            </div>
        </div>
        <div className='footer'>
            Tools Bar
        </div>
    </div>
    )
}

export default HomePage
