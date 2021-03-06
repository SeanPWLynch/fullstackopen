const blog = require('../models/blog')
const user = require('../models/user')
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: '60968b711f295703e0ec1cb3',
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: '60968b711f295703e0ec1cb3',
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: '60968b711f295703e0ec1cb3',
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user: '60968b711f295703e0ec1cb2',
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: '60968b711f295703e0ec1cb2',
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        user: '60968b711f295703e0ec1cb2',
        __v: 0
    }
]

const initialUsers =
    [
        {
            _id: '60968b711f295703e0ec1cb3',
            username: "root",
            name: "root",
            passwordHash: "$2b$10$SrwerYAdY33cZf9maMgxhu/dmsfzr19AoRY1oRdopT8au0g7k8aR2",
            blogs: ["5a422a851b54a676234d17f7", "5a422aa71b54a676234d17f8", "5a422b3a1b54a676234d17f9"],
            __v: 0
        },
        {
            _id: '60968b711f295703e0ec1cb2',
            username: "sean",
            name: "sean",
            passwordHash: "$2b$10$MSvUEeg82t/FMh71RlRUretdW5.kOX194YTmjbQ26eCnfLD4ijoeq",
            blogs: ["5a422b891b54a676234d17fa", "5a422ba71b54a676234d17fb","5a422bc61b54a676234d17fc"],
            __v: 0
        }
    ]

const nonExistingId = async () => {
    const blog = new blog({ content: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDB = async () => {
    const blogs = await blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await user.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDB, usersInDb
}