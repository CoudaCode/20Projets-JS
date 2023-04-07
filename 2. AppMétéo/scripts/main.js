const ApiKey =`6108bb532a08e38871920577286e0f94`
const apiKey = `e504fc9f58a784f749bd075c48a37ec2`
let resultatApi ;


// Determine la position exacte de son navigateur
if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        console.log(position);

        let long = position.coords.longitude
        let lat = position.coords.latitude

      // Apple de la fonction 
        ApelApi(long, lat)

      }, ()=>{
        alert("Vous avez refusez la geolocalisation , l'application ne peut pas fonctionner, veuillez l'activer")
      })
}


function ApelApi(long, lat){

    // &: est utilise pour ajouter d'autre parametre a la clé
    //  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ApiKey}`)
    //  .then(Response =>{
    //    return Response.json()
    // })
    //  .then((data)=>{
    //   console.log(data)
    //  })

    fetch(`https://www.prevision-meteo.ch/services/json/lat=${long}lng=${lat}`)
    .then(Response =>{
         return Response.json()
      })
       .then((data)=>{
        console.log(data)
       })
}