import { useState, useMemo } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level3({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const secretKey = useMemo(() => generateKey(), []);

  const token = useMemo(() => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ secret_key: secretKey, role: 'user', iat: Date.now() }));
    const signature = 'fake_signature_for_puzzle';
    return `${header}.${payload}.${signature}`;
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
        <h2>Level 3: The Token</h2>
        <span className="level-badge">3 / 10</span>
      </div>
      <div className="puzzle-container">
        <p>We intercepted this authentication token, but it's encoded. Can you find the secret key inside?</p>
        <div className="code-block" style={{ wordBreak: 'break-all' }}>
          {token}
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
