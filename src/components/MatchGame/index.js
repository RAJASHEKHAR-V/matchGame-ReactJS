import {Component} from 'react'

import RandomImage from '../RandomImage'

import TabItem from '../TabItem'

import Thumbnails from '../Thumbnails'

import ScoreCard from '../ScoreCard'

import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      isImageToBeMatched: imagesList[0],
      isGameOver: false,
      categoryId: tabsList[0].tabId,
      time: 60,
      increasingSeconds: 1,
      score: 0,
    }
  }

  // Timer-Setting per second

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  // Timing-Started, if increasing seconds more than the 60 then game over status will be changed and if not time moves backwards.

  tick = () => {
    const {increasingSeconds} = this.state

    if (increasingSeconds > 60) {
      clearInterval(this.timerId)
      this.setState(prevState => ({isGameOver: !prevState.isGameOver}))
      return
    }
    this.setState(prevState => ({
      time: prevState.time - 1,
      increasingSeconds: increasingSeconds + 1,
    }))
  }

  // on Tab item following has be to changed categoryId

  onClickOfTab = tabId => {
    this.setState({categoryId: tabId})
  }

  // on click of thumbnail will check both images are matching or not with help of ids and if not game over status will be changed
  onClickOfThumbnail = id => {
    const {isImageToBeMatched} = this.state
    const {imagesList} = this.props
    const newRandomImageObject =
      imagesList[Math.ceil(Math.random() * (imagesList.length - 1))]
    if (isImageToBeMatched.id === id) {
      this.setState(prevState => ({
        isImageToBeMatched: newRandomImageObject,
        score: prevState.score + 1,
      }))
      return
    }
    clearInterval(this.timerId)
    this.setState(prevState => ({isGameOver: !prevState.isGameOver}))
  }

  // onPlay Again button is Clicked need to fulfil three aspects

  // Score to be reset to initial value(score:0), time has be started from initial(time:60), Game Over Status has be changed(false), set the initial values of state(image[0],category[0]).

  onPlayAgain = () => {
    const {tabsList, imagesList} = this.props
    this.setState(prevState => ({
      isImageToBeMatched: imagesList[0],
      isGameOver: !prevState.isGameOver,
      categoryId: tabsList[0].tabId,
      time: 60,
      increasingSeconds: 1,
      score: 0,
    }))
    this.componentDidMount()
  }

  // filter the thumbnails

  filterTheThumbNails = () => {
    const {categoryId} = this.state
    const {imagesList} = this.props
    const filterList = imagesList.filter(
      eachItem => eachItem.category === categoryId,
    )
    return filterList
  }

  render() {
    const {isImageToBeMatched, isGameOver, categoryId, time, score} = this.state
    const {tabsList} = this.props
    const filterThumbNailsList = this.filterTheThumbNails()

    return (
      <div className="bg-container">
        <nav className="match-game-timer-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            className="website-logo"
            alt="website logo"
          />
          <ul className="score-seconds-body">
            <p className="score-para">
              Score: <span className="score">{score}</span>
            </p>
            <li className="time-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                className="timer-logo"
                alt=" timer"
              />
              <p className="timing">{time} sec</p>
            </li>
          </ul>
        </nav>
        <div className="image-tab-thumbnail-display-card">
          {!isGameOver && (
            <ul className="main-image-card">
              <RandomImage
                key={isImageToBeMatched.id}
                randomImageObject={isImageToBeMatched}
              />
            </ul>
          )}
          {!isGameOver && (
            <ul className="tab-card">
              {tabsList.map(eachItem => (
                <TabItem
                  key={eachItem.tabId}
                  isTabActive={eachItem.tabId === categoryId}
                  tabObject={eachItem}
                  onClickOfTab={this.onClickOfTab}
                />
              ))}
            </ul>
          )}
          {!isGameOver && (
            <ul className="thumbnail-card">
              {filterThumbNailsList.map(eachItem => (
                <Thumbnails
                  key={eachItem.id}
                  thumbnailObject={eachItem}
                  onClickOfThumbnail={this.onClickOfThumbnail}
                />
              ))}
            </ul>
          )}
          {isGameOver && (
            <ScoreCard
              key="score-card"
              score={score}
              onPlayAgain={this.onPlayAgain}
            />
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
