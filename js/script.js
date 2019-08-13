//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

const titleClickHandler = function (event) {
    event.preventDefault(); //adres strony się nie zmienia po klikaniu w linki 
    const clickedElement = this;
    console.log('Link was clicked!');



    /* [DONE]remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /*  [DONE] add class 'active' to the clicked link */
    console.log('ClickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE]get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);


    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
}

function generateTitleLinks() {

    console.log('Executing generateTitleLinks');
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log('Cleared articles list');

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('Selected articles count: ' + articles.length);
    let html = '';
    for (let article of articles) {

        const articleId = article.getAttribute('id');
        console.log('Current article ID ' + articleId);

        console.log('Title elemnt: ' + article.querySelector(optTitleSelector));
        console.log('Title element content: ' + article.querySelector(optTitleSelector).innerHTML);

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);


        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('Article list element: ' + linkHTML);
        html = html + linkHTML;
    }
    console.log('New html: ' + html);
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();
