import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";
import { TextBoard } from "../../3dUIs/TextBoard";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";
import { useFrame } from "@react-three/fiber";

const name = "ground-npc-dinosaur";

export const Dinosaur = () => {
  const ref = useRef(null);
  const nameRef = useRef(null);

  const { scene } = useGLTF("/models/CuteRedDino.glb");
  const position = useMemo(() => new Vector3(0, 0, -5), []);

  useEffect(() => {
    if (!ref.current) return;
    if (!nameRef.current) return;
    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  useFrame(() => {
    if (!nameRef.current) return;
    nameRef.current.lookAt(10000, 10000, 10000);
  });

  return (
    <>
      <TextBoard ref={nameRef} text="디노" isNpc />
      <primitive
        ref={ref}
        visible
        name={name}
        scale={2}
        position={position}
        object={scene}
      />
    </>
  );
};
