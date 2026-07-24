import { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level4({ onComplete }) {
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
        <h2>Level 4: The Matrix</h2>
        <span className="level-badge">4 / 10</span>
      </div>
      <div className="puzzle-container">
        <p>Scan this code to reveal the hidden key.</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
            <QRCodeSVG value={`The secret key is: ${secretKey}`} size={180} />
          </div>
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
