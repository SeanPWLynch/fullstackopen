const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('id property returned name id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('new blog post is saved', async () => {
    const newBlog = {
        title: "new blog test",
        author: "Wed, 21 Oct 2015 18:27:50 GMT",
        url: "localhost",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain(
        'new blog test'
    )
})

test('likes default to zero if missing', async () => {
    const newBlog = {
        title: "new blog test, likes missing",
        author: "Wed, 21 Oct 2015 18:27:50 GMT",
        url: "localhost"
    }

    const request = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(request.body.likes).toBeDefined()
    expect(request.body.likes).toBe(0)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

test('Fail if title or url missing', async () => {
    const newBlog = {
        //title: "new blog test, likes missing",
        author: "Fri, 30 Apr 2021 18:27:50 GMT",
        //url: "localhost"
        likes: 0
    }

    const request = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

afterAll(() => {
    mongoose.connection.close()
})