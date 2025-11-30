import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  onRestart?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = "Chess Game", onRestart }) => {
  return (
    <header className="header">
      <div className="container">
        <h1>{title}</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {onRestart && (
              <li>
                <button onClick={onRestart} className="restartButton">
                  Restart
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
