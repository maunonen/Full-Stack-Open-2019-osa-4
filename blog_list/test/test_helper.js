/* eslint-disable quotes */
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const loginUserId = new mongoose.Types.ObjectId()

const setupDBLoginUser = async () => {
  try {
    const saltRounds = 10 
    const loginUserObject = {
      _id : loginUserId,
      username : 'alex11', 
      passwordHash : await bcrypt.hash('alex11', saltRounds), 
      name : 'alex11',
      token : jwt.sign({ id : loginUserId, username : this.username }, process.env.SECRET)
    }
    const newuser = new User(loginUserObject)
    await newuser.save()
    return loginUserObject.token
  } catch (err) {
    console.log( err)
  }
} 

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
  initialBlogs, blogsDB, 
  setupDBLoginUser 
}
  
