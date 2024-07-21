import { useBounds } from "@react-three/drei";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FocuseWeather({ children }) {
  const bounds = useBounds();
  const location = useLocation();

  const onClick = (e) => {
    e.stopPropagation();
    bounds.refresh(e.object).clip().fit();
  };

  const onPointerMissed = (e) => {
    if (e.button === 0) {
      bounds.refresh().fit();
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      bounds.refresh().fit();
    }
  }, [location]);

  return (
    <group onClick={onClick} onPointerMissed={onPointerMissed}>
      {children}
    </group>
  );
}
