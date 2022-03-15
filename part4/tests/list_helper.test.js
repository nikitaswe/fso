const { expect } = require('@jest/globals')
const listHelper = require('../utils/list_helper')

const blogs = listHelper.blogs

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })
  test('when list has many blogs, equals the sum of them', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, equals to that blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    const truthObject = { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes }
    expect(result).toEqual(truthObject)
  })
  test('when list has many blogs, equals to the blog which has most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const truthObject = { title: blogs[2].title, author: blogs[2].author, likes: blogs[2].likes }
    expect(result).toEqual(truthObject)
  })
})

describe('largest amount of blogs', () => {
  test('when list has only one blog, equals to that author and 1', () => {
    const result = listHelper.mostBlogs([blogs[0]])
    const truthObject = { author: blogs[0].author, blogs: 1 }
    expect(result).toEqual(truthObject)
  })
  test('when list has many blogs, equals to the author with the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const truthObject = { author: 'Robert C. Martin', blogs: 3 }
    expect(result).toEqual(truthObject)
    expect(result).toEqual(truthObject)
  })
})

describe('author with the largest amount of likes', () => {
  test('when list has only one blog, equals to that author and likes', () => {
    const result = listHelper.mostLikes([blogs[0]])
    const truthObject = { author: blogs[0].author, likes: blogs[0].likes }
    expect(result).toEqual(truthObject)
  })
  test('when list has many blogs, equals to the author with the largest amount of total likes', () => {
    const result = listHelper.mostLikes(blogs)
    const truthObject = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(result).toEqual(truthObject)
    expect(result).toEqual(truthObject)
  })
})
