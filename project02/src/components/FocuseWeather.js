import { useBounds } from "@react-three/drei";

export default function FocuseWeather({ children }) {
  const bounds = useBounds();

  const onClick = (e) => {
    e.stopPropagation();
    bounds.refresh(e.object).clip().fit();
  };

  const onPointerMissed = (e) => {
    if (e.button === 0) {
      bounds.refresh().fit();
    }
  };

  return (
    <group onClick={onClick} onPointerMissed={onPointerMissed}>
      {children}
    </group>
  );
}
