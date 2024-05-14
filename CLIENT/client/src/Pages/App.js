import React, { Fragment } from 'react';
import "./App.css";
import IMAGES from './Images/index.js';
import Live2DComponent from '../Live2D/PixiLive2DComponent.js';


const App = () => {
    return (
        <Fragment >
            <div className="background">
                <img src={IMAGES.logo_frame} alt="Logo" className="logo_frame" />
                <Live2DComponent class="model"><span></span> /</Live2DComponent>

                <button  class="explore_button"><span>E X P L O R E </span></button>
            </div>
        </Fragment>
    );
};

export default App;
