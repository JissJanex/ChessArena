/**
 * Props for the GameOverBanner component
 * @param result - Type of game ending: checkmate, stalemate, or draw
 * @param winner - The winning color (white/black) or null for draws
 * @param onRestart - Callback to restart a new game
 * @param onReview - Callback to hide banner and review the final position
 * @param onShowBanner - Callback to show the banner again after review
 * @param showBanner - Whether to show the full banner or just the button
 */
type GameOverBannerProps = {
  result: 'checkmate' | 'stalemate' | 'draw' | null;
  winner: 'white' | 'black' | null;
  onRestart: () => void;
  onReview: () => void;
  onShowBanner: () => void;
  showBanner: boolean;
};

/**
 * GameOverBanner Component
 * Displays the game result with options to review or restart
 * When reviewing, shows a "Show Result" button instead
 * Styled with CSS classes from App.css
 */
export default function GameOverBanner({
  result,
  winner,
  onRestart,
  onReview,
  onShowBanner,
  showBanner,
}: GameOverBannerProps) {
  // If not showing banner, display the "Show Result" button
  if (!showBanner) {
    return (
      <button
        onClick={onShowBanner}
        className="showResultButton"
      >
        Show Result
      </button>
    );
  }

  // Display the full game over banner
  return (
    <div className="gameOverBanner">
      {/* Display the game result type */}
      <h1>
        {result === "checkmate"
          ? "Checkmate!"
          : result === "stalemate"
          ? "Stalemate!"
          : "Draw!"}
      </h1>

      {/* Display the winner or draw message */}
      <p>
        {result === "checkmate"
          ? `${winner === "white" ? "White" : "Black"} Wins!`
          : "It's a Draw!"}
      </p>

      {/* Action buttons */}
      <div className="bannerButtons">
        <button onClick={onReview} className="reviewButton">
          Review Game
        </button>
        <button onClick={onRestart} className="newGameButton">
          New Game
        </button>
      </div>
    </div>
  );
}
