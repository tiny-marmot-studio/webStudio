import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InfoBlock from "./InfoBlock";
import { useGLTF } from "@react-three/drei";
import "./DemoPage.css";

const $ = require('jquery');

function handleClick(position, setInfos, model_id) {
  get_model_info(model_id,setInfos);
};

function get_model_info(model_id, setInfos) {
  fetch('http://localhost:5000/modelInfo') 
      .then(response => response.json())
      .then(data => {
        //Get the mapped data with the model_id selected
        const mappedData = data.find(item => item.model_id === model_id);
        if (mappedData) { //if we can find the corresponding data
          setInfos({
            user: mappedData.users,
            time: mappedData.created_time,
            comment: mappedData.user_comment
          }); 
        }
      }
      )
      .catch(error => console.error('Error fetching data:', error, "from getting model information"));
}

function get_random_model_id(callback) {
  $.getJSON("http://localhost:5000/modelInfo?queryOption=max-value")
    .done(function(json) {
      const model_id = parseInt(json[0].model_id);  //follow datatype that the first index is the json file
      callback(null, model_id); // Pass model_id to the callback
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      callback(err); // Pass error to the callback
    });
}

function add_model_info(position, setInfos) {
  get_random_model_id(function(err, model_id) {
    if (err) {
      console.log("Error fetching random model ID:", err);
      return;
    }
    const user = `New user ${model_id}`;
    const created_time = new Date().toDateString();
    const user_comment =  `Located at position: ${position}`;

    var settings = {
      "url": "http://localhost:5000/modelInfo",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "model_id": model_id,
        "users": user,
        "created_time": created_time,
        "user_comment": user_comment
      }),
    };
    
    $.ajax(settings).done(function (response) {
      console.log(user);
    });

    setInfos({
      user: user,
      time: created_time,
      comment: user_comment
    }); 
  });
}


const Cube = ({ position, setInfos, model_id }) => {
  const { scene } = useGLTF('/Modal/cube.glb');
  return <primitive object={scene} position={position} model_id={model_id} onClick={() => handleClick(position, setInfos, model_id)} />;
}

const Ball = ({ position, setInfos,model_id }) => {
  const { scene } = useGLTF('/Modal/ball.glb');
  return <primitive object={scene} position={position} model_id={model_id} onClick={() => handleClick(position, setInfos,model_id)}/>;
}

const Cylinder = ({ position, setInfos ,model_id}) => {
  const { scene } = useGLTF('/Modal/cylinder.glb');
  return <primitive object={scene} position={position} model_id={model_id} onClick={() => handleClick(position, setInfos,model_id)} />;
}

const DemoPage = () => {
  const [model_id,setModelID] = useState(0);  //just for testing, delete after
  const [objects, setObjects] = useState([]);
  const [infos, setInfos] = useState({
    user: "",
    time: "",
    comment: ""
  });

  // useEffect(() => {    
  //   get_model_info(model_id,setInfos);
  // }, [model_id]);

  const addObject = () => {
    setModelID(model_id+1);
    const objectTypes = [Cube, Ball, Cylinder];
    const randomIndex = Math.floor(Math.random() * objectTypes.length);
    const ObjectType = objectTypes[randomIndex];

    const newPosition = [
      Math.random() * 10 - 5, 
      Math.random() * 10 - 5, 
      Math.random() * 10 - 5  
    ];

    setObjects([...objects, { Component: ObjectType, position: newPosition, model_id: model_id }]);
    //Update the property of the model to the database and the information blocker
    if (true){
      add_model_info(newPosition,setInfos);
    }
  };

  return (
    <div className='demo-page'>
      <button onClick={addObject}>Add Object</button>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {objects.map((obj, index) => {
          const { Component, position } = obj;
          return <Component key={index} position={position} setInfos={setInfos} model_id = {model_id}/>;
        })}
        <OrbitControls />
      </Canvas>
      <InfoBlock info={infos} />
    </div>
  );
}

export default DemoPage;
