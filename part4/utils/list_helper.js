const _ = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

const firstUser = {
  username: 'root',
  password: '123456'
}

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const dummy = () => {
  return 1
}

const totalLikes = blogPosts => {
  return blogPosts.reduce((x, y) => x + y.likes, 0)
}

const favoriteBlog = blogPosts => {
  let index = 0
  blogPosts.forEach((el, i) => {
    index = el.likes > blogPosts[index].likes ? i : index
  })
  const favorite = blogPosts[index]
  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

const mostBlogs = blogPosts => {
  const authorsTotal = _.countBy(blogPosts, 'author')
  const mostBlogsAuthor = _.maxBy(_.keys(authorsTotal), function (o) {
    return authorsTotal[o]
  })

  return { author: mostBlogsAuthor, blogs: authorsTotal[mostBlogsAuthor] }
}

const mostLikes = blogPosts => {
  const authorsBlogs = _.groupBy(blogPosts, 'author')
  const authorsLikes = _.forEach(authorsBlogs, (value, key) => {
    authorsBlogs[key] = _.sumBy(value, 'likes')
  })
  const mostLikesAuthor = _.maxBy(_.keys(authorsLikes), function (o) {
    return authorsLikes[o]
  })

  return { author: mostLikesAuthor, likes: authorsLikes[mostLikesAuthor] }
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'You wont find it',
    author: 'Nikita Kukshynsky',
    url: 'https://github.com/enkeipy/',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  firstUser,
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  nonExistingId,
  blogsInDb,
  usersInDb
}
