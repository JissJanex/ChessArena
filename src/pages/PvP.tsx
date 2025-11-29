import { useState } from "react";
import type { Square } from "chess.js";
import ChessBoard from "../components/ChessBoard";
import { game } from "../components/ChessLogic";
import GameOverBanner from "../components/Banner";
import Header from "../components/Header";

// Type definition for game over state
type GameOverState = {
  isGameOver: boolean;
  result: "checkmate" | "stalemate" | "draw" | null;
  winner: "white" | "black" | null;
};

function App() {
  // Chess game state - stores the current board position in FEN notation
  const [position, setPosition] = useState(game.fen());
  
  // Currently selected square (for piece selection)
  const [selected, setSelected] = useState<Square | null>(null);
  
  // Highlighted squares for legal moves and selected piece
  const [highlights, setHighlights] = useState<Record<string, any>>({});
  
  // Game over state - tracks if game ended and how
  const [gameOver, setGameOver] = useState<GameOverState>({
    isGameOver: false,     
    result: null,
    winner: null,
  });

  // Controls visibility of the game over banner
  const [showBanner, setShowBanner] = useState(true);

  // Restart the game - resets board to initial position
  const handleRestart = () => {
    game.reset();
    setPosition(game.fen());
    setSelected(null);
    setHighlights({});
    setGameOver({ isGameOver: false, result: null, winner: null });
    setShowBanner(true);
  };

  // Hide banner to review the final game position
  const handleReview = () => {
    setShowBanner(false);
  };

  // Show banner again after reviewing
  const handleShowBanner = () => {
    setShowBanner(true);
  };

  return (
    <div>
    <Header title="PvP Chess Game" />
    <div className="chessBoard">
      <div className="chessBoardWrapper" style={{ position: "relative" }}>
        {/* Apply blur effect to board when game over banner is shown */}
        <div className={gameOver.isGameOver && showBanner ? "blurred" : ""}>
          <ChessBoard
            position={position}
            setPosition={setPosition}
            selected={selected}
            setSelected={setSelected}
            highlights={highlights}
            setHighlights={setHighlights}
            setGameOver={setGameOver}
          />
        </div>

        {/* Show game over banner when game ends */}
        {gameOver.isGameOver && (
          <GameOverBanner
            result={gameOver.result}
            winner={gameOver.winner}
            onRestart={handleRestart}
            onReview={handleReview}
            onShowBanner={handleShowBanner}
            showBanner={showBanner}
          />
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
