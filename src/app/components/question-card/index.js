import { useEffect, useState } from 'react';

import styles from './question-card.module.scss';

const QuestionCard = ({title, questions}) => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0 && !showScore) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) {
      handleAnswerOptionClick(null);
    }
  }, [timer, showScore]);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 100);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(30); // Reset timer for next question
    } else {
      setShowScore(true);
    }
  };

  const showStartCard = () =>{

  }
  return (
    <div className={styles.questionConatiner}>
      <div className={styles.questionTopSection}>
        <button><span className={styles.questionTitle}
          onClick={() => showStartCard()}
          >
          {title}</span></button>
        <div className={styles.questionCount}>
          <div className={styles.timeCount}>
            <svg>
              <circle r="23" cx="23" cy="23" className='active'></circle>
              <circle r="23" cx="23" cy="23" className='active'></circle>
            </svg>
            <div className={styles.timeText}>{timer}</div>
          </div>
          <span> {currentQuestion + 1} of </span>{questions.length}
        </div>
      </div>
      <div className={styles.questionSection}>
          <div className={styles.questionText}>{questions[currentQuestion].question}</div>
          <div className={styles.answerSection}>
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                <span>{option}</span>
              </button>
            ))}
          </div>
      </div>
    </div>
  )
}

export default QuestionCard