import React, { useEffect, useState } from 'react';
import QuizComponent from './components/QuestionBox';
import ResultComponent from './components/Result';
import './App.css'; 

const App = () => {
  const [page, setPage] = useState(1); 
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const pageNavigation = (pageNo, percentage = 0) => {
    setPage(pageNo);
    if (pageNo === 2) {
      setScore(percentage);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="app-container">
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {page === 1 && <QuizComponent pageNavigation={pageNavigation} />}
      {page === 2 && <ResultComponent pageNavigation={pageNavigation} percentage={score} />}
    </div>
  );
};

export default App;