import { useState, useMemo } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level1({ onComplete }) {
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
        <h2>Level 1: The Inspector</h2>
        <span className="level-badge">1 / 15</span>
      </div>
      <div className="puzzle-container">
        <p>Your first key is hidden right in front of you, but not visible to the naked eye.</p>
        <p>Inspect the structure of this page to find it.</p>
        <div data-secret-key={secretKey} style={{ display: 'none' }} className="secret-element">
          The key for Level 1 is: {secretKey}
        </div>
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
