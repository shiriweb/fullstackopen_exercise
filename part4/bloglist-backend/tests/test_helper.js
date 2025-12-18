const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'First blog', author: 'John', url: 'http://blog1.com', likes: 5 },
  { title: 'Second blog', author: 'Jane', url: 'http://blog2.com', likes: 10 }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'temp', url: 'http://temp.com' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }
