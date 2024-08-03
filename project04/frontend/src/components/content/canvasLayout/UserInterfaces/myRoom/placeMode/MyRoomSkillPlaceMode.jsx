import { useRef } from "react";
import { myRoomSkillBoxSize } from "../../../../../../data/constants";
import { useTexture } from "@react-three/drei";

export const MyRoomSkillPlaceMode = ({ currentPlacingMyRoomSkill }) => {
  const texture = useTexture(
    `/images/skills/${currentPlacingMyRoomSkill}.webp`
  );
  const ref = useRef(null);

  return (
    <mesh name="placing" ref={ref}>
      <boxGeometry
        args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]}
      />
      <meshStandardMaterial map={texture.clone()} />
    </mesh>
  );
};
