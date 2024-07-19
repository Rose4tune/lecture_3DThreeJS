import { useRef } from "react";

export default function Lights() {
  const drectRef = useRef();
  return (
    <>
      <directionalLight
        ref={drectRef}
        position={[0, 5, 5]}
        intensity={1.4}
        castShadow
        receiveShadow
      />
      <ambientLight intensity={2} color={"#ffffff"} />
    </>
  );
}
