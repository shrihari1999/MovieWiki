var imdbID;

//Logic for getting URL parameters
function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//Gets and stores URL parameters
document.addEventListener("DOMContentLoaded", function(event) { 
    let selectedMovieId = getUrlVars()["id"];
    localStorage.page= getUrlVars()["page"];
    searchById(selectedMovieId);
});                                                             

//Performs search by movie ID
function searchById(id){
    fetch("http://www.omdbapi.com/?apikey=bc4520bb&i="+id)
    .then(res => res.json())
    .then(res => {
        if(res){
            window.imdbID=res.imdbID;
            makePage(res);                        
       } else{
           alert("Could not get");
       }
    });
}

//Makes the entire page
function makePage(result){
    let poster = document.getElementById("img");
    if(result.Poster=='N/A'){
        poster.setAttribute("src", './assets/film.png');
        poster.style="background:grey";
    }
    else{
        poster.setAttribute("src", result.Poster);
    }

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

//Navigate to movie's IMDB page
function imdbNav(){
    window.location="https://www.imdb.com/title/"+window.imdbID;
}

//Back button functionality
function goBack() {
    window.history.back();
}