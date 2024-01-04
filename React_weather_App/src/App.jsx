import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./image/search.png";
import RainIcon from "./image/rain.png";
import MistIcon from "./image/mist.png";
import SnowIcon from "./image/snow.png";
import DrizzleIcon from "./image/drizzle.png";
import CloudsIcon from "./image/clouds.png";
import ClearIcon from "./image/clear.png";
import HumidityIcon from "./image/humidity.png";
import WindIcon from "./image/wind.png";
import axios from "axios";

function App() {
  const [konum, setkonum] = useState("");
  const [havaDurum, setHavaDurum] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${konum}&appid=${
          import.meta.env.VITE_WEATHER_API
        }&units=metric`
      );
      setHavaDurum(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [konum]);

  const hanleChange = (e) => {
    setkonum(e.target.value);
  };
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Rain":
        return <img src={RainIcon} className="weather-icon" />;
      case "Clouds":
        return <img src={CloudsIcon} className="weather-icon" />;
      case "Clear":
        return <img src={ClearIcon} className="weather-icon" />;
      case "Drizzle":
        return <img src={DrizzleIcon} className="weather-icon" />;
      case "Mist":
        return <img src={MistIcon} className="weather-icon" />;
      case "Snow":
        return <img src={SnowIcon} className="weather-icon" />;
      default:
        return null;
    }
  };

  return (
    <>
      {console.log(havaDurum)}
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Şehir Giriniz"
            spellCheck="false"
            value={konum}
            onChange={hanleChange}
          />
          <button>
            <img src={SearchIcon} onClick={fetchData} />
          </button>
        </div>
        <div className="weather">
          {havaDurum && (
            <>
              {getWeatherIcon(havaDurum.weather[0].main)}
              <h1 className="temp">{havaDurum.main.temp.toFixed(0)}°C</h1>
              <h2 className="city">{havaDurum.name}</h2>
              <div className="details">
                <div className="col">
                  <img src={HumidityIcon} />
                  <div>
                    <p className="humidity">%{havaDurum.main.humidity}</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img src={WindIcon} />
                  <div>
                    <p className="wind">{havaDurum.wind.speed} km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
