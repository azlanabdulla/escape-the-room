import React, { useState, useEffect } from 'react';

const Level11 = ({ onComplete }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [levelKey, setLevelKey] = useState('');

  useEffect(() => {
    // Generate a random key for this playthrough
    const randomKey = 'VAR_' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setLevelKey(randomKey);
    
    // Split key into parts and inject as CSS variables
    const part1 = randomKey.substring(0, 3);
    const part2 = randomKey.substring(3, 7);
    const part3 = randomKey.substring(7);
    
    document.documentElement.style.setProperty('--secret-key-part-1', `"${part1}"`);
    document.documentElement.style.setProperty('--secret-key-part-2', `"${part2}"`);
    document.documentElement.style.setProperty('--secret-key-part-3', `"${part3}"`);
    
    return () => {
      document.documentElement.style.removeProperty('--secret-key-part-1');
      document.documentElement.style.removeProperty('--secret-key-part-2');
      document.documentElement.style.removeProperty('--secret-key-part-3');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyInput.trim().toUpperCase() === levelKey) {
      setSuccess(true);
      setError(false);
      setTimeout(() => onComplete(), 1500);
    } else {
      setError(true);
      setSuccess(false);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div>
      <div className="level-header">
        <h2>Level 11</h2>
        <span className="level-badge">Styles & Variables</span>
      </div>
      
      <div className="puzzle-container">
        <p>The key has been broken into pieces and hidden where colors and sizes are usually defined. Inspect the root element to find the CSS variables holding the key fragments.</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          Format: Combine part 1, part 2, and part 3 exactly as they appear (without quotes).
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="key-input"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter secret key..."
            autoFocus
          />
          <button type="submit" className="submit-btn">Unlock</button>
        </div>
      </form>

      {error && <p className="error-message">Incorrect key. Keep searching!</p>}
      {success && <p className="success-message">Access Granted!</p>}
    </div>
  );
};

export default Level11;
