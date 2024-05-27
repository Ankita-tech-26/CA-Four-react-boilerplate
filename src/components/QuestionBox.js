import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './components.css';
import quizData from './questions.js'; 

const QuizComponent = ({ pageNavigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [highlighted, setHighlighted] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = quizData[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    setCorrectAnswers((prev) => prev + (isCorrect ? 1 : 0));

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const finalScore = correctAnswers + (isCorrect ? 1 : 0);
      const totalQuestions = quizData.length;
      const percentage = (finalScore / totalQuestions) * 100;
      pageNavigation(2, percentage);
    }
  };

  const currentQuestion = quizData[currentIndex];

  return (
    <div className='quiz-container'>
      <div className='quiz-box'>
        <h2 className={`quiz-heading ${highlighted ? 'highlighted' : ''}`}>Question</h2>
        <div className='question-number'>
          <h4 className='question-number-text'>{currentIndex + 1} of {quizData.length}</h4>
        </div>
        <div className={`quiz-content ${highlighted ? 'highlighted' : ''}`}>
          <h4 className={`question-text ${highlighted ? 'highlighted' : ''}`}>{currentQuestion.question}</h4>
          <div className='options-container'>
            {['A', 'B', 'C', 'D'].map((option) => (
              <button
                key={option}
                className='option'
                onClick={() => handleAnswerClick(currentQuestion[`option${option}`])}
              >
                {currentQuestion[`option${option}`]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='highlight-buttons'>
        <button onClick={() => setHighlighted(true)}>Highlight</button>
        <button onClick={() => setHighlighted(false)}>Remove Highlight</button>
      </div>
    </div>
  );
};

QuizComponent.propTypes = {
  pageNavigation: PropTypes.func.isRequired,
};

export default QuizComponent;


