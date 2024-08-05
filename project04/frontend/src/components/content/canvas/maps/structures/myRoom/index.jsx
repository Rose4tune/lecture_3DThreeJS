import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomFurnitureAtom,
  CurrentPlacingMyRoomMemoAtom,
  CurrentPlacingMyRoomSkillAtom,
} from "../../../../../../store/PlayersAtom";
import { useRecoilValue } from "recoil";
import { MyRoomSkillPlaceMode } from "../../../../canvasLayout/UserInterfaces/myRoom/placeMode/MyRoomSkillPlaceMode";
import { MyRoomFurniturePlaceMode } from "../../../../canvasLayout/UserInterfaces/myRoom/placeMode/MyRoomFurniturePlaceMode";
import { MyRoomMemoPlaceMode } from "../../../../canvasLayout/UserInterfaces/myRoom/placeMode/MyRoomMemoPlaceMode";
import { MyRoomElements } from "./elements";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const currentPlacingMyRoomFurniture = useRecoilValue(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);

  return (
    <>
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return <MyRoomElements key={object.name} object={object} />;
      })}
      <directionalLight
        castShadow
        intensity={1}
        position={[0, 20, 20]}
        shadow-camera-bias={1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <spotLight castShadow intensity={10} position={[-1, 10, -1]} />

      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />

      {currentPlacingMyRoomSkill && (
        <MyRoomSkillPlaceMode
          currentPlacingMyRoomSkill={currentPlacingMyRoomSkill}
        />
      )}
      {currentPlacingMyRoomFurniture && (
        <MyRoomFurniturePlaceMode
          currentPlacingMyRoomFurniture={currentPlacingMyRoomFurniture}
        />
      )}
      {currentPlacingMyRoomMemo && <MyRoomMemoPlaceMode />}
    </>
  );
};
