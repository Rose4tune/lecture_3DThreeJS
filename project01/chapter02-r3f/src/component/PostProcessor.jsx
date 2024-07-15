import { Bloom, BrightnessContrast, DotScreen, EffectComposer, Glitch, Grid, HueSaturation, Pixelation, Sepia } from "@react-three/postprocessing";

export const PostProcessor = () => {
  return <EffectComposer disableNormalPass>
    {/* <Bloom // Blur
      intensity={0.5}
      mipmapBlur
      luminanceThreshold={1}
      luminanceSmoothing={0.02}
    /> */}

    {/* <BrightnessContrast
      brightness={-0.2} //+ 더 밝게 / - 더 어둡게
      contrast={0.8} //+ 대조 크게 / - 대조 작게
    /> */}

    {/* <DotScreen
      angle={Math.PI / 6}
      scale={1}
    /> */}

    {/* <Glitch
      delay={[1.5, 3.5]} // 간헐적 무작위 재생
      duration={[0.5, 1.0]} // 시간간격 최소, 최대
      strength={[0.01, 1.0]} // 강도 최소, 최대
      ratio={0.5} // 강한정도의 클리치가 일어나는 확율(0-높음, 1-약함)
    /> */}

    {/* <Grid
      scale={1}
      lineWidth={0.1}
    /> */}

    {/* <HueSaturation // 색조 변경
      hue={Math.PI / 2}
      saturation={0.4}
    /> */}

    {/* <Pixelation
      granularity={1} // 높을수록 픽셀화 심해짐
    /> */}

    {/* <Sepia
      intensity={0.5}
    /> */}
  </EffectComposer>
}
