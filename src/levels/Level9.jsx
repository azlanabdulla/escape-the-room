import { useState, useMemo, useEffect } from 'react';

const generateKey = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function Level9({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const secretKey = useMemo(() => generateKey(), []);

  useEffect(() => {
    // Send a fake fetch request so it shows up in the network tab
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'X-Secret-Key-Is': secretKey
      }
    }).catch(() => {});
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
        <h2>Level 9: The Network Request</h2>
        <span className="level-badge">9 / 15</span>
      </div>
      <div className="puzzle-container">
        <p>When this level loaded, it made a silent request to the server.</p>
        <p>The key was sent in a custom header of that request. Check your Network tab.</p>
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
