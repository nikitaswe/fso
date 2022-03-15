import React, { useState, useEffect, useRef } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      handleToken(user.token)
    }
  }, [])

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handleToken = newToken => {
    setToken(`bearer ${newToken}`)
  }

  const handleLike = async blogId => {
    try {
      let blog = await blogService.get(blogId)
      blog = await blogService.update(blogId, { likes: blog.likes + 1 }, token)
      setBlogs(blogs.map(b => (b.id === blogId ? blog : b)))
      setSuccessMessage('Likes has been updated')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Likes can not be updated')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async blogId => {
    const result = window.confirm('Delete Blog?')
    if (result) {
      try {
        await blogService.deleteBlog(blogId, token)
        setSuccessMessage('Blog has been deleted')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('Blog can not be deleted')
        console.log(exception)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      setBlogs(blogs.filter(b => b.id !== blogId))
    }
  }

  const handleCreateForm = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject, token)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage('Blog has been added')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog can not be added')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      handleToken(user.token)
      setUsername('')
      setPassword('')
      setSuccessMessage('Loged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const toggleLooginVisible = () => setLoginVisible(!loginVisible)
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    setSuccessMessage('Loged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Blog List App</h1>
      <Notification message={successMessage} styleName="success" />
      <Notification message={errorMessage} styleName="error" />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          onChangeUsername={handleUsernameChange}
          onChangePassword={handlePasswordChange}
          onSubmit={handleLogin}
          loginVisible={loginVisible}
          onClickLoginCancel={toggleLooginVisible}
        />
      ) : (
        <>
          <div>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateForm handleCreateForm={handleCreateForm} />
          </Togglable>
        </>
      )}
      <BlogList blogs={blogs} likeBlog={handleLike} deleteBlog={handleDelete} />
    </div>
  )
}

export default App
