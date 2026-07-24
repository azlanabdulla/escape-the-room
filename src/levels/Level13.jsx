import React, { useState, useEffect } from 'react';

const Level13 = ({ onComplete }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [levelKey, setLevelKey] = useState('');

  useEffect(() => {
    const randomKey = 'MEM_' + Math.random().toString(36).substring(2, 12).toUpperCase();
    setLevelKey(randomKey);

    // Hide it in sessionStorage with a cryptic name
    sessionStorage.setItem('_obfuscated_level_13_data', btoa(randomKey));

    return () => {
      sessionStorage.removeItem('_obfuscated_level_13_data');
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
        <h2>Level 13</h2>
        <span className="level-badge">Application Storage</span>
      </div>
      
      <div className="puzzle-container">
        <p>The key has been saved to your browser's session storage for safekeeping, but it's Base64 encoded.</p>
        <p>Inspect the Application tab to retrieve it, then decode it.</p>
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

export default Level13;
