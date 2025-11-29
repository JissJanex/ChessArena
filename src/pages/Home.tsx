import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homePage">
      <div className="homeContainer">
        <h1 className="homeTitle">Chess Arena</h1>
        <p className="homeSubtitle">Choose your game mode</p>
        
        <div className="gameModeButtons">
          <Link to="/pvp" className="gameModeButton pvpButton">
            <div className="buttonIcon">♟️</div>
            <div className="buttonText">
              <h2>Player vs Player</h2>
              <p>Play against a friend locally</p>
            </div>
          </Link>
          
          <Link to="/vs-computer" className="gameModeButton computerButton">
            <div className="buttonIcon">🤖</div>
            <div className="buttonText">
              <h2>vs Computer</h2>
              <p>Challenge the AI</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;