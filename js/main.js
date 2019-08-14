const container = $('#container');
const searchBox = $('#seachInput');
const searchSubmit = $('#searchBtn');

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
            for (var i = 0; i < newsData.articles.length; i++) {
                container.append(`<div class='card'><div class="cardImg" style="background-image: url('${newsData.articles[i].urlToImage}')"></div><div class="cardText"><h3>${newsData.articles[i].title}</h3><p>${newsData.articles[i].description}</p><a class="btn btn-primary" href="${newsData.articles[i].url}" target="_blank">Read More at ${newsData.articles[i].source.name}</a></div></div>`);
            }
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
