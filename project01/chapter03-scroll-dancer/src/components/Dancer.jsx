import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import gsap from "gsap";
import { IsEnteredAtom } from "../stores";
import { Loader } from "./Loader";
import { useThree } from "@react-three/fiber";

export default function Dancer() {
  const three = useThree();
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"].play();
  }, [actions, isEntered]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
        x: 0,
        y: 6,
        z: 12,
      }
    );
    gsap.fromTo(
      three.camera.rotation,
      { z: Math.PI },
      {
        duration: 2.5,
        z: 0,
      }
    );
  }, [isEntered, three.camera.position]);

  if (isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    );
  }
  return <Loader isCompleted />;
}
