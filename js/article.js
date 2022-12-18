async function loadArticle() {
    const response = await fetch('https://gorest.co.in/public-api/posts/' + document.location.search.substring(document.location.search.indexOf('=') + 1));
    const data = await response.json()
    return data
}

async function loadComments() {
    const response = await fetch('https://gorest.co.in/public-api/comments?post_id=' + document.location.search.substring(document.location.search.indexOf('=') + 1));
    const data = await response.json()
    return data
}


document.addEventListener('DOMContentLoaded', async function test() {
    let result = await loadArticle();
    let comments = await loadComments();
    let title = document.querySelector('#article__title')
    let body = document.querySelector('#article__body')
    let comments_container = document.querySelector('.comments');
    result = await loadArticle()
    let article = result.data;
    title.textContent = article.title;
    body.textContent = article.body
    for (let comment of comments.data) {
        comments_container.innerHTML += `<ul>
            <li>${comment.name}</li>
            <li>${comment.email}</li>
            <li>${comment.body}</li>
            </ul>`

    }

})