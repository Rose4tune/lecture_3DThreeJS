import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react";

export const GLBModel = () => {
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState("wave");

  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse(obj => {
      if(obj.isMesh){
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    actions['wave'].play();
  }, [scene]);

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play();
    return () => {
      actions[currentAnimation].fadeOut(0.5).stop();
    }
  }, [actions, currentAnimation]);

  return (
    <primitive
      onClick={() => {
        setCurrentAnimation(prev => {
          if(prev === "wave") return "windmill";
          return "wave"
        })
      }}
      onPointerUp={() => {
        console.log('UP!!')
      }}
      onPointerDown={() => {
        console.log('DOWN!!')
      }}
      ref={ref}
      object={scene}
      scale={0.01}
      position-y={0.8}
    />
  )
}
