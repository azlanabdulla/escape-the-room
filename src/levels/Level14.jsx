import React, { useState, useEffect, useRef } from 'react';

const Level14 = ({ onComplete }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [levelKey, setLevelKey] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const randomKey = 'CANVAS_' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setLevelKey(randomKey);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Draw background same as panel
      ctx.fillStyle = '#e8e4b7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw text in the exact same color so it's invisible
      ctx.font = '20px VT323';
      ctx.fillStyle = '#e8e4b7'; 
      ctx.fillText(randomKey, 10, 30);
    }
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
        <h2>Level 14</h2>
        <span className="level-badge">Canvas Obfuscation</span>
      </div>
      
      <div className="puzzle-container">
        <p>A secret key has been drawn onto the canvas below, but it perfectly matches the background color.</p>
        <p>You can't see it, and it's not in the DOM tree. Use the console to extract the image data or call <code>toDataURL()</code> on the canvas.</p>
        
        <canvas 
          id="secret-canvas" 
          ref={canvasRef} 
          width="200" 
          height="50" 
          style={{ border: 'var(--pixel-border)', marginTop: '1rem' }}
        ></canvas>
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

export default Level14;
