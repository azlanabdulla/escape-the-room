import { useState, useMemo } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level6({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const secretKey = useMemo(() => generateKey(), []);
  const encoded = useMemo(() => btoa(secretKey), [secretKey]);

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
        <h2>Level 6: Base64</h2>
        <span className="level-badge">6 / 10</span>
      </div>
      <div className="puzzle-container">
        <p>This string is encoded using a very common scheme on the web. Decode it to find the key.</p>
        <div className="code-block" style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }}>
          {encoded}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="key-input" 
          placeholder="Enter the decoded key..."
        />
        <button type="submit" className="submit-btn">Unlock</button>
      </form>
      {error && <p className="error-message">Incorrect key. Try again.</p>}
    </div>
  );
}
