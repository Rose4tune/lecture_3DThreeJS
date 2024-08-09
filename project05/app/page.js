import Core from "@/src/components/sections/Core";
import Intro from "@/src/components/sections/Intro";
import CloserLook from "@/src/components/sections/CloserLook";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      <Intro />
      <Core />
      <CloserLook />
    </div>
  );
}
