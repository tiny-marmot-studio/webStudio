import React from 'react'
import "./HomePage.css"
import DragDrop from '../../features/DragDrop'
const HomePage = () => {
    const card = DragDrop(document.getElementById('card'))
    
    return (
    <div className='home-page'>
        <div id="card"></div>
    </div>
    )
}

export default HomePage
