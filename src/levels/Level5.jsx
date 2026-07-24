import { useState, useMemo } from 'react';

export default function Level5({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  
  const { sequence, answer } = useMemo(() => {
    const isArithmetic = Math.random() > 0.5;
    const start = Math.floor(Math.random() * 10) + 1;
    let seq = [];
    
    if (isArithmetic) {
      const step = Math.floor(Math.random() * 8) + 2;
      seq = [start, start + step, start + 2*step, start + 3*step, start + 4*step];
    } else {
      const multiplier = Math.floor(Math.random() * 2) + 2;
      seq = [start, start * multiplier, start * multiplier ** 2, start * multiplier ** 3, start * multiplier ** 4];
    }
    
    const missingIndex = Math.floor(Math.random() * 3) + 1;
    const ans = seq[missingIndex].toString();
    seq[missingIndex] = "?";
    
    return { sequence: seq.join(', '), answer: ans };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === answer) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div>
      <div className="level-header">
        <h2>Level 5: The Pattern</h2>
        <span className="level-badge">5 / 15</span>
      </div>
      <div className="puzzle-container">
        <p>Identify the missing number in this sequence:</p>
        <div className="code-block" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
          {sequence}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="key-input" 
          placeholder="Enter the missing number..."
        />
        <button type="submit" className="submit-btn">Unlock</button>
      </form>
      {error && <p className="error-message">Incorrect number. Try again.</p>}
    </div>
  );
}
