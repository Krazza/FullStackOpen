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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}