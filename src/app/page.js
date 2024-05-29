"use client"
import React, { useState, useEffect } from 'react';
import IntroCard from './components/intro-card';
import QuestionCard from './components/question-card';
import EndCard from './components/end-card';
import { title, questions } from './components/constants';

const QuizTimerApp = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="quiz-container">
       {!quizStarted && (
        <IntroCard
          title={title}
          questions={questions}
          setQuizStarted={setQuizStarted}
          setQuizCompleted={setQuizCompleted}
          setScore={setScore}
          setShowTimer={setShowTimer}
        />
      )}
      {quizStarted && !quizCompleted &&(
        <QuestionCard
          title={title}
          questions={questions}
          setQuizStarted={setQuizStarted}
          setQuizCompleted={setQuizCompleted}
          score={score}
          setScore={setScore}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
        />
      )}
      {quizCompleted && (
        <EndCard
          questions={questions}
          score={score}
          setScore={setScore}
          title={title}
          setQuizStarted={setQuizStarted}
          setQuizCompleted={setQuizCompleted}
        />
      )}
    </div>
  );
};

export default QuizTimerApp;