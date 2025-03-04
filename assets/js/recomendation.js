import {recomendarPorUsuario, recomendarPorActor, recomendarPorDirector, recomendarPorSub} from "./apiHandler.js";

const button = document.getElementById("myButton");
    
// Add click event listener
button.addEventListener("click", async function() {
    document.getElementById("output").innerText = "Button was clicked!";
    const inputValue = document.getElementById("idInput").value
    const selectValue = document.getElementById("recId").value
    console.log(selectValue)
    if (Number(inputValue)){
        let response;
        if(selectValue=="auto"){
            response = await recomendarPorUsuario(Number(inputValue))
        } else if(selectValue=="gen"){
            response = await recomendarPorSub(Number(inputValue))
        } else if(selectValue=="actor"){
            response = await recomendarPorActor(Number(inputValue))
        } else{
            response = await recomendarPorDirector(Number(inputValue))
        }
        
        let movies = response.movies
    
        const div_cont = document.getElementById("movieCard");
        function addListItem(movie) {
            const col_div = document.createElement("div");
            col_div.classList.add("col-lg-6");
            col_div.setAttribute("data-aos", "fade-up");
            col_div.setAttribute("data-aos-delay", "100");
            
            const tm_div = document.createElement("div");
            tm_div.classList.add("team-member");
            tm_div.setAttribute("d-flex","align-items-start")
    
            col_div.appendChild(tm_div)
    
            // title 
            const title = document.createElement("h4");
            title.textContent =movie.titulo
            
            const rating = document.createElement("p");
            rating.textContent ="Rating: "+movie.rating
            
            const sinposis = document.createElement("p");
            sinposis.textContent =movie.sinopsis
    
            const year = document.createElement("p");
            year.textContent ="Estreno: "+movie["año"]
    
            const dur = document.createElement("p");
            dur.textContent ="Duracion: "+movie.duracion
    
            tm_div.appendChild(title)
            tm_div.appendChild(rating)
            tm_div.appendChild(sinposis)
            tm_div.appendChild(year)
            tm_div.appendChild(dur)
            // final append
            div_cont.appendChild(col_div); // Append it to the <ul>
        }
        movies.forEach(movie => {
            addListItem(movie.new)
        });
    }
});


