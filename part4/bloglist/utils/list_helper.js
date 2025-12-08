const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let fav = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > fav.likes) {
      fav = blog
    }
  })
  return fav
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const count = {}

  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] || 0) + 1
  })

  let topAuthor = null
  let maxBlogs = 0

  for (const author in count) {
    if (count[author] > maxBlogs) {
      topAuthor = author
      maxBlogs = count[author]
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likeCount = {}

  blogs.forEach(blog => {
    likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes
  })

  let topAuthor = null
  let maxLikes = 0

  for (const author in likeCount) {
    if (likeCount[author] > maxLikes) {
      topAuthor = author
      maxLikes = likeCount[author]
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
