import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

import UserPasswordItem from '../passwordItem'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    inputWebSite: '',
    inputCheckBox: false,
    inputUserName: '',
    inputPassword: '',
    userData: [],
    filterSearchInput: '',
  }

  deleteAccount = id => {
    const {userData} = this.state
    const deleteFilterResults = userData.filter(eachItem => eachItem.id !== id)
    this.setState({
      userData: deleteFilterResults,
    })
  }

  addDetails = event => {
    event.preventDefault()

    const {inputWebSite, inputPassword, inputUserName} = this.state
    const initial = inputWebSite.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newUser = {
      id: v4(),
      websiteName: inputWebSite,
      userName: inputUserName,
      password: inputPassword,
      initialValue: initial,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      userData: [...prevState.userData, newUser],
      inputPassword: '',
      inputWebSite: '',
      inputUserName: '',
    }))
  }

  changeWeb = event => {
    this.setState({
      inputWebSite: event.target.value,
    })
  }
  changeUserName = event => {
    this.setState({
      inputUserName: event.target.value,
    })
  }
  changePassword = event => {
    this.setState({
      inputPassword: event.target.value,
    })
  }

  onToggleCheckBox = () => {
    this.setState(prevState => ({
      inputCheckBox: !prevState.inputCheckBox,
    }))
  }

  filterSearch = event => {
    this.setState({
      filterSearchInput: event.target.value,
    })
  }

  cardContainer = () => {
    const {inputWebSite, inputUserName, inputPassword} = this.state
    return (
      <div className="card-container1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt="password manager"
          className="password-manager-image1"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
          className="password-manager-image2"
        />

        <div className="input-card-container">
          <h1 className="add-new-password-heading">Add New Password</h1>
          <form className="form-container" onSubmit={this.addDetails}>
            <div className="input-btn-flex-container">
              <button className="btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-logo"
                />
              </button>
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                onChange={this.changeWeb}
                value={inputWebSite}
              />
            </div>
            <div className="input-btn-flex-container">
              <button className="btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-logo"
                />
              </button>
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                onChange={this.changeUserName}
                value={inputUserName}
              />
            </div>
            <div className="input-btn-flex-container">
              <button className="btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website-logo"
                />
              </button>
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                onChange={this.changePassword}
                value={inputPassword}
              />
            </div>
            <button type="submit" className="submit-btn">
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }
  renderNoPassword = () => {
    const {userData} = this.state

    if (userData.length === 0) {
      return (
        <>
          <div className="no-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="nopassword-img"
            />
            <p className="add-new-password-heading">No Passwords</p>
          </div>
        </>
      )
    }
  }

  passwordsDetails = () => {
    const {userData, inputCheckBox, filterSearchInput} = this.state
    const filterResult = userData.filter(eachItem =>
      eachItem.websiteName
        .toLowerCase()
        .includes(filterSearchInput.toLocaleLowerCase()),
    )

    return (
      <ul className="list-container">
        {filterResult.map(eachItem => (
          <UserPasswordItem
            key={eachItem.id}
            userPasswordDetails={eachItem}
            checkBoxValue={inputCheckBox}
            deleteIcon={this.deleteAccount}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {inputCheckBox, userData, filterSearchInput} = this.state
    const passwordCount = userData.length

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="top-logo-img"
        />
        {this.cardContainer()}

        <div className="password-card-container">
          <div className="password-top-heading-flex-container">
            <div className="flex-container">
              <h1 className="add-new-password-heading">Your Passwords</h1>
              <p className="password-count">{passwordCount}</p>
            </div>
            <div className="search-flex-container">
              <button className="search-btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
              </button>
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.filterSearch}
                value={filterSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkBox"
              value={inputCheckBox}
              onChange={this.onToggleCheckBox}
            />
            <label htmlFor="checkBox" className="label">
              Show Passwords
            </label>
          </div>

          {this.renderNoPassword()}
          {this.passwordsDetails()}
        </div>
      </div>
    )
  }
}
export default PasswordManager
