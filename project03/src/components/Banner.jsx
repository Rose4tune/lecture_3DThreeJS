import { useBox } from "@react-three/cannon";
import { Html, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Banner({ position }) {
  const texture = useTexture(`/assets/images/fastcampus.webp`);
  const [info, setInfo] = useState(false);
  const [ref] = useBox(
    () => ({
      args: [5, 2, 1],
      position,
      type: "Static",
      onCollide: handleCollision,
    }),
    useRef(null)
  );

  const handleCollision = () => {
    setInfo(true);
  };

  const onHandleHistory = () => {
    const url = "https://fastcampus.co.kr/";
    window.open(url, "_blank");
  };

  useEffect(() => {
    let timeout;
    if (info) {
      timeout = setTimeout(() => setInfo(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [info]);

  return (
    <mesh ref={ref} onClick={onHandleHistory}>
      <boxGeometry args={[5, 2, 1]} />
      <meshStandardMaterial map={texture} />
      {info && (
        <Html>
          <div className="information">Click Here with Mouse!!</div>
        </Html>
      )}
    </mesh>
  );
}
