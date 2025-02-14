import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const MeteoDetail = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        setError(null);
        try {
          const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=16bd8f0c31cbaaa77befa3637aa48930`
          );

          if (!geoResponse.ok) {
            throw new Error("Città non trovata");
          }

          const geoData = await geoResponse.json();

          if (geoData.length === 0) {
            setError("Città non trovata.");
            return;
          }

          const { lat, lon } = geoData[0];

          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=16bd8f0c31cbaaa77befa3637aa48930`
          );

          if (!weatherResponse.ok) {
            throw new Error("Errore nel recupero delle previsioni");
          }

          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData);

          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=16bd8f0c31cbaaa77befa3637aa48930`
          );

          if (!forecastResponse.ok) {
            throw new Error("Errore nel recupero della previsione a 5 giorni");
          }

          const forecastData = await forecastResponse.json();
          setForecastData(forecastData);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchWeather();
    }
  }, [city]);

  return (
    <Container className="mt-5">
      <h1 className="text-center">Previsioni per {city}</h1>
      {error && <p className="text-danger">{error}</p>}
      {weatherData && (
        <Card>
          <Card.Body>
            <Card.Title>{new Date(weatherData.dt * 1000).toLocaleDateString()}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
            </Card.Subtitle>
            <Card.Text>
              <div>
                <h5>Temperatura: {(weatherData.main.temp - 273.15).toFixed(2)}°C</h5>
              </div>
              <div>
                <p>Min: {(weatherData.main.temp_min - 273.15).toFixed(2)}°C</p>
                <p>Max: {(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {forecastData && (
        <div className="mt-5">
          <h2 className="text-center">Previsioni per i prossimi 5 giorni</h2>
          <Row>
            {forecastData.list.map((forecast, index) => {
              if (index % 8 === 0) {
                return (
                  <Col key={forecast.dt}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{new Date(forecast.dt * 1000).toLocaleDateString()}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {forecast.weather[0].description.charAt(0).toUpperCase() +
                            forecast.weather[0].description.slice(1)}
                        </Card.Subtitle>
                        <Card.Text>
                          <div>
                            <h5>Temperatura: {(forecast.main.temp - 273.15).toFixed(2)}°C</h5>
                          </div>
                          <div>
                            <p>Min: {(forecast.main.temp_min - 273.15).toFixed(2)}°C</p>
                            <p>Max: {(forecast.main.temp_max - 273.15).toFixed(2)}°C</p>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
              return null;
            })}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default MeteoDetail;
