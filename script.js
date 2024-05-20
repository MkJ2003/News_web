const API_KEY = "API_key";

const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",function()
{
    fetchNews("IPL");
})
function reload()
{
    window.location.reload();
}


async function fetchNews(query)
{
    const res = await fetch(url+query+"&apiKey="+API_KEY);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles)
{
    const cardContainers = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardContainers.innerHTML ="";
     var count =1;
    articles.map(function(article)
    {
        if(count>12)
        {
            return;
        } 
        if(!article.urlToImage)
         {
            return;
         }
         const cardClone = newsCardTemplate.content.cloneNode(true);
         fillDataInCard(cardClone,article);
         cardContainers.appendChild(cardClone);
         count++;
    });

}
function fillDataInCard(cardClone,article)
{
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML = article.description.substring(0,50);

    const date = new Date(article.publishedAt).toLocaleString("en-US",
    {
         timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=article.source.name +" "+ date;
    cardClone.firstElementChild.addEventListener("click",
    function()
    {
      window.open(article.url,"_blank");
    })
}
let curSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem;
    curSelectedNav.classList.add("active");

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click",function()
{
    const query = searchText.value;
    if(!query)
    {
        return;
    }
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
   searchText.value=null;
})