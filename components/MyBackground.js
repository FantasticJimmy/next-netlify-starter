import React, { useRef, useState, useLayoutEffect } from "react";
import { extend, Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture, OrbitControls, useGLTF } from "@react-three/drei";

// Register the THREE namespace as native JSX elements.
// See below for notes on tree-shaking
extend(THREE);

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "green" : "red"} metalness={2} />
    </mesh>
  );
}

export default function MyBackground({ children }) {
  // const { camera, mouse } = useThree();

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        height: "1000px",
        width: "100%",
      }}
    >
      {/* <img src={"/1000004687.JPEG"} /> */}

      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [2, 2, 5] }}>
        <ambientLight />
        <Box position={[0, 2, 0]} />
        <Mario />
        <Sphere url="/romeo-a-9g11WIv0Ias-unsplash.jpg" />
        <OrbitControls />
      </Canvas>
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const Sphere = ({ url }) => {
  const texture = useTexture(url);
  // const texture = useLoader(THREE.DoubleSide, url);

  const sphereRef = useRef();
  useFrame(() => {
    sphereRef.current.rotation.y += 0.001;
  });
  return (
    <mesh ref={sphereRef} visible>
      <sphereGeometry
        // attach="geometry"
        args={[5, 60, 60]}
        // scale={[1, 2, 1]}
      />

      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

const Mario = () => {
  const { scene, materials } = useGLTF("/mario_obj.glb");

  return (
    <primitive
      object={scene}
      position={[0, -1, 0]}
      rotation={[0, 0.6, 0]}
      scale={0.3}
    />
  );
};
