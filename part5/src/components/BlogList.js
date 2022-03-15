import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, deleteBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      ))}
    </div>
  )
}

export default BlogList
