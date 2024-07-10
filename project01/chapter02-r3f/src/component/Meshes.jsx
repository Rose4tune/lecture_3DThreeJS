import { Box, Circle, Cone, Cylinder, Plane, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const Meshes = () => {
  return (
    <>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>
    </>
  )
}
