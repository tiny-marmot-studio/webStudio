import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InfoBlock from "./InfoBlock";
import { useGLTF } from "@react-three/drei";
import "./DemoPage.css";

const $ = require('jquery');
let modelID;

// Cache for GLTF objects
const gltfCache = new Map();

function useCachedGLTF(path) {
  const result = useGLTF(path);

  // Store the result in the cache if not already cached
  if (!gltfCache.has(path)) {
    gltfCache.set(path, result);
  }

  return gltfCache.get(path);
}

function handleClick(position, setInfos, model_id) {
  get_model_info(model_id, setInfos);
}

function get_model_info(model_id, setInfos) {
  fetch('http://localhost:5000/modelInfo')
    .then(response => response.json())
    .then(data => {
      const mappedData = data.find(item => item.model_id === model_id);
      if (mappedData) {
        setInfos({
          user: mappedData.users,
          time: mappedData.created_time,
          comment: mappedData.user_comment
        });
      }
    })
    .catch(error => console.error('Error fetching data:', error, "from getting model information"));
}

function get_next_model_id(callback) {
  $.getJSON("http://localhost:5000/modelInfo?queryOption=max-value")
    .done(function(json) {
      const model_id = parseInt(json[0].model_id);
      callback(null, model_id);
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      callback(err);
    });
}

function add_model_info(position, setInfos) {
  get_next_model_id(function(err, model_id) {
    if (err) {
      console.log("Error fetching next model ID:", err);
      return;
    }
    const user = `New user ${model_id}`;
    const created_time = new Date().toDateString();
    const user_comment = `Located at position: ${position}`;

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
  const { scene } = useCachedGLTF('/Modal/cube.glb');
  const clonedScene = scene.clone();
  useEffect(() => {
    console.log(`Cube loaded at position: ${position} with model_id: ${model_id}`);
  }, [clonedScene]);
  return <primitive object={clonedScene} position={position} onClick={() => handleClick(position, setInfos, model_id)} />;
}

const Ball = ({ position, setInfos, model_id }) => {
  const { scene } = useCachedGLTF('/Modal/ball.glb');
  const clonedScene = scene.clone();
  useEffect(() => {
    console.log(`Ball loaded at position: ${position} with model_id: ${model_id}`);
  }, [clonedScene]);
  return <primitive object={clonedScene} position={position} onClick={() => handleClick(position, setInfos, model_id)} />;
}

const Cylinder = ({ position, setInfos, model_id }) => {
  const { scene } = useCachedGLTF('/Modal/cylinder.glb');
  const clonedScene = scene.clone();
  useEffect(() => {
    console.log(`Cylinder loaded at position: ${position} with model_id: ${model_id}`);
  }, [clonedScene]);
  return <primitive object={clonedScene} position={position} onClick={() => handleClick(position, setInfos, model_id)} />;
}

const Donuts = ({ position, setInfos, model_id }) => {
  const { scene } = useCachedGLTF('/Modal/donuts.glb');
  const clonedScene = scene.clone();
  useEffect(() => {
    console.log(`Donuts loaded at position: ${position} with model_id: ${model_id}`);
  }, [clonedScene]);
  return <primitive object={clonedScene} position={position} onClick={() => handleClick(position, setInfos, model_id)} />;
}

const DemoPage = () => {
  const [objects, setObjects] = useState([]);
  const [infos, setInfos] = useState({
    user: "",
    time: "",
    comment: ""
  });

  const addObject = () => {
    const objectTypes = [Cube, Ball, Cylinder, Donuts];
    const randomIndex = Math.floor(Math.random() * objectTypes.length);
    const ObjectType = objectTypes[randomIndex];

    const newPosition = [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ];

    get_next_model_id(function(err, model_id) {
      if (err) {
        console.log("Error fetching next model ID:", err);
        return;
      }
      modelID = model_id;
      const newModelID = model_id; // Ensure uniqueness
      console.log("ID is:", newModelID);
      const newObject = { Component: ObjectType, position: newPosition, model_id: newModelID };
  
      setObjects([...objects, newObject]); // Directly update the state
      console.log('Updated Objects:', [...objects, newObject]);
  
      add_model_info(newPosition, setInfos);  
    });
      console.log("MODELID:",modelID);
  };

  useEffect(() => {
    console.log('Rendered Objects:', objects);
  }, [objects]);

  return (
    <div className='demo-page'>
      <button onClick={addObject}>Add Object</button>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 1000000 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} />

        {objects.map((obj, index) => {
          const { Component, position, model_id } = obj;
          return <Component key={`object-${index}-${model_id}`} position={position} setInfos={setInfos} model_id={model_id} />;
        })}
        <OrbitControls />
      </Canvas>
      <InfoBlock info={infos} />
    </div>
  );
}

export default DemoPage;
