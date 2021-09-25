// FOR IMAGE
// https://www.geeksforgeeks.org/how-to-pass-image-as-a-parameter-in-javascript-function/

// CACHED 
const cardHeaderEl = document.getElementById("h0");
const cardImgEl = document.getElementById("img0");
const cardDescription = document.getElementById("desc0");
console.log(cardHeaderEl);

class spell {
    constructor(name, img, pipCost, dmg, type){
        this.name = name;
        this.img = img;
        this.pipCost = pipCost;
        this.dmg = dmg;
        this.type = type;
    }
}

let fireCat = new spell("FireCat", "FireCatBG", 1, 80, "Fire")

console.log(fireCat);

function renderCards(){
    // create a div container for the card
    // cardHeaderEl.textContent = fireCat.name;
    // // img
    // cardDescription.textContent = fireCat.dmg;

}

renderCards();




// Psuedo

// 0 cache all of the card elements to be rendered

// 1. Create a class object to be used for every spell card i decide to make
    // 1.1 after creating a spell card 

