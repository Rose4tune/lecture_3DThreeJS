import LeftIcon from "@/public/icons/left.svg";
import RightIcon from "@/public/icons/right.svg";

export default function RenderSwiperController({
  activeIndex,
  setActiveIndex,
  CAROUSEL_IMAGES,
}) {
  const handleSwipeBack = () => {
    if (activeIndex <= 0) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleSwipeForward = () => {
    if (activeIndex >= CAROUSEL_IMAGES.length - 1) return;
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <div className="relative max-w-[860px] mx-auto flex flex-row w-full items-center justify-center">
      <div className="text-[19px]">
        <span className="text-white">{CAROUSEL_IMAGES[activeIndex].size} </span>
        {CAROUSEL_IMAGES[activeIndex].type}
      </div>
      <div className="flex flex-row gap-2 absolute top-0 right-0">
        <button
          className="w-[36px] h-[36px] bg-[#333336] rounded-full flex justify-center items-center"
          style={{
            opacity: activeIndex === 0 ? 0.5 : 1,
            cursor: activeIndex === 0 ? "default" : "pointer",
          }}
          onClick={handleSwipeBack}
          disabled={activeIndex === 0}
        >
          <LeftIcon color="#86868b" />
        </button>
        <button
          className="w-[36px] h-[36px] bg-[#333336] rounded-full flex justify-center items-center"
          style={{
            opacity: activeIndex === CAROUSEL_IMAGES.length - 1 ? 0.5 : 1,
            cursor:
              activeIndex === CAROUSEL_IMAGES.length - 1
                ? "default"
                : "pointer",
          }}
          onClick={handleSwipeForward}
          disabled={activeIndex === CAROUSEL_IMAGES.length - 1}
        >
          <RightIcon color="#86868b" />
        </button>
      </div>
    </div>
  );
}
