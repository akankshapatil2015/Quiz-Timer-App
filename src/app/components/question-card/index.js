import { useEffect, useState } from "react";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../circular-progress-bar";
import styles from "./question-card.module.scss";

const QuestionCard = ({
  title,
  questions,
  score,
  setScore,
  setQuizStarted,
  setQuizCompleted,
  showTimer,
  setShowTimer,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timeLeft, setTimeLeft] = useState(100); // percentage for circular timer
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (timer > 0 && !showScore && showTimer && !showAnswer) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          setTimeLeft((newTimer / 30) * 100); // update percentage for circular timer
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(interval); //clearInterval() method clears a timer set with the setInterval() method.
    }
    if (timer === 0 && !isTimeUp) {
      setIsTimeUp(true);
      setSelectedOption(null);
      setShowAnswer(true);
      showAnswerPanel();
      showCorrectAndWrongAns();
    }
  }, [timer, showScore, showTimer, showAnswer]);

  const showCorrectAndWrongAns = (option) => {
    const answer = questions[currentQuestion].answer;
    if (option === answer) {
      console.log("correct Answe", option);
    } else if (option) {
      console.log("Wrong Answe", option);
      console.log("Right answer", answer);
    } else {
      console.log("Right answer", answer);
    }
  };

  const handleAnswerOptionClick = (option) => {
    const answer = questions[currentQuestion].answer;
    console.log("option", questions[currentQuestion].options[currentQuestion]);
    if (option === answer) {
      setScore(score + 100);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setSelectedOption(option);
    setIsTimeUp(false);
    setShowAnswer(true);
    showAnswerPanel();
    showCorrectAndWrongAns(option);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(30); // Reset timer for next question
      setTimeLeft(100); // Reset circular timer
      setIsTimeUp(false); // Reset time up flag
      setShowAnswer(false);
      setIsCorrect(false);
      setSelectedOption(null);
      showAnswerPanel();
    } else {
      setShowScore(true);
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = () => {
    setScore(0);
    setQuizStarted(false);
    setShowTimer(true);
  };

  const showAnswerPanel = () => {
    const questionWrapper = document.getElementById("questionConatiner");
    if (questionWrapper) {
      questionWrapper.classList.toggle(styles.answerPanel);
    }
  };

  return (
    <div className={styles.questionConatiner} id="questionConatiner">
      <div className={styles.questionTopSection}>
        <div
          className={styles.questionTitle}
          onClick={(e) => {
            handleStartQuiz();
          }}
        >
          {title}
        </div>
        <div className={styles.questionCount}>
          {showTimer && (
            <>
              {isTimeUp ? (
                <div className={styles.timeUpText}>Time's up!</div>
              ) : isCorrect ? (
                <div className={styles.optionTrue}>100+</div>
              ) : null}
              <ChangingProgressProvider values={[]}>
                {(percentage) => (
                  <CircularProgressbar
                    value={timer * 3.2}
                    text={`${timer}`}
                    className={styles.CircularProgressbar}
                    styles={buildStyles({
                      pathTransition:
                        percentage === 0
                          ? "none"
                          : "stroke-dashoffset 0.5s ease 0s",
                      trailColor: "grey",
                      pathColor: "hsl(210, 77%, 35%)",
                      strokeLinecap: "butt",
                      textSize: "30px",
                      width: "30px",
                    })}
                    strokeWidth={8}
                  />
                )}
              </ChangingProgressProvider>
            </>
          )}
          <span>
            {currentQuestion + 1} of {questions.length}
          </span>
          <span className={styles.score}>Score: {score}</span>
        </div>
      </div>
      <div className={styles.questionSection}>
        <div className={styles.questionText}>
          {questions[currentQuestion].question}
        </div>
        <div className={styles.answerOptions}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerOptionClick(option)}
              className={`${
                isTimeUp || selectedOption ? styles.disabledButton : ""
              } ${
                option === questions[currentQuestion].answer
                  ? `${styles.optionTrue} ${styles.sucessIcon}`
                  : ""
              } ${
                selectedOption &&
                selectedOption === option &&
                option !== questions[currentQuestion].answer
                  ? `${styles.optionFalse} ${styles.wrongIcon}`
                  : ""
              } ${styles.answerPanel}`}
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
        <button
          className={`${styles.nextQuestionBtn} ${styles.answerPanel}`}
          onClick={() => handleNextQuestion()}
        >
          Next
        </button>
      </div>
      <div className={`${styles.rightAnswerSection} ${styles.answerPanel}`}>
        <Image
          src={require("./idea.svg")}
          width={32}
          height={32}
          alt="idea img"
          style={{ marginTop: "-6px" }}
        />
        {questions[currentQuestion].subText}
      </div>
    </div>
  );
};
export default QuestionCard;
