import { useRecoilValue } from "recoil";
import { stage2 } from "../utils/atom";
import { useBox } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

const colors = ["#0802A3", "#FF4B91", "#FFCD4B", "#FF7676", "#445D48"];
const MAX_BOX_COUNT = 200;

export default function BoxDrop() {
  const flood = useRecoilValue(stage2);
  const [boxs, setBoxs] = useState([]);

  const generateRandomBox = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const x = -6 - Math.random() * 5;
    const y = 3 + Math.random() * 5;
    const z = -7 + Math.random() * 14;

    return {
      color: randomColor,
      position: [x, y, z],
      args: [0.2, 0.2, 0.2],
    };
  };

  const addRandomBox = () => {
    if (boxs.length < MAX_BOX_COUNT) {
      setBoxs((currBoxs) => [...currBoxs, generateRandomBox()]);
    }
  };

  useEffect(() => {
    if (flood) addRandomBox();
  }, [flood]);

  useFrame(({ clock }) => {
    const elapsedTime = Math.floor(clock.getElapsedTime());
    if (flood && elapsedTime % 5 === 0) {
      // 5초 간격으로 실행
      addRandomBox();
    }
  });

  return boxs.map((boxInfo, i) => <Box key={i} {...boxInfo} />);
}

function Box({ color, args, position = [0, 1, 0] }) {
  const [ref] = useBox(() => ({
    mass: 1,
    args: args,
    position,
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
