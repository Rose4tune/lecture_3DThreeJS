import { useRecoilState, useRecoilValue } from "recoil";
import { GunHand } from "./elements/GunHand";
import { MiniGameFloor } from "./elements/MiniGameFloor";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  CurrentMapAtom,
  IsMiniGameClearedAtom,
  IsMiniGameStartedAtom,
} from "../../../../../../store/PlayersAtom";
import { PointerLockControls } from "@react-three/drei";
import { Color } from "three";

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
  const [isBouncing, setIsBouncing] = useState(false); //총기 반동
  const [isShooting, setIsShooting] = useState(false);
  const gunHand = three.scene.getObjectByName("gunHand");

  useEffect(() => {
    three.scene.background = new Color(0x000000);

    return () => {
      three.scene.background = new Color(0xffffff);
      setIsMiniGameStarted(false);
      setIsMiniGameCleared(false);
    };
  }, [three.scene, currentMap, setIsMiniGameStarted, setIsMiniGameCleared]);

  return (
    <>
      <PointerLockControls
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
        ref={ref}
      />
      <spotLight ref={spotLightRef} intensity={200} position={[0, 20, 0]} />
      <MiniGameFloor />
      <GunHand />
    </>
  );
};
