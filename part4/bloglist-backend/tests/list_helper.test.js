const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '1',
    title: 'Blog 1',
    author: 'Author A',
    url: 'url1',
    likes: 5,
    __v: 0,
  },
  {
    _id: '2',
    title: 'Blog 2',
    author: 'Author B',
    url: 'url2',
    likes: 10,
    __v: 0,
  },
  {
    _id: '3',
    title: 'Blog 3',
    author: 'Author A',
    url: 'url3',
    likes: 7,
    __v: 0,
  },
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy([])
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 22)
  })

  test('sum of likes of empty list', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  test('blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[1]) 
  })
})

describe('most blogs', () => {
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Author A', blogs: 2 })
  })
})

describe('most likes', () => {
  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Author A', likes: 12 })
  })
})
