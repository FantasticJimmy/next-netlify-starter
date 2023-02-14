import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { extend, Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture, OrbitControls, useGLTF } from "@react-three/drei";
import { Physics, usePlane, useTrimesh, useBox } from "@react-three/cannon";
import { InstancedRigidBodies } from "@react-three/rapier";
import { useSpring, animated } from "@react-spring/three";
import { Mario } from "./Mario";

// Register the THREE namespace as native JSX elements.
// See below for notes on tree-shaking
extend(THREE);

function Plane(props) {
  const [ref] = usePlane(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      ...props,
    }),
    useRef()
  );
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial attach="material" opacity={0.1} transparent />
    </mesh>
  );
}

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
      <meshStandardMaterial color={hovered ? "green " : "red"} metalness={2} />
    </mesh>
  );
}

export default function MyBackground({ children }) {
  // const { camera, mouse } = useThree();
  const [boxUuid, setBoxUuid] = useState(null);
  const [touched, setTouched] = useState(false);
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

      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 1, 5] }}>
        <ambientLight />
        <MarioStar touched={touched} setTouched={setTouched} />
        <Physics gravity={[0, -10, 0]}>
          <MarioBox
            setBoxUuid={setBoxUuid}
            touched={touched}
            setTouched={setTouched}
          />
          <Mario scale={0.2} boxUuid={boxUuid} setTouched={setTouched} />
          <Plane position={[0, -4, 0]} />
        </Physics>
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

const MarioStar = (props) => {
  const { scene } = useGLTF("/mario_star/scene.gltf");
  const startModel = useRef();
  const { scale, position } = useSpring({
    scale: props.touched ? 1 : 0.1,
    position: props.touched ? [0, 8, 0] : [0, 2, 0],
    config: {
      friction: 10,
      duration: 1000,
    },
    onRest: () => {
      console.log("rest");
      props.setTouched(false);
    },
  });
  console.log(props.touched);
  useFrame(() => {
    startModel.current.rotation.y += 0.1;
  }, [props.touched]);

  return (
    <group ref={startModel}>
      <animated.primitive
        object={scene}
        scale={scale}
        position={position}
        // translate={[0, 0, 0]}
        // mass={0}
      />
    </group>
  );
};

const MarioBox = (props) => {
  const { scene, nodes } = useGLTF("/mario-box.glb");
  const [ref] = useBox(
    () => ({
      args: [1, 1, 1],
      mass: 1,
      position: [0, 2, 0],
      type: "Static",
    }),
    useRef()
  );

  const model = useRef();

  useEffect(() => {
    if (scene.uuid) {
      props.setBoxUuid(scene.uuid);
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (props.touched) {
      model.current.position.y += 0.2;
      // ref.current.position.y += 0.1;
    } else if (model.current.position.y >= 0) {
      model.current.position.y -= 0.2;
    }
  });

  return (
    <group ref={model}>
      <primitive object={scene} scale={1} ref={ref} />
    </group>
  );
};
