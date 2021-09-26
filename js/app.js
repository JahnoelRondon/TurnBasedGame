//-------------------------------------------------------CACHED Elements

// --------- Game INITIAL RENDER
const introRenderEl = document.querySelector("#gameIntro");

// Character selections
const characterSelectionBoard = document.querySelector(".characterSelection")

characterSelectionBoard.addEventListener("click", handleSelection);

// -----MAIN GAME IN PROGRESS RENDER
const gameBoardEl = document.querySelector("#gameBoard");

// CARD SLOT 1
const card1HeaderEl = document.querySelector("#card1 > h2");
const card1ImgEl = document.querySelector("#card1 > img");
const card1Description = document.querySelector("#card1 > p");

// CARD SLOT 2
const card2HeaderEl = document.querySelector("#card2 > h2");
const card2ImgEl = document.querySelector("#card2 > img");
const card2Description = document.querySelector("#card2 > p");

// CARD SLOT 3
const card3HeaderEl = document.querySelector("#card3 > h2");
const card3ImgEl = document.querySelector("#card3 > img");
const card3Description = document.querySelector("#card3 > p");

// CARD SLOT 4
const card4HeaderEl = document.querySelector("#card4 > h2");
const card4ImgEl = document.querySelector("#card4 > img");
const card4Description = document.querySelector("#card4 > p");

// Card deck
const cards = document.querySelectorAll(".card");

cards.forEach(function(card){
    card.addEventListener("click", useCard)
})

// Avatar IMGS
const enemyEl = document.querySelector("#enemyAvatar");
const playerEl = document.querySelector("#playerAvatar");

// Text Elements / health and coins
const playerHealthElement = document.querySelector("#playerHealthEl");
const playerCoinsElement = document.querySelector("#playerCoinEl");

const enemyHealthelement = document.querySelector("#enemyHealthEl");


//----------------------------------------------------------------CLASSES
class Card {
    constructor(name, img, cost, dmg, healing){
        this.name = name;
        this.img = img;
        this.cost = cost;
        this.dmg = dmg;
        this.healing = healing;
    }
}

class Player {
    constructor(name,health,coins,card1,card2,card3,card4,img){
        this.name = name;
        this.health = health;
        this.coins = coins;

        // unnique spells
        this.card1 = card1;
        this.card2 = card2;
        this.card3 = card3;
        this.card4 = card4;

        this.img = img;
    }
}

class Monster {
    constructor(name,health,img){
        this.name = name;
        this.health = health;
        this.img = img;
    }
}

//-----------------------------------------------------------------OBJECTS 

//-----------Player spells objects
// ---VIKING 
let bowWeapon = new Card("Long Shot", "/imgs/bow.svg", 1, 80)
let clubWeapon = new Card("Skull Cracker", "/imgs/club.svg", 2, 130)
let axeWeapon = new Card("War Axe", "/imgs/axe.svg", 3, 200)
let healPotion = new Card("Potion", "/imgs/heal.svg", 4, null, 250)

// Players
let viking = new Player("Viking", 500, 1, bowWeapon,clubWeapon,axeWeapon,healPotion, "/imgs/viking.svg");

// Monsters 
let saberTooth = new Monster("SaberTooth", 800, "/imgs/saberTooth.svg")

// --------------------------------------------- Player State and RENDERS
// --------GAME STATE

const gameState = {
    // dynamic player state
    playerHealth: null,
    playerCoins: null,
    // game state player damage will be determined by card selected?
    playerDamage: null,

    playerName: null,
    playerImage: null,
    playerCard1: null,
    playerCard2: null,
    playerCard3: null,
    playerCard4: null,

    // dynamic enemy state
    enemyHealth: null,
    enemyDamage: null,

    enemyName: null,
    enemyImage: null,
}

// --------------------- FUNCTIONS
// Event for game state on character Selection

function useCard(event){
    console.log(this.id);
}

function gameStateViking(){

    // player 
    gameState.playerHealth = viking.health;
    gameState.playerCoins = viking.coins;
    // game state player damage will be determined by card selected?
    // gameState.playerDamage =

    gameState.playerName = viking.name;
    gameState.playerImage = viking.img;

    gameState.playerCard1 = viking.card1;
    gameState.playerCard2 = viking.card2;
    gameState.playerCard3 = viking.card3;
    gameState.playerCard4 = viking.card4;

    // enemy
    gameState.enemyHealth = saberTooth.health;
    gameState.enemyImage = saberTooth.img;

    // change the name to render game since it can be used for all characters????
    renderViking();

}

function renderViking(){
    
    // Bow rendered
    card1HeaderEl.textContent = gameState.playerCard1.name;
    card1ImgEl.src = gameState.playerCard1.img;
    card1Description.textContent = `Damage: ${gameState.playerCard1.dmg}`;

    // Club card rendered
    card2HeaderEl.textContent = gameState.playerCard2.name;
    card2ImgEl.src = gameState.playerCard2.img;
    card2Description.textContent = `Damage: ${gameState.playerCard2.dmg}`;

    // Axe card rendered
    card3HeaderEl.textContent = gameState.playerCard3.name;
    card3ImgEl.src = gameState.playerCard3.img;
    card3Description.textContent = `Damage: ${gameState.playerCard3.dmg}`;

    // Heal card rendered
    card4HeaderEl.textContent = gameState.playerCard4.name;
    card4ImgEl.src = gameState.playerCard4.img;
    card4Description.textContent = `Heal: ${gameState.playerCard4.healing}`;

    // player avatars rendered 
    playerEl.src = viking.img;

    playerHealthElement.textContent = `HEALTH: ${gameState.playerHealth}`;
    playerCoinsElement.textContent = `COINS: ${gameState.playerCoins}`;


    enemyEl.src = gameState.enemyImage;
    enemyHealthelement.textContent = `HEALTH: ${gameState.enemyHealth}`;

}





function handleSelection(event){
    // ------------------------------------- VIKING GAMEPLAY
    if(event.target.id === "vikingSelect"){
        console.log("change game state to viking");
        introRenderEl.hidden = true;
        gameBoardEl.hidden = false;

        gameStateViking();
        // another function that gets the game state, stats of the viking and monster to put into play
    }

}



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

    // 4 Game state
// When after selecting a character render the character that was clicked and render an enemy

// as well as rendering them, set a battle stage for the respective player and beast. (find out how to get the current player and current enemy??)

// Create a game state object that takes in the player and enemys health, spells, and players coins,?

// When the person selects a character initialization based on the one they selected should render the board and game state with player stats and monster stats

// Add an event listener to each of the cards that checks the players coins and its cost, if the player has enough coins then use the spell by deducting the cost of the spell to player coins and use the damage of that card to subtract from the enemies health. 