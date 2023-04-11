import './index.css'

const ScoreCard = props => {
  const {score, onPlayAgain} = props
  return (
    <div className="score-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        className="trophy-image"
        alt="trophy"
      />
      <p className="score-heading">YOUR SCORE</p>
      <p className="scored">{score}</p>
      <div>
        <button
          className="paly-again-button"
          type="submit"
          onClick={onPlayAgain}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            className="reset-image"
            alt="reset"
          />{' '}
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}

export default ScoreCard
