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

// ENEMY ATTACK SLOT 
const enemyCardHeaderEl = document.querySelector("#enemyCard > h2");
const EnemycardImgEl = document.querySelector("#enemyCard > img");
const EnemycardDescription = document.querySelector("#enemyCard > p");

// --Card deck
const cards = document.querySelectorAll(".card");

cards.forEach(function(card){
    card.addEventListener("click", useCard)
})

// PASS BTN
const passEl = document.querySelector("#pass");
passEl.addEventListener("click", useCard);

// Avatar IMGS
const enemyEl = document.querySelector("#enemyAvatar");
const playerEl = document.querySelector("#playerAvatar");

// Text Elements / health and coins
const playerNameEl = document.querySelector("#playerNameEl");
const playerHealthElement = document.querySelector("#playerHealthEl");
const playerCoinsElement = document.querySelector("#playerCoinEl");

const enemyHealthelement = document.querySelector("#enemyHealthEl");
const enemyNameEl = document.querySelector("#enemyNameEl")

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
    constructor(name,health,img, attack1, attack2){
        this.name = name;
        this.health = health;
        this.img = img;
        this.attack1 = attack1;
        this.attack2 = attack2;
    }
}

//-----------------------------------------------------------------OBJECTS 

//-----------Player / Monsters / Cards objects & Monster attacks
// for randomizer & rendering
let monsterChoices = 2;
let monsterchose, isDead;

// ------------Player Cards
// ---VIKING 
let bowWeapon = new Card("Long Shot", "/imgs/bow.svg", 1, 80);
let clubWeapon = new Card("Skull Cracker", "/imgs/club.svg", 2, 130);
let axeWeapon = new Card("War Axe", "/imgs/axe.svg", 3, 200);
let healPotion = new Card("Potion", "/imgs/heal.svg", 4, null, 350);

// ------------Monsters Attacks
// ---SaberTooth
let fangAttack = new Card("Fangs", "/imgs/vikingImgs/fangs.svg", null, 150);
let clawAttack = new Card("Claws", "/imgs/vikingImgs/claws.svg", null, 100);

// Players
let viking = new Player("Viking", 500, 1, bowWeapon,clubWeapon,axeWeapon,healPotion, "/imgs/viking.svg");

// Monsters 
let saberTooth = new Monster("Saber Tooth", 800, "/imgs/saberTooth.svg", clawAttack,fangAttack)

// --------------------------------------------- Player State and RENDERS
// --------GAME STATE

const gameState = {
    // ----dynamic player state
    playerHealth: null,
    playerCoins: null,
    playerName: null,
    playerImage: null,
    // game state player damage will be determined by card selected
    playerDamage: null,    

    // cards
    playerCard1: null,
    playerCard2: null,
    playerCard3: null,
    playerCard4: null,

    // ------dynamic enemy state
    enemyHealth: null,
    enemyName: null,
    enemyImage: null,
    // game state enemy damage will be determined by random attack choice
    enemyDamage: null,

    // attacks
    enemyAttack1: null,
    enemyAttack2: null,

}

// --------------------- FUNCTIONS
// Event for game state on character Selection
function handleSelection(event){
    // ------------------------------------- VIKING GAMEPLAY
    if(event.target.id === "vikingSelect"){
        console.log("change game state to viking");
        introRenderEl.hidden = true;
        gameBoardEl.hidden = false;

        gameStateViking();
    }

}

function gameStateViking(){

    // player 
    gameState.playerHealth = viking.health;
    gameState.playerCoins = viking.coins;
    gameState.playerName = viking.name;
    gameState.playerImage = viking.img;

    // state player cards
    gameState.playerCard1 = viking.card1;
    gameState.playerCard2 = viking.card2;
    gameState.playerCard3 = viking.card3;
    gameState.playerCard4 = viking.card4;

    // enemy
    gameState.enemyHealth = saberTooth.health;
    gameState.enemyImage = saberTooth.img;
    gameState.enemyName = saberTooth.name;

    // state enemy attacks
    gameState.enemyAttack1 = saberTooth.attack1;
    gameState.enemyAttack2 = saberTooth.attack2;

    // Create a function here than makes the enemy return a random number between 1 and 2 (or up to how ever many attacks you want them to have).
    // this will allow render to know which card to render as well as allowing the enemy to be assigned a gameState Damage. 
    enemyChoice(monsterChoices)

    render();

}

function enemyChoice(choices){
    // use game state 
    function randomChoice(choose){
        return Math.floor((Math.random() * choose) + 1)
    }

    return monsterchose = randomChoice(choices);
}

function render(){
    // Player

    // card1 rendered
    card1HeaderEl.textContent = gameState.playerCard1.name;
    card1ImgEl.src = gameState.playerCard1.img;
    card1Description.textContent = `Damage: ${gameState.playerCard1.dmg}`;

    // card2 rendered
    card2HeaderEl.textContent = gameState.playerCard2.name;
    card2ImgEl.src = gameState.playerCard2.img;
    card2Description.textContent = `Damage: ${gameState.playerCard2.dmg}`;

    // card3 rendered
    card3HeaderEl.textContent = gameState.playerCard3.name;
    card3ImgEl.src = gameState.playerCard3.img;
    card3Description.textContent = `Damage: ${gameState.playerCard3.dmg}`;

    // card4 rendered
    card4HeaderEl.textContent = gameState.playerCard4.name;
    card4ImgEl.src = gameState.playerCard4.img;
    card4Description.textContent = `Heal: ${gameState.playerCard4.healing}`;

    // player avatar and stats rendered 
    playerEl.src = viking.img;

    playerNameEl.textContent = gameState.playerName;
    playerHealthElement.textContent = `HEALTH: ${gameState.playerHealth}`;
    playerCoinsElement.textContent = `COINS: ${gameState.playerCoins}`;

    // Enemy

    // avatar and stats rendered
    enemyEl.src = gameState.enemyImage;
    enemyNameEl.textContent = gameState.enemyName;
    enemyHealthelement.textContent = `HEALTH: ${gameState.enemyHealth}`;

    // render enemy card based on enemy choices return
    if(monsterchose === 1){
        console.log("Monster chose attack 1");

        enemyCardHeaderEl.textContent = gameState.enemyAttack1.name
        EnemycardImgEl.src = gameState.enemyAttack1.img;
        EnemycardDescription.textContent = `Damage: ${gameState.enemyAttack1.dmg}`

    } else if(monsterchose === 2){
        console.log("Monster chose attack 2");

        enemyCardHeaderEl.textContent = gameState.enemyAttack2.name
        EnemycardImgEl.src = gameState.enemyAttack2.img;
        EnemycardDescription.textContent = `Damage: ${gameState.enemyAttack2.dmg}`
    }

    // RENDER A NEW SCREEN THAT SHOWS WIN OR LOSS, IF PLAYER IS DEAD THEN RUN IT AND IF ENEMY IS DEAD RUN IT
    // use a function
    checkDeaths();

}

function useCard(event){
    // make pass count as useCard as well and iterate and complete the turn
    
    // if id = card1 
        // check card1 cost and compare to player coins, if they have enough coins then use the dmg from card 1 and reduce it to the enemies health as well as reduce the players coins (and add 1 coin), else alert that they do not have enough coins.

    if(this.id === "card1"){
        if(gameState.playerCoins >= gameState.playerCard1.cost) {
            
            gameState.playerDamage = gameState.playerCard1.dmg;
            gameState.playerCoins -= gameState.playerCard1.cost;
            battleStage();

        } else{
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard1.cost}`)
        }        
    }

    if(this.id === "card2"){
        if(gameState.playerCoins >= gameState.playerCard2.cost) {

            gameState.playerDamage = gameState.playerCard2.dmg;
            gameState.playerCoins -= gameState.playerCard2.cost;
            battleStage();
        } else{
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard2.cost}`)
        }        
    }
    
    if(this.id === "card3"){
        if(gameState.playerCoins >= gameState.playerCard3.cost) {

            gameState.playerDamage = gameState.playerCard3.dmg;
            gameState.playerCoins -= gameState.playerCard3.cost;
            battleStage();
        } else{
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard3.cost}`)
        }        
    }
    
    if(this.id === "card4"){
        if(gameState.playerCoins >= gameState.playerCard4.cost) {

            gameState.playerHealth += gameState.playerCard4.healing;
            gameState.playerCoins -= gameState.playerCard4.cost;
            battleStage();
        } else{
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard4.cost}`)
        }        
    } 

    if(this.id === "pass"){

        gameState.playerDamage = 0;
        battleStage();

    }
}

function battleStage(){
    console.log(gameState.playerDamage);

    // player goes first
    if(gameState.enemyHealth >= 1){
        // GAME STILL IN PROGRESS
        gameState.enemyHealth -= gameState.playerDamage;
    }

    // Enemy goes second
    if(monsterchose === 1){
        gameState.enemyDamage = gameState.enemyAttack1.dmg;
    }else if(monsterchose === 2){
        gameState.enemyDamage = gameState.enemyAttack2.dmg;
    }

    gameState.playerHealth -= gameState.enemyDamage;

    // randomize the choice after it attacks
    enemyChoice(monsterChoices);
    gameState.playerCoins ++;

    render();
}

function checkDeaths(){
    if(gameState.enemyHealth <= 0){
        console.log("enemy died, render VICTORY Screen");
    } else if(gameState.playerHealth <= 0){
        console.log("enemy died, render DEFEAT Screen");
    }
}

// To Do
// Create monster attack cards, Monster chooses randomly which card to use. Before the battling stage make the monster declare which attack it will use.
// the enemy only displays the card it will use next turn on a single card. 

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


// make an initializer for the game state just in case
// Create a victory render that lets the player restart