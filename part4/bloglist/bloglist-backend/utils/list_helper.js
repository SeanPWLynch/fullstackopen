const _ = require('lodash');


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)

}

const favouriteBlog = (blogs) => {
    const reducer = (prev, current) => {

        return (prev.likes > current.likes) ? prev : current
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, blogs[0])

}

const mostBlogs = (blogs) => {
    const mostBlogs = _.chain(blogs).groupBy('author').map((group, author) => {
        return {
            author: author,
            blogs: group.length
        }
    }).maxBy(author => author.blogs).value()
    return blogs.length === 0 ? 0 : mostBlogs

}

const mostLikes = (blogs) => {
    const reducer = (prev, current) => {

        return (prev.likes > current.likes) ? prev : current
    }

    const mostLikes = _.chain(blogs).groupBy('author').map((group, author) => {
        return {
            author: author,
            likes: group.reduce((sum, current) => {
                return sum += current.likes
            }, 0)
        }
    }).maxBy(author => author.likes).value()
    return blogs.length === 0 ? 0 : mostLikes

}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}