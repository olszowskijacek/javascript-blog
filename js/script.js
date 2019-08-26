//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML), //żeby dodać kolejny szablon kopiuję tę linię i zmieniam klucz articleLink oraz selektor #template-article-link.
    
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}



function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';  

      
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

        console.log('Title element: ' + article.querySelector(optTitleSelector));
        console.log('Title element content: ' + article.querySelector(optTitleSelector).innerHTML);

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        
        
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        
        
//        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

function calculateTagsParams(tags){
    const params = {
        max: 0,
        min: 99999
    }
    for(let tag in tags){
        if(tags[tag] > params.max){
            params.max = tags[tag];
        }
        if(tags[tag] < params.min){
            params.min = tags[tag];
        }
        console.log(tag + ' is used ' + tags[tag] + ' times');   
    }
    return params;   
}

function calculateTagClass(count,params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    
    return (optCloudClassPrefix, classNumber);
}



function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find tags wrapper */
        const titleList = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        console.log('Article tags: ' + articleTags);

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);
        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            console.log('single tag: ' + tag);
            /* generate HTML of the link */
            
            const linkHTMLData = {id: tag, title: tag};
            const linkHTML = templates.tagLink(linkHTMLData);
            
//            const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
            
            
            console.log(linkHTML);
            /* add generated code to html variable */
            html = html + linkHTML;
            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)){
                /* [NEW] add generated code to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            
            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        console.log('New html: ' + html);
        titleList.innerHTML = html;
        /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    
    /*[NEW] create variable for all links HTML code*/
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);
    
//    let allTagsHTML = '';
    
    const allTagsData = {tags: []};
    /*[NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
        
        /*[NEW] generate code of a link and add it to allTagsHTML */
        

//      const tagLinkHTML = '<li><a class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"' + ' href="#tag-' + tag +'">' + tag + '</a></li>';
        
        
    allTagsData.tags.push({
        id: tag,
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
    });
        
        
        
        
        
//        allTagsHTML += tagLinkHTML;
        
        /*[NEW] END LOOP: for each tag in allTags: */
        }
    /*[NEW] add html from allTagsHTML to tagList */
    
//    tagList.innerHTML = allTagsHTML; 
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('tag: ', allTagsData);    
    }
generateTags();

function tagClickHandler(event) {
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
    console.log('Active Tag links ' + activeTagLinks); //NIE POKAZUJE
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
        /* remove class active */
        activeTagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) { //Miałem s w pierwszym TagLinkS
        /* add class active */
        tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');
    console.log('LINK: ' + links);
    /* START LOOP: for each link */
    for (let link of links) {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);

        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function calculateAuthorsParams(tags) {
      const params = {
        max: 0,
        min: 999999
      }
      for(let tag in tags) {
        if(tags[tag] > params.max) {
          params.max = tags[tag];
        }
        if(tags[tag] < params.min) {
          params.min = tags[tag];
        }
      }

      return params;
    }


    function calculateAuthorsClass(count,params) {
      const normalizedCount = count - params.min;
      const normalizedMax = params.max - params.min;
      const percentage = normalizedCount / normalizedMax;
      const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
      return (optCloudClassPrefix, classNumber);
    }

function generateAuthors() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    
    /*find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('Author List: ' + articles);

    /* START LOOP: for every article */
    for (let article of articles) {

        const authorList = article.querySelector(optArticleAuthorSelector);
        console.log('author List ' + authorList);
        /* make html variable with empty string */
        let html = '';
        
        /*get authors from data-author attribute*/
        const articleAuthor = article.getAttribute('data-author');
        
        /*generate HTML of the link*/
        
//        const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
//        
        const linkHTMLData = {id: articleAuthor, title: articleAuthor};
        const linkHTML = templates.authorLink(linkHTMLData);
        
        
        
        console.log('generated HTML: ' + linkHTML);
       
        /*add generated code to html variable*/
        html = html = linkHTML;
        
        
        
        /* [NEW] chech if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(articleAuthor)){
            
        /* [NEW] add generated code to allTags array */   
        allTags[articleAuthor] = 1;    
        } else {
        allTags[articleAuthor]++;
        }
        
        /*insert HTML of all the links into the authors wrapper*/
        authorList.innerHTML = html;
    }
    
        /*[NEW] find list of tags in right column */
        const tagList = document.querySelector('.authors');
        
        /*[NEW] create variable for all links HTML code */
        const authorsParams = calculateAuthorsParams(allTags);
    
//        let allTagsHTML = '';
    
        const allAuthorsData = {tags: []};
    
        /*START LOOP: for each tag in allTagsHTML*/
            for(let tag in allTags) {

            /* generate code of a link and add it to allTagsHTML */

//            const tagLinkHTML = '<li><a class="'+ optCloudClassPrefix + calculateAuthorsClass(allTags[tag], authorsParams) + '"' + ' href="#author-' + tag +'">' + tag + '</a></li>';

//            allTagsHTML = allTagsHTML + tagLinkHTML;
                
            allAuthorsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateAuthorsClass(allTags[tag], authorsParams)
            });    
                
        /* END LOOP: for each tag in allTagsHTML */
        }

        /* add html from allTagsHTML to tagList */

//      tagList.innerHTML = allTagsHTML;
    
      tagList.innerHTML = templates.authorCloudLink(allAuthorsData);    
    
}
generateAuthors();

const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    console.log(event);
    console.log('Link was clicked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all authors links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    
    for (let activeAuthorLink of activeAuthorLinks) {
        activeAuthorLink.classList.remove('active');
    }
    
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLink of authorLinks) {
        authorLink.classList.add('active');
    }

generateTitleLinks('[data-author="' + author + '"]');
}

const addClickListenersToAuthors = function () {
    /*find all links to authors*/
    const links = document.querySelectorAll('.post-author a');
    console.log(links);
    /*START LOOP: for each link*/
    for (let link of links) {
        /*add authorClickHandler as event listener for that link*/
        link.addEventListener('click', authorClickHandler);

    }

}
addClickListenersToAuthors();


//function iterateOnArticles() {              
//    const articles = document.querySelectorAll('article');
//    let authorsArray = [];
//    
//    
//    for(let article of articles){
//        let author = article.getAttribute('data-author');
//        authorsArray.push(author);
//    }
//    
//    
//    authorsArray = uniq(authorsArray);
//    
//    const authorsList = document.querySelector('.list.authors');
//    for (let author of authorsArray) {
//        let li = document.createElement('li');
//        let a = document.createElement('a');
//        a.href = '#';
//        a.innerHTML = author;
//        
//        a.addEventListener('click',(e)=> {
//            e.preventDefault();
//            
//            console.log(e.target.innerText);
//            authorList(e.target.innerText); 
//        });
//        
//        li.appendChild(a);
//        authorsList.appendChild(li);
//    }
//}
//
//iterateOnArticles();
