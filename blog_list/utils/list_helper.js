const dummy = (blogs) => {
  return 1 
}

const totalLikes = (blogs) => {

  return blogs.length === 0 
    ? 0 
    : blogs.reduce(( prev, cur)  => {
      return prev + cur.likes
    }, 0)  
  
}

const favoriteBlog = (blogs) => {
 
  return blogs.length === 0 
    ? {}
    : blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, 0)
}

const mostBlogs = () => {
  
  const mostBlogs = {
    author: "Robert C. Martin",
    blogs: 3
  }
}

module.exports  = {
  dummy, totalLikes, favoriteBlog
}