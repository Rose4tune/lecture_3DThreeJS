"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PauseIcon from "@/public/icons/pause.svg";

import "swiper/css";
import "swiper/css/pagination";

export default function CoreCarousel() {
  const VIDEOS = [
    {
      text: "A17 Pro 등장.\n게임의 판도를 바꾸는 칩.\n획기적인 성능.",
      source: "/videos/section2_1_large_2x.mp4",
    },
    {
      text: "티타늄.\n초강력. 초경량. 초프로.",
      source: "/videos/section2_2_large_2x.mp4",
    },
    {
      text: "iPhone 사상 가장 긴\n광학 줌 초점 거리를 자랑하는\niPhone 15 Pro Max.\n저 멀리 내다보다.",
      source: "/videos/section2_3_large_2x.mp4",
    },
    {
      text: "완전히 새로운 동작 버튼.\n요모조모 요긴하게.",
      source: "/videos/section2_4_large_2x.mp4",
    },
  ];
  const [swiper, setSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videosRefs = useRef([]);

  const handleSlideChange = (e) => {
    setActiveSlide(e.activeIndex);

    if (isVideoPlaying) {
      playVideo();
    } else {
      setIsVideoPlaying(true);
    }
  };

  const playVideo = () => {
    if (!swiper) return;
    videosRefs.current.map((videoRef, index) => {
      if (index === swiper.activeIndex) {
        videoRef.play();
      } else {
        videoRef.pause();
        videoRef.currentTime = 0;
      }
    });
  };

  return (
    <div className="relative">
      <div>
        <Swiper
          modules={[Autoplay]}
          className="w-full"
          slidesPerView={1}
          spaceBetween={40}
          speed={800}
          autoplay={{ delay: 6000, stopOnLastSlide: true }}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
        >
          {VIDEOS.map((video, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className="max-w-[1260px] w-full mx-auto relative">
                <div className="h-[680px] bg-black rounded-[28px] overflow-hidden relative">
                  <div className="w-full h-full cursor-pointer">
                    <div className="absolute top-10 left-10 color-[#f5f5f7] text-[24px] font-medium whitespace-pre-line text-left">
                      {video.text}
                    </div>
                    <video
                      ref={(ref) => {
                        videosRefs.current[index] = ref;
                      }}
                      className="w-full h-full object-contain"
                      playsInline
                      muted
                    >
                      <source src={video.source} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center sticky bottom-0 z-10 py-[100px]">
          <AnimatePresence>
            <div className="flex flex-row">
              <motion.div className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect bg-[#f5f5f730]">
                <motion.div className="flex justify-center h-full overflow-hidden relative">
                  <motion.button className="p-2 paginate">
                    <motion.span className="bg-[#f5f5f7] h-2 rounded-full block" />
                  </motion.button>
                </motion.div>
              </motion.div>
              <motion.div className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect bg-[#f5f5f730]">
                <motion.span className="cursor-pointer">
                  <PauseIcon />
                </motion.span>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
