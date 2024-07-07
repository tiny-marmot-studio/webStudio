import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InfoBlock from "./InfoBlock";
import { useGLTF } from "@react-three/drei";
import "./DemoPage.css";

function handleClick(position, setInfos) {
  console.log(position);
  setInfos({
    user: "jimmy",
    time: new Date().toLocaleTimeString(), // Example of dynamic time
    comment: `Clicked at position: ${position}`
  });
};

function add_model_info() {
  const newData = {
    "model_id": 10,
    "users": "1111",
    "created_time": "2000-01-01",
    "user_comment": "jini taimei"
  };

  fetch('http://localhost:5000/modelInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  .then(response => {
    console.log(response);
    response.json()})
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error adding model info:', error);
  });
}


const Cube = ({ position, setInfos }) => {
  const { scene } = useGLTF('/Modal/cube.glb');
  return <primitive object={scene} position={position} onClick={() => handleClick(position, setInfos)} />;
}

const Ball = ({ position, setInfos }) => {
  const { scene } = useGLTF('/Modal/ball.glb');
  return <primitive object={scene} position={position} onClick={() => handleClick(position, setInfos)}/>;
}

const Cylinder = ({ position, setInfos }) => {
  const { scene } = useGLTF('/Modal/cylinder.glb');
  return <primitive object={scene} position={position} onClick={() => handleClick(position, setInfos)} />;
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

    setObjects([...objects, { Component: ObjectType, position: newPosition }]);
    //Update the property of the model to the database and the information blocker
    add_model_info();
    setInfos({
      user: "new_user",
      time: new Date().toLocaleTimeString(), // Example of dynamic time
      comment: `Clicked at position: ${newPosition}`
    });
  };

  return (
    <div className='demo-page'>
      <button onClick={addObject}>Add Object</button>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {objects.map((obj, index) => {
          const { Component, position } = obj;
          return <Component key={index} position={position} setInfos={setInfos} />;
        })}
        <OrbitControls />
      </Canvas>
      <InfoBlock info={infos} />
    </div>
  );
}

export default DemoPage;
