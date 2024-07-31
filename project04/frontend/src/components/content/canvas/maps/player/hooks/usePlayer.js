import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";

export const usePlayer = ({ player, position, modelIndex }) => {
  const playerId = player?.id;
  const memoizedPosition = useMemo(() => position, []);

  const playerRef = useRef(null);

  const { scene, materials, animations } = useGLTF(
    (() => {
      switch (modelIndex) {
        case 0:
          return `/models/CubeGuyCharacter.glb`;
        case 1:
          return `/models/CubeWomanCharacter.glb`;
        case 2:
          return `/models/Steve.glb`;
        default:
          return "";
      }
    })()
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const nodes = objectMap.nodes;

  const [animation, setAnimation] = useState(
    "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
  );
  const { actions } = useAnimations(animations, playerRef);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();

    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  return { playerRef, memoizedPosition, playerId, nodes, materials };
};
