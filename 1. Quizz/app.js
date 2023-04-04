const form = document.querySelector('.form-quizz')
let tableauResultats = [];
const reponses = ['c','a','b','a','c'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aidesResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');


let verifTableau = [];


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    for (let i = 1; i < 6; i++) {
      tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    
    }

  verifFunc(tableauResultats)

  // console.log(tableauResultats)
  tableauResultats = []
    
})


// Foonction qui recuperes les reponses et compara au tableau de reponse
function verifFunc(tableauResultats){
      for (let a = 0; a < 5; a++) {
        if(tableauResultats[a] === reponses[a]){
            verifTableau.push(true)
        }else{
          verifTableau.push(false)
        }
        
      }
      console.log(verifTableau)
      afficherResultats(verifTableau)
      couleurFonction(verifTableau)
      verifTableau = []
}


// Fonction qui verifies et affiches les aides
function afficherResultats(tabCkeck){
    const nbrFautes = tabCkeck.filter(el => el != true).length
    console.log(nbrFautes)

    switch(nbrFautes) {

      case 0:
          titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
          aidesResultat.innerText = ''
          noteResultat.innerText = '5/5'
          break;
      case 1:
          titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
          aidesResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
          noteResultat.innerText = '4/5'
          break;
      case 2:
          titreResultat.innerText = `✨ Encore un effort ... 👀`
          aidesResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
          noteResultat.innerText = '3/5'
          break;
      case 3:
          titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
          aidesResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
          noteResultat.innerText = '2/5'
          break;
      case 4:
          titreResultat.innerText = `😭 Peux mieux faire ! 😭`
          aidesResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
          noteResultat.innerText = '1/5'
          break;
      case 5:
          titreResultat.innerText = `👎 Peux mieux faire ! 👎`
          aidesResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
          noteResultat.innerText = '0/5'
      break;

      default:
          'Wops, cas innatendu.';

  }
}


function couleurFonction(tabValBool) {
      for (let j = 0; j < tabValBool.length; j++) {

          if(tabValBool[j] === true){
            toutesLesQuestions[j].style.background ='lightgreen'
          }else{
            toutesLesQuestions[j].style.background ='#ffb8B8'
            toutesLesQuestions[j].classList.add('echec')
            setTimeout(()=>{
                toutesLesQuestions[j].classList.remove('echec')
            },500)
          }
        
      }


      toutesLesQuestions.forEach(item => {
          item.addEventListener('click', ()=>{
              item.style.background ="white"
          })
      });
}