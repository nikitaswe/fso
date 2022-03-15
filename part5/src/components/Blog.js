import { React, useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [short, setShort] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className="blog" style={blogStyle}>
      {short === false ? (
        <>
          <h1>{blog.title}</h1>
          <div>{blog.url}</div>
          <div>
            <span className="numberOfLikes">{blog.likes}</span>{' '}
            <button className="likeButton" onClick={() => likeBlog(blog.id)}>
              Like
            </button>
          </div>
          <h3>{blog.author}</h3>
          <div>
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          </div>
        </>
      ) : (
        <>
          <strong>{blog.title}</strong> by {blog.author}
        </>
      )}{' '}
      <button className="viewAndHide" onClick={() => setShort(!short)}>
        {short === true ? 'view' : 'hide'}
      </button>
    </div>
  )
}

export default Blog
