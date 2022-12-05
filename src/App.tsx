import { createRoot } from "react-dom/client";
import React, { FC, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { createTextTexture } from "./lib/createTextTexture";
import { useTexture } from "@react-three/drei";

const User: FC<{name: string, position: number[]}> = (props) => {
  const { name, position } = props;
  
  const mesh = useRef();
  const texture = useTexture(createTextTexture({text: name}));

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return <mesh
    ref={mesh}
    // scale={active ? 1.5 : 1}
    position={position}
    // onClick={(event) => setActive(!active)}
    // onPointerOver={(event) => setHover(true)}
    // onPointerOut={(event) => setHover(false)}
  >
    <boxGeometry args={[1, 1, 1]} />
    {/* add texture */}
    <meshBasicMaterial map={texture} />
  </mesh>
}

function Users() {
  // This reference will give us direct access to the mesh
  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  const users = useMemo(() => {
    return [
      {
        name: "Brendan",
        position: [0, 1.5, 0],
      },
      {
        name: "Vivian",
        position: [0, -1.5, 0],
      },
      {
        name: "Bes",
        position: [0, 0, 0],
      },
      {
        name: "Georg",
        position: [1.5, 0, 0],
      },
      {
        name: "Ticia",
        position: [-1.5, 0, 0],
      },
    ];
  }, []);

  console.log(users);

  return (
    <>
      {users.map((user) => (
        <User key={user.name} {...user} />
      ))}
    </>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Users />
    </Canvas>
  );
}

export default App;
