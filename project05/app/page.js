import Core from "@/src/components/sections/Core";
import Intro from "@/src/components/sections/Intro";

export default function Home() {
  return (
    <div className="h-[2000px] bg-[#121212]">
      <Intro />
      <Core />
    </div>
  );
}
