//-----------------------------------------------------------------------------CACHED Elements

// --------- Game INITIAL RENDER
const introRenderEl = document.querySelector("#gameIntro");

// Character selections
const characterSelectionBoard = document.querySelector(".characterSelection")


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

// Avatar IMGS
const enemyEl = document.querySelector("#enemyAvatar");
const playerEl = document.querySelector("#playerAvatar");

// Text Elements / health and coins
const playerHealthElement = document.querySelector("#playerHealthEl");
const playerCoinsElement = document.querySelector("#playerCoinEl");


//---------------------------------------------------------------------------CLASSES
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

//--------------------------------------------------------------------------------OBJECTS 

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

// ------------------------------------------------------------------- Player State and RENDERS
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

    renderViking();

}

function renderViking(){
    
    // Bow rendered
    card1HeaderEl.textContent = viking.card1.name;
    card1ImgEl.src = viking.card1.img;
    card1Description.textContent = `Damage: ${viking.card1.dmg}`;

    // Club card rendered
    card2HeaderEl.textContent = viking.card2.name;
    card2ImgEl.src = viking.card2.img;
    card2Description.textContent = `Damage: ${viking.card2.dmg}`;

    // Axe card rendered
    card3HeaderEl.textContent = viking.card3.name;
    card3ImgEl.src = viking.card3.img;
    card3Description.textContent = `Damage: ${viking.card3.dmg}`;

    // Heal card rendered
    card4HeaderEl.textContent = viking.card4.name;
    card4ImgEl.src = viking.card4.img;
    card4Description.textContent = `Heal: ${viking.card4.healing}`;

    // player avatars rendered 
    playerEl.src = viking.img;

    // using dynamic Game state 
    playerHealthElement.textContent = `HEALTH: ${viking.health}`;
    playerCoinsElement.textContent = `COINS: ${viking.coins}`;

    enemyEl.src = saberTooth.img

}





// Event for game state on character Selection
characterSelectionBoard.addEventListener("click", handleSelection);

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