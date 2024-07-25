export default function Picture({ nodes, texture }) {
  return (
    <mesh
      geometry={nodes.picture.geometry}
      position={[0.013, 0.3, 0.21]}
      scale={[-1.755, 0.528, 0.911]}
      rotation={[1.57, Math.PI, 0]}
    >
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
