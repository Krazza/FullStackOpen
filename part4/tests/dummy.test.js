const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
})

describe("total likes", () => {
    const listWithOneBlog = [
        {
            title: "Valorant guides",
            author: "SEN TENZ",
            url: "https://sentenzguides.com",
            likes: 5000,
            id: "648877f99e92a32a46c0fb27"
        }
    ]

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5000);
    })
})

describe("favourite blog", () => {
    const blogList = [
        {
            title: "Clever books",
            author: "Stephen King",
            url: "https://king.com",
            likes: 142,
            id: "648877f91e22a33a46c0fb27"
        },
        {
            title: "Tasty fruits",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 21,
            id: "148877f99e92a32a46c0fb23"
        },
        {
            title: "Valorant guides",
            author: "SEN TENZ",
            url: "https://sentenzguides.com",
            likes: 5000,
            id: "648877f99e92a32a46c0fb27"
        }
    ]

    test("find the blog with most likes and compare", () => {
        const favBlog = listHelper.favouriteBlog(blogList);
        expect(favBlog).toEqual(blogList[2]);
    })
})

describe("most blogs", () => {
    const blogList = [
        {
            title: "Clever books",
            author: "Stephen King",
            url: "https://king.com",
            likes: 142,
            id: "648877f91e22a33a46c0fb27"
        },
        {
            title: "Tasty fruits_01",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 21,
            id: "148177f99e92a32a46c0fb23"
        },
        {
            title: "Tasty fruits_02",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 5,
            id: "183877f99e92a32a46c0fb23"
        },
        {
            title: "Tasty fruits_03",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 4,
            id: "142577f99e92a32a46c0fb23"
        },
        {
            title: "Valorant guides",
            author: "SEN TENZ",
            url: "https://sentenzguides.com",
            likes: 5000,
            id: "648877f99e92a32a46c0fb27"
        }
    ]

    const topAuthor = {
        author : "Kevin",
        blogs : 3
    }

    test("finds and compares the author with most blogs", () => {
        const author = listHelper.mostBlogs(blogList);
        expect(author).toEqual(topAuthor);
    })
})

describe("most likes", () => {
    const blogList = [
        {
            title: "Clever books",
            author: "Stephen King",
            url: "https://king.com",
            likes: 142,
            id: "648877f91e22a33a46c0fb27"
        },
        {
            title: "Tasty fruits_01",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 21,
            id: "148177f99e92a32a46c0fb23"
        },
        {
            title: "Tasty fruits_02",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 5,
            id: "183877f99e92a32a46c0fb23"
        },
        {
            title: "Tasty fruits_03",
            author: "Kevin",
            url: "https://kevinsfruits.com",
            likes: 4,
            id: "142577f99e92a32a46c0fb23"
        },
        {
            title: "Valorant guides",
            author: "SEN TENZ",
            url: "https://sentenzguides.com",
            likes: 5000,
            id: "648877f99e92a32a46c0fb27"
        }
    ]

    const topAuthor = {
        author : "SEN TENZ",
        likes : 5000
    }

    test("finds and compares the author with most likes", () => {
        const author = listHelper.mostLikes(blogList);
        expect(author).toEqual(topAuthor);
    })
})