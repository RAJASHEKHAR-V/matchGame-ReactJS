import './index.css'

const TabItem = props => {
  const {isTabActive, tabObject, onClickOfTab} = props
  const {tabId, displayText} = tabObject
  const onTab = () => {
    onClickOfTab(tabId)
  }
  const addActiveTab = isTabActive ? 'active-tab' : ''

  return (
    <li className="tab-item">
      <button
        className={`tab-button ${addActiveTab}`}
        type="submit"
        onClick={onTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
