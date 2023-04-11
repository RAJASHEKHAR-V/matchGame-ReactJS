import './index.css'

const Thumbnails = props => {
  const {thumbnailObject, onClickOfThumbnail} = props
  const {id, thumbnailUrl} = thumbnailObject
  const onThumbnail = () => {
    onClickOfThumbnail(id)
  }

  return (
    <li className="thumbnail-item">
      <button className="thumbnail-button" type="submit" onClick={onThumbnail}>
        <img src={thumbnailUrl} className="thumbnail-image" alt="thumbnail" />
      </button>
    </li>
  )
}

export default Thumbnails
