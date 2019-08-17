//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

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

function generateTitleLinks(customSelector = '') {
    
    console.log('custom selector: ' + customSelector);
    console.log('Executing generateTitleLinks ' + generateTitleLinks + customSelector);
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log('Cleared articles list');

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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


function generateTags(){
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    
  /* START LOOP: for every article: */
        for (let article of articles){ 
    /* find tags wrapper */
            const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
            let html = '';
    /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            console.log('Article tags ' + articleTags);
            
    /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            console.log(articleTagsArray);
    /* START LOOP: for each tag */
            for(let tag of articleTagsArray){  
                console.log('single tag: ' + tag);
      /* generate HTML of the link */
                const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
                console.log(linkHTML);
      /* add generated code to html variable */
                html = html + linkHTML;
    /* END LOOP: for each tag */
            }
    /* insert HTML of all the links into the tags wrapper */
            console.log('New html: ' + html);
            titleList.innerHTML = html;
  /* END LOOP: for every article: */
        }

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
  /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log ('Active Tag links ' + activeTagLinks); //NIE POKAZUJE
  /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks) {
    /* remove class active */
        activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){ //Miałem s w pierwszym TagLinkS
    /* add class active */
        tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]'); 
}

function addClickListenersToTags(){
  /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a'); // co tutaj?
    console.log ('LINK: ' + links);
  /* START LOOP: for each link */
    for(let link of links) { 
    /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
        
  /* END LOOP: for each link */         
    }
}

addClickListenersToTags();

function generateAuthors(){
    const Author = document.querySelectorAll(optArticleAuthorSelector);
    
    console.log('Author List: ' + Author);
}
