import { useState, useMemo } from 'react';

const WORDS = ["ESCAPE", "HACKER", "SECRET", "PUZZLE", "CIPHER", "UNLOCK"];

export default function Level10({ onComplete }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  
  const { originalWord, shiftedWord, shift } = useMemo(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const shiftAmt = Math.floor(Math.random() * 25) + 1;
    let shifted = '';
    
    for (let i = 0; i < word.length; i++) {
      let charCode = word.charCodeAt(i);
      let newCode = ((charCode - 65 + shiftAmt) % 26) + 65;
      shifted += String.fromCharCode(newCode);
    }
    
    return { originalWord: word, shiftedWord: shifted, shift: shiftAmt };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toUpperCase() === originalWord) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div>
      <div className="level-header">
        <h2>Level 10: Caesar Cipher</h2>
        <span className="level-badge">10 / 10</span>
      </div>
      <div className="puzzle-container">
        <p>The final key is a meaningful English word, but it has been shifted by <strong>{shift}</strong> characters in the alphabet.</p>
        <div className="code-block" style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '4px' }}>
          {shiftedWord}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="key-input" 
          placeholder="Enter the original word..."
        />
        <button type="submit" className="submit-btn">Escape!</button>
      </form>
      {error && <p className="error-message">Incorrect word. Try again.</p>}
    </div>
  );
}
