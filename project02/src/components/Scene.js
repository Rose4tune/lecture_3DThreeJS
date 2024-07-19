import { useEffect, useState } from "react";
import Earth from "./Earth";
import Weather from "./Weather";
import { getCityWeather } from "../utils/weather";
import { cities } from "../utils/cities";

const API = process.env.REACT_APP_API_KEY;

export default function Scene() {
  const [content, setContent] = useState();

  const getCitiesWeather = () => {
    const promises = cities.map((city) => getCityWeather(city, API));

    Promise.all(promises)
      .then((weatherDataArray) => {
        setContent(weatherDataArray);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCitiesWeather("Seoul", API);
  }, [API]);

  useEffect(() => {
    console.log("cities data:", content);
  }, [content]);

  return (
    <>
      <Earth />
      {content?.map((el, i) => (
        <Weather
          key={i + "ModelKey"}
          position={[-1 + i * 0.5, 0, 0]}
          weather={el.weatherData.weather[0].main.toLowerCase()}
        />
      ))}
    </>
  );
}
