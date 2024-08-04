import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export const MyRoomFurniturePlaceMode = ({ currentPlacingMyRoomFurniture }) => {
  const ref = useRef(null);
  const { scene } = useGLTF(`/models/${currentPlacingMyRoomFurniture}.glb`);

  return (
    <primitive
      visible={true}
      name="placing"
      ref={ref}
      object={scene.clone()}
      scale={[1, 1, 1]}
    />
  );
};
