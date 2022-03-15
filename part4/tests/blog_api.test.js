const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)

const initialBlogs = listHelper.blogs
const firstUser = listHelper.firstUser
const blogsInDb = () => listHelper.blogsInDb()

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(firstUser.password, 10)
  const user = new User({ username: firstUser.username, passwordHash })
  const savedUser = await user.save()
  const blogsWithUser = initialBlogs.map(blog => {
    blog.user = savedUser._id
    return blog
  })
  await Blog.deleteMany({})
  await Blog.insertMany(blogsWithUser)
})

const login = async () => {
  const user = await api
    .post('/api/login')
    .send(firstUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return user.body
}

describe('when there is initially some blogs saved', () => {
  test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  }, 10000)

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 10000)
})

describe('addition of a new blog', () => {
  test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
    const user = await login()

    const newBlog = {
      title: 'My new blog',
      author: 'Nikita Kukshynsky',
      url: 'https://github.com/enkeipy/',
      likes: 0,
      user: user._id
    }

    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(postResponse.body.id).toBeDefined()
    expect(postResponse.body.title).toBeDefined()
    expect(postResponse.body.author).toBeDefined()
    expect(postResponse.body.url).toBeDefined()
    expect(postResponse.body.user).toBeDefined()

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  }, 10000)

  test('if the title, url or author properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const user = await login()

    let newBlog = {
      title: 'My new blog',
      url: 'https://github.com/enkeipy/',
      likes: 0,
      user: user._id
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newBlog)
      .expect(400)

    newBlog = {
      url: 'https://github.com/enkeipy/',
      author: 'Nikita Kukshynsy',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'My new blog',
      author: 'Nikita Kukshynsy',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newBlog)
      .expect(400)

    newBlog = {
      author: 'Nikita Kukshynsy',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newBlog)
      .expect(400)
  }, 10000)

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const user = await login()
    const newBlog = {
      title: 'My new blog',
      author: 'Nikita Kukshynsky',
      url: 'https://github.com/enkeipy/',
      user: user._id
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newBlog)
      .expect(201)
    expect(response.body.likes).toBe(0)
  }, 10000)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = await login()
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + user.token.toString())
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('succeeds with status code 200 if id and likes are valid', async () => {
    const user = await login()
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const numberOfLikes = 666
    const newLikes = { likes: numberOfLikes }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer ' + user.token.toString())
      .send(newLikes)
      .expect(200)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.likes).toBe(numberOfLikes)
    expect(updatedBlog.title).toBe(blogToUpdate.title)
  })
})

describe('token works', () => {
  test('adding a blog fails with the status code 401 Unauthorized if a token is not provided', async () => {
    const user = await login()

    const newBlog = {
      title: 'My new blog',
      author: 'Nikita Kukshynsky',
      url: 'https://github.com/enkeipy/',
      likes: 0,
      user: user._id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
