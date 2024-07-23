import { useBox } from "@react-three/cannon";

export default function DummyBox(props) {
  const { args } = props;
  const [ref] = useBox(() => ({
    args,
    mass: 10,
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={"blue"} transparent opacity={0.5} />
    </mesh>
  );
}
