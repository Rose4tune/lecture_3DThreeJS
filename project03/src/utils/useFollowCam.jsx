import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { CameraHelper, Object3D } from "three";

export default function useFollowCam() {
  const { scene, camera } = useThree();
  const pivot = useMemo(() => new Object3D(), []);

  const makeCamera = () => {
    camera.position.set(1, 2, 3.5);
    camera.rotation.x = -0.5;

    pivot.add(camera);
    scene.add(pivot);

    // const helper = new CameraHelper(camera);
    // scene.add(helper);
  };

  useEffect(() => {
    makeCamera();
  }, []);

  return { pivot };
}
