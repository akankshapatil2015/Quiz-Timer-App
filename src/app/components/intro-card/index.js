import { useEffect } from 'react';

import styles from './intro-card.module.scss';

const IntroCard = ({ title, questions, setScore, setQuizStarted, setShowTimer }) => {
  const handleQuizStart = () =>{
    setScore(0);
    setQuizStarted(true);
  };

  const handleTimeBonus = () =>{
    setShowTimer(false);
  }

 return (
  <div className={styles.introContainer}>
    <div className={styles.introImg}>
      <img src="https://cdn.britannica.com/96/257796-131-91D3AA07/girl-oversized-glasses-pencil-math-test.jpg" alt="intro card image" />
    </div>
    <div className={styles.introCard}>
      <div className={styles.introWrapper}>
        <p className={styles.topText}>Literature</p>
        <h1>{title}</h1>
        <button
        onClick={() => {
          handleQuizStart();
         }}
         ><span>Start</span></button>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.questions}>{questions.length} Questions</div>
        <div className={styles.timer}>Timer Bouns
        <label className={styles.switch}>
          <input type='checkbox' 
            onClick={() => {
              handleTimeBonus();
            }}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>
    </div>
  </div>
 )
}

export default IntroCard