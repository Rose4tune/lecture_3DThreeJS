"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Intro() {
  const videoRef = useRef();
  const control = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.play();
    control.start({ opacity: 1, transition: { duration: 1 } });
    control2.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    control3.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 1 },
    });
  }, [videoRef?.current?.readyState]);

  return (
    <section
      className="bg-black flex flex-col items-center justify-between relative text-white text-center overflow-hidden gap-10"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <motion.div
        className="bg-[#1d1d1f] p-5 text-white text-center w-full text-xs sm:text-sm md:text-base font-light"
        initial={{ opacity: 0 }}
        animate={control}
        transition={{ duration: 1 }}
      >
        <div className="max-w-xl mx-auto text-ellipsis">
          iPhone 11 이상의 모델을 보상 판매하면 iPhone 15 Pro 구입 시 사용할 수
          있는{"\n"}₩220,000–₩990,000 상당의 크레딧이.
          <a href="#footnote-2" className="underline text-[12px]">
            *
          </a>
          <a href="#" className="hover:underline text-[#0071e3]">
            구입하기 {">"}
          </a>
        </div>
      </motion.div>
      <div className="relative w-full">
        <h1 className="mb-5 md:mb-0 md:absolute md:-top-1 md:text-3xl text-[#bdb7ad] w-full text-center tracking-tighter font-semibold">
          iPhone 15 Pro Max
        </h1>
        <video
          ref={videoRef}
          className="flex md:hidden w-[376px] mx-auto"
          muted
        >
          <source src="/videos/small_2x.webm" type="video/mp4" />
          <source src="/videos/small_2x.mp4" type="video/mp4" />이
          브라우저에서는 해당 video tag를 지원하지 않습니다.
        </video>
        <video
          ref={videoRef}
          className="hidden md:flex w-[1200px] mx-auto"
          muted
        >
          <source src="/videos/large_2x.webm" type="video/webm" />
          <source src="/videos/large_2x.mp4" type="video/mp4" />이
          브라우저에서는 해당 video tag를 지원하지 않습니다.
        </video>
      </div>
      <div className="w-full relative flex flex-col -top-[20px] md:-top-[100px] pb-10 md:pb-0 items-center justify-center gap-10">
        <motion.div
          className="bg-[#0071e3] hover:bg-[#0077ed] py-2.5 w-[100px] text-center rounded-full cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={control2}
        >
          구입하기
        </motion.div>
        <motion.div
          className="text-xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={control3}
        >
          ₩1,550,000부터
        </motion.div>
      </div>
    </section>
  );
}
