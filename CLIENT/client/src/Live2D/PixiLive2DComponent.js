import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

const cubismModel1 =
"https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";
const cubismModel2 =
"./Resources/mao_pro_zh/runtime/mao_pro.model3.json";
const cubisModel3 = 
"./Resources/Hiyori/Hiyori.model3.json";
const Live2DComponent = () => {
    useEffect(() => {
        const main = async () => {
            const app = new PIXI.Application({
                view: document.getElementById("live2d"),
                backgroundColor: 0x38dbbd,
                autoStart: true,
                resizeTo: window 
            });
            
        //Set model from json file
        const models = await Promise.all([
            Live2DModel.from(cubismModel1),
            Live2DModel.from(cubismModel2),
            Live2DModel.from(cubisModel3)
        ]);
        
        
        //Add all models to the canvas
        if (typeof window !== 'undefined') {    //avoid error from restriction of innerWidth and Height
            const { innerWidth, innerHeight } = window;
            var numOfModel = 0;
            models.forEach(model => {
            app.stage.addChild(model);
            // Scale the models 
            const scaleX = (innerWidth * 0.4) / model.width;
            const scaleY = (innerHeight * 0.8) / model.height;
            
            // Fit the window
            model.scale.set(Math.min(scaleX, scaleY));
        
            model.y = innerHeight * 0.1;
            model.x = innerWidth*numOfModel/models.length;
            numOfModel+=1;
            //   console.log(innerWidth,numOfModel);
            draggable(model);
            });
        }
            //Handle tapping

            //Model for shizuku
    models[0].on("hit", (hitAreas) => { 
        if (hitAreas.includes("body")) {
            models[0].motion("tap_body");
        console.log("hit body1");
        }
    
        if (hitAreas.includes("head")) {
            models[0].expression();
        console.log("hit head1");
        }
    });
    
    //model for Mao
    models[1].on("hit", (hitareas) => {
        if (hitareas.includes("Body")) {
            models[1].motion("TapBody");
        console.log("hit body");
        }
    
        if (hitareas.includes("head")) {
            models[1].expression();
        console.log("hit head2");
        }
        });
    
    //Model for Hiyori
    models[2].on("hit", (hitareas) => {
        if (hitareas.includes("Body")) {
            models[2].motion("TapBody");
        }
    
        if (hitareas.includes("head")) {
            models[2].expression();
        console.log("hit head2");
        }
    });



        
        };
        main();

    }, []);

    return (
        <canvas id="live2d"></canvas>
    );
};

function draggable(model) {
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
    model.dragging = true;
    model._pointerX = e.data.global.x - model.x;
    model._pointerY = e.data.global.y - model.y;
    });
    model.on("pointermove", (e) => {
    if (model.dragging) {
        model.position.x = e.data.global.x - model._pointerX;
        model.position.y = e.data.global.y - model._pointerY;
    }
    });
    model.on("pointerupoutside", () => (model.dragging = false));
    model.on("pointerup", () => (model.dragging = false));
}

export default Live2DComponent;
