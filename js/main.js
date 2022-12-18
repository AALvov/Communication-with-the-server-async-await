async function loadArticles() {


    const response = await fetch('https://gorest.co.in/public-api/posts' + document.location.search);
    const data = await response.json()

    return data
}
function newpagination(b, c, d) {
    return Array(d + 1).join("1").split("").map(function (a, b) {
        return b + 1
    }).filter(function (a, e) {
        return c ? 1 == a || a == b || a == d || a <= b + c && a >= b - c : !0
    })
};

document.addEventListener('DOMContentLoaded', async function test() {
    let result = await loadArticles();
    let container = document.querySelector('.main');          
    let countOfItems = result.meta.pagination.pages;
    let showPage = (function () {
        let active;
        return async function (item) {
            if (active) {
                active.classList.remove('active');
            }
            active = item;
            let pageNum = +item;           
            result = await loadArticles()
            let notes = result.data;
            container.innerHTML = '';
            for (let note of notes) {
                container.innerHTML += `<article >
        <h2>
            ${note.title}
        </h2>
        <a href="article.html?id=${note.id}" class="btn btn-primary" id="link_0">Подробнее</a>
    </article>`
            }          
            addPagination(item)
        };
    }());
    function addPagination(active) {
        if (!active) {
            active = 1;
        }
        let newItems = newpagination(Number(active), 2, Number(countOfItems));
        let items = [];
        let ul = document.querySelector('#pagination');
        ul.innerHTML = '';
        for (let item of newItems) {
            let a = document.createElement('a');
            if (item == 1) {
                a.href = '/';
            }
            else {
                a.href = '/?page=' + item;
                a.classList.add('btn')
            }
            a.classList.add('btn')
            a.classList.add('btn')

            a.innerHTML = item;
            if (item == active) {
                a.classList.add('active')
            }
            ul.appendChild(a);
            items.push(a);
        }
        for (let item of items) {
            item.addEventListener('click', function () {
                showPage(this);
            });
            return items;
        }
    }
    showPage(
        document.location.search.substring(document.location.search.indexOf('=') + 1)
    );
})