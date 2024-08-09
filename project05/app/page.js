import Core from "@/src/components/sections/Core";
import Intro from "@/src/components/sections/Intro";
import IphoneModel from "@/src/components/sections/IphoneModel";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      <Intro />
      <Core />
      <IphoneModel />
    </div>
  );
}
