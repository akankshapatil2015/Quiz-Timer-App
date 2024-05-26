import './end-card.module.scss';

const EndCard = ({score, questions}) => {
  return (
    <div className="score-section">
          <h1>You scored {score} out of {questions.length * 100}</h1>
    </div>
  )
}

export default EndCard