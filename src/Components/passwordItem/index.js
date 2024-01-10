import './index.css'
const UserPasswordItem = props => {
  const {userPasswordDetails, checkBoxValue, deleteIcon} = props
  const {websiteName, userName, password, initialValue, classAdd, id} =
    userPasswordDetails

  const showPassword = () => {
    if (checkBoxValue) {
      return <p className="user-name">{userName}</p>
    } else {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="stars"
        />
      )
    }
  }

  const onDeleteHandler = () => {
    deleteIcon(id)
  }

  return (
    <li className="list-card-container">
      <p className={classAdd}>{initialValue}</p>
      <div className="text-container">
        <p className="web-name">{websiteName}</p>
        <p className="user-name">{password}</p>
        {showPassword()}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteHandler}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default UserPasswordItem
