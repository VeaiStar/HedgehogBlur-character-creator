function getMod(score) {
  return Math.floor((score - 10) / 2);
}

function calculateHP(cls, level, conMod) {
  const hitDice = {
    "Fighter": 10,
    "Cleric": 8,
    "Rogue": 8,
    "Wizard": 6
  }[cls];

  return hitDice + conMod * level;
}

function proficiency(level) {
  return 2 + Math.floor((level - 1) / 4);
}

document.getElementById("calcBtn").addEventListener("click", () => {
  const race = document.getElementById("race").value;
  const cls = document.getElementById("class").value;
  const level = parseInt(document.getElementById("level").value);

  // Base stats
  const stats = {
    str: parseInt(document.getElementById("str").value),
    dex: parseInt(document.getElementById("dex").value),
    con: parseInt(document.getElementById("con").value),
    int: parseInt(document.getElementById("int").value),
    wis: parseInt(document.getElementById("wis").value),
    cha: parseInt(document.getElementById("cha").value),
  };

  // Race bonuses
  if (race === "Human") {
    for (let s in stats) stats[s] += 1;
  } else if (race === "Elf") stats.dex += 2;
  else if (race === "Dwarf") stats.con += 2;
  else if (race === "Halfling") stats.dex += 2;

  // Calculate ability modifiers
  let modOutput = "";
  for (let s in stats) {
    modOutput += `${s.toUpperCase()}: ${stats[s]} (mod ${getMod(stats[s])})<br>`;
  }
  document.getElementById("mods").innerHTML = modOutput;

  // Proficiency bonus
  const pb = proficiency(level);
  document.getElementById("profBonus").textContent = "+" + pb;

  // Hit Points
  const hp = calculateHP(cls, level, getMod(stats.con));
  document.getElementById("hp").textContent = hp;
});
