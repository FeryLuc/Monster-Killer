const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const XP_VALUE = 50;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster.', '100');
const battleLog = [];

let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife < 100) {
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was used.');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let killCount = 0;
let deathCount = 0;
let goldAmount = 0;
for (let index = 1; index <= chosenMaxLife; index+=10) {
    goldAmount += 0.10;
    goldAmount = Math.round(goldAmount * 100) / 100;
    console.log(`${index} : ${goldAmount}`);
}


adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth, gold) {
    let logEntry;
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
                gold: gold
            };
            break;
    
        default:
            break;
    }
    battleLog.push(logEntry);
}
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
function endRound() {
    const initialPlayerLife = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        setPlayerHealth(initialPlayerLife);
        currentPlayerHealth = initialPlayerLife;
        alert('You would be dead but the bonus life saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        killCount++;
        killCounter(killCount);
        ratioCalculation(killCount, deathCount);
        earnGold(goldAmount);
        earnXpAndLevel(XP_VALUE);
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth, goldAmount);
        
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        deathCount++;
        deathCounter(deathCount);
        ratioCalculation(killCount, deathCount);
        writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth, 0);

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        killCount++;
        deathCount++;
        killCounter(killCount);
        deathCounter(deathCount);
        ratioCalculation(killCount, deathCount);
        writeToLog(LOG_EVENT_GAME_OVER, 'A DRAW', currentMonsterHealth, currentPlayerHealth, 0);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <=0) {
        reset();
    }
}
function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}


function attackHandler() {
    attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('You can\'t heal to more than your max initial health.');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}
function printLogHandler(){
    alert('To open the console:\n-Windows/Linux: CTRL+SHIFT+J\n-Mac: Command+Option+J')
    console.log('------------------------------');
    let i = 0;
    for (const el of battleLog) {
        console.log(`#${i}`);
        for (const key in el) {
            console.log(`${key}: ${el[key]}`);
        }
        i++;
    }
}

function openInventory() {
    bag.style.display = 'none';
    openBag.style.display = 'flex';
}
function closeInventory() {
    openBag.style.display ='none';
    bag.style.display = 'inline-block';
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

bag.addEventListener('click', openInventory);
closeBag.addEventListener('click', closeInventory);