export default function Core() {
  return (
    <section className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-[200px] px-10">
      <div className="max-w-[1260px] w-full mx-auto relative">
        <div className="flex flex-wrap w-full gap-6 items-center px-4 lg:px-0 pb-10">
          <h1 className="font-semibold self-start w-full text-left md:w-auto text-2xl md:text-[46px] text-[#86868b] mr-auto">
            일단 핵심부터.
          </h1>
          <div className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline">
            동영상 보기
          </div>
          <div className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline">
            이벤트 시청하기
          </div>
        </div>
      </div>
      <div>carousel</div>
    </section>
  );
}
