var counter;
var remaining;
var page;

document.addEventListener("DOMContentLoaded", function() { 
    search(0,Number(localStorage.page));
});


window.onload=function(){
    const movieinput = document.getElementById("bar");
    const pageinput = document.getElementById("page");
    movieinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        pageinput.value="";
        search(0,1);
    }
    });
    pageinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        search(0,Number(pageinput.value));
    }
    });

    const left = document.getElementById("left");
    const right = document.getElementById("right");
    left.onclick=function(){
        search(-1,window.page);
    }
    right.onclick=function(){
        search(1,window.page);
    }
}

function search(dir,page){
    window.page=dir+page;
    clearResults();
    var searchString = document.getElementById('bar').value;
    if(searchString){
        fetch("http://www.omdbapi.com/?apikey=bc4520bb&s="+searchString+'&page='+String(window.page))
        .then(res => res.json())
        .then(res => {
            const restitle = document.getElementById("results-title");
            if(res.Response=='True'){
                restitle.innerHTML=String(res.totalResults)+' MOVIES FOUND';
                makePagination(Math.ceil(res.totalResults/window.page));
                populateCards(res.Search);
           } else{
                restitle.innerHTML=res.Error;
           }
        });
    }
}

function makePagination(maxPage){
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const prevnumber = document.getElementById("prev");
    const currentnumber = document.getElementById("curr");
    const nextnumber = document.getElementById("next");
    prevnumber.style="display:none;";
    nextnumber.style="display:none;";

    if(window.page-1>0){
        prevnumber.innerHTML=window.page-1;
        prevnumber.style="display:block";
        prevnumber.onclick=function(){
            search(0,window.page-1);
        }
        right.onclick = 'none';
        right.style="cursor:not-allowed";
    }
    currentnumber.innerHTML=window.page;
    currentnumber.className="active";
    if(window.page+1<maxPage){
        nextnumber.innerHTML=window.page+1;
        nextnumber.style="display:block";
        nextnumber.onclick=function(){
            search(0,window.page+1);
        }
        left.onclick = 'none';
        left.style="cursor:not-allowed";
    }
}

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

function showMore(){
    const rescontainer = document.getElementById("results");
    remaining.forEach(element => {
        rescontainer.appendChild(element);
    });
    showmore.style="display:none";
}

function clearResults(){
    counter = 0;
    remaining = [];
    const rescontainer = document.getElementById("results")
    while(rescontainer.firstChild){
        rescontainer.removeChild(rescontainer.firstChild)
    }
    showmore.style="display:none";
    const paginationbar=document.getElementById("pagination-container");
    paginationbar.style="display:none;"
}