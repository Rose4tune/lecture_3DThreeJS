import { useEffect, useRef } from "react";
import {
  myRoomSize,
  myRoomSkillBoxSize,
} from "../../../../../../data/constants";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomSkillAtom,
} from "../../../../../../store/PlayersAtom";
import * as THREE from "three";
import gsap from "gsap";
import {
  calculateThreePosition,
  getMyRoomObjects,
} from "../../../../../../utils";
import { socket } from "../../../../../../sockets/clientSocket";

const leftWallVector = new THREE.Vector3(1, 0, 0);
const rightWallVector = new THREE.Vector3(0, 0, 1);
const floorVector = new THREE.Vector3(0, 1, 0);

export const MyRoomSkillPlaceMode = ({ currentPlacingMyRoomSkill }) => {
  const texture = useTexture(
    `/images/skills/${currentPlacingMyRoomSkill}.webp`
  );
  const ref = useRef(null);

  const { scene, gl, camera } = useThree();
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const setCurrentPlacingMyRoomSkill = useSetRecoilState(
    CurrentPlacingMyRoomSkillAtom
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 1;
  texture.repeat.y = 1;

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current.scale, {
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      x: 1.2,
      y: 1.2,
      z: 1.2,
    });

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });
      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const [intersect] = rayCaster
        .intersectObjects(scene.children)
        .filter((item) => item.object.name !== "placing");
      intersect?.normal?.clone();

      // 방안에 배치하기 위함
      let roomTouched = false;
      let xOffset = 0;
      let yOffset = 0;
      let zOffset = 0;
      if (!intersect.normal) return;

      // 현재 rayCaster에 잡힌 첫번째 오브젝트의 법선벡터와 3축의 벡터가 평행하다면 각 축에 맞는 offset을 더해준다.
      if (1 - Math.abs(intersect.normal.clone().dot(floorVector)) < 0.1) {
        roomTouched = true;
        yOffset = myRoomSkillBoxSize / 2 + 0.01;
        if (intersect.point.x < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          xOffset += Math.abs(
            intersect.point.x + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.x > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          xOffset -= Math.abs(
            intersect.point.x - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          zOffset += Math.abs(
            intersect.point.z + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          zOffset -= Math.abs(
            intersect.point.z - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
      }
      if (1 - Math.abs(intersect.normal.clone().dot(leftWallVector)) < 0.1) {
        roomTouched = true;
        xOffset = myRoomSkillBoxSize / 2 + 0.01;
        if (intersect.point.y < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          yOffset += Math.abs(
            intersect.point.y + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.y > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          yOffset -= Math.abs(
            intersect.point.y - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          zOffset += Math.abs(
            intersect.point.z + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          zOffset -= Math.abs(
            intersect.point.z - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
      }
      if (1 - Math.abs(intersect.normal.clone().dot(rightWallVector)) < 0.1) {
        roomTouched = true;
        zOffset = myRoomSkillBoxSize / 2 + 0.01;
        if (intersect.point.x < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          xOffset += Math.abs(
            intersect.point.x + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.x > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          xOffset -= Math.abs(
            intersect.point.x - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.y < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          yOffset += Math.abs(
            intersect.point.y + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.y > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          yOffset -= Math.abs(
            intersect.point.y - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
      }
      if (intersect && roomTouched) {
        ref.current?.position.set(
          intersect.point.x + xOffset,
          intersect.point.y + yOffset,
          intersect.point.z + zOffset
        );
      }
    };

    const handlePointerUp = () => {
      const myRoomObjects = getMyRoomObjects(
        scene,
        `my-room-${currentPlacingMyRoomSkill}`
      );

      socket.emit(
        "myRoomChange",
        {
          objects: [
            ...myRoomObjects,
            {
              name: `my-room-${currentPlacingMyRoomSkill}`,
              position: [
                ref.current.position.x,
                ref.current.position.y,
                ref.current.position.z,
              ],
              rotation: [
                ref.current.rotation.x,
                ref.current.rotation.y,
                ref.current.rotation.z,
              ],
            },
          ],
        },
        currentMyRoomPlayer?.id
      );
      setCurrentPlacingMyRoomSkill(undefined);
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    camera,
    currentMyRoomPlayer?.id,
    currentPlacingMyRoomSkill,
    gl.domElement,
    scene,
    scene.children,
    setCurrentPlacingMyRoomSkill,
    texture,
  ]);

  return (
    <mesh name="placing" ref={ref}>
      <boxGeometry
        args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]}
      />
      <meshStandardMaterial map={texture.clone()} />
    </mesh>
  );
};
