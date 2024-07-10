import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'  // Import THREE from 'three'
import "./DemoPage.css"

extend({ OrbitControls: ThreeOrbitControls })

const Model = ({ url }) => {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(0, 0, 0)  // Set model position here
      modelRef.current.rotation.set(0, 0, 0)  // Fix model rotation
      console.log('Model Position:', modelRef.current.position)
      console.log('Model Rotation:', modelRef.current.rotation)
    }
  }, [])

  return <primitive ref={modelRef} object={scene} />
}

const CameraLogger = () => {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(20.8275, 2.4121, 19.4515)  // Set camera position here
    camera.lookAt(0, 0, 0)  // Ensure the camera is looking at the model
    console.log('Camera Position:', camera.position)
  }, [camera])

  return null
}

const Controls = () => {
  const { camera, gl } = useThree()
  const controlsRef = useRef()

  useFrame(() => {
    if (controlsRef.current) {
      const { target } = controlsRef.current
      target.x = Math.max(-5, Math.min(5, target.x))
      target.y = Math.max(-5, Math.min(5, target.y))
      target.z = Math.max(-5, Math.min(5, target.z))
      controlsRef.current.update()
    }
  })

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableRotate={false}
      minDistance={10}
      maxDistance={30.105333730318456}
      enablePan={true}
    />
  )
}

const DemoMountain = () => {
  return (
    <div className='demo-page'>
      <Canvas
        camera={{ position: [20.8275, 2.4121, 19.4515], fov: 75 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2(0xaabbcc, 0.02)  // Add fog with color and density
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.8} position={[5, 10, 7]} />
        <pointLight intensity={0.5} position={[-5, -10, -10]} />
        <Suspense fallback={null}>
          <Model url="/Modal/island01.glb" />
        </Suspense>
        <CameraLogger />
        <Controls />
      </Canvas>
    </div>
  )
}

export default DemoMountain
