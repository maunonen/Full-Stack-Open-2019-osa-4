/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const _ = require('lodash')

blogsRouter.get('/', async (req, res, next) => {
  
  try {
    const blogs = await Blog.find({})
    res.json( blogs.map( blog => blog.toJSON()))
  } catch( err ){
    next(err)
  }
} 
)

blogsRouter.post('/', async (req, res, next) => {
  
  if ( req.body.title === undefined || req.body.url === undefined){
    return res.status(400).send()
  }
  const blog = new Blog({
    title : req.body.title,
    author : req.body.author, 
    url: req.body.url, 
    likes: req.body.likes || 0
  })

  try {
    const savedBlog = await blog.save()
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