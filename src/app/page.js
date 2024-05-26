"use client"
import { useEffect, useState } from 'react';
import IntroCard from './components/intro-card';
import EndCard from './components/end-card';
import QuestionCard from './components/question-card';
import { title, questions } from './components/constants';

import './page.module.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
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
    <div className="quiz-container">
       {quizStarted && (
        <IntroCard questions={questions} />
      )}
      {!quizCompleted &&(
        <QuestionCard 
          title={title}
          questions={questions}
        />
      )}
      {quizCompleted && (
        <EndCard />
      )}
    </div>
  );
}
export default Quiz;
