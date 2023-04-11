const search = document.querySelector(".recherche-poke input");
let AllPokemon = []; // Pour stocke les pockes
let tableauFin = []; // Pour stocke les pockemon en fr et la bonne img
let listePoke = document.querySelector('.liste-poke')
const types = {
  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
};
function fetchPokemonBase() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((pokemon) => {
        fetchPokemonComplet(pokemon);
      });
    });
}
fetchPokemonBase();

// Focntion qui renvoie tous les info necessaire sur un pokemon
function fetchPokemonComplet(pokmon) {
  let ObjPokemonFull = {};
  let url = pokmon.url; // Correspond à l'url de chaque pokemon
  let nameP = pokmon.name; // Correspond au Nom de chaque du pokemon

  fetch(url) // fecth pour recuperer le nom et les images
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      ObjPokemonFull.pic = data.sprites.front_default;
      ObjPokemonFull.type = data.types[0].type.name; //
      ObjPokemonFull.id = data.id;

      // console.log(ObjPokemonFull)

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`) // fetch pour Recupere d'autre info sur chaque pokemon en utilisant leur nom (color , etc)
        .then((response) => response.json())
        .then((pokeDoke) => {
          ObjPokemonFull.name = pokeDoke.names[4].name;
          AllPokemon.push(ObjPokemonFull); // Ajout dans le tableau pour les affiches sur le DOM

          if (AllPokemon.length === 151) {
            //   console.log(AllPokemon)
            // trier le tableau des pokemon en utilisant leur Id

            tableauFin = AllPokemon.sort((a, b) => {
              return a.id - b.id;
            }).slice(0, 21);

            // console.log(tableauFin)
            createCard(tableauFin);
          }
        });
    });
}

//  Cration des cartes

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const carte = document.createElement("li");
    let couleur = types[arr[i].type];  
    carte.style.background = couleur
    const txtCarte = document.createElement('h5')
    txtCarte.innerText = arr[i].name;


    const idCarte = document.createElement('p')
    idCarte.innerText = `ID#${arr[i].id}`

    const imgCarte = document.createElement('img')
    imgCarte.src = arr[i].pic

    carte.appendChild(imgCarte)
    carte.appendChild(txtCarte)
    carte.appendChild(idCarte)

    listePoke.appendChild(carte) 
  }
}

// Scroll Infini

window.addEventListener('scroll', function(e){
  console.log(document.documentElement)
  const {scrollTop,scrollHeight, clientHeight} = document.documentElement;
  // ScrollTop = scroll depuis le top
  // srcollHeigth = scroll total
  // clientHeigth = hauteur de la fenêtre , partie visible.
    console.log(scrollTop , scrollHeight , clientHeight);
})
// Anilation input 

search.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});
