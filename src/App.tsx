import { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import { game } from "./components/ChessLogic";
import "./App.css";
import type { Square } from "chess.js";

function App() {
  const [position, setPosition] = useState(game.fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [highlights, setHighlights] = useState<Record<string, any>>({});

  return (
    <div className="chessBoard">
      <div className="chessBoardWrapper">
        <ChessBoard
          position={position}
          setPosition={setPosition}
          selected={selected}
          setSelected={setSelected}
          highlights={highlights}
          setHighlights={setHighlights}
        />
      </div>
    </div>
  );
}

export default App;
