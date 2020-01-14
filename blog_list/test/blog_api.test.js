/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach( async () => {
  await Blog.deleteMany({})
  const blogsObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsObject.map( blog => blog.save())
  
  await Promise.all( promiseArray)
})

describe('Test API for blog list app', () => {
  test('blogs returned in JSON format', async ()=> {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returned 3 blog items', async ()=> {
    const res = await api.get('/api/blogs')
    
    expect(res.body.length).toBe(helper.initialBlogs.length)
  })
  test('unique identifier name is id', async ()=> {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()

  })

  test('HTTP POST request creates a new blog post', async ()=> {
    const newBlog = {
      title : 'some title 2',
	    author : 'some author 3',
      url : 'some url',
      likes : 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogList = await api.get('/api/blogs')
    expect( blogList.body.length).toBe( helper.initialBlogs.length + 1)
    const blogTitles = blogList.body.map( blog => blog.title)
    expect(blogTitles).toContain('some title 2')
  })

  test('Likes property equal to 0 if it not exist in request' , async () => {
    const newBlog = {
      title : 'some title 2',
      author : 'some author 3',
      url : 'some url'  
    }
    const savedBlogs = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect( savedBlogs.body.likes).toBe( 0 )
  })
  
  test('If title or url properrtie are missing send status code 400', async () => {
    const blogTitleMiss = {
      author : 'some author 3',
      url : 'some url'  
    }
    const blogUrlMiss = {
      author : 'some author 3',
      url : 'some url'  
    }
    await api
      .post('/api/blogs')
      .send(blogTitleMiss)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(blogUrlMiss)
      .expect(400)
  })

  test('Blog will be delete successfully ', async () => {
    const blogToDeleteID = helper.initialBlogs[0].id    
    await api
      .delete(`/api/blogs/${ blogToDeleteID }`)
      .expect(200)
  })

  test('Blog will be update successfully ', async () => {
    const blogToUpdateId = helper.initialBlogs[0].id
    const blogToUpdateContent = {
      likes : 2, 
      url : 'some url 2222'
    }
    await api
      .put(`/api/blogs/${ blogToUpdateId }`)
      .send( blogToUpdateContent )
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})