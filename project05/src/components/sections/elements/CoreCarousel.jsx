import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function CoreCarousel() {
  const VIDEOS = [
    {
      text: "A17 Pro 등장.\n게임의 판도를 바꾸는 칩.\n획기적인 성능.",
      source: "/assets/videos/section2_1_large_2x.mp4",
    },
    {
      text: "티타늄.\n초강력. 초경량. 초프로.",
      source: "/assets/videos/section2_2_large_2x.mp4",
    },
    {
      text: "iPhone 사상 가장 긴\n광학 줌 초점 거리를 자랑하는\niPhone 15 Pro Max.\n저 멀리 내다보다.",
      source: "/assets/videos/section2_3_large_2x.mp4",
    },
    {
      text: "완전히 새로운 동작 버튼.\n요모조모 요긴하게.",
      source: "/assets/videos/section2_4_large_2x.mp4",
    },
  ];

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
      </div>
    </div>
  );
}
