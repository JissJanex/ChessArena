interface CapturedPiece {
  type: string; // p n b r q k from chess.js
  color: 'white' | 'black'; // captured piece's original color
}

interface CapturedPanelProps {
  title: string;
  pieces: CapturedPiece[];
  className?: string; // for positioning (leftPanel/rightPanel)
}

export default function CapturedPanel({ title, pieces, className }: CapturedPanelProps) {
  return (
    <div className={`capturedPanel ${className ?? ''}`}>
      <h3>{title}</h3>
      <div className="capturedList">
        {pieces.length === 0 ? (
          <span className="emptyCapture">None</span>
        ) : (
          pieces.map((p, idx) => {
            // File names follow pattern w_p.svg, b_q.svg, etc.
            const fileName = `/images/${p.color === 'white' ? 'w' : 'b'}_${p.type}.svg`;
            return (
              <span key={`${p.type}-${p.color}-${idx}`} className={`capturedPiece piece-${p.type}`}>
                <img src={fileName} alt={`${p.color} ${p.type}`} className="capturedIcon" />
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}
