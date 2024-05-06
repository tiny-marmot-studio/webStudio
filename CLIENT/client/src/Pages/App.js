import { Fragment } from "react";
import "./App.css";
import IMAGES from './Images/index.js';

function App() {
    return (
        <Fragment >
            <div className="background">
                <img src={IMAGES.logo_frame} alt="Logo" className="logo_frame" />
                <button  class="explore_button"><span>E X P L O R E </span></button>

            </div>
        </Fragment>
    );
}

export default App;
 