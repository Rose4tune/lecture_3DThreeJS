import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import { Color } from "three";
import { Meshes } from "./Meshes";
import { Lights } from "./Lights";
import { Controls } from "./Controls";
import * as THREE from "three";

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{antialias: true}}
      shadows={{
        enabled: true,
        type: THREE.PCFShadowMap
      }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5]
      }}
      scene={{
        background: new Color(0x000000)
      }}
    >
      <Physics
        gravity={[0, -9, 0]} //힘 작용 방향 (아래쪽)
        defaultContactMaterial={{
          restitution: 0.1,
          friction: 1
        }}
      >
        <Lights/>
        <Meshes/>
      </Physics>
      <Controls/>
    </Canvas>
  )
}
