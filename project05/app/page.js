import Core from "@/src/components/sections/Core";
import DetailView from "@/src/components/sections/DetailView";
import Intro from "@/src/components/sections/Intro";
import ModelingView from "@/src/components/sections/ModelingView";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      <Intro />
      <Core />
      <ModelingView />
      <DetailView />
    </div>
  );
}
