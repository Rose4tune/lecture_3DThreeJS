import { useEffect, useState } from "react";

export default function useVehicleControls(vehicleApi, chassisApi) {
  const [controls, setControls] = useState({});

  useEffect(() => {
    const KeyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key]: true,
      }));
      // console.log("down:", e);
    };
    const KeyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key]: false,
      }));
      // console.log("up:", e);
    };

    window.addEventListener("keydown", KeyDownPressHandler);
    window.addEventListener("keyup", KeyUpPressHandler);

    return () => {
      window.removeEventListener("keydown", KeyDownPressHandler);
      window.removeEventListener("keyup", KeyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (controls.ArrowUp) {
      vehicleApi.applyEngineForce(120, 2);
      vehicleApi.applyEngineForce(120, 3);
    } else if (controls.ArrowDown) {
      vehicleApi.applyEngineForce(-120, 2);
      vehicleApi.applyEngineForce(-120, 3);
    } else if (controls.Enter) {
      vehicleApi.setBrake(1, 2);
      vehicleApi.setBrake(1, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.ArrowLeft) {
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
    } else if (controls.ArrowRight) {
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}
