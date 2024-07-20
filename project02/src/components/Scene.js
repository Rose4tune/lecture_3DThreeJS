import { useEffect, useState } from "react";
import Earth from "./Earth";
import Weather from "./Weather";
import { getCityWeather } from "../utils/weather";
import { cities } from "../utils/cities";

const API = process.env.REACT_APP_API_KEY;

export default function Scene() {
  const [content, setContent] = useState();

  const getCitiesWeather = () => {
    const promises = cities?.map((city) => getCityWeather(city, API));

    Promise.all(promises)
      .then((weatherDataArray) => {
        setContent(weatherDataArray);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCitiesWeather("Seoul", API);
  }, [API]);

  return (
    <>
      <Earth />
      {content?.map(({ city, weatherData }, i) => {
        const angle = (i / (content.length - 1)) * (Math.PI / 1.5) + 0.55;
        const radius = 1.3;

        const x = radius * Math.cos(angle).toFixed(2);
        const y = radius * Math.sin(angle).toFixed(2);
        return (
          <Weather
            key={i + "ModelKey"}
            position={[x, y - 0.9, 0]}
            rotationY={i + 100}
            cityName={city}
            weather={weatherData.weather[0].main.toLowerCase()}
          />
        );
      })}
    </>
  );
}
