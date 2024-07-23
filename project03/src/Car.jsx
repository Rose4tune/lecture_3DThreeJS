import { useControls } from "leva";
import DummyCarBody from "./dummy/DummyCarBody";
import { useBox } from "@react-three/cannon";

export default function Car() {
  const chassisBodyValue = useControls("chassisBody", {
    width: { value: 0.16, min: 0, max: 1 },
    height: { value: 0.12, min: 0, max: 1 },
    front: { value: 0.17 * 2, min: 0, max: 1 },
  });

  const position = [0, 0.5, 0];

  let width, height, front, mass;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass = 150;

  const chassisBodyArgs = [width, height, front * 2];

  const [chassisBody, chassisApi] = useBox(() => ({
    args: chassisBodyArgs,
    position,
    mass,
  }));

  return (
    <group>
      <group ref={chassisBody}>
        <DummyCarBody
          width={chassisBodyValue.width}
          height={chassisBodyValue.height}
          front={chassisBodyValue.front}
        />
      </group>
    </group>
  );
}
