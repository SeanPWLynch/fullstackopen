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

    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    console.log(request.user);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user._id
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

    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    console.log(request.user, blog.user);

    if (blog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(403).json({ error: 'blogs can only be removed by user who created them' })
    }
})

module.exports = blogsRouter