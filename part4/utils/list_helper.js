const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0);
}

const favouriteBlog = (blogs) => {
    let favouriteBlog = blogs[0];

    blogs.forEach(blog => {
        if(favouriteBlog.likes < blog.likes)
            favouriteBlog = blog;
    })

    return favouriteBlog;
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author);
    const numberOfBlogs = new Array(authors.length).fill(0);
    blogs.forEach((blog, index) => {
        numberOfBlogs[authors.findIndex(author => author === blog.author)] += 1;
    })
    
    const index = numberOfBlogs.indexOf(Math.max(...numberOfBlogs));
    const result = {
        author : authors[index],
        blogs : numberOfBlogs[index]
    }

    return result;
}

const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author);
    const numberOfLikes = blogs.map(blog => blog.likes);

    const mostLikesIndex = numberOfLikes.indexOf(Math.max(...numberOfLikes));
    const result = {
        author : authors[mostLikesIndex],
        likes : numberOfLikes[mostLikesIndex]
    }

    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}