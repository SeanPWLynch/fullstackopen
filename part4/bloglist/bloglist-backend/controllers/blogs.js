const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { json } = require('express');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save();
    response.json(savedBlog);

})

module.exports = blogsRouter