import { useState } from 'react';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import Level4 from './levels/Level4';
import Level5 from './levels/Level5';
import Level6 from './levels/Level6';
import Level7 from './levels/Level7';
import Level8 from './levels/Level8';
import Level9 from './levels/Level9';
import Level10 from './levels/Level10';
import Level11 from './levels/Level11';
import Level12 from './levels/Level12';
import Level13 from './levels/Level13';
import Level14 from './levels/Level14';
import Level15 from './levels/Level15';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameId, setGameId] = useState(Date.now());
  const [hasWon, setHasWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleLevelComplete = () => {
    if (currentLevel < 15) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setHasWon(true);
    }
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setHasWon(false);
    setGameStarted(false);
    setGameId(Date.now());
  };

  const levels = [
    <Level1 onComplete={handleLevelComplete} key={`l1-${gameId}`} />,
    <Level2 onComplete={handleLevelComplete} key={`l2-${gameId}`} />,
    <Level3 onComplete={handleLevelComplete} key={`l3-${gameId}`} />,
    <Level4 onComplete={handleLevelComplete} key={`l4-${gameId}`} />,
    <Level5 onComplete={handleLevelComplete} key={`l5-${gameId}`} />,
    <Level6 onComplete={handleLevelComplete} key={`l6-${gameId}`} />,
    <Level7 onComplete={handleLevelComplete} key={`l7-${gameId}`} />,
    <Level8 onComplete={handleLevelComplete} key={`l8-${gameId}`} />,
    <Level9 onComplete={handleLevelComplete} key={`l9-${gameId}`} />,
    <Level10 onComplete={handleLevelComplete} key={`l10-${gameId}`} />,
    <Level11 onComplete={handleLevelComplete} key={`l11-${gameId}`} />,
    <Level12 onComplete={handleLevelComplete} key={`l12-${gameId}`} />,
    <Level13 onComplete={handleLevelComplete} key={`l13-${gameId}`} />,
    <Level14 onComplete={handleLevelComplete} key={`l14-${gameId}`} />,
    <Level15 onComplete={handleLevelComplete} key={`l15-${gameId}`} />
  ];

  return (
    <div className="app-container">
      {!gameStarted ? (
        <div className="glass-panel">
          <h1 className="title">Escape The Room</h1>
          <p className="subtitle">A Developer's Digital Escape</p>
          
          <div className="puzzle-container" style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>How to Play</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>This is a 15-level digital escape room. Your goal is to find the hidden key in each level.</li>
              <li>You will need to use your browser's <strong>Developer Tools</strong> to solve many of the puzzles.</li>
              <li>Keys might be hidden in the HTML structure, network requests, console logs, or obscured by CSS.</li>
              <li>Some levels require logical deduction, decoding, or pattern recognition.</li>
              <li>Every playthrough generates completely new keys and puzzles.</li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="submit-btn" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={() => setGameStarted(true)}>
              Start Escape
            </button>
          </div>
        </div>
      ) : hasWon ? (
        <div className="glass-panel victory-container">
          <h1 className="victory-title">You Escaped!</h1>
          <p className="subtitle">Congratulations, you've solved all 15 levels.</p>
          <button className="restart-btn" onClick={restartGame}>Play Again (New Puzzles)</button>
        </div>
      ) : (
        <div className="glass-panel">
          <h1 className="title">Escape The Room</h1>
          <p className="subtitle">Can you solve your way out?</p>
          {levels[currentLevel - 1]}
        </div>
      )}
    </div>
  );
}

export default App;
