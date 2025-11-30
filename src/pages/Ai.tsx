import { useState, useEffect, useRef } from "react";
import type { Square } from "chess.js";
import ChessBoard from "../components/ChessBoard";
import { game } from "../components/ChessLogic";
import GameOverBanner from "../components/Banner";
import Header from "../components/Header";
import CapturedPanel from "../components/CapturedPanel";
import stockfish from "../engine/stockfishWorker.js";      //Stockfish engine web worker

// Type definition for game over state
type GameOverState = {
  isGameOver: boolean;
  result: "checkmate" | "stalemate" | "draw" | null;
  winner: "white" | "black" | null;
};

function Ai() {
  // Chess game state - stores the current board position in FEN notation
  const [position, setPosition] = useState(game.fen());
  
  // Currently selected square (for piece selection)
  const [selected, setSelected] = useState<Square | null>(null);
  
  // Highlighted squares for legal moves and selected piece
  const [highlights, setHighlights] = useState<Record<string, any>>({});
  
  //Keeps track to captured pieces
  const [whiteCaptured, setWhiteCaptured] = useState<{type:string,color:'white'|'black'}[]>([]); // white pieces removed from board
  const [blackCaptured, setBlackCaptured] = useState<{type:string,color:'white'|'black'}[]>([]); // black pieces removed from board

  // Game over state - tracks if game ended and how
  const [gameOver, setGameOver] = useState<GameOverState>({
    isGameOver: false,     
    result: null,
    winner: null,
  });

  // Controls visibility of the game over banner
  const [showBanner, setShowBanner] = useState(true);

  //Ai readiness flag
  const isAiThinking = useRef(false);
  const aiReady = useRef(false);

  // Initialize Stockfish
  useEffect(() => {
    stockfish.onmessage = (e) => {
      const msg = e.data;

      if (msg === "uciok") {
        aiReady.current = true;
      }

      if (msg.startsWith("bestmove")) {
        const best = msg.split(" ")[1];
        if (!best) {
          isAiThinking.current = false;
          console.log("No best move found");
          return;
        }
        
        const move = game.move({
          from: best.substring(0, 2),
          to: best.substring(2, 4),
          promotion: "q",
        });

        if (move) {
          setPosition(game.fen());
          
          // Track captured pieces
          if (move.captured) {
            const capturingColor = move.color === 'w' ? 'white' : 'black';
            const capturedColor = capturingColor === 'white' ? 'black' : 'white';
            if (capturedColor === 'white') {
              setWhiteCaptured((prev) => [...prev, { type: move.captured!, color: 'white' }]);
            } else {
              setBlackCaptured((prev) => [...prev, { type: move.captured!, color: 'black' }]);
            }
          }
          
          // Check game over conditions
          if (game.isCheckmate()) {
            const winner = game.turn() === 'w' ? 'black' : 'white';
            setGameOver({ isGameOver: true, result: 'checkmate', winner });
          } else if (game.isStalemate()) {
            setGameOver({ isGameOver: true, result: 'stalemate', winner: null });
          } else if (game.isDraw()) {
            setGameOver({ isGameOver: true, result: 'draw', winner: null });
          }
        }
        
        isAiThinking.current = false;
      }
    };

    stockfish.postMessage("uci");
  }, []);

  // Make AI move when it's black's turn
  useEffect(() => {
    if (aiReady.current && game.turn() === 'b' && !gameOver.isGameOver && !isAiThinking.current) {
      isAiThinking.current = true;
      
      // Send position to Stockfish and request best move
      stockfish.postMessage(`position fen ${game.fen()}`);
      stockfish.postMessage("go movetime 1000"); // Think for 1 second
    }
  }, [position, gameOver.isGameOver]);

  // Restart the game - resets board to initial position
  const handleRestart = () => {
    game.reset();
    setPosition(game.fen());
    setSelected(null);
    setHighlights({});
    setGameOver({ isGameOver: false, result: null, winner: null });
    setShowBanner(true);
    setWhiteCaptured([]);
    setBlackCaptured([]);
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
    <Header title="Vs Computer Chess Game" onRestart={handleRestart}/>
    <div className="chessBoard chessBoardRow">
      {/* Left sidebar: pieces captured by Black (white pieces) */}
      <CapturedPanel title="White Captured" pieces={whiteCaptured} className="leftPanel" />

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
            onCapture={(capturingColor, pieceType) => {
              const capturedColor = capturingColor === 'white' ? 'black' : 'white';
              // Place captured piece into its original color bucket
              if (capturedColor === 'white') {
                setWhiteCaptured((prev) => [...prev, { type: pieceType, color: 'white' }]);
              } else {
                setBlackCaptured((prev) => [...prev, { type: pieceType, color: 'black' }]);
              }
            }}
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

      {/* Right sidebar: pieces captured by White (black pieces) */}
      <CapturedPanel title="Black Captured" pieces={blackCaptured} className="rightPanel" />
    </div>
    </div>
  );
}

export default Ai;