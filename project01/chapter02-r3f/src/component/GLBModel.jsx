import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const GLBModel = () => {
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);
  const three = useThree(); //useFrame의 state와 같음

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

  useFrame((state, delta) => {
    // re f.current.rotation.y += 0.02;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.01}
      position-y={0.8}
    />
  )
}
