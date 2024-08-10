import Image from "next/image";
import { motion } from "framer-motion";

export default function CameraDescription() {
  return (
    <div className="max-w-[1260px] w-full flex flex-col align-center justify-center">
      <div className="flex flex-row flex w-full gap-8 min-h-[800px] py-[200px]">
        <div className="flex flex-1 items-center justify-end">
          <motion.div
            className="relative w-[330px] aspect-[1/2]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            viewport={{ amount: 0.2 }}
          >
            <Image
              src="/images/camera.jpg"
              fill
              objectFit="contain"
              alt="image"
            />
          </motion.div>
        </div>
        <div className="flex flex-col flex-1 gap-4 items-start justify-center">
          <div className="flex flex-col gap-8 w-[330px]">
            <motion.div
              className=""
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              viewport={{ amount: "all" }}
            >
              그 어느 때보다 앞선 성능을 자랑하는 48MP 메인 카메라. 덕분에{" "}
              <span className="text-[#f5f5f7]">
                새로운 차원의 디테일 및 색상 표현력
              </span>
              이 돋보이는 초고해상도 사진을 촬영할 수 있죠.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              viewport={{ amount: "all" }}
            >
              향상된 성능은 인물 사진을 찍을 때 빛을 발합니다. 더 이상 인물 사진
              모드로 일일이 전환할 필요 없이, 피사체가 사람 혹은 강아지, 고양이
              같은 반려동물인 경우 iPhone이 자동으로 심도 정보를 포착합니다.
              그래서 촬영 중에{" "}
              <span className="text-[#f5f5f7]">
                인물 사진처럼 흐림 효과가 아름답게 배경에 적용된 상태
              </span>
              를 확인하면서 찍을 수 있고, 촬영 후에 ‘사진’ 앱에서 인물 사진으로
              바꾸는 것도 가능하죠.
            </motion.div>
          </div>
        </div>
      </div>
      <div className="text-[#f5f5f7] text-[40px] border-t-[0.5px] border-[#86868b] leading-tight pt-[200px] text-center">
        마법 같은 공간 동영상을 촬영하고 그 순간을{"\n"}Apple Vision Pro에서
        생생하게 다시 경험하세요.
      </div>
    </div>
  );
}
