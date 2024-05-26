import './intro-card.module.scss';

const IntroCard = ({questions}) => {
  return (
    <div className='intro-container'>
        <div className='intro-img'>
            <img src="https://cdn.britannica.com/96/257796-131-91D3AA07/girl-oversized-glasses-pencil-math-test.jpg" alt="intro card image" />
        </div>
        <div className='intro-card'>
            <div className='intro-wrapper'>
                <h3>title</h3>
                <button><span>Start</span></button>
            </div>
            <div className='bottom-wrapper'>
                <div className='questions'>{questions.length} Questions</div>
                <div className='timer'>Timer Bouns 
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IntroCard