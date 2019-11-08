var counter;
var remaining;

document.addEventListener("DOMContentLoaded", function() { 
    search();
});

function search(){
    clearResults();
    var searchString = document.getElementById('bar').value;
    if(searchString){
        fetch("http://www.omdbapi.com/?apikey=bc4520bb&s="+searchString)
        .then(res => res.json())
        .then(res => {
            const restitle = document.getElementById("results-title");
            if(res.Response=='True'){
                restitle.innerHTML=String(res.totalResults)+' MOVIES FOUND';
                populateCards(res.Search);
           } else{
                restitle.innerHTML=res.Error;
           }
        });
    }
}

function populateCards(results){

    const rescontainer = document.getElementById("results");
    results.forEach(result => {     

            let card = document.createElement("div");
            card.className = "card";
            card.onclick=function(){
                window.location="./movie.html?id="+String(result.imdbID);
            }
            
            let poster = document.createElement("img");
            poster.setAttribute("src", result.Poster);
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
    let showmore = document.getElementById("showmore");
        showmore.style="display:none";
}