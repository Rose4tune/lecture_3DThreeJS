"use client";

import Image from "next/image";
import RenderVideo from "./elements/RenderVideo";
import RenderDescription from "./elements/RenderDescription";
import { motion } from "framer-motion";

export default function A17ProChip() {
  return (
    <section className="bg-black flex flex-col items-center justify-center pt-[200px] pb-[100px] px-10 text-[#86868b]">
      <div className="flex flex-col flex-1 max-w-[1260px] w-full items-center justify-center pb-[100px]">
        <motion.div
          className="relative w-[150px] aspect-[1/1]"
          initial={{ opacity: 0, scale: 1.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: "all", once: true }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/a17.jpg"
            alt="a17 image"
            fill
            objectFit="contain"
          />
        </motion.div>
        <h4 className="text-center text-[#f5f5f7] text-[80px] font-semibold mt-[100px] leading-tight">
          A17 Pro 칩.{"\n"}
          게임 평정, 괴물 프로세서.
        </h4>
        <div className="text-[28px] mt-[40px]">
          마침내 Apple GPU 사상 가장 큰 변화가 찾아왔습니다.
        </div>
        <RenderVideo />
        <RenderDescription />
      </div>
    </section>
  );
}
