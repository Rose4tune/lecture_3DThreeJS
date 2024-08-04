import { useRecoilValue } from "recoil";
import {
  CurrentMyRoomPlayerAtom,
  MeAtom,
} from "../../../../../../../store/PlayersAtom";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export const MyRoomPlacedFurniture = ({ placedMyRoomFurniture }) => {
  const me = useRecoilValue(MeAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const three = useThree();
  const { scene } = useGLTF(`/models/${placedMyRoomFurniture.name}.glb`);
  const [outlineMeshInfo, setOutlineMeshInfo] = useState(undefined);

  return (
    <>
      <primitive
        name={`my-room-${placedMyRoomFurniture.name}`}
        object={scene.clone()}
        position={placedMyRoomFurniture.position}
        rotation={placedMyRoomFurniture.rotation}
      />

      {/* {outlineMeshInfo && (
        <mesh
          position={outlineMeshInfo.position}
          rotation={placedMyRoomFurniture.rotation}
        >
          <boxGeometry
            args={[
              outlineMeshInfo.width * 1.1,
              outlineMeshInfo.height * 1.1,
              outlineMeshInfo.depth * 1.1,
            ]}
          />
          <meshStandardMaterial transparent color={"lime"} opacity={0.4} />
        </mesh>
      )} */}
    </>
  );
};
