import "../App.css";

function AiGame() {
  return (
    <div className="homePage">
      <div className="homeContainer">
        <h1 className="homeTitle">🤖 AI Mode</h1>
        <p className="homeSubtitle">Coming Soon</p>
        <div style={{
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          color: '#f0d9b5',
          fontSize: '1.2rem',
          lineHeight: '1.8'
        }}>
          <p>We're working on bringing you an intelligent chess opponent!</p>
          <p style={{ marginTop: '15px', fontSize: '1rem', color: '#b58863' }}>
            Check back soon for AI-powered gameplay.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AiGame;