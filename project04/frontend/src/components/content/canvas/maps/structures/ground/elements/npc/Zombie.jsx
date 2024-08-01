import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
import { TextBoard } from "../../3dUIs/TextBoard";
import { useFrame } from "@react-three/fiber";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";

const name = "ground-npc-zombie";
const text = "으으 오늘도 야근이라니...    ";

export const Zombie = () => {
  const ref = useRef(null);
  const nameRef = useRef(null);
  const chatRef = useRef(null);

  const { displayText } = useAnimatedText(text);
  const { scene, animations } = useGLTF("/models/Zombie.glb");
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-5, 0, -6), []);
  const [currentAnimation, setCurrentAnimation] = useState(
    "EnemyArmature|EnemyArmature|EnemyArmature|Attack"
  );

  useEffect(() => {
    if (!ref.current) return;
    if (!nameRef.current) return;
    if (!chatRef.current) return;
    chatRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4.5,
      ref.current.position.z
    );
    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[currentAnimation]?.stop();
    };
  }, [actions, currentAnimation, scene]);

  useFrame(() => {
    if (!chatRef.current) return;
    if (!nameRef.current) return;
    chatRef.current.lookAt(10000, 10000, 10000);
    nameRef.current.lookAt(10000, 10000, 10000);
  });

  return (
    <>
      <TextBoard ref={chatRef} text={displayText} />
      <TextBoard ref={nameRef} text="ZOMBIE" isNpc />
      <primitive
        ref={ref}
        scale={1.2}
        visible
        name={name}
        position={position}
        object={scene}
      />
    </>
  );
};
