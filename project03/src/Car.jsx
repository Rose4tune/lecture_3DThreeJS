import { useControls } from "leva";
import DummyCarBody from "./dummy/DummyCarBody";
import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useRef } from "react";
import useWheels from "./utils/useWheels";
import DummyWheel from "./dummy/DummyWheel";
import useVehicleControls from "./utils/useVehicleControls";

export default function Car() {
  const chassisBodyValue = useControls("chassisBody", {
    width: { value: 0.16, min: 0, max: 1 },
    height: { value: 0.12, min: 0, max: 1 },
    front: { value: 0.17 * 2, min: 0, max: 1 },
  });

  const position = [0, 0.5, 0];

  let width, height, front, mass, wheelRadius;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass = 150;
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];

  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      position,
      mass,
      shapes: [
        {
          args: chassisBodyArgs,
          position: [0, 0, 0],
          type: "Box",
        },
        {
          args: [width, height, front],
          position: [0, height, 0],
          type: "Box",
        },
      ],
      rotation: [0, Math.PI, 0],
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useVehicleControls(vehicleApi, chassisApi);

  return (
    <group ref={vehicle}>
      <group ref={chassisBody}>
        <DummyCarBody
          width={chassisBodyValue.width}
          height={chassisBodyValue.height}
          front={chassisBodyValue.front}
        />
      </group>
      <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
