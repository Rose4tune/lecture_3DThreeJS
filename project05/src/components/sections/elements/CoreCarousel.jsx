"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import PauseIcon from "@/public/icons/pause.svg";
import PlayIcon from "@/public/icons/play.svg";

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
  const sectionRef = useRef(null);
  const videoPlayRef = useRef(null);

  const isInView = useInView(sectionRef, { amount: "all" });
  const isVideoPlayRefInView = useInView(videoPlayRef);

  const handleSlideChange = (e) => {
    setActiveSlide(e.activeIndex);

    if (isVideoPlaying) {
      playVideo();
    } else {
      setIsVideoPlaying(true);
    }
  };

  const handlePaginationClick = (_index) => {
    if (!swiper) return;
    swiper.slideTo(_index);
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

  const pauseVideo = () => {
    if (!swiper) return;
    videosRefs.current.map((videoRef) => {
      videoRef.pause();
    });
  };

  const toggleVideoPlay = () => {
    setIsVideoPlaying((prev) => !prev);
  };

  useEffect(() => {
    isVideoPlaying ? playVideo() : pauseVideo();
  }, [isVideoPlaying]);

  useEffect(() => {
    isVideoPlayRefInView ? setIsVideoPlaying(true) : setIsVideoPlaying(false);
  }, [isVideoPlayRefInView]);

  return (
    <div className="relative">
      <div ref={videoPlayRef} />
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
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={toggleVideoPlay}
                >
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

      <div
        ref={sectionRef}
        className="flex justify-center sticky bottom-0 z-10 py-[100px]"
      >
        <AnimatePresence>
          {isInView && (
            <div className="flex flex-row">
              <motion.div
                className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect bg-[#f5f5f730]"
                initial={{ x: 28 }}
                animate={{ x: 0 }}
                exit={{ x: 28 }}
              >
                <motion.div
                  className="flex justify-center h-full overflow-hidden relative"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "168px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                >
                  {VIDEOS.map((_, paginationIndex) => {
                    return (
                      <motion.button
                        key={`pagination-${paginationIndex}`}
                        className="p-2 paginate"
                        onClick={() => {
                          handlePaginationClick(paginationIndex);
                        }}
                      >
                        <motion.span
                          className="bg-[#f5f5f7] h-2 rounded-full block"
                          initial={{ opacity: 0, minWidth: "8px" }}
                          animate={{
                            opacity: 1,
                            minWidth:
                              activeSlide === paginationIndex ? "48px" : "8px",
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>
              <motion.div
                className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect bg-[#f5f5f730]"
                initial={{ x: -28, marginInlineStart: 0 }}
                animate={{ x: 0, marginInlineStart: "14px" }}
                exit={{ x: -28, marginInlineStart: 0 }}
              >
                <motion.span
                  className="cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={toggleVideoPlay}
                >
                  {isVideoPlaying ? <PauseIcon /> : <PlayIcon />}
                </motion.span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
