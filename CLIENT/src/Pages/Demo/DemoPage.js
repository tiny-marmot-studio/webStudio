import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InfoBlock from "./InfoBlock";
import { useGLTF } from "@react-three/drei";
import "./DemoPage.css";

const $ = require('jquery');
function handleClick(position, setInfos, model_id) {
  console.log(model_id);
  get_model_info(model_id,setInfos);
  // setInfos({
  //   user: "jimmy",
  //   time: new Date().toLocaleTimeString(), // Example of dynamic time
  //   comment: `Clicked at position: ${position}`
  // });
};

function get_model_info(model_id, setInfos) {
  fetch('http://localhost:5000/modelInfo') // Adjust the URL if needed
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of objects, you might need to adjust based on actual data structure
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
      .catch(error => console.error('Error fetching data:', error));
}

function add_model_info() {
  const newData = {
    "model_id": 10,
    "users": "1111",
    "created_time": "2000-01-01",
    "user_comment": "jini taimei"
  };

  var settings = {
    "url": "http://localhost:5000/modelInfo",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "model_id": 3,
      "users": "5ege",
      "created_time": "2000-01-01",
      "user_comment": "jini taimei"
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
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

  useEffect(() => {
    get_model_info(model_id,setInfos);
  }, [model_id]);

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
    if (false){
      add_model_info();
    }
    // setInfos({
    //   user: "new_user",
    //   time: new Date().toLocaleTimeString(), // Example of dynamic time
    //   comment: `Clicked at position: ${newPosition}`
    // });
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
