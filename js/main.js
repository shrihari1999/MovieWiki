var counter;
var remaining;
var page;

//Event listeners for enter button
document.addEventListener("DOMContentLoaded", function() { 
    search(0,Number(localStorage.page),0);
    const movieinput = document.getElementById("bar");
    const pageinput = document.getElementById("page");
    movieinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        pageinput.value="";
        search(0,1,1);
    }
    });
    pageinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        search(0,Number(pageinput.value),0);
    }
    });
});

//Performs search and calls page generating functions
function search(dir,page,saveString){
    const movieinput = document.getElementById("bar");
    window.page=dir+page;
    if(saveString){
        localStorage.searchString=movieinput.value;
    }
    var searchString = localStorage.searchString;
    clearResults();
    if(searchString){
        movieinput.value=searchString;
        fetch("http://www.omdbapi.com/?apikey=bc4520bb&s="+searchString+'&page='+String(window.page))
        .then(res => res.json())
        .then(res => {
            const restitle = document.getElementById("results-title");
            if(res.Response=='True'){
                restitle.innerHTML=String(res.totalResults)+' MOVIES FOUND';
                makePagination(Math.ceil(res.totalResults/10));
                populateCards(res.Search);
           } else{
                const paginationbar=document.getElementById("pagination-container");
                paginationbar.style="display:none;"
                restitle.innerHTML=res.Error;
           }
        });
    }
}

//Makes pagination bar
function makePagination(maxPage){
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const prevnumber = document.getElementById("prev");
    const currentnumber = document.getElementById("curr");
    const nextnumber = document.getElementById("next");

    if(window.page-1!=0){
        prevnumber.innerHTML=window.page-1;
        prevnumber.style="display:block";
        prevnumber.onclick=function(){
            search(0,window.page-1);
        }
        left.onclick=function(){
            search(-1,window.page);
        }
        left.style="cursor:pointer";
    }
    else{
        prevnumber.style="display:none;";
        left.onclick = 'none';
        left.style="cursor:not-allowed";
    }
    currentnumber.innerHTML=window.page;
    currentnumber.className="active";
    if(window.page+1!=maxPage){
        nextnumber.innerHTML=window.page+1;
        nextnumber.style="display:block";
        nextnumber.onclick=function(){
            search(0,window.page+1);
        }
        right.onclick=function(){
            search(1,window.page);
        }
        right.style="cursor:pointer";
    }
    else{
        nextnumber.style="display:none;";
        right.onclick = 'none';
        right.style="cursor:not-allowed";
    }
}

//Populates the page with movie data
function populateCards(results){
    const paginationbar=document.getElementById("pagination-container");
    paginationbar.style="display:flex;"

    const rescontainer = document.getElementById("results");
    while(rescontainer.firstChild){
        rescontainer.remove
    }
    results.forEach(result => {     

            let card = document.createElement("div");
            card.className = "card";
            card.onclick=function(){
                window.location="./movie.html?id="+String(result.imdbID)+"&page="+window.page;
            }
            
            let poster = document.createElement("img");
            if(result.Poster=='N/A'){
                poster.setAttribute("src", './assets/film.png');
                poster.style="background:grey";
            }
            else{
                poster.setAttribute("src", result.Poster);
            }
            poster.className = "poster";
            card.appendChild(poster);
    
            let title = document.createElement("h3");
            title.innerHTML = result.Title;
            title.className = "title";
            card.appendChild(title);

            if(counter<8){
                rescontainer.appendChild(card);
            }
            else{
                remaining.push(card);
            }

        counter++;
    });
    
    if(counter>8){
        let showmore = document.getElementById("showmore");
        showmore.style="display:block;";
    }

}

//Shows more movies
function showMore(){
    const rescontainer = document.getElementById("results");
    remaining.forEach(element => {
        rescontainer.appendChild(element);
    });
    showmore.style="display:none";
}

//Clears the page of all movie data
function clearResults(){
    counter = 0;
    remaining = [];
    const rescontainer = document.getElementById("results")
    while(rescontainer.firstChild){
        rescontainer.removeChild(rescontainer.firstChild)
    }
    showmore.style="display:none";
}