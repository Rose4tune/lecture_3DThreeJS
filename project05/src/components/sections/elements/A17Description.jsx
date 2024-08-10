"use client";

import { motion } from "framer-motion";

export default function A17Description() {
  return (
    <div className="flex flex-row flex-1 py-[60px] text-[21px] font-semibold w-full">
      <div className="flex flex-1 flex-col gap-4">
        <motion.div
          className="max-w-[330px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "all" }}
        >
          <span className="text-[#f5f5f7]">역대 최고의 그래픽 성능</span>을 갖춘
          A17 Pro는 다른 어떤 iPhone 칩과도 비교할 수 없는 독보적인 칩입니다.
        </motion.div>
        <motion.div
          className="max-w-[330px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "some" }}
        >
          엄청나게 디테일한 배경과 살아 숨쉬는 듯한 캐릭터로 모바일{" "}
          <span className="text-[#f5f5f7]">
            게임을 즐길 때도 생생한 그래픽과 몰입감 넘치는 플레이 경험
          </span>
          을 만끽할 수 있게 해주죠. 여기에 업계 최고 수준의 속도와 효율성까지
          갖춘 A17 Pro. 무슨 일이든 쏜살같은 속도로 해치웁니다.
        </motion.div>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 max-w-[330px] mx-auto leading-tight">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: "all" }}
          >
            <div>새로운</div>
            <div className="text-[#f5f5f7] text-[48px]">Pro급 GPU</div>
            <div>6코어 탑재</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
