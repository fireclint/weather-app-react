import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OpenWeather() {
  const [data, setData] = useState({});


  useEffect(() => {
    // Obtener la ubicación del usuario por su dirección IP
    axios.get('https://ipapi.co/json/').then((response) => {
      const { city, country } = response.data;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=es&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

      // Hacer una llamada a la API de OpenWeatherMap con la ubicación obtenida
      axios.get(url).then((response) => {
        setData(response.data);
      });
    });
  }, []);

  return (
    <div className="openweather">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenWeather;
