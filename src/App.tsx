import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { game } from "./components/ChessLogic";
import "./App.css";
import type { Square } from "chess.js";

function App() {
  const [position, setPosition] = useState(game.fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [highlights, setHighlights] = useState<Record<string, any>>({});

  // Get legal moves from a square
  const getLegalMoves = (square: Square) => {
    const moves = game.moves({ square, verbose: true });
    const newHighlights: Record<string, any> = {};

    // Highlight the selected square
    newHighlights[square] = { backgroundColor: "rgba(255, 255, 0, 0.4)" };

    // Highlight legal move destinations
    moves.forEach((move: any) => {
      newHighlights[move.to] = {
        background: game.get(move.to as Square)
          ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
          : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });

    return newHighlights;
  };

  // Handle tapping squares
  const onSquareClick = ({ square }: any) => {
    // No piece selected → select this one
    if (!selected) {
      const piece = game.get(square as Square);
      if (piece && piece.color === game.turn()) {
        setSelected(square as Square);
        setHighlights(getLegalMoves(square as Square));
      }
      return;
    }

    // Try to move to the clicked square
    const move = game.move({
      from: selected,
      to: square as Square,
      promotion: "q", // always promote to queen
    });

    if (move) {
      // Move successful
      setPosition(game.fen());
      setSelected(null);
      setHighlights({});
    } else {
      // Move failed, check if selecting a new piece
      const piece = game.get(square as Square);
      if (piece && piece.color === game.turn()) {
        setSelected(square as Square);
        setHighlights(getLegalMoves(square as Square));
      } else {
        // Deselect
        setSelected(null);
        setHighlights({});
      }
    }
  };

  return (
    <div className="chessBoard">
      <div className="chessBoardWrapper">
        <Chessboard
          options={{
            position,
            onSquareClick,
            allowDragging: false,
            allowDrawingArrows: false,
            squareStyles: highlights,
          }}
        />
      </div>
    </div>
  );
}

export default App;
