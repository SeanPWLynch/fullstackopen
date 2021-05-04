const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'sean',
            name: 'sean',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'root',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('E11000 duplicate key error collection: bloglist-app.users index: username_1 dup key: { username: \"root\" }')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username or password less then three characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUserBadUserName = {
            username: 'ro',
            name: 'ro',
            password: 'password',
        }

        const resultUsername = await api
            .post('/api/users')
            .send(newUserBadUserName)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(resultUsername.body.error).toContain( 'User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3)., name: Path `name` (`ro`) is shorter than the minimum allowed length (3).')

        const newUserBadPass = {
            username: 'robot',
            name: 'robot',
            password: 'pa',
        }

        const resultPassword = await api
        .post('/api/users')
        .send(newUserBadPass)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(resultPassword.body.error).toContain( 'Path `password` (`s`) is shorter than the minimum allowed length (3)')


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})