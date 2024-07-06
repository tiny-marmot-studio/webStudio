import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import "./DemoPage.css";

const Cube = ({ position }) => {
  const { scene } = useGLTF('/Modal/cube.glb');
  return <primitive object={scene} position={position} />;
}

const Ball = ({ position }) => {
  const { scene } = useGLTF('/Modal/ball.glb');
  return <primitive object={scene} position={position} />;
}

const Cylinder = ({ position }) => {
  const { scene } = useGLTF('/Modal/cylinder.glb');
  return <primitive object={scene} position={position} />;
}

const DemoPage = () => {
  const [objects, setObjects] = useState([]);

  const addObject = () => {
    const objectTypes = [Cube, Ball, Cylinder];
    const randomIndex = Math.floor(Math.random() * objectTypes.length);
    const ObjectType = objectTypes[randomIndex];

    const newPosition = [
      Math.random() * 10 - 5, 
      Math.random() * 10 - 5, 
      Math.random() * 10 - 5  
    ];

    setObjects([...objects, { Component: ObjectType, position: newPosition }]);
  };

  return (
    <div className='demo-page'>
      <button onClick={addObject}>Add Object</button>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {objects.map((obj, index) => {
          const { Component, position } = obj;
          return <Component key={index} position={position} />;
        })}

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default DemoPage;
