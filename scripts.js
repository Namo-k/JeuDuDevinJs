var nbADeviner;
var MAX = 100;
var MIN = 1;
var ESSAIMAX = 5;
var nbEssai = 5;
var input;

window.addEventListener("load", () =>{
    init(MIN, MAX);
})

function init(min, max){
    document.querySelector("#valider").textContent = 'Deviner';
    nbADeviner = genererNbADeviner(min, max);
    console.log("nombre a deviner : " + nbADeviner);

    let inputId = document.getElementById("input");
    inputId.disabled = false;
    inputId.min= min;
    inputId.max= max;
    inputId.style.width= "250px";
    inputId.focus();

    document.getElementById("message").innerHTML="";
    
}

function deviner(){
    if(document.querySelector("#valider").textContent == 'Rejouer'){
        console.log("true");
        init(MIN, MAX);
    }
    else{
        document.querySelector("#valider").textContent = 'Deviner';
        getValue();
        console.log("Valeur rentré : " + input);
        verification();
        viderInput();
        document.getElementById("input").focus();
    } 
}

function genererNbADeviner(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getValue(){
    input = document.getElementById("input").value;
}

function verification(){
    if (input == "") console.log("Veuillez rentré un nombre svp !");
    else{
        if(input == nbADeviner){
            Gagner();
            console.log("Bien joué");
            console.log("Vous avez reussi en " + (ESSAIMAX - nbEssai) + " essaies");
            resetJeu();
        }
        else{
            --nbEssai;
            if(nbEssai == 0)  {
                Perdu();
                console.log("Perdu ! Le nombre a deviner est " + nbADeviner );
                resetJeu();
            }
            else{  
                reessai();
                if(input < nbADeviner) console.log("Le nombre est plus grand");
                if(input > nbADeviner) console.log("Le nombre est plus petit");
                console.log("Rejoué !");
                console.log("Il vous reste " + nbEssai + " essaies");    
            }
        }
    }
    
}

function Perdu(){
    let message = document.getElementById("message");
    message.innerText="Perdu ! Le nombre a deviner est " + nbADeviner ;
    message.style.color = "red";
}
function Gagner(){
    let message = document.getElementById("message");
    message.innerText="Bien joué !! \n Vous avez reussi en " + (ESSAIMAX - nbEssai) + " essaies. ";
    message.style.color = "green"
}
function reessai(){
    let message = document.getElementById("message");

    if(input < nbADeviner) message.innerText="Le nombre est plus grand \n Reessai !\n Il vous reste " + nbEssai + " essaies";
    if(input > nbADeviner) message.innerText="Le nombre est plus petit \n Reessai !\n Il vous reste " + nbEssai + " essaies";

    message.style.color = "orange";
}

function viderInput(){
    document.getElementById("input").value = "";
}

function resetJeu(){
    nbEssai=5;
    input=null;
    document.getElementById("input").disabled = true;
    document.querySelector("#valider").textContent = 'Rejouer';  
    document.querySelector("#valider").focus();
}