/* eslint-disable quotes */
const Blog = require('../models/blog')
const initialBlogs = [
  {
    "id": "5e1c6267a5baec1980504336",
    "title": "some title",
    "author": " some author",
    "url": "https://yle.fi/",
    "likes": 67
  },
  {
    "id": "5e1c6d15eaa43c1dfecd55cc",
    "title": "some title 1",
    "author": " some author 1",
    "url": "https://yle.fi/",
    "likes": 1
  }, 
  {
    "id": "5e1c6d3836fd0f1e06a5d3eb", 
    "title": "some title 2",
    "author": " some author 3",
    "url": "https://yle.fi/",
    "likes": 3
    
  }
]

const blogsDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map( blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsDB
}
  
