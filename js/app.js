// ------------------------------------ CONST VARIABLES
// ---Audio
const bgMusicEl = document.querySelector("#bgMusic");
const sfxEl = document.querySelector("#sfxAudio");

//-------------------------------------------------------CACHED Elements

// --------- SCREEN RENDER ELEMENTS
const introRenderEl = document.querySelector("#gameIntro");
const gameBoardEl = document.querySelector("#gameBoard");
const outroRenderEl = document.querySelector("#gameOutro");

// Character selections
const characterSelectionBoard = document.querySelector(".characterSelection");

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


// PASS BTN
const passEl = document.querySelector("#pass");

// Avatar IMGS
const enemyEl = document.querySelector("#enemyAvatar");
const playerEl = document.querySelector("#playerAvatar");

// Text Elements / health and coins
const playerNameEl = document.querySelector("#playerNameEl");
const playerHealthElement = document.querySelector("#playerHealthEl");
const playerCoinsElement = document.querySelector("#playerCoinEl");

const enemyHealthelement = document.querySelector("#enemyHealthEl");
const enemyNameEl = document.querySelector("#enemyNameEl")

// OUTRO RENDER
const endingMessage = document.querySelector("#gameOutro > h2");
const endingDescription = document.querySelector("#gameOutro > p");
const replayBtn = document.querySelector("#gameOutro > button");

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
    constructor(name,health,img, attack1, attack2, sleep){
        this.name = name;
        this.health = health;
        this.img = img;
        this.attack1 = attack1;
        this.attack2 = attack2;
        this.sleep = sleep;
    }
}

//-----------------------------------------------------------------OBJECTS 

//-----------Player / Monsters / Cards objects & Monster attacks
// for randomizer & rendering
let monsterChoices = 3;
let monsterchose, isDead, turns, beastsKilled;

// ------------Player Cards
// ---VIKING 
let bowCard = new Card("Long Shot", "/imgs/vikingImgs/bow.svg", 1, 50);
let flailCard = new Card("Flail", "/imgs/vikingImgs/flail.svg", 2, 200);
let axeCard = new Card("War Axe", "/imgs/vikingImgs/axe.svg", 3, 400);
let armorCard = new Card("Armor", "/imgs/vikingImgs/armour.svg", 4, null, 550);

//---WIZARD
let orbCard = new Card("Unstable Orb", "/imgs/wizardImgs/orb.svg", 1, 150);
let iceCard = new Card("Ice Bolt", "/imgs/wizardImgs/iceBolt.svg", 2, 300);
let golemCard = new Card("Ice Golem", "/imgs/wizardImgs/ice-golem.svg", 4, 700);
let fairyCard = new Card("Fairy", "/imgs/wizardImgs/fairy.svg", 3, null, 500);

// --BARBARIAN
let enrageCard = new Card("Race Out", "/imgs/barbarianImgs/enrage.svg", 2, 350);
let clubCard = new Card("Jay's Club", "/imgs/barbarianImgs/club.svg", 3, 550);
let thorPunchCard = new Card("Thor Punch", "/imgs/barbarianImgs/thor-fist.svg", 5, 750)
let bandageCard = new Card("Bandage", "/imgs/barbarianImgs/bandage.svg", 2, null, 250)

// ------------Monsters Cards
let sleepCard = new Card("Sleep", "/imgs/sleep.svg", null, 0)

// ---SaberTooth cards
let fangAttack = new Card("Fangs", "/imgs/vikingImgs/fangs.svg", null, 300, null);
let clawAttack = new Card("Claws", "/imgs/vikingImgs/claws.svg", null, 100, null);

// ---- Golem cards
let rockSlideAttack = new Card("Rock Slide", "/imgs/barbarianImgs/rockSlide.svg", null, 300, null);
let rockHeart = new Card("Tough Love", "/imgs/barbarianImgs/mineralHeart.svg", null, null, 150);

// ---- Dragon cards
let breathAttack = new Card("Breath", "/imgs/wizardImgs/dragon-breath.svg", null, 50, null);
let volcanoAttack = new Card("Erupt", "/imgs/wizardImgs/caldera.svg", null, 300, null);

// Players
let viking = new Player("Viking", 1500, 1, bowCard,flailCard,axeCard,armorCard, "/imgs/vikingImgs/viking.svg");

let wizard = new Player("Wizard", 400, 2, orbCard, iceCard, golemCard, fairyCard, "/imgs/wizardImgs/wizard.svg")

let barbarian = new Player("Barbarian", 750, 2, enrageCard, clubCard, thorPunchCard, bandageCard, "/imgs/barbarianImgs/barbarian.svg",)

// Monsters 
let saberTooth = new Monster("Saber Tooth", 1000, "/imgs/vikingImgs/saberTooth.svg", clawAttack, fangAttack, sleepCard);

let golem = new Monster("Golem", 1400, "/imgs/barbarianImgs/golem.svg", rockSlideAttack, rockHeart, sleepCard);

let dragon = new Monster("Dragon", 900, "/imgs/wizardImgs/dragon.svg", breathAttack, volcanoAttack, sleepCard);

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
    enemySleep: null,

}

// -------------------EVENTS
characterSelectionBoard.addEventListener("click", handleAudio);

characterSelectionBoard.addEventListener("click", handleSelection);

cards.forEach(function(card){
    card.addEventListener("click", useCard)
});

passEl.addEventListener("click", useCard);
replayBtn.addEventListener("click", newGame);


// --------------------- FUNCTIONS
initialization();

function initialization(){
    // reset Gloabals
    turns = 0;
    beastsKilled = 0;
    isDead = null;
    monsterchose = null;
    // reset state
    gameState.playerHealth = null;
    gameState.playerCoins = null;
    gameState.playerName = null;
    gameState.playerImage = null;
    gameState.playerDamage = null;    
    // cards
    gameState.playerCard1 = null;
    gameState.playerCard2 = null;
    gameState.playerCard3 = null;
    gameState.playerCard4 = null;
    // ------dynamic enemy state
    gameState.enemyHealth = null;
    gameState.enemyName = null;
    gameState.enemyImage = null;
    // game state enemy damage will be determined by random attack choice
    gameState.enemyDamage = null;
    // attacks
    gameState.enemyAttack1 = null;
    gameState.enemyAttack2 = null;
    gameState.enemySleep = null;
}

function handleSelection(event){
    // ------------------------------------- VIKING GAMEPLAY
    if(event.target.id === "vikingSelect"){
        console.log("change game state to viking");
        introRenderEl.hidden = true;
        gameBoardEl.hidden = false;

        gameStateViking();
    }

    // ------------------------------------- WIZARD GAMEPLAY
    if(event.target.id === "wizardSelect"){
        console.log("change game state to wizard");
        introRenderEl.hidden = true;
        gameBoardEl.hidden = false;

        gameStateWizard();
    }

    // ------------------------------------- BARBARIAN GAMEPLAY
    if(event.target.id === "barbarianSelect"){
        console.log("change game state to barbarian");
        introRenderEl.hidden = true;
        gameBoardEl.hidden = false;

        gameStateBarbarian();
    }

}

// player renders & States
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
    gameState.enemySleep = saberTooth.sleep;

    // this will allow render to know which card to render as well as allowing the enemy to be assigned a gameState Damage. 
    enemyChoice(monsterChoices)

    render();

}

function gameStateWizard(){

    // player 
    gameState.playerHealth = wizard.health;
    gameState.playerCoins = wizard.coins;
    gameState.playerName = wizard.name;
    gameState.playerImage = wizard.img;

    // state player cards
    gameState.playerCard1 = wizard.card1;
    gameState.playerCard2 = wizard.card2;
    gameState.playerCard3 = wizard.card3;
    gameState.playerCard4 = wizard.card4;

    // enemy
    gameState.enemyHealth = dragon.health;
    gameState.enemyImage = dragon.img;
    gameState.enemyName = dragon.name;

    // state enemy attacks
    gameState.enemyAttack1 = dragon.attack1;
    gameState.enemyAttack2 = dragon.attack2;
    gameState.enemySleep = dragon.sleep;

    // this will allow render to know which card to render as well as allowing the enemy to be assigned a gameState Damage. 
    enemyChoice(monsterChoices)

    render();

}

function gameStateBarbarian(){

    // player 
    gameState.playerHealth = barbarian.health;
    gameState.playerCoins = barbarian.coins;
    gameState.playerName = barbarian.name;
    gameState.playerImage = barbarian.img;

    // state player cards
    gameState.playerCard1 = barbarian.card1;
    gameState.playerCard2 = barbarian.card2;
    gameState.playerCard3 = barbarian.card3;
    gameState.playerCard4 = barbarian.card4;

    // enemy
    gameState.enemyHealth = golem.health;
    gameState.enemyImage = golem.img;
    gameState.enemyName = golem.name;

    // state enemy attacks
    gameState.enemyAttack1 = golem.attack1;
    gameState.enemyAttack2 = golem.attack2;
    gameState.enemySleep = golem.sleep;

    // this will allow render to know which card to render as well as allowing the enemy to be assigned a gameState Damage. 
    enemyChoice(monsterChoices)

    render();

}

function enemyChoice(choices){
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
    card1Description.textContent = `Attack: ${gameState.playerCard1.dmg}`;

    // card2 rendered
    card2HeaderEl.textContent = gameState.playerCard2.name;
    card2ImgEl.src = gameState.playerCard2.img;
    card2Description.textContent = `Attack: ${gameState.playerCard2.dmg}`;

    // card3 rendered
    card3HeaderEl.textContent = gameState.playerCard3.name;
    card3ImgEl.src = gameState.playerCard3.img;
    card3Description.textContent = `Attack: ${gameState.playerCard3.dmg}`;

    // card4 rendered
    card4HeaderEl.textContent = gameState.playerCard4.name;
    card4ImgEl.src = gameState.playerCard4.img;
    card4Description.textContent = `Heal: +${gameState.playerCard4.healing}`;

    renderCardStyles();

    // player avatar and stats rendered 
    playerEl.src = gameState.playerImage;

    playerNameEl.textContent = gameState.playerName;
    playerHealthElement.textContent = `HEALTH: ${gameState.playerHealth}`;
    playerCoinsElement.textContent = `COINS: ${gameState.playerCoins}`;

    // Enemy
    // avatar and stats rendered
    enemyEl.src = gameState.enemyImage;
    enemyNameEl.textContent = gameState.enemyName;
    enemyHealthelement.textContent = `HEALTH: ${gameState.enemyHealth}`;

    // render enemy card based on enemy choices return
    // checks for healing cards
    if(monsterchose === 1 && gameState.enemyAttack1.healing === null){

        enemyCardHeaderEl.textContent = gameState.enemyAttack1.name
        EnemycardImgEl.src = gameState.enemyAttack1.img;
        EnemycardDescription.textContent = `Attack: ${gameState.enemyAttack1.dmg}`

    } else if(monsterchose === 1 && gameState.enemyAttack1.healing != null){
        enemyCardHeaderEl.textContent = gameState.enemyAttack1.name
        EnemycardImgEl.src = gameState.enemyAttack1.img;
        EnemycardDescription.textContent = `Heal: +${gameState.enemyAttack1.healing}`
    }
    
    if(monsterchose === 2 && gameState.enemyAttack2.healing === null){

        enemyCardHeaderEl.textContent = gameState.enemyAttack2.name
        EnemycardImgEl.src = gameState.enemyAttack2.img;
        EnemycardDescription.textContent = `Attack: ${gameState.enemyAttack2.dmg}`
    } else if(monsterchose === 2 && gameState.enemyAttack2.healing != null) {

        enemyCardHeaderEl.textContent = gameState.enemyAttack2.name
        EnemycardImgEl.src = gameState.enemyAttack2.img;
        EnemycardDescription.textContent = `Heal: +${gameState.enemyAttack2.healing}`
    }
    
    // Sleep will always be option 3
    if(monsterchose === 3){

        enemyCardHeaderEl.textContent = gameState.enemySleep.name
        EnemycardImgEl.src = gameState.enemySleep.img;
        EnemycardDescription.textContent = `Attack: ${gameState.enemySleep.dmg}`
    }
    
}

function useCard(event){

    // checks if the card can be purchased
    if(this.id === "card1"){
        if(gameState.playerCoins >= gameState.playerCard1.cost) {
            
            gameState.playerDamage = gameState.playerCard1.dmg;
            gameState.playerCoins -= gameState.playerCard1.cost;
            cardSFX(true);
            battleStage();

        } else{
            cardSFX(false);
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard1.cost}`)
        }        
    }

    if(this.id === "card2"){
        if(gameState.playerCoins >= gameState.playerCard2.cost) {

            gameState.playerDamage = gameState.playerCard2.dmg;
            gameState.playerCoins -= gameState.playerCard2.cost;
            cardSFX(true);
            battleStage();
        } else{
            cardSFX(false);
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard2.cost}`)
        }        
    }
    
    if(this.id === "card3"){
        if(gameState.playerCoins >= gameState.playerCard3.cost) {

            gameState.playerDamage = gameState.playerCard3.dmg;
            gameState.playerCoins -= gameState.playerCard3.cost;
            cardSFX(true);
            battleStage();
        } else{
            cardSFX(false);
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard3.cost}`)
        }        
    }
    
    // 4th card is always heal, 
    if(this.id === "card4"){
        if(gameState.playerCoins >= gameState.playerCard4.cost) {

            gameState.playerHealth += gameState.playerCard4.healing;
            gameState.playerCoins -= gameState.playerCard4.cost;
            cardSFX(true);
            battleStage();
        } else{
            cardSFX(false);
            alert(`You only have (${gameState.playerCoins}) coins, the card costs ${gameState.playerCard4.cost}`)
        }        
    } 

    if(this.id === "pass"){

        gameState.playerDamage = 0;
        battleStage();

    }
}

function battleStage(){
    // player goes 1st
    gameState.enemyHealth -= gameState.playerDamage;
    
    // enemy goes 2nd
    // checks for healing
    if(monsterchose === 1 && gameState.enemyAttack1.healing === null){

        gameState.enemyDamage = gameState.enemyAttack1.dmg;
    }  else if(monsterchose === 1 && gameState.enemyAttack1.healing != null){

        gameState.enemyHealth += gameState.enemyAttack1.healing;
    }
    
    if(monsterchose === 2 && gameState.enemyAttack2.healing === null){

        gameState.enemyDamage = gameState.enemyAttack2.dmg;
    } else if(monsterchose === 2 && gameState.enemyAttack2.healing != null){
        gameState.enemyHealth += gameState.enemyAttack2.healing;
    }
    
    // third option will always be sleep
    if(monsterchose === 3){
        gameState.enemyDamage = gameState.enemySleep.dmg;
    }

    gameState.playerHealth -= gameState.enemyDamage;

    // Resets
    // reset enemy damage after attacking since the value stays after healing
    gameState.enemyDamage = 0;

    // randomize the choice after it attacks
    enemyChoice(monsterChoices);
    gameState.playerCoins ++;

    turns ++;

    checkDeaths();

    render();
}

function checkDeaths(){
    if(gameState.enemyHealth <= 0){
        isDead = "enemy";
        beastsKilled ++;
        renderEndScreen();
    } else if(gameState.playerHealth <= 0){
        isDead = "player";
        renderEndScreen();
    }
}

function renderEndScreen(){

    gameBoardEl.hidden = true;
    outroRenderEl.hidden = false;

    if(isDead === "enemy"){
        endingMessage.textContent = `${gameState.playerName} IS VICTORIOUS!!!!!`
        endingDescription.textContent = `You've survived (${turns}) turns, and killed (${beastsKilled}) beasts!`
    } else {
        endingMessage.textContent = `DEFEAT!!!! ${gameState.enemyName} has won.`
        endingDescription.textContent = `You've survived (${turns}) turns, and killed (${beastsKilled}) beasts!`
    }

}

function newGame(){

    initialization();
    outroRenderEl.hidden = true;
    introRenderEl.hidden = false;
    bgMusicEl.pause();
}

function handleAudio(event){

    // Background Audio
    if(event.target.id ==="vikingSelect"){
        bgMusicEl.setAttribute("src", "/Audio/Baba Yaga.mp3")
        bgMusicEl.volume = 0.3;
        bgMusicEl.play();
    }

    if(event.target.id ==="wizardSelect"){
        bgMusicEl.setAttribute("src", "/Audio/Crunk Knight.mp3")
        bgMusicEl.volume = 0.2;
        bgMusicEl.play();
    }

    if(event.target.id ==="barbarianSelect"){
        bgMusicEl.setAttribute("src", "/Audio/Five Armies.mp3")
        bgMusicEl.volume = 0.4;
        bgMusicEl.play();
    }

}

function cardSFX(condition){
    if(condition){
        sfxEl.setAttribute("src", "/Audio/sfx/purchase.mp3")
        sfxEl.play();
    } else {
        sfxEl.setAttribute("src", "/Audio/sfx/brokecoin.mp3")
        sfxEl.play();
    }
}

function renderCardStyles(){

    if(gameState.playerName === "Viking"){

        card1HeaderEl.style.backgroundColor = "#6D9886";
        card2HeaderEl.style.backgroundColor = "#6D9886";
        card3HeaderEl.style.backgroundColor = "#6D9886";
        card4HeaderEl.style.backgroundColor = "#6D9886";

        card1Description.style.backgroundColor = "#6D9886";
        card2Description.style.backgroundColor = "#6D9886";
        card3Description.style.backgroundColor = "#6D9886";
        card4Description.style.backgroundColor = "#6D9886";

        // img els
        card1ImgEl.style.backgroundColor = "#212121";
        card2ImgEl.style.backgroundColor = "#212121";
        card3ImgEl.style.backgroundColor = "#212121";
        card4ImgEl.style.backgroundColor = "#212121";
    }
    
    if(gameState.playerName === "Wizard"){

        card1HeaderEl.style.backgroundColor = "#916BBF";
        card2HeaderEl.style.backgroundColor = "#916BBF";
        card3HeaderEl.style.backgroundColor = "#916BBF";
        card4HeaderEl.style.backgroundColor = "#916BBF";

        card1Description.style.backgroundColor = "#916BBF";
        card2Description.style.backgroundColor = "#916BBF";
        card3Description.style.backgroundColor = "#916BBF";
        card4Description.style.backgroundColor = "#916BBF";

        // img els
        card1ImgEl.style.backgroundColor = "#1C0C5B";
        card2ImgEl.style.backgroundColor = "#1C0C5B";
        card3ImgEl.style.backgroundColor = "#1C0C5B";
        card4ImgEl.style.backgroundColor = "#1C0C5B";
    }

    if(gameState.playerName === "Barbarian"){

        card1HeaderEl.style.backgroundColor = "#C36839";
        card2HeaderEl.style.backgroundColor = "#C36839";
        card3HeaderEl.style.backgroundColor = "#C36839";
        card4HeaderEl.style.backgroundColor = "#C36839";

        card1Description.style.backgroundColor = "#C36839";
        card2Description.style.backgroundColor = "#C36839";
        card3Description.style.backgroundColor = "#C36839";
        card4Description.style.backgroundColor = "#C36839";

        // img els
        card1ImgEl.style.backgroundColor = "#630A10";
        card2ImgEl.style.backgroundColor = "#630A10";
        card3ImgEl.style.backgroundColor = "#630A10";
        card4ImgEl.style.backgroundColor = "#630A10";
    }
}

// Psuedo

// 0 cache all of the card elements to be rendered

// 1. Create a class object to be used for every spell card i decide to make.

// 2) CARDS functions
    // Do not allow the player to click on cards they cannot afford,
    // if the player does not have enough coins for the card alert

// 3. Create a class for different kind of players and enemies
    // make the enemy render the card it chooses randomly
    // 3.1 enemies are special and dont use coins just attacks

    // 4 Game state
// When after selecting a character render the character that was clicked and render an enemy

// as well as rendering them, set a battle stage for the respective player and beast. 

// Create a game state object that takes in the player and enemys health, spells, and players coins.

// When the person selects a character initialization based on the one they selected should render the board and game state with player stats and monster stats

// Add an event listener to each of the cards that checks the players coins and its cost, if the player has enough coins then use the spell by deducting the cost of the spell to player coins and use the damage of that card to subtract from the enemies health. 

// TO DO
// make a sleep card for the monster insinuating exhuasted 
// make an initializer for the game after they selected their character or after they hit the replay button
    // Things to initialize, all gameState properties, isDead variable, monsterchoices and choice, turns count, beasts killed count
// Create a victory or defeat render that lets the player restart