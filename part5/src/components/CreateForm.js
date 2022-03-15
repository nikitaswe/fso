import React, { useState } from 'react'

const CreateForm = ({ handleCreateForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = e => setTitle(e.target.value)
  const handleAuthorChange = e => setAuthor(e.target.value)
  const handleUrlChange = e => setUrl(e.target.value)

  const createBlog = event => {
    event.preventDefault()
    handleCreateForm({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            id="formTitle"
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id="formAuthor"
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input id="formUrl" type="url" value={url} name="url" onChange={handleUrlChange} />
        </div>
        <button id="formSubmit" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateForm
