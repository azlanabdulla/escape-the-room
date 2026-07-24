import React, { useState, useEffect } from 'react';

const Level12 = ({ onComplete }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [levelKey, setLevelKey] = useState('');

  useEffect(() => {
    const randomKey = 'EVT_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setLevelKey(randomKey);

    const handleCustomUnlock = (e) => {
      console.log(`%c[SYSTEM] Custom event 'unlock' detected.`, 'color: #3a8a3a; font-weight: bold; font-size: 14px;');
      console.log(`%cThe key is: ${randomKey}`, 'color: #b37e4c; font-size: 16px;');
    };

    window.addEventListener('unlock', handleCustomUnlock);

    return () => {
      window.removeEventListener('unlock', handleCustomUnlock);
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
        <h2>Level 12</h2>
        <span className="level-badge">Event Listener</span>
      </div>
      
      <div className="puzzle-container">
        <p>The system is listening for a specific custom event on the <code>window</code> object.</p>
        <p>Dispatch a new CustomEvent named <code>'unlock'</code> using the console to reveal the key.</p>
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

export default Level12;
