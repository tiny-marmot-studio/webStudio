import { Fragment } from "react";
import "./App.css";
import IMAGES from './Images/index.js';
function App() {
    return (
        <Fragment >
            <div className="background">
                <img src={IMAGES.logo_frame} alt="Logo" className="logo_frame" />
                <button  class="explore-button">E X P L O R E </button>
            </div>
        </Fragment>
    );
}

export default App;
 