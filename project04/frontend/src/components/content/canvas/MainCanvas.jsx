import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RootMap } from "./maps/RootMap";
import { useRecoilValue } from "recoil";
import { CurrentMapAtom } from "../../../store/PlayersAtom";
import { Physics } from "@react-three/cannon";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const currentMap = useRecoilValue(CurrentMapAtom);
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 100000,
        position: [12, 12, 12],
      }}
    >
      {currentMap === "MY_ROOM" && (
        <color attach="background" args={["beige"]} />
      )}
      <Physics
        gravity={[0, -20, 0]}
        defaultContactMaterial={{ restitution: 0.1, friction: 0 }} // 탄성력, 마찰력
        allowSleep //연산에 사용되지 않는 다른 물리 요소 계산에서 제외(최적화)
      >
        <RootMap />
      </Physics>
    </Canvas>
  );
};
