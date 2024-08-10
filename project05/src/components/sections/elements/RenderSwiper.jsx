"use client";

import { useState } from "react";
import RenderSwiperController from "./RenderSwiperController";
import { motion } from "framer-motion";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  {
    src: "/images/carousel_1.jpg",
    size: "0.5x",
    type: "울트라 와이드 | 접사",
  },
  {
    src: "/images/carousel_2.jpg",
    size: "0.5x",
    type: "울트라 와이드 | 13mm",
  },
  { src: "/images/carousel_3.jpg", size: "1x", type: "메인 | 24mm" },
  { src: "/images/carousel_4.jpg", size: "1x", type: "메인 | 28mm" },
  { src: "/images/carousel_5.jpg", size: "1x", type: "메인 | 35mm" },
  { src: "/images/carousel_6.jpg", size: "2x", type: "망원 | 48mm" },
  {
    src: "/images/carousel_7.jpg",
    size: "새로운 5x",
    type: "망원 | 120mm",
  },
];

export default function RenderSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="flex flex-1 flex-col w-[660px] mt-[200px]">
        <div className="max-w-[330px]">
          iPhone 15 Pro는 다양한 초점 거리를 지원합니다.{" "}
          <span className="text-white">7개의 프로급 렌즈를 주머니에 쏙</span>{" "}
          넣어 어디든 갖고 다닐 수 있게 된 거나 다름없죠.
        </div>
        <div className="my-[60px] w-full h-[495px]">
          <motion.div
            className="w-[7000px] h-[495px] flex flex-row overflow-visible gap-[8px] items-center justify-start"
            initial={{ x: 0 }}
            animate={{
              transition: { duration: 0.5 },
              x: -1 * activeIndex * (660 + 8),
            }}
          >
            {CAROUSEL_IMAGES.map((_image, index) => {
              return (
                <motion.div
                  key={`carousel${index}`}
                  className="relative overflow-hidden"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    x: -1 * index * (660 * 0.8),
                    width: index > activeIndex ? 660 * 0.8 : 660,
                    height: index > activeIndex ? 495 * 0.8 : 495,
                    zIndex: 10 - index,
                  }}
                  animate={{
                    x: 0,
                    scale: 1,
                    opacity: index !== activeIndex ? 0.3 : 1,
                    width: index > activeIndex ? 660 * 0.8 : 660,
                    height: index > activeIndex ? 495 * 0.8 : 495,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image src={_image.src} fill objectFit="cover" alt="image" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <RenderSwiperController
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        CAROUSEL_IMAGES={CAROUSEL_IMAGES}
      />
    </>
  );
}
