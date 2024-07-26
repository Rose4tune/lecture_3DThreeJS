import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
import { useRecoilValue } from "recoil";
import { isStartScene } from "./utils/atom";
import Car from "./Car";
import { Stats, StatsGl } from "@react-three/drei";
import DrawCallCounter from "./components/DrawCallCounter";
import fontjson from "./Pretendard.json";
import { useEffect } from "react";

function Scene() {
  const isStart = useRecoilValue(isStartScene);

  useEffect(() => {
    const fontData = fontjson;
    const targetText = "How To Play↑←↓→";
    const modefiedGlyphs = {};

    for (let i = 0; i < targetText.length; i++) {
      const char = targetText[i];
      const charKey = char in fontData.glyphs ? char : char.toUpperCase();

      if (charKey in fontData.glyphs) {
        modefiedGlyphs[charKey] = fontData.glyphs[charKey];
      }
    }

    const modefiedFontData = {
      ...fontData,
      glyphs: modefiedGlyphs,
    };

    console.log(JSON.stringify(modefiedFontData));
  }, []);

  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 3] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            {isStart && <Car />}
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
        <StatsGl />
        <DrawCallCounter />
      </Canvas>
    </>
  );
}

export default Scene;
