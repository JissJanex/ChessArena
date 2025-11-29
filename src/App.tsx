import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PvP from "./pages/PvP";
import AiGame from "./pages/Ai";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pvp" element={<PvP />} />
      <Route path="/vs-computer" element={<AiGame />} />
    </Routes>
  );
}

export default App;