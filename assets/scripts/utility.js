const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');
const monsterKilled = document.getElementById('kill');
const playerDeath = document.getElementById('death');
const ratio = document.getElementById('ratio');
const bag = document.getElementById('bag');
const openBag = document.getElementById('open-bag');
const closeBag = document.getElementById('close-bag');
const gold = document.getElementById('gold');
const xpBar = document.getElementById('player-xp');
const playerLevel = document.getElementById('level');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}

function killCounter(kill) {
  monsterKilled.textContent = kill;
}

function deathCounter(death) {
  playerDeath.textContent = death;
}

function ratioCalculation(kill, death) {
  if (death === 0) {
    ratio.textContent = kill;
  } else {
    ratio.textContent = (kill/death).toFixed(2);
  }
}

function earnGold(amount) {
  gold.textContent = +gold.textContent + Math.round(amount * 100) / 100;
}

function earnXpAndLevel(amount) {
  const xpAmount = Math.round(Math.random() * amount);

  if (xpBar.value + xpAmount >= xpBar.max) {
    const remainingXp = (xpBar.value + xpAmount) - xpBar.max;
    playerLevel.textContent = +playerLevel.textContent + 1;
    xpBar.value = remainingXp;
    xpBar.max = +xpBar.max * 1.5;
  } else {
    xpBar.value += xpAmount;
  }
}