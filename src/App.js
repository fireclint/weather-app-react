import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

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
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Sensación térmica</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KPH</p>
              ) : null}
              <p>Velocidad del viento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
