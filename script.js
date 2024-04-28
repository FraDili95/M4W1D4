

const createList = document.querySelector(".crea-lista");

createList.addEventListener( "click", function(){

    const allSection = document.querySelectorAll(".d-none");

    for( let i = 0; i < allSection.length; i++ ){
        //RICHIESTA API PER OGNI ID
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${allSection[i].getAttribute('id')}`)
        .then( response => response.json() )
        .then( data => updateJson(data, allSection[i].getAttribute('id')) )
        .catch( error => console.error("Errore:", error));
       
    }

});


 //UTILIZZO IL JSON 
 function updateJson ( dataBase, sezione ){
    console.log(dataBase)
    let punctSection = document.getElementById(`${sezione}Section`);
    console.log(`${sezione}Section`);
    punctSection.parentElement.classList.remove("d-none");
     for( let i = 0; i < dataBase.data.length; i++ ){
        punctSection.innerHTML += 
        `
            <div class="card" style="width: 16rem; background-color: #282828;">
            <img src="${dataBase.data[i].album.cover_medium}" class="card-img-top w-100" alt="${dataBase.data[i].title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title justify-content-center">${dataBase.data[i].album.title}</h5>
                <a class="btn btn-primary justify-content-center ">Play</a>
            </div>
            </div>
        `;

     }
 }