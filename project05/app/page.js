import Core from "@/src/components/sections/Core";
import MainIntro from "@/src/components/sections/MainIntro";

export default function Home() {
  return (
    <div className="h-[2000px] bg-[#121212]">
      <MainIntro />
      <Core />
    </div>
  );
}
