import { FC, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { createTextTexture } from "./lib/createTextTexture";
import { useTexture } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

const User: FC<{name: string, position: [x: number, y: number, z: number]}> = (props) => {
  const { name, position } = props;
  
  // const mesh = useRef<MeshLine>();
  const [ref] = useBox(() => ({ mass: 1, rotation: [0.4, 0.2, 0.5], position: props.position }))
  const texture = useTexture(createTextTexture({text: name}));

  // useFrame(() => {
  //   mesh.current.rotation.x += 0.01;
  //   mesh.current.rotation.y += 0.01;
  // });

  return <mesh
    receiveShadow castShadow
    ref={ref}
    // scale={active ? 1.5 : 1}
    position={position}
    // onClick={(event) => setActive(!active)}
    // onPointerOver={(event) => setHover(true)}
    // onPointerOut={(event) => setHover(false)}
  >
    <boxGeometry args={[1, 1, 1]} />
    {/* add texture */}
    <meshLambertMaterial map={texture} />
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
    const u: {
      name: String;
      position: [x: number, y: number, z: number];
    }[] = [
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
    return u;
  }, []);


  return (
    <>
      {users.map((user: any) => (
        <User key={user.name} {...user} />
      ))}
    </>
  );
}

function Plane(props: any) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  )
}
// function Cube(props: any) {
//   const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
//   return (
//     <mesh receiveShadow castShadow ref={ref}>
//       <boxGeometry />
//       <meshLambertMaterial color="hotpink" />
//     </mesh>
//   )
// }

function App() {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }} camera={{ position: [-1, 5, 5], fov: 45 }}>
    <color attach="background" args={['lightblue']} />

      {/* <ambientLight /> */}
      <ambientLight />
      <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />

      <Physics>
      <Plane position={[0, -2.5, 0]} />
      <Users />
      </Physics>
    </Canvas>
  );
}

export default App;
