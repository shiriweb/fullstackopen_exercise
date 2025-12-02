const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogController.js')

const app = express()
app.use(express.json())

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.get('/api/blogs', blogsRouter.getAllBlogs)
app.post('/api/blogs', blogsRouter.createBlog)

const PORT = 3003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
