import { useState, useMemo } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level7({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const secretKey = useMemo(() => generateKey(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toUpperCase() === secretKey) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div>
      <div className="level-header">
        <h2>Level 7: The Invisible Button</h2>
        <span className="level-badge">7 / 10</span>
      </div>
      <div className="puzzle-container" style={{ position: 'relative' }}>
        <p>There is a button on this page that reveals the key, but it's completely invisible.</p>
        <p>You might need to tweak some CSS properties to find and click it.</p>
        <button 
          onClick={() => alert(`The secret key is: ${secretKey}`)}
          style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            opacity: 0,
            pointerEvents: 'none', // They have to remove this in DevTools to click it!
            padding: '10px 20px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reveal Key
        </button>
      </div>
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="key-input" 
          placeholder="Enter the secret key..."
        />
        <button type="submit" className="submit-btn">Unlock</button>
      </form>
      {error && <p className="error-message">Incorrect key. Try again.</p>}
    </div>
  );
}
