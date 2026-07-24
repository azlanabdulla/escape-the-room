import React, { useState, useEffect } from 'react';

const Level15 = ({ onComplete }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [levelKey, setLevelKey] = useState('');
  const [cipherText, setCipherText] = useState('');

  useEffect(() => {
    const randomKey = 'FINAL_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setLevelKey(randomKey);

    // ROT13 encode
    const rot13 = (str) => {
      return str.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      });
    };

    const rot13Key = rot13(randomKey);
    // Base64 encode the ROT13 string
    const base64Key = btoa(rot13Key);
    
    setCipherText(base64Key);
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
        <h2>Level 15</h2>
        <span className="level-badge">The Cipher Chain</span>
      </div>
      
      <div className="puzzle-container">
        <p>The final key has been heavily encrypted. First it was encoded using a classic ROT13 cipher, and then the result was encoded in Base64.</p>
        <p>Decrypt this string to find the final key:</p>
        <div className="code-block">
          {cipherText}
        </div>
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

export default Level15;
