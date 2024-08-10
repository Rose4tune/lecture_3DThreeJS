"use client";

import { useRef } from "react";
import RenderDescription from "./elements/A17Description";
import RenderSwiper from "./elements/RenderSwiper";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import FloatingPlusBtn from "./buttons/FloatingPlusBtn";
import CameraDescription from "./elements/CameraDescription";

export default function CameraPerformance() {
  const iguanaRef = useRef();
  const { scrollYProgress } = useScroll({
    target: iguanaRef,
    offset: ["start end", "70% center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section className="bg-black flex flex-col items-center justify-center pt-[200px] pb-[100px] text-[#86868b] text-[21px] font-semibold">
      <div className="flex flex-col flex-1 max-w-[1260px] w-full pb-[100px] px-10">
        <h4 className="text-[80px] text-[#f5f5f7] leading-tight">
          상상 이상의 디테일까지{"\n"}포착해 주는 카메라.
        </h4>
        <div className="text-[28px] mt-[40px]">
          비약적으로 유연해진 프레임 옵션부터 한 차원 높은 수준의 인물 사진까지,
          iPhone 사상 가장 강력한 카메라 시스템이 만들어내는 놀라운 이미지를
          소개합니다.
        </div>
      </div>
      <div className="flex flex-1 w-full">
        <motion.div
          ref={iguanaRef}
          className="relative w-full aspect-[3/2]"
          style={{ scale }}
        >
          <Image
            fill
            objectFit="contain"
            src="/images/iguana.jpg"
            alt="iguana"
          />
        </motion.div>
      </div>
      <div className="max-w-[1260px] w-full px-10">
        48MP 메인 카메라로 촬영한 초록색 이구아나
      </div>
      <RenderSwiper />
      <CameraDescription />
      <FloatingPlusBtn title="카메라 성능 줌인해 보기" />
    </section>
  );
}
