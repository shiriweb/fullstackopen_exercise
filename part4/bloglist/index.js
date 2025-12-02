const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())



const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => response.json(blogs))
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
