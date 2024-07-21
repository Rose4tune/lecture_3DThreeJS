const API = process.env.REACT_APP_API_KEY;

const getCurrentWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("error", error);
    });
};

const getCityWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        return {
          city,
          weatherData: data,
        };
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
};

export { getCurrentWeather, getCityWeather };
