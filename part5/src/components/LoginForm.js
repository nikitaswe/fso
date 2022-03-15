import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onSubmit,
  loginVisible,
  onClickLoginCancel
}) => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={onClickLoginCancel}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Log in to application</h2>
        <form onSubmit={onSubmit}>
          <div>
            username
            <input
              id="loginUsername"
              type="text"
              value={username}
              name="Username"
              onChange={onChangeUsername}
            />
          </div>
          <div>
            password
            <input
              id="loginPassword"
              type="password"
              value={password}
              name="Password"
              onChange={onChangePassword}
            />
          </div>
          <button id="loginSubmit" type="submit">
            login
          </button>
        </form>
        <button onClick={onClickLoginCancel}>cancel</button>
      </div>
    </>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  loginVisible: PropTypes.bool.isRequired,
  onClickLoginCancel: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
