import { useRecoilState, useRecoilValue } from "recoil";
import { GunHand } from "./elements/GunHand";
import { MiniGameFloor } from "./elements/MiniGameFloor";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CurrentMapAtom,
  HitCountAtom,
  IsMiniGameClearedAtom,
  IsMiniGameStartedAtom,
} from "../../../../../../store/PlayersAtom";
import { PointerLockControls } from "@react-three/drei";
import { Color, Quaternion, Vector3 } from "three";
import { TargetMesh } from "./elements/TargetMesh";

const COOL_TIME = 2000;
let movement = { forward: false, backward: false, left: false, right: false };

export const MiniGame = () => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  const three = useThree();
  const spotLightRef = useRef(null);
  const ref = useRef(null);

  const [isMiniGameStarted, setIsMiniGameStarted] = useRecoilState(
    IsMiniGameStartedAtom
  );
  const [isMiniGameCleared, setIsMiniGameCleared] = useRecoilState(
    IsMiniGameClearedAtom
  );
  const [hitCount, setHitCount] = useRecoilState(HitCountAtom);

  const [isBouncing, setIsBouncing] = useState(false); //총기 반동
  const [isShooting, setIsShooting] = useState(false);
  const gunHand = three.scene.getObjectByName("gunHand");

  const randomShapes = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(() => {
          return new Vector3(
            Math.random() - 0.5 + 1,
            Math.random() - 0.5 + 1,
            Math.random() - 0.5 + 1
          );
        }),
    [isMiniGameCleared]
  );

  const randomPositions = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(() => {
          return new Vector3(
            (Math.random() - 0.5) * 30,
            2,
            (Math.random() - 0.5) * 30
          );
        }),
    [isMiniGameCleared]
  );

  const randomColors = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            Number(`0x${Math.floor(Math.random() * 16777000).toString(16)}`),
          -10
        ),
    []
  );

  // 게임 시작, 끝
  useEffect(() => {
    three.scene.background = new Color(0x000000);

    return () => {
      three.scene.background = new Color(0xffffff);
      setIsMiniGameStarted(false);
      setIsMiniGameCleared(false);
    };
  }, [three.scene.background, setIsMiniGameStarted, setIsMiniGameCleared]);

  // 게임 조명
  useEffect(() => {
    if (!spotLightRef.current) return;
    spotLightRef.current.lookAt(0, 0, 0);
  }, []);

  // 총기 반동
  useEffect(() => {
    const isBouncingTimeout = setTimeout(() => {
      setIsBouncing(false);
    }, 100);

    const isShootingTimeout = setTimeout(() => {
      setIsShooting(false);
    }, COOL_TIME);

    return () => {
      clearTimeout(isBouncingTimeout);
      clearTimeout(isShootingTimeout);
    };
  }, [isBouncing]);

  // 마우스 클릭 시 총 발사
  useEffect(() => {
    const handlePointerDown = () => {
      if (
        !gunHand ||
        !isMiniGameStarted ||
        isMiniGameCleared ||
        isShooting ||
        isBouncing
      ) {
        return;
      }
      setIsBouncing(true);
      setIsShooting(true);
    };
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [
    gunHand,
    isMiniGameCleared,
    isMiniGameStarted,
    isBouncing,
    isShooting,
    setIsBouncing,
    setIsShooting,
  ]);

  // 방향 이동 로직
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "w":
          movement = { ...movement, forward: true };
          break;
        case "s":
          movement = { ...movement, backward: true };
          break;
        case "a":
          movement = { ...movement, left: true };
          break;
        case "d":
          movement = { ...movement, right: true };
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "w":
          movement = { ...movement, forward: false };
          break;
        case "s":
          movement = { ...movement, backward: false };
          break;
        case "a":
          movement = { ...movement, left: false };
          break;
        case "d":
          movement = { ...movement, right: false };
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const directionVector = new Vector3(); // 방향
  const cameraDirection = new Vector3(); // 카메라가 보는 방향
  const worldUpVector = new Vector3(0, 1, 0); // 위를 향하는 벡터
  const perpendicularVector = new Vector3();
  const quaterinion = new Quaternion(); // 회전정보 담는 계산 체계

  useFrame(() => {
    if (!gunHand) return;
    if (!ref.current) return;
    ref.current.getDirection(directionVector);
    // raf -> PointerLockControls의 방향 전달
    // directionVector는 PointerLockControls의 방향 갖게됨

    if (!isBouncing) {
      ref.current.camera.position.y = 1;
      const cameraPosition = three.camera.position;
      const gunPosition = cameraPosition // 카메라 포지션에
        .clone()
        .add(directionVector.clone().multiplyScalar(0.4)); // 방향만큼 더해주고, 같은 벡터의 길이를 좀 짧게 가져감
      gunHand.position.set(gunPosition.x, gunPosition.y - 0.1, gunPosition.z);
      gunHand.lookAt(directionVector.clone().multiplyScalar(-10000)); // directionVector의 반대쪽을 보게 함
    } else {
      ref.current.camera.getWorldDirection(cameraDirection);

      perpendicularVector
        .crossVectors(worldUpVector, cameraDirection) // 두 벡터의 외적 계산해서
        .multiplyScalar(-1) // 반대방향으로
        .normalize(); // 정규화 한 값

      quaterinion.setFromAxisAngle(perpendicularVector, 0.005);

      ref.current.camera.quaternion.premultiply(quaterinion);
      gunHand.quaternion.premultiply(
        quaterinion.clone().setFromAxisAngle(perpendicularVector, 0.1)
      );
    }

    // 키 이용한 이동 계산로직
    if (movement.forward) {
      three.camera.position.add(
        new Vector3(directionVector.x, 0, directionVector.z).multiplyScalar(
          0.02
        )
      );
    }
    if (movement.backward) {
      three.camera.position.add(
        new Vector3(directionVector.x, 0, directionVector.z).multiplyScalar(
          -0.02
        )
      );
    }
    if (movement.left) {
      ref.current.camera.getWorldDirection(cameraDirection);

      perpendicularVector
        .crossVectors(worldUpVector, cameraDirection)
        .multiplyScalar(-1)
        .normalize();

      three.camera.position.add(
        new Vector3(
          perpendicularVector.x,
          0,
          perpendicularVector.z
        ).multiplyScalar(-0.02)
      );
    }
    if (movement.right) {
      ref.current.camera.getWorldDirection(cameraDirection);

      perpendicularVector
        .crossVectors(worldUpVector, cameraDirection)
        .multiplyScalar(-1)
        .normalize();

      three.camera.position.add(
        new Vector3(
          perpendicularVector.x,
          0,
          perpendicularVector.z
        ).multiplyScalar(0.02)
      );
    }
  });

  return (
    <>
      <PointerLockControls
        ref={ref}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
      />
      <MiniGameFloor />
      <spotLight ref={spotLightRef} intensity={200} position={[0, 20, 0]} />
      {gunHand && (
        <directionalLight
          intensity={1}
          position={[
            gunHand.position.x,
            gunHand.position.y + 0.5,
            gunHand.position.z,
          ]}
        />
      )}
      <GunHand />
      <instancedMesh>
        {!isMiniGameCleared &&
          randomPositions.map((position, i) => {
            return (
              <TargetMesh
                position={position}
                color={randomColors[i]}
                shapes={randomShapes[i]}
                setHitCount={setHitCount}
              />
            );
          })}
      </instancedMesh>
    </>
  );
};
