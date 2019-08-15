const container = $('#container');
const searchBox = $('#seachInput');
const searchSubmit = $('#searchBtn');
const carouselInner = $('#carouselInner');

let key;

searchBox.keypress((e)=> {
    if (e.which == 13) {
        runSearch('q=' + searchBox.val() + '&');
    }
});

searchSubmit.click(()=> {
    runSearch('q=' + searchBox.val() + '&');
});

function runSearch (fields = '') {
    $.ajax({
        type: 'GET',
        url: `https://newsapi.org/v2/top-headlines?country=nz&${fields}apiKey=${key}`,
        dataType: 'json',
        error: (error) => {
            console.log(error);
        },
        success: (newsData) => {
            container.empty();
            carouselInner.empty();
            for (var i = 0; i < newsData.articles.length; i++) {
                if (i < 4) {
                    let active = '';
                    if (i == 0) {
                        active = 'active';
                    }

                    let image = '';

                    if (newsData.articles[i].urlToImage != null) {
                        image = `<img src="${newsData.articles[i].urlToImage}" class="card-img-top" alt="${newsData.articles[i].description}">`;
                    }

                    carouselInner.append(`<div class="carousel-item ${active}"><div class="card">${image}<div class="card-body"><h5 class="card-title">${newsData.articles[i].title}</h5><p class="card-text">${newsData.articles[i].description}</p><a class="btn btn-primary" href="${newsData.articles[i].url}" target="_blank">Read More at ${newsData.articles[i].source.name}</a></div></div></div>`);
                } else {
                    let image = '';

                    if (newsData.articles[i].urlToImage != null) {
                        image = `<div class="cardImg" style="background-image: url('${newsData.articles[i].urlToImage}')"></div>`;
                    }

                    container.append(`<div class='card'>${image}<div class="cardText"><h3>${newsData.articles[i].title}</h3><p>${newsData.articles[i].description}</p><a class="btn btn-primary" href="${newsData.articles[i].url}" target="_blank">Read More at ${newsData.articles[i].source.name}</a></div></div>`);
                }
            }
            [].forEach.call(document.querySelectorAll('h3'), (e)=> {
                if (e.parentNode.parentNode.children[0].className == 'cardText') {
                    e.parentNode.parentNode.children[0].children[0].style = 'width: 100% !important';
                }
            });
        }
    });
}

$.ajax({
    type: 'GET',
    url: 'config.json',
    dataType: 'json',
    error: (error) => {
        console.log(error);
    },
    success: (data) => {
        key = data.newsApiKey;
        runSearch();
    }
});
