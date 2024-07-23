export default function DummyCarBody({ width, height, front }) {
  return (
    <mesh>
      <boxGeometry args={[width, height, front]} />
      <meshBasicMaterial color={"rgba(254,0,63)"} />
    </mesh>
  );
}
