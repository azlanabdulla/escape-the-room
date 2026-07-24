import { useState, useMemo, useEffect } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level8({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const secretKey = useMemo(() => generateKey(), []);

  useEffect(() => {
    localStorage.setItem('level_8_secret_key', secretKey);
    return () => {
      localStorage.removeItem('level_8_secret_key');
    };
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
        <h2>Level 8: Local Storage</h2>
        <span className="level-badge">8 / 10</span>
      </div>
      <div className="puzzle-container">
        <p>The browser has a built-in storage system. We've dropped the key in there for safekeeping.</p>
        <p>Check the Application or Storage tab in your Developer Tools.</p>
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
