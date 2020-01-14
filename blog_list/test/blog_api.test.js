/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach( async () => {
  await Blog.deleteMany({})
  //console.log('Blogs helper', helper)
  //console.log('Blogs Initial Blogs', helper.initialBlogs )
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
    const res = await api.get('/api/')

  })
})

afterAll(() => {
  mongoose.connection.close()
})