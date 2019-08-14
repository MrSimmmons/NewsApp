const container = document.getElementById('container');

$.ajax({
  type: 'GET',
  url: 'config.json',
  dataType: 'json',
  success: (data) => {
    console.log(data.newsApiKey);
    $.ajax({
      type: 'GET',
      url: 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + `apiKey=${data.newsApiKey}`,
      dataType: 'json',
      success: (newsData) => {
        console.log(newsData);
        for (var i = 0; i < newsData.articles.length; i++) {
          console.log(newsData.articles[i]);
          container.innerHTML += `<div class='card'><h3>${newsData.articles[i].title}</h3><br><p>${newsData.articles[i].description}</p><br><a href="${newsData.articles[i].url}">Read More..</a></div>`;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  },
  error: (error) => {
    console.log(error);
  }
})
