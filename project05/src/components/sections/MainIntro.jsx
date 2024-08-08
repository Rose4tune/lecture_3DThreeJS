export default function MainIntro() {
  return (
    <section
      className="bg-black flex flex-col items-center justify-between relative text-white text-center overflow-hidden gap-10"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <div
        className="bg-[#1d1d1f] p-5 text-white text-center w-full text-xs sm:text-sm md:text-base font-light"
        initial={{ opacity: 0 }}
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
      </div>
      <div className="relative w-full">
        <h1 className="mb-5 md:mb-0 md:absolute md:-top-1 md:text-3xl text-[#bdb7ad] w-full text-center tracking-tighter font-semibold">
          iPhone 15 Pro Max
        </h1>
        <video
          className="flex md:hidden w-[376px] mx-auto"
          autoPlay
          muted
        ></video>
        <video
          className="hidden md:flex w-[1200px] mx-auto"
          autoPlay
          muted
          src="/videos/large_2x.mp4"
        ></video>
      </div>
      <div className="w-full relative flex flex-col -top-[20px] md:-top-[100px] pb-10 md:pb-0 items-center justify-center gap-10">
        <div className="bg-[#0071e3] hover:bg-[#0077ed] py-2.5 w-[100px] text-center rounded-full cursor-pointer">
          구입하기
        </div>
        <div className="text-xl font-semibold">₩1,550,000부터</div>
      </div>
    </section>
  );
}
