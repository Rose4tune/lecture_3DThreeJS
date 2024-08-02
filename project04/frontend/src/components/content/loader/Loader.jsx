import { Html, useProgress } from "@react-three/drei";
import { useSetRecoilState } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import { useEffect } from "react";

export const Loader = () => {
  const { progress } = useProgress();
  const setIsLoadCompleted = useSetRecoilState(IsLoadCompletedAtom);

  useEffect(() => {
    setIsLoadCompleted(progress === 100);
  }, [progress, setIsLoadCompleted]);

  return (
    <Html center>
      <progress value={progress} />
    </Html>
  );
};
