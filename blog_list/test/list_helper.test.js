const listHelper = require('../utils/list_helper')

describe('Test for favourite function' , ()=> {

  test('Return empty object for empty array', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
       expect(result).toEqual({})
  })

  test('Return single object, if array consists of one object', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
    ]
    const result = listHelper.favoriteBlog(blogs)
       expect(result).toEqual({
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    })
  })

  test('Return favourite object with 12 likes', ()=> {
    const blogs  = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }]
       const result = listHelper.favoriteBlog(blogs)
       expect(result).toEqual( {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      })

  } )
})

describe('Test for dummy faunction',  () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})
describe('average', () => {

  test('Total likes of empty array is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)

  })

  test('List of one blog is equal to the likes in the blog object', () => {
    
    const blogs = [ 
      {
        "title": "some title",
        "author": " some author",
        "url": "some url",
        "likes": 20
      }
    ] 
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(20)
  })

  test('return total likes of Blogs', () => {
    const blogs = [ 
      {
        "title": "some title",
        "author": " some author",
        "url": "some url",
        "likes": 20
      }, 
      {
        "title": "some title",
        "author": " some author",
        "url": "some url",
        "likes": 10
      },
      {
        "title": "some title",
        "author": " some author",
        "url": "some url",
        "likes": 0
      },  
    ]
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(30)
  })

})

