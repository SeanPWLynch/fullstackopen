const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { json } = require('express');

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find();
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save();

    if (savedBlog) {
        response.json(savedBlog)
    }
    else {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const result = await Blog.findByIdAndRemove(request.params.id)

    console.log(result);

    response.status(204).end()
})

module.exports = blogsRouter