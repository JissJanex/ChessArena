import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PvP from "./pages/PvP";
import Ai from "./pages/Ai";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pvp" element={<PvP />} />
      <Route path="/vs-computer" element={<Ai />} />
    </Routes>
  );
}

export default App;