const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { json } = require('express');
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find().populate('user', { username: 1, name: 1, id: 1 });
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
    const body = new Blog(request.body)
    console.log(request.token);
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save();

    if (savedBlog) {
        response.json(savedBlog)
    }
    else {
        response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response, next) => {


    const body = request.body

    if (!body) {
        response.status(400, "Missing Body").end()
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    }
    else {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const result = await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
})

module.exports = blogsRouter