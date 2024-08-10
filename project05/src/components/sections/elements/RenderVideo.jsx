import Image from "next/image";

export default function RenderVideo() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center gap-8 mt-[100px]">
      <div className="relative w-full aspect-[1054/516]">
        <div className="absolute top-0 left-0 w-full h-full pt-5 px-4">
          <video
            className="rounded-[5%/10%]"
            playsInline
            muted
            autoPlay
            src="/videos/a17.mp4"
          />
        </div>
        <Image
          src="/images/iphone_frame.png"
          fill
          objectFit="contain"
          alt="frame for video"
        />
      </div>
      <div className="text-[17px]">붕괴: 스타레일</div>
    </div>
  );
}
