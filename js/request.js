function search(){
    var searchString = document.getElementById('bar').value;
    fetch("http://www.omdbapi.com/?apikey=bc4520bb&s="+searchString)
    .then(res => res.json())
    .then(res => {
        if(res){
            populateCards(res.Search);
       } else{
           alert("Go sleep");
       }
    });
}

function populateCards(results){

    var counter = 0;
    var remaining = [];

    const rescontainer = document.getElementById("results");
    clearResults();
    results.forEach(result => {            

            let card = document.createElement("div");
            card.className = "card";
            
            let poster = document.createElement("img");
            poster.setAttribute("src", result.Poster);
            poster.className = "poster";
            card.appendChild(poster);
    
            let title = document.createElement("h3");
            title.innerHTML = result.Title;
            title.className = "title";
            card.appendChild(title);
    
            let cardlink = document.createElement("a");
            cardlink.setAttribute("href", "./movie.html?movie="+result);
            cardlink.appendChild(card);

            if(counter<8){
                rescontainer.appendChild(card);
            }
            else{
                remaining.push(card)
            }

        counter++;
    });
    
    if(counter>8){
        const wrapper = document.getElementById("results-wrapper");
        let showmore = document.createElement("button");
        showmore.innerHTML ="Show more";
        showmore.className = "showmore";
        showmore.onclick = function(){
            remaining.forEach(element => {
                rescontainer.appendChild(element);
            });
            showmore.style="display:none";
        }
        wrapper.appendChild(showmore);
    }

}

function clearResults(){
    const rescontainer = document.getElementById("results")
    while(rescontainer.firstChild){
        rescontainer.removeChild(rescontainer.firstChild)
    }
}