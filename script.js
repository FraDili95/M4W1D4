const createList = document.querySelector(".crea-lista");//collegato a "your library"
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
    punctSection.parentElement.classList.add("NON-d-none");//sostituto per puntarli
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


 const goSearch = document.querySelector("#button-search");//puntatore a go della ricerca

goSearch.addEventListener("click", function(){
    //pulisco prima lo schermo se si è gia cliccato su your list
    let allSection = document.querySelectorAll(".d-none");
    if( allSection.length === 0 ){
        allSection = document.querySelectorAll(".NON-d-none");
        allSection.forEach(sezione => {
            sezione.classList.remove("NON-d-none");
            sezione.classList.add("d-none");
        });
    }

    let input = document.querySelector("#searchField");
    //essendo sicuro di avere le sezioni effettuo chiamata fetch
    for( let i = 0; i < allSection.length; i++ ){
        //RICHIESTA API PER OGNI ID
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${allSection[i].getAttribute('id')}`)
        .then( response => response.json() )
        .then( data => seeker(data, allSection[i].getAttribute('id'), input.value ) )
        .catch( error => console.error("Errore:", error));      
    }

 });

 function seeker( dataBase, sezione, input ){
  
    let punctSection = document.getElementById("searchResults");
    console.log(punctSection);
    punctSection.classList.remove("d-none");
    if(!( punctSection.className.includes("NON-d-none"))){
        punctSection.classList.add("NON-d-none");
    } 
    punctSection = punctSection.lastElementChild;
     for( let i = 0; i < dataBase.data.length; i++ ){
        if(input.toLowerCase() === sezione.toLowerCase() || input.toLowerCase() === dataBase.data[i].album.title.toLowerCase()){

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
 }