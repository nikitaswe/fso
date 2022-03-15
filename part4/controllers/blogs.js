const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    let requestId = request.params.id
    if (typeof requestId === 'string') {
      requestId = mongoose.Types.ObjectId(requestId)
    }
    const blog = await Blog.findById(requestId)
    if (blog) {
      response.json(blog)
    } else {
      response.status(401).json({ error: `id#${requestId} is invalid` })
    }
  } catch (error) {
    let e = new Error('Invalid blog id')
    e.name = 'InvalidBlogId'
    throw e
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    date: new Date(),
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const requestId = request.params.id
  const blog = await Blog.findById(requestId)
  if (blog && blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'Unauthorized: deleting a blog is possible only for the author' })
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const requestId = request.params.id
  const blog = await Blog.findById(requestId)
  if (blog && blog.user.toString() === user._id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(requestId, request.body, { new: true })
    response.json(updatedBlog)
  } else {
    response
      .status(401)
      .json({ error: 'Unauthorized: updating a blog is possible only for the author' })
  }
})

module.exports = blogsRouter
