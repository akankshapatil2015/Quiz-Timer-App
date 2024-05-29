import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../circular-progress-bar";
import Image from "next/image";

import styles from "./end-card.module.scss";

const EndCard = ({
  title,
  score,
  setScore,
  questions,
  setQuizStarted,
  setQuizCompleted,
}) => {
  const showStartCard = () => {
    setScore(0);
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  return (
    <div className={styles.endCard}>
      <div className={styles.tabSection}>
        <button>{score}</button>
        <button>Answer</button>
        <button>LeaderBoard</button>
      </div>
      <div className={styles.heroImg}>
        <img
          src="https://cdn.britannica.com/96/257796-131-91D3AA07/girl-oversized-glasses-pencil-math-test.jpg"
          alt="intro card image"
        />
      </div>
      <div className={styles.endCardSection}>
        <div className={styles.title}>{title}</div>
        <div className={styles.scoreWrapper}>
          <div className={styles.scoreWheel}>
            <p className={styles.congratsText}>Congrats</p>
            <ChangingProgressProvider values={[0, ((score / (questions.length * 100)) * 100).toFixed(2)]}>
              {(percentage) => (
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  className={styles.CircularProgressbar}
                  styles={buildStyles({
                    pathTransition:
                      percentage === 0
                        ? "none"
                        : "stroke-dashoffset 0.8s ease 0s",
                    trailColor: "grey",
                    pathColor: "hsl(210, 77%, 35%)",
                    strokeLinecap: "butt",
                  })}
                  strokeWidth={5}
                />
              )}
            </ChangingProgressProvider>
            <div className={styles.score}>
              <span className={styles.score1}>
                {score / 100} / {questions.length}
              </span>
              <span className={styles.score2}>{score} points</span>
            </div>
          </div>

          <button
            className={styles.playAgainBtn}
            onClick={(e) => {
              showStartCard();
            }}
          >
            Play Again{" "}
            <Image
              src={require('./play-again.svg')}
              width={20}
              height={20}
              alt="play again"
              style={{marginLeft: '6px'}}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndCard;
