import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as THREE from "three";
import {
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomFurnitureAtom,
} from "../../../../../../store/PlayersAtom";
import gsap from "gsap";
import { calculateThreePosition } from "../../../../../../utils";
import { myRoomSize } from "../../../../../../data/constants";

const leftWallVector = new THREE.Vector3(1, 0, 0);
const rightWallVector = new THREE.Vector3(0, 0, 1);
const floorVector = new THREE.Vector3(0, 1, 0);
const positionVector = new THREE.Vector3();

export const MyRoomFurniturePlaceMode = ({ currentPlacingMyRoomFurniture }) => {
  const ref = useRef(null);

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const setCurrentPlacingMyRoomFurniture = useSetRecoilState(
    CurrentPlacingMyRoomFurnitureAtom
  );

  const { scene } = useGLTF(`/models/${currentPlacingMyRoomFurniture}.glb`);
  const { scene: threeScene, gl, camera } = useThree();

  const currentObject = threeScene
    .getObjectByName(`my-room-${currentPlacingMyRoomFurniture}`)
    ?.clone();

  useEffect(() => {
    if (!ref.current) return;
    if (!scene) return;

    gsap.to(ref.current.scale, {
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      x: 1.1,
      y: 1.1,
      z: 1.1,
    });

    scene.traverse((obj) => {
      obj.userData.placing = true;
      if (obj.isMesh) {
        obj.geometry.computeBoundingBox();
      }
    });

    // 가구별 크기 계산
    const boundingBox = new THREE.Box3().setFromObject(scene);

    const handlePointerMove = (e) => {
      if (!ref.current) return;
      ref.current.visible = true;

      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });

      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const intersects = rayCaster
        .intersectObjects(threeScene.children)
        .filter((item) =>
          ["my-room-floor", "my-room-left-wall", "my-room-right-wall"].includes(
            item.object.name
          )
        );
      const intersect = intersects[0];

      let roomTouched = false;
      let xOffset = 0;
      const yOffset = -myRoomSize / 2 - boundingBox.min.y;
      let zOffset = 0;
      if (!intersect.normal) return;

      const width = boundingBox.max.x - boundingBox.min.x;
      const depth = boundingBox.max.z - boundingBox.min.z;

      // 현재 rayCaster에 잡힌 첫번째 오브젝트의 법선벡터와 3축의 벡터가 평행하다면 각 축에 맞는 offset을 더해준다.
      if (
        1 - Math.abs(intersect.normal.clone().dot(floorVector)) < 0.1 &&
        intersect.object.name === "my-room-floor"
      ) {
        roomTouched = true;
        if (intersect.point.x < -(myRoomSize / 2 - width / 2)) {
          xOffset += Math.abs(intersect.point.x + (myRoomSize / 2 + width / 2));
        }
        if (intersect.point.x > myRoomSize / 2 + width / 2) {
          xOffset -= Math.abs(intersect.point.x - (myRoomSize / 2 + width / 2));
        }
        if (intersect.point.z < -(myRoomSize / 2 - depth / 2)) {
          zOffset += Math.abs(intersect.point.z + (myRoomSize / 2 + depth / 2));
        }
        if (intersect.point.z > myRoomSize / 2 + depth / 2) {
          zOffset -= Math.abs(intersect.point.z - (myRoomSize / 2 + depth / 2));
        }
      } else if (
        1 - Math.abs(intersect.normal.clone().dot(leftWallVector)) < 0.1 &&
        intersect.object.name === "my-room-left-wall"
      ) {
        roomTouched = true;
        xOffset += Math.abs(intersect.point.x + (myRoomSize / 2 + width / 2));
      } else if (
        1 - Math.abs(intersect.normal.clone().dot(rightWallVector)) < 0.1 &&
        intersect.object.name === "my-room-right-wall"
      ) {
        roomTouched = true;
        zOffset += Math.abs(intersect.point.z + (myRoomSize / 2 + depth / 2));
      }

      if (intersect && roomTouched) {
        ref.current?.position.set(
          intersect.point.x + xOffset,
          yOffset,
          intersect.point.z + zOffset
        );

        ref.current?.rotation.set(0, currentObject?.rotation.y ?? 0, 0);
        positionVector.copy(ref.current?.position.clone());
      }
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

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
