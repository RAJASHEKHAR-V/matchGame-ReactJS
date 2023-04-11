import './index.css'

const RandomImage = props => {
  const {randomImageObject} = props
  const {imageUrl} = randomImageObject

  return (
    <li className="image-item">
      <img src={imageUrl} className="main-image" alt="match" />
    </li>
  )
}

export default RandomImage
