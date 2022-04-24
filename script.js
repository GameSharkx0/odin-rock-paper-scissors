const rockChoice = document.getElementById("rock");
const paperChoice = document.getElementById("paper");
const scissorsChoice = document.getElementById("scissors");
const playerChar = document.getElementById("player-image");
const playerHealth = document.getElementById("player-damage");
const playerHealthBar = document.getElementById("player-hp");
const enemyChar = document.getElementById("enemy-image");
const enemyHealth = document.getElementById("enemy-damage");
const enemyHealthBar = document.getElementById("enemy-hp");
let enemyHp = 0;
const playerHpNum = document.getElementById("hp-remaining");
const computerOptions = [0, 1, 2];
const choiceArray = ["r", "p", "s"];
const damageValues = ["50px", "100px", "150px"];
let playerChoice;
const menuOptions = document.getElementsByClassName("click-sound"); 
const clickToStart = document.getElementById("click-to-start");
const splash = document.getElementById("splash");
const game = document.getElementById("game");
const defaultAudio = document.getElementById("defaultAudio");
const battleAudio = document.getElementById("battleAudio");
const victoryAudio = document.getElementById("victoryAudio");
const lowHpAudio = document.getElementById("lowHpAudio");
const faintAudio = document.getElementById("faintAudio");
const hitAudio = document.getElementById("hitAudio");
const fightText = document.getElementById("fight-section-alt");
const fightOpt1 = document.getElementById("fight-section-pt1");
const fightOpt2 = document.getElementById("fight-section-pt2");
const cheat = document.getElementById("menu-option-3");
const run = document.getElementById("menu-option-4");
const help = document.getElementById("menu-option-2");
const fight = document.getElementById("menu-option-1");
const yesNoMenu = document.getElementById("menu-options-alt");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const slideIconE = document.getElementById("enemy-icon");
const slideIconP = document.getElementById("player-icon");
const slideHpE = document.getElementById("hp-card-enemy");
const slideHpP = document.getElementById("hp-card-player");
const slideArray = [slideHpE, slideHpP, slideIconP, slideIconE];
const wins = document.getElementById("wins");
const losses = document.getElementById("losses");
const ratio = document.getElementById("wr-percent");
const testImg = document.getElementById("screen-image");


let battle = (playerChoice, computerChoice) => {
    changeZ(3500);
    computerChoiceResult = choiceArray[computerChoice];
    changeCharImage("enemy", computerChoiceResult);
    if (playerChoice === computerChoiceResult){
        resultLogic("draw");
    } else {
        switch (playerChoice){
            case ("r"):
                if (computerChoiceResult === "s"){
                    //player win
                    resultLogic("player-w");
                } else {
                    // computer win
                    resultLogic("computer-w");
                }
                break;
            case ("p"):
                if (computerChoiceResult === "r"){
                    //player win
                    resultLogic("player-w");
                } else {
                    // computer win
                    resultLogic("computer-w");
                }
                break;
            case ("s"):
                if (computerChoiceResult === "p"){
                    //player win
                    resultLogic("player-w");
                } else {
                    // computer win
                    resultLogic("computer-w");
                }
                break;
        }
    }
}

let changeZ = (num) => {
        game.style.zIndex=-1;
        setTimeout(() => {
            game.style.zIndex = 0;
        }, num);
    }

let changeVis = (num) => {
        game.style.display = "none";
        setTimeout(() => {
            game.style.display = "block";
            splash.style.display = "none";
        }, num);
    }

let resultLogic = (winner) => {
    switch (winner){
        case "draw":
            typeMessage("Neither attack had any effect.");
            break;
        case "player-w":
            //blink animation for enemy sprite
            typeMessage("JSON's attack was super effective!");
            //increment computer w
            //call hp reducing function and animation
            dealDamage("enemy");
            break;
        case "computer-w":
            //blink animation for enemy sprite
            typeMessage("JASON's attack was super effective!");
            //increment computer w
            //call hp reducing function and animation
            dealDamage("player");
            break;
    }
}

let computerChoice = () => computerOptions[Math.floor(Math.random()*3)];

let handlePlayerFightDecision = (choice) => {
    if (choice === "r"){
        playerChoice = "r";
        changeCharImage("player", "r")
    } else if (choice === "p"){
        playerChoice = "p";
        changeCharImage("player", "p")
    } else if (choice === "s"){
        playerChoice = "s";
        changeCharImage("player", "s")
    }
    battle(playerChoice, computerChoice());
}

let changeCharImage = (player, choice) => {
    switch (player){
        case "player":
            reduceCharImage(playerChar);
            setTimeout(() => {
                restoreCharImage(playerChar);
            }, 100);
            if (choice === "r"){
                playerChar.src = "player-r.png"
            }
            else if (choice === "p"){
                playerChar.src = "player-p.png"
            }
            else {
                playerChar.src = "player-s.png"
            }
            break;
        case "enemy":
            reduceCharImage(enemyChar);
            setTimeout(() => {
                restoreCharImage(enemyChar);
            }, 100);
            if (choice === "r"){
                enemyChar.src = "enemy-r.png"
            }
            else if (choice === "p"){
                enemyChar.src = "enemy-p.png"
            }
            else {
                enemyChar.src = "enemy-s.png"
            }
            break;
    }
}

let dealDamage = (character) => {
    switch (character){
        case ("enemy"):
            jiggle(slideIconE);
            reduceHp(50, "enemy");
            if (enemyHealth.style.width === damageValues[0]){
                enemyHealthBar.style.backgroundColor = "red";
            } else if (enemyHealth.style.width === damageValues[1]){
            } else {
                enemyHealthBar.style.backgroundColor = "gold";
            }
            break;
        case ("player"):
            jiggle(slideIconP);
            reduceHp(50);
            if (playerHealth.style.width === damageValues[0]){
                playerHealthBar.style.backgroundColor = "red";
            } else if (playerHealth.style.width === damageValues[1]){
            } else {
                playerHealthBar.style.backgroundColor = "gold";
            }
            break;
    }

}

let reduceCharImage = (character) => {
    character.style.height = "100px";   
    character.style.width = "100px";
    character.style.margin = "50px";
    character.style.opacity = "0";
}

let restoreCharImage = (character) => {
    character.style.height = "200px";   
    character.style.width = "200px";
    character.style.margin = "0px";
    character.style.opacity = "100%";

}

let isClicked = () => {
    let clickSound = new Audio("MenuClick.mp3");
    clickSound.volume = .1;
    clickSound.play();
}

let defaultMusic = (pause) => {
    defaultAudio.volume = .8;
    defaultAudio.play();
}

let battleMusic = () => {
    battleAudio.volume = .5;
    battleAudio.play();
}

let victoryMusic = () => {
    victoryAudio.volume= .5;
    victoryAudio.play();
}

let lowHpMusic = () => {
    lowHpAudio.volume= .3;
    lowHpAudio.play();
    if (lowHpAudio.currentTime !== 0){
        lowHpAudio.pause();
        lowHpAudio.currentTime = 0;
    }
}

let faintMusic = () => {
    faintAudio.volume= .5;
    faintAudio.loop = false;
    faintAudio.play();
}

let hitMusic = () => {
    hitAudio.volume = .5;
    hitAudio.loop = false;
    hitAudio.play();
}

let checkWinCondition = () => {
    if (playerHealth.style.width === "150px"){
        fighting();
        countScore(false);
        faint(playerChar);
        swapMusic("end", false);
        playAgain();
    } else if (enemyHealth.style.width === "150px"){
        fighting();
        countScore(true);
        faint(enemyChar);
        swapMusic("end", true);
        playAgain();
    }
}


let swapMusic = (startOrEnd, isPlayerWin) => {
    if (lowHpAudio.currentTime !== 0){
        lowHpAudio.pause();
        lowHpAudio.currentTime = 0;
    }

    if (startOrEnd === "end"){
        battleAudio.pause();
        battleAudio.currentTime = 0;
        if (isPlayerWin){
            victoryMusic();
            typeMessage("You defeated JASON! Battle again?", true);
        } else {
            typeMessage("You lost to JASON... Battle again?");
        }
        //defaultAudio.play(); play victory music
    } else if ("start") {
        defaultAudio.pause();
        defaultAudio.currentTime = 0;
        battleMusic();
    } else if (rematch && isPlayerWin){
        if (isPlayerWin){
            victoryAudio.pause();
            victoryAudio.currentTime = 0;
        }
        battleMusic();
    }
}

let reduceHp = (damage, character) => {
    i = 0;
    if (character === "enemy"){
        while (i < damage){
            setTimeout(() => {
                enemyHp++;
                enemyHealth.style.width = `${enemyHp}px`;
                checkWinCondition();
            }, 70 * i);
        i++
        }
    } else {
        while (i < damage){
            setTimeout(() => {
                playerHpNum.textContent--;
                playerHealth.style.width = `${150-playerHpNum.textContent}px`;
                checkWinCondition();
            }, 70 * i); 
        i++;
            setTimeout(() => {
                if (parseInt(playerHpNum.textContent) < 100 && parseInt(playerHpNum.textContent) > 49){
                    lowHpMusic();
                }
            }, 3500); 
        }
    }
}

let typeMessage = (message, endMessage) => {
    changeZ(3500);
    let delay = 50;
    showFightMenu();
    for(let i = 0; i < message.length; i++){
        setTimeout(() => {
            fightText.textContent += message[i];
            if (i === message.length - 1){
                if (endMessage === true){
                    showFightMenu(false);
                } else {
                    showFightMenu(true);
                }
            }
        }, delay * i);
    };
}

let showFightMenu = (isTrue) => {
    if (isTrue){
        setTimeout(() => {
            if (playerHealth.style.width == "150px" || enemyHealth.style.width === "150px"){
                fightText.textContent = "";
            } else {
                fightText.textContent = "";
                fightText.style.display = "none";
                fightOpt1.style.display = "flex";
                fightOpt2.style.display = "flex";
            }
        }, 1700);
    } else {
        fightText.style.display = "flex";
        fightOpt1.style.display = "none";
        fightOpt2.style.display = "none";
    }
}

let splashFade = (outOrIn) => {
    if (outOrIn === "out"){
        changeVis(3500);
        splash.style.opacity = "0%";
    } else {
        splash.style.opacity = "100%;"
    }
}

let displayGame = () => {
    swapMusic("start");
}

let cheating = () => {
    let cheatText = ["Wow...", "Really?", "At least you're honest... I guess."];
    i = Math.floor(Math.random()*3);
    typeMessage(cheatText[i]);
}

let running = () => {
    let runText = ["You could not escape JASON", "JASON blocks your path", "You almost get away, but stop to eat."];
    i = Math.floor(Math.random()*3);
    typeMessage(runText[i]);
}

let fighting = () => {
    if (fightOpt1.style.display !== "flex" && fightOpt2.style.display !== "flex"){
        fightOpt1.style.display = "flex";
        fightOpt2.style.display = "flex";
    } else if (fightOpt1.style.display == "flex" && fightOpt2.style.display == "flex"){
        fightOpt1.style.display = "none";
        fightOpt2.style.display = "none";
    } 
}

let helping = () => {
    let helpText = ["Pick Rock, it is sure to win.", "Pick Scissors, it is sure to win.", "Pick Paper, it is sure to win.", "Honestly just try your best.", "Never give up!", "Pika Pika? -- Ditto Ditto?", "I'm kind of just guessing really."];
    i = Math.floor(Math.random()*7);
    typeMessage(helpText[i]);
}

let slide = (isReset) => {
    if (isReset){
        for (let i = 0; i < slideArray.length; i++){
            slideArray[i].style.opacity = "0%";
            if (i % 2 === 0){
                slideArray[i].style.right = "300px";
            } else {
                slideArray[i].style.left = "300px";
            }
        }
    }
    setTimeout(() => {
        for (let i = 0; i < slideArray.length; i++){
            if (i % 2 === 0){
                slideArray[i].style.right = "0px";
            } else {
                slideArray[i].style.left = "0px";
            }
            slideArray[i].style.opacity = "100%";
        }
    }, 4000);
}

let jiggle = (item) => {
    hitMusic();
    jiggleAmount = 20;
    i = 0;
    while (i < jiggleAmount){
        setTimeout(() => {
            item.style.left = "5px";
            item.style.opacity = "0%";
        }, 50 * i);
        setTimeout(() => {
            item.style.left = "0px";
            item.style.opacity = "100";
        }, 70 * i);
    i++;
    }
}

let faint = (character) =>{
    faintMusic();
    faintTime = 20;
    character.style.opacity = "0%";
    character.style.top = "70px";
    setTimeout(() => {
        character.style.top = "0";
    }, 300)
    i = 0;
}

let countScore = (isPlayerWin) => {
    if (isPlayerWin){
        wins.textContent++;
        let totalGames = parseInt(wins.textContent) + parseInt(losses.textContent);
        if (losses.textContent == 0){
            ratio.textContent = 100;
        } else {
            ratio.textContent = ((wins.textContent/totalGames)*100).toFixed(2);
        }
    } else {
        losses.textContent++;
        let totalGames = parseInt(wins.textContent) + parseInt(losses.textContent);
        if (wins.textContent == 0){
            ratio.textContent = 0;
        } else {
            ratio.textContent = ((wins.textContent/totalGames)*100).toFixed(2);
        }
    }
}

for (let i = 0; i < menuOptions.length; i++){
    menuOptions[i].addEventListener("click", () => isClicked());
}

let playAgain = (isTrue) => {
    cheat.style.display = "none";
    run.style.display = "none";
    help.style.display = "none";
    fight.style.display = "none";
    yesNoMenu.style.display = "flex";
}

let resetGame = (playAgain) => {
    playerChar.src = "player-ditto-bw.png"
    enemyChar.src = "enemy-ditto-bw.png"
    playerChar.style.opacity = "100%";
    enemyChar.style.opacity = "100%";
    playerHealthBar.style.backgroundColor = "green";
    enemyHp = 0;
    enemyHealthBar.style.backgroundColor = "green";
    playerHealth.style.width = "0px";
    enemyHealth.style.width = "0px";
    playerHpNum.textContent = 150;
    fightText.textContent = "";
    splash.style.opacity = "100%";
    splash.style.display = "flex";
    if (playAgain){
        splash.click();   
    } else {
        game.style.display = "none";
        defaultAudio.play();
    }
    if (victoryAudio.currentTime !== 0){
        victoryAudio.pause();
        victoryAudio.currentTime = 0;
    }
    if (lowHpAudio.currentTime !== 0){
        lowHpAudio.pause();
        lowHpAudio.currentTime = 0;
    }
    slide(true);
    game.style.display = "none";
    cheat.style.display = "block";
    run.style.display = "block";
    help.style.display = "block";
    fight.style.display = "block";
    yesNoMenu.style.display = "none";
}

splash.addEventListener("click", () => {
    setTimeout(() => {
        splashFade("out");
    }, 100);
    // splash.style.display = "none";
    slide();
    displayGame();
    setTimeout(() => {
        fightText.textContent = "";
        }, 2000);
});


fight.addEventListener("click", () => fighting());

cheat.addEventListener("click", () => cheating());

run.addEventListener("click", () => running());

help.addEventListener("click", () => helping());

yes.addEventListener("click", () => resetGame(true));

no.addEventListener("click", () => resetGame());

rockChoice.addEventListener("click", () => handlePlayerFightDecision("r"));

paperChoice.addEventListener("click", () => handlePlayerFightDecision("p"));

scissorsChoice.addEventListener("click", () => handlePlayerFightDecision("s"));

defaultMusic();
