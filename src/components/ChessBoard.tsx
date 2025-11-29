import { Chessboard } from "react-chessboard";
import { game } from "./ChessLogic";
import type { Square } from "chess.js";

type GameOverState = {
  isGameOver: boolean;
  result: 'checkmate' | 'stalemate' | 'draw' | null;
  winner: 'white' | 'black' | null;
};

interface ChessBoardProps {
  position: string;
  setPosition: (position: string) => void;
  selected: Square | null;
  setSelected: (square: Square | null) => void;
  highlights: Record<string, any>;
  setHighlights: (highlights: Record<string, any>) => void;
  setGameOver: (gameOver: GameOverState) => void;
}

export default function ChessBoard({
  position,
  setPosition,
  selected,
  setSelected,
  highlights,
  setHighlights,
  setGameOver,
}: ChessBoardProps) {
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
          ? "radial-gradient(circle, rgba(255, 215, 0, 0.4) 85%, transparent 85%)"
          : "radial-gradient(circle, rgba(0,0,0,.4) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });

    return newHighlights;
  };

  // Handle tapping squares
  const onSquareClick = ({ square }: any) => {
    const clickedSquare = square as Square;

    // No piece selected → select this one
    if (!selected) {
      const piece = game.get(clickedSquare);
      if (piece && piece.color === game.turn()) {
        setSelected(clickedSquare);
        setHighlights(getLegalMoves(clickedSquare));
      }
      return;
    }

    // Clicking the same square → deselect
    if (selected === clickedSquare) {
      setSelected(null);
      setHighlights({});
      return;
    }

    // Try to move to the clicked square
    try {
      const move = game.move({
        from: selected,
        to: clickedSquare,
        promotion: "q", // always promote to queen
      });

      if (move) {
        // Move successful
        setPosition(game.fen());
        setSelected(null);
        setHighlights({});
        
        // Check game states
        if (game.isCheckmate()) {
          console.log("CHECKMATE!");
          const winner = game.turn() === 'w' ? 'black' : 'white';
          setGameOver({ isGameOver: true, result: 'checkmate', winner });
        } else if (game.isStalemate()) {
          console.log("STALEMATE!");
          setGameOver({ isGameOver: true, result: 'stalemate', winner: null });
        } else if (game.isDraw()) {
          console.log("DRAW!");
          setGameOver({ isGameOver: true, result: 'draw', winner: null });
        } else if (game.isCheck()) {
          console.log("CHECK!");
        }
        
        return;
      }
    } catch (error) {
      // Invalid move
    }

    // Move failed or invalid, check if selecting a new piece
    const piece = game.get(clickedSquare);
    if (piece && piece.color === game.turn()) {
      // Switch selection to this piece
      setSelected(clickedSquare);
      setHighlights(getLegalMoves(clickedSquare));
    } else {
      // Clicked on empty square or opponent's piece (invalid move) → deselect
      setSelected(null);
      setHighlights({});
    }
  };

  return (
    <Chessboard
      options={{
        position,
        onSquareClick,
        darkSquareStyle: {
          backgroundImage: 'url("/wood-dark.png")',
          backgroundSize: "cover",
        },
        lightSquareStyle: {
          backgroundImage: 'url("/wood-light.png")',
          backgroundSize: "cover",
        },
        squareStyles: highlights,
        allowDragging: false,  // Disables drag completely
      }}
    />
  );
}
