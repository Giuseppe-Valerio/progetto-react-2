import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() !== "") {
      navigate(`/weather-detail?city=${city}`);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Controlla il Meteo</h1>
      <Form className="mb-4">
        <Form.Group controlId="city">
          <Form.Label>Inserisci una città</Form.Label>
          <Form.Control type="text" placeholder="Es: Milano" value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleSearch} className="mt-3">
          Cerca
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
