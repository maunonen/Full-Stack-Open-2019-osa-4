/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res, next) => {
  
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username : 1, name : 1 } )
    res.json( blogs.map( blog => blog.toJSON()))
  } catch( err ){
    next(err)
  }
} 
)

blogsRouter.post('/', async (req, res, next) => {
  
  const token = getTokenFrom(req)
  const body = req.body
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if ( !token || !decodedToken.id ){
      return res.status(401).json({ error : 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    if (!user){ 
      return res.status(400).json({ error : 'User not found in Database'})
    }

    const blog = new Blog({
      title : body.title,
      author : user.name, 
      url: body.url, 
      likes: body.likes || 0, 
      user : body.user
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat( savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog.toJSON())
  } catch (err){
    next(err)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    //console.log('ID', req.params.id)
    await Blog.findByIdAndRemove(req.params.id)
    res.status(200).end()
  } catch (err){
    next(err)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blogToUpdate = {}
  if ( body.title){
    blogToUpdate['title'] = body.title
  }
  if ( body.author ){
    blogToUpdate['author'] = body.author  
  }
  if ( body.likes){
    blogToUpdate['likes'] = body.likes
  }
  if (body.url) {
    blogToUpdate['url'] = body.url
  }
  if ( _.isEmpty( blogToUpdate)){
    res.status(400).send({ error : 'Check updated object'})
  }

  console.log('Blog to update', blogToUpdate )
  try {
    await Blog.findByIdAndUpdate( req.params.id, blogToUpdate, { new : true })    
    res.status(200).end()
  } catch (err) {
    next(err)
  }
}) 


module.exports = blogsRouter