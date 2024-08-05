import { useRecoilValue } from "recoil";
import { Circle } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
  CurrentMyRoomPlayerAtom,
  CurrentRotationAtom,
  CurrentRotationingMyRoomObjectAtom,
} from "../../../../../../store/PlayersAtom";
import { getMyRoomObjects } from "../../../../../../utils";
import { socket } from "../../../../../../sockets/clientSocket";
import { myRoomSize } from "../../../../../../data/constants";

export const MyRoomFurnitureRotationMode = () => {
  const three = useThree();
  const anchorRef = useRef(null);

  const currentRotationingMyRoomObject = useRecoilValue(
    CurrentRotationingMyRoomObjectAtom
  );
  const currentRotation = useRecoilValue(CurrentRotationAtom);
  const [currentTarget, setCurrentTarget] = useState(undefined);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);

  useEffect(() => {
    if (!currentRotationingMyRoomObject) return;
    const target = three.scene.getObjectByName(
      `my-room-${currentRotationingMyRoomObject}`
    );

    if (!target) return;
    setCurrentTarget(target);
  }, [currentRotationingMyRoomObject, currentTarget, three.scene]);

  useEffect(() => {
    const target = three.scene.getObjectByName(
      `my-room-${currentRotationingMyRoomObject}`
    );

    if (target && currentRotation !== undefined) {
      target.rotation.y = currentRotation;
      const currentObject = three.scene
        .getObjectByName(`my-room-${currentRotationingMyRoomObject}`)
        ?.clone();
      const myRoomObjects = getMyRoomObjects(
        three.scene,
        `my-room-${currentRotationingMyRoomObject}`
      );

      socket.emit(
        "myRoomChange",
        {
          objects: [
            ...myRoomObjects,
            {
              name: `my-room-${currentRotationingMyRoomObject}`,
              position: [
                currentObject?.position.x ?? 0,
                currentObject?.position.y ?? 0,
                currentObject?.position.z ?? 0,
              ],
              rotation: [0, target.rotation.y, 0],
            },
          ],
        },
        currentMyRoomPlayer?.id
      );
    }
  }, [
    currentMyRoomPlayer?.id,
    currentRotation,
    currentRotationingMyRoomObject,
    three.scene,
  ]);

  if (currentTarget) {
    return (
      <>
        <Circle
          name="outer-circle"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.1}
          rotation-x={-Math.PI / 2}
          args={[1.5]}
        >
          <meshStandardMaterial transparent color={0xffffff} opacity={0.9} />
        </Circle>

        <Circle
          name="inner-circle"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.2}
          rotation-x={-Math.PI / 2}
          args={[1]}
        >
          <meshStandardMaterial transparent color={"aqua"} opacity={0.9} />
        </Circle>

        <Circle
          ref={anchorRef}
          name="anchor"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.15}
          rotation-x={-Math.PI / 2}
          args={[1.5, 32, (currentRotation ?? 0) - Math.PI / 8, Math.PI / 4]}
        >
          <meshStandardMaterial transparent color={"skyblue"} opacity={0.9} />
        </Circle>
      </>
    );
  }
  return null;
};
