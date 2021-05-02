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

describe('Delete Functionality', () => {
    test('Delete by ID works', async () => {
        await api.delete('/api/blogs/5a422bc61b54a676234d17fc').expect(204)
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)

        expect(titles).not.toContain("Type wars")

    })

    test('Delete with incorrect ID returns 204 no content', async () => {
        await api.delete('/api/blogs/5a422bc61b54a676234d17fa').expect(204)
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Update Functionality', () => {
    test('Update by ID works', async () => {

        const blog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 10
        }

        const updatedBlog = await api.put('/api/blogs/5a422bc61b54a676234d17fc').send(blog).expect(200)

        expect(updatedBlog.body.likes).toBe(10)

    })

})

afterAll(() => {
    mongoose.connection.close()
})