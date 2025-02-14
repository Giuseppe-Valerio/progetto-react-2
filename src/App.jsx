import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import MeteoDetail from "./components/MeteoDetail";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather-detail" element={<MeteoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
