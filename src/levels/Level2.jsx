import { useState, useMemo, useEffect } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level2({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const secretKey = useMemo(() => generateKey(), []);

  useEffect(() => {
    console.log(`%c[Level 2] The secret key is: ${secretKey}`, "color: #38bdf8; font-size: 16px; font-weight: bold; padding: 4px; border: 1px solid #38bdf8; border-radius: 4px;");
  }, [secretKey]);

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
        <h2>Level 2: The Console Log</h2>
        <span className="level-badge">2 / 15</span>
      </div>
      <div className="puzzle-container">
        <p>Developers often leave messages behind.</p>
        <p>Where do developers look for logs, errors, and debug messages?</p>
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
