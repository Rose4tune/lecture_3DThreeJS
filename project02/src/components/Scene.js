import { useEffect } from "react";
import Earth from "./Earth";
import Weather from "./Weather";
import { getCurrentWeather } from "../utils/weather";

export default function Scene() {
  useEffect(() => {
    getCurrentWeather(44.34, 10.99, process.env.REACT_APP_API_KEY);
  });

  return (
    <>
      <Earth position={[0, -0.7, -2]} />
      <Weather weather={"clear"} />
    </>
  );
}
