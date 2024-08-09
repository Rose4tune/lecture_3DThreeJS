import Core from "@/src/components/sections/Core";
import Intro from "@/src/components/sections/Intro";
import ModelingView from "@/src/components/sections/ModelingView";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      <Intro />
      <Core />
      <ModelingView />
    </div>
  );
}
