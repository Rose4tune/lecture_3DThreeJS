"use client";

import { motion } from "framer-motion";

export default function DetailView() {
  const textInitial = { opacity: 0, y: 20 };
  const textWhileInView = { opacity: 1, y: 0 };
  const textViewport = { amout: "all" };

  return (
    <section className="bg-[#101010] flex flex-col pt-[200px] pb-[100px] px-10">
      <div className="max-w-[1260px] mx-auto w-full">
        <motion.div
          className="text-[56px] text-[#86868b] font-semibold"
          initial={textInitial}
          whileInView={textWhileInView}
          viewport={textViewport}
        >
          본격적으로 탐구해 보기.
        </motion.div>
        <div className="flex flex-col pt-[200px] max-w-[1050px] mx-auto w-full">
          <div className="text-[80px] text-[#f5f5f7] leading-tight font-semibold px-2 whitespace-pre-line">
            iPhone.{"\n"}티타늄을 두르다.
          </div>
          <div className="flex flex-col gap-4 mt-[100px]">
            <div className="">
              <video playsInline autoPlay muted src="/videos/section3_1.mp4" />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 bg-black aspect-square overflow-hidden">
                  <div className="flex flex-1 bg-black aspect-square">
                    <img src="/images/explore_1.jpeg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 bg-black aspect-square overflow-hidden">
                  <div className="flex flex-1 bg-black aspect-square">
                    <img src="/images/explore_2.jpeg" />
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              className="flex flex-1 flex-row gap-4 items-center justify-center py-20 text-[21px] text-[#86868b]"
              initial={textInitial}
              whileInView={textWhileInView}
              viewport={textViewport}
            >
              <div className="max-w-[330px] mx-auto w-full">
                <span className="text-white">
                  iPhone 사상 최초로 항공우주 등급의 티타늄 디자인
                </span>
                을 채택한 iPhone 15 Pro. 화성 탐사선에 쓰이는 소재와 동일한
                합금을 사용했습니다.
              </div>
              <div className="max-w-[330px] mx-auto w-full">
                금속 중 비강도가 가장 탁월한 것으로 손꼽히는 티타늄을 사용한
                덕분에 iPhone 15 Pro는{" "}
                <span className="text-white">
                  역대 Pro 모델 중 가장 가볍습니다
                </span>
                . 기기를 집어드는 순간, 가벼워진 무게감이 확연히 느껴지죠.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
