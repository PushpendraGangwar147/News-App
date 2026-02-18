const cityInput = document.getElementById("cityInput");
const topicSelect = document.getElementById("topicSelect");
const getNewsBtn = document.getElementById("getNewsBtn");
const newsOutput = document.getElementById("newsOutput");

getNewsBtn.addEventListener("click", function () {

    let city = cityInput.value.trim();
    let topic = topicSelect.value;

    let apiKey = "API_KEY";

    if (city === "") {
        newsOutput.innerHTML = "Please enter city name";
        return;
    }

    let url = "https://newsapi.org/v2/everything?q="
              + topic + "+" + city + "&apiKey=" + apiKey;

    newsOutput.innerHTML = "Loading...";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            newsOutput.innerHTML = "";

            if (!data.articles || data.articles.length === 0) {
                newsOutput.innerHTML = "No News Found";
                return;
            }

            for (let i = 0; i < 5; i++) {

                let article = data.articles[i];
                if (!article) break;

                let image = article.urlToImage || "https://via.placeholder.com/300";

                newsOutput.innerHTML +=
                    "<div class='news-card'>" +
                    "<img src='" + image + "'>" +
                    "<h3>" + article.title + "</h3>" +
                    "<p>" + (article.description || "No description") + "</p>" +
                    "<a class='read-more' href='" + article.url + "' target='_blank'>Read More</a>" +
                    "</div>";
            }
        })
        .catch(function () {
            newsOutput.innerHTML = "Error loading news";
        });
});
