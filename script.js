const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "ca";
const options =["general", 
    "entertainment", 
    "health", 
    "science", 
    "sports", 
    "technology" 
];

let requestURL;

const image_fallback_url = 'https://www.shutterstock.com/shutterstock/photos/1695503806/display_1500/stock-vector-template-for-breaking-news-background-vector-illustration-1695503806.jpg'

const generateUI = (articles) => {
    for(let item of articles) {
        // console.log(item) // Here we can see all the props available on our API return data for troubleshooting
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div 
        class="news-image-container">
        <img src="${item.urlToImage || image_fallback_url}" alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
                ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
        container.appendChild(card);
    }
}

const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL)
    if(!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
}

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`; 
    e.target.classList.add("active");
    getNews();
};

const createOptions = () => {
    let optionsHTML = "";
    for(let i of options) {
        optionsHTML += `<button class="options ${
            i == "general" ? "active" : ""
        }" onclick="selectCategory(event, '${i}')">${i}</button>`;
    }
    optionsContainer.innerHTML = optionsHTML;
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
}

window.onload = () => {
    requestURL= `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init(); 
}