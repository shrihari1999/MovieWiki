function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let selectedMovieId = getUrlVars()["id"];
    // if(selectedMovie == null)
    //     displayError();
    searchById(selectedMovieId);
});                                                             

function searchById(id){
    fetch("http://www.omdbapi.com/?apikey=bc4520bb&i="+id)
    .then(res => res.json())
    .then(res => {
        if(res){
            console.log(res);
            makePage();                         
       } else{
           alert("Could not get");
       }
    });
}

function makePage(){
    //make title to upper case
}

function imdbNav(){
    window.location="https://www.imdb.com/title/";//add id here;
}

function goBack() {
    window.history.back();
}