//------------------------------CACHED Elements

// bow elements
const bowHeaderEl = document.querySelector("#bow > h2");
const bowImgEl = document.querySelector("#bow > img");
const bowDescription = document.querySelector("#bow > p");

// Club elements
const clubHeaderEl = document.querySelector("#club > h2");
const clubImgEl = document.querySelector("#club > img");
const clubDescription = document.querySelector("#club > p");

// Axe elements
const axeHeaderEl = document.querySelector("#axe > h2");
const axeImgEl = document.querySelector("#axe > img");
const axeDescription = document.querySelector("#axe > p");

// Heal elements
const healHeaderEl = document.querySelector("#heal > h2");
const healImgEl = document.querySelector("#heal > img");
const healDescription = document.querySelector("#heal > p");


//--------------------------------CLASSES
class spell {
    constructor(name, img, cost, dmg, healing){
        this.name = name;
        this.img = img;
        this.cost = cost;
        this.dmg = dmg;
        this.healing = healing;
    }
}

class player {
    constructor(name,health,coins,spell1,spell2,spell3,spell4){
        this.name = name;
        this.health = health;
        this.coins = coins;

        // unnique spells
        this.spell1 = spell1;
    }
}

class monster {
    constructor(name,health){
        this.name = name;
        this.health = health;
    }
}

//----------------OBJECTS 

//-----------Player spells - VIKING
let bowSpell = new spell("Long Shot", "/imgs/bow.svg", 1, 80)
let clubSpell = new spell("Skull Cracker", "/imgs/club.svg", 2, 130)
let axeSpell = new spell("War Axe", "/imgs/axe.svg", 3, 200)
let healSpell = new spell("Potion", "/imgs/heal.svg", 4, null, 250)

// Players
let viking = new player("Viking", 500, 1, bowSpell);
console.log(viking);


function renderCards(){
    
    // Bow rendered
    bowHeaderEl.textContent = bowSpell.name;
    bowImgEl.src = bowSpell.img;
    bowDescription.textContent = `Damage: ${bowSpell.dmg}`;

    // Club rendered
    clubHeaderEl.textContent = clubSpell.name;
    clubImgEl.src = clubSpell.img;
    clubDescription.textContent = `Damage: ${clubSpell.dmg}`;

    // Axe rendered
    axeHeaderEl.textContent = axeSpell.name;
    axeImgEl.src = axeSpell.img;
    axeDescription.textContent = `Damage: ${axeSpell.dmg}`;

    // Heal rendered
    healHeaderEl.textContent = healSpell.name;
    healImgEl.src = healSpell.img;
    healDescription.textContent = `Heal: ${healSpell.healing}`;

}

renderCards();




// Psuedo

// 0 cache all of the card elements to be rendered

// 1. Create a class object to be used for every spell card i decide to make
    // 1.1 after creating a spell card 

// 2) CARDS functions
    // Do not allow the player to click on cards they cannot afford,
    // if the player does not have enough coins for the card disable
    // 


// 3. Create a class for different kind of players and enemies
    // make the enemy render the card it chooses randomly
    // 3.1 enemies are special and dont use coins just attacks