import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useRef, useMemo } from "react";
import useWheels from "./utils/useWheels";
import useVehicleControls from "./utils/useVehicleControls";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import useFollowCam from "./utils/useFollowCam";
import CarBody from "./components/CarBody";
import Wheel from "./components/Wheel";

export default function Car() {
  const { pivot } = useFollowCam();
  const worldPosition = useMemo(() => new Vector3(), []);
  const position = [0, 0.5, 0];

  let width, height, front, mass, wheelRadius;

  width = 0.32;
  height = 0.16;
  front = 0.28;
  mass = 150;
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];

  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      collisionFilterGroup: 5,
      position,
      mass,
      shapes: [
        {
          args: chassisBodyArgs,
          position: [0, 0.07, 0],
          type: "Box",
        },
        {
          args: [width, height * 1.8, front],
          position: [0, height * 1.4, 0],
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

  const makeFollowCam = () => {
    chassisBody?.current.getWorldPosition(worldPosition);
    pivot.position.lerp(worldPosition, 0.9); //비교할 인자,
  };

  useFrame(() => {
    makeFollowCam();
  });

  return (
    <group ref={vehicle}>
      <group ref={chassisBody}>
        <CarBody />
      </group>
      <Wheel wheelRef={wheels[0]} radius={wheelRadius} leftSide={true} />
      <Wheel wheelRef={wheels[1]} radius={wheelRadius} />
      <Wheel wheelRef={wheels[2]} radius={wheelRadius} leftSide={true} />
      <Wheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
