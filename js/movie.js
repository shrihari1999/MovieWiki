function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let selectedMovieId = getUrlVars()["id"];
    localStorage.page= getUrlVars()["page"];
    searchById(selectedMovieId);
});                                                             

function searchById(id){
    fetch("http://www.omdbapi.com/?apikey=bc4520bb&i="+id)
    .then(res => res.json())
    .then(res => {
        if(res){
            console.log(res);
            makePage(res);                         
       } else{
           alert("Could not get");
       }
    });
}

function makePage(result){
    let poster = document.getElementById("img");
    if(result.Poster=='N/A'){
        poster.setAttribute("src", './assets/film.png');
        poster.style="background:grey";
    }
    else{
        poster.setAttribute("src", result.Poster);
    }

    // let year = document.getElementById("year");
    // year.innerHTML=result.Year;

    // let genre = document.getElementById("genre");
    // genre.innerHTML=result.Genre;

    for (var key in result) {
        var val = result[key];
        let element = document.getElementById(key);
        if(element){
            element.innerHTML+=val;
        }
    }
    let title = document.getElementById("Title");
    title.innerHTML=title.innerHTML.toUpperCase();

    result.Ratings.forEach(row => {
        let element = document.getElementById(row.Source.split(' ')[0]);
        if(element){
            element.innerHTML=row.Value;
        }
    });

}

function imdbNav(){
    window.location="https://www.imdb.com/title/";//add id here;
}

function goBack() {
    window.history.back();
}