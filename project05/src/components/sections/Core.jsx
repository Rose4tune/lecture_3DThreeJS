"use client";

import { motion, useAnimationControls, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Core() {
  const scrollRef = useRef();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();

  useEffect(() => {
    const onScrollChange = (yProgress) => {
      if (yProgress < 0.2) {
        control1.start({ opacity: 0, y: 20 });
      } else if (yProgress < 0.3) {
        control1.start({ opacity: 1, y: 0 });
        control2.start({ opacity: 0, y: 20 });
      } else if (yProgress < 0.35) {
        control1.start({ opacity: 1, y: 0 });
        control2.start({ opacity: 1, y: 0 });
        control3.start({ opacity: 0, y: 20 });
      } else {
        control1.start({ opacity: 1, y: 0 });
        control2.start({ opacity: 1, y: 0 });
        control3.start({ opacity: 1, y: 0 });
      }
    };
    const unsubscribeY = scrollYProgress.on("change", onScrollChange);

    return () => {
      unsubscribeY();
    };
  }, []);

  return (
    <section
      ref={scrollRef}
      className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-[200px] px-10"
    >
      <div className="max-w-[1260px] w-full mx-auto relative">
        <div className="flex flex-wrap w-full gap-6 items-center px-4 lg:px-0 pb-10">
          <motion.h1
            className="font-semibold self-start w-full text-left md:w-auto text-2xl md:text-[46px] text-[#86868b] mr-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={control1}
          >
            일단 핵심부터.
          </motion.h1>
          <motion.div
            className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline"
            initial={{ opacity: 0, y: 20 }}
            animate={control2}
          >
            동영상 보기
          </motion.div>
          <motion.div
            className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline"
            initial={{ opacity: 0, y: 20 }}
            animate={control3}
          >
            이벤트 시청하기
          </motion.div>
        </div>
      </div>
      <div>carousel</div>
    </section>
  );
}
