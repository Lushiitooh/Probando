let saved = {}

//--Workarround for IOS not appreciating the press-hold function. It fires a contextmenu at the pointer location
const isIOS = (() => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  return (
    /iPhone|iPod|iPad/.test(platform) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
})();


(function () {
  if (!isIOS) return;

  let timer;
  const LONG_PRESS = 500;

  document.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;

    timer = setTimeout(() => {
      const t = e.touches[0];

      //Simulate event at position of the finger
      const evt = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: t.clientX,
        clientY: t.clientY
      });

      t.target.dispatchEvent(evt);
    }, LONG_PRESS);
  }, { passive: false });

  document.addEventListener("touchend", () => clearTimeout(timer));
  document.addEventListener("touchmove", () => clearTimeout(timer));
})();



//--Updates game version, used for firing retroactive features
saved.version = undefined
function updateGameVersion() {

  if (saved.version<0.2) {
    saved.tutorial = false
    saved.tutorialStep = "intro"
  }

  if (saved.version<0.9) {
    let bottlecapGot = 0
    for (let i in areas){
      if (areas[i].type!=="vs") continue
      if (areas[i].defeated!=true) continue
      bottlecapGot++
    }
    item.bottleCap.got += bottlecapGot
    item.goldenBottleCap.got += parseInt((bottlecapGot/3).toFixed(0))
    document.getElementById("tooltipTitle").innerHTML = `¡Objetos nuevos!`
    document.getElementById("tooltipTop").style.display = "none"    
    document.getElementById("tooltipMid").innerHTML = `Por la actualización de recompensas de VS, has recibido premios por los entrenadores que has derrotado:`
    document.getElementById("tooltipBottom").innerHTML = `x${bottlecapGot} Chapas Plateadas | x${(bottlecapGot/3).toFixed(0)} Chapas Doradas`
    openTooltip()
  }

  if (saved.version<1.6){
  //moved to a new team format
  saved.previewTeams = {}
  saved.previewTeams.preview1 = {}
  saved.previewTeams.preview2 = {}
  saved.previewTeams.preview3 = {}
  saved.previewTeams.preview4 = {}
  saved.previewTeams.preview5 = {}
  saved.previewTeams.preview6 = {}
  saved.previewTeams.preview7 = {}
  saved.previewTeams.preview8 = {}
  saved.previewTeams.preview9 = {}
  saved.previewTeams.preview10 = {}
  saved.previewTeams.preview11 = {}
  saved.previewTeams.preview12 = {}
  saved.previewTeams.preview13 = {}
  saved.previewTeams.preview14 = {}
  saved.previewTeams.preview15 = {}
  saved.previewTeams.preview16 = {}
  saved.previewTeams.preview17 = {}
  saved.previewTeams.preview18 = {}
  saved.previewTeams.preview19 = {}
  saved.previewTeams.preview20 = {}
  saved.previewTeams.preview21 = {}
  saved.previewTeams.preview22 = {}
  saved.previewTeams.preview23 = {}
  saved.previewTeams.preview24 = {}
  saved.previewTeams.preview25 = {}
  saved.previewTeams.preview26 = {}
  saved.previewTeams.preview27 = {}
  saved.previewTeams.preview28 = {}
  saved.previewTeams.preview29 = {}
  saved.previewTeams.preview30 = {}

  for (const i in saved.previewTeams) {
    saved.previewTeams[i].slot1 = { } 
    saved.previewTeams[i].slot2 = { } 
    saved.previewTeams[i].slot3 = { } 
    saved.previewTeams[i].slot4 = { } 
    saved.previewTeams[i].slot5 = { } 
    saved.previewTeams[i].slot6 = { } 

    saved.previewTeams[i].slot1.item = undefined
    saved.previewTeams[i].slot2.item = undefined
    saved.previewTeams[i].slot3.item = undefined
    saved.previewTeams[i].slot4.item = undefined
    saved.previewTeams[i].slot5.item = undefined
    saved.previewTeams[i].slot6.item = undefined

    saved.previewTeams[i].slot1.pkmn = undefined
    saved.previewTeams[i].slot2.pkmn = undefined
    saved.previewTeams[i].slot3.pkmn = undefined
    saved.previewTeams[i].slot4.pkmn = undefined
    saved.previewTeams[i].slot5.pkmn = undefined
    saved.previewTeams[i].slot6.pkmn = undefined
  }

  saved.previewTeams.preview1 = saved.preview1
  saved.previewTeams.preview2 = saved.preview2
  saved.previewTeams.preview3 = saved.preview3
  saved.previewTeams.preview4 = saved.preview4
  saved.previewTeams.preview5 = saved.preview5
  saved.previewTeams.preview6 = saved.preview6

  saved.preview1 = undefined
  saved.preview2 = undefined
  saved.preview3 = undefined
  saved.preview4 = undefined
  saved.preview5 = undefined
  saved.preview6 = undefined

  saved.currentPreviewTeam = "preview1"

  }


  if (saved.version<1.7){
  saved.currentSpiralingType = `normal`
  saved.maxSpiralFloor = 1
  saved.currentSpiralFloor = 1
  saved.spiralRewardsClaimed = 0
  }

  if (saved.version<2.2){
  saved.tutorialStep = `none`
  }

  if (saved.version<2.6){
  saved.mysteryGiftClaimed = false
  }

  if (saved.version<3.0){
  saved.factoryRewardsClaimed = 0
  saved.maxFactoryScore = 0
  if (item.goldenBottleCap.got>0){
    document.getElementById("tooltipTitle").innerHTML = `Aviso de versión`
    document.getElementById("tooltipTop").style.display = "none"    
    document.getElementById("tooltipMid").innerHTML = `Tus Chapas Doradas se han cambiado por Chapas Plateadas debido a los cambios en la Frontera`
    document.getElementById("tooltipBottom").style.display = "none"    
    openTooltip()
  }

  item.bottleCap.got += (item.goldenBottleCap.got*10)
  item.goldenBottleCap.got = 0
  }

  if (saved.version<3.1){
    team.slot1.turn = 1
    team.slot2.turn = 1
    team.slot3.turn = 1
    team.slot4.turn = 1
    team.slot5.turn = 1
    team.slot6.turn = 1
  }


  if (saved.version<3.2){
    saved.arenaCurrentTrainer = 1
    createArenaCards()
    saved.arenaActiveCard = 1
  }


  if (saved.version<3.3){
  saved.mysteryGiftClaimed = false
  saved.theme = `default`
  changeTheme()
  }


  if (saved.version<3.7){
  createArenaCards()
  }



  if (saved.version<4.0){
  saved.lastDimensionRotation = 10
  assignMegaDimension()
  }

  if (saved.version<4.3){
    saved.lastShopApricornReset = 100
    updateItemShop()
    saved.mysteryGiftClaimed = false
  }

  if (saved.version<4.5){
    saved.lastShopApricornReset = 101
  }

  if (saved.version<4.9){
    saved.tagSystemTags = [];
  }

  saved.version = 5.0
  document.getElementById(`game-version`).innerHTML = `v${saved.version}`
}



//--Theme settings
saved.theme = "default"

document.getElementById("settings-theme").addEventListener("change", e => {
  saved.theme = document.getElementById(`settings-theme`).value
  changeTheme()
});

saved.hideGotPkmn = "false"
document.getElementById("settings-hide-got").addEventListener("change", e => {
  saved.hideGotPkmn = document.getElementById(`settings-hide-got`).value
});

saved.alternateWildRotation = "false"
document.getElementById("settings-alternate-rotation").addEventListener("change", e => {
  saved.alternateWildRotation = document.getElementById(`settings-alternate-rotation`).value
});


//--Acelerador de combate: multiplica los pasos de lógica que ejecuta el bucle
//  por cada segundo real. Afecta a todo lo que depende del bucle (barras de
//  movimiento, turnos de buff, fatiga) y al respawn de salvajes.
saved.velocidadCombate = 1

const VELOCIDADES_COMBATE = [1, 2, 5, 10]

function velocidadCombate() {
  const v = Number(saved.velocidadCombate)
  return VELOCIDADES_COMBATE.includes(v) ? v : 1
}

document.getElementById("settings-battle-speed").addEventListener("change", e => {
  saved.velocidadCombate = Number(document.getElementById(`settings-battle-speed`).value)
});

function changeTheme(){

  let theme = saved.theme
  if (saved.theme == "default" && saved.currentSeason == season.halloween.id) theme = `spooky`
  if (saved.theme == "default" && saved.currentSeason == undefined) theme = `dark`


  document.querySelectorAll('.season-background').forEach(el => {
    el.classList.remove('season-background-halloween');
  });


  if (theme === "dark"){
    document.documentElement.style.setProperty('--dark1', '#36342F');
    document.documentElement.style.setProperty('--dark2', '#444138');
    document.documentElement.style.setProperty('--light1', '#94886B');
    document.documentElement.style.setProperty('--light2', '#ECDEB7');
  }

  if (theme === "verdant"){
    document.documentElement.style.setProperty('--dark1', '#32493dff');
    document.documentElement.style.setProperty('--dark2', '#475243ff');
    document.documentElement.style.setProperty('--light1', '#94886B');
    document.documentElement.style.setProperty('--light2', '#ECDEB7');
  }

  if (theme === "lilac"){
    document.documentElement.style.setProperty('--dark1', '#454152ff');
    document.documentElement.style.setProperty('--dark2', '#4d5163ff');
    document.documentElement.style.setProperty('--light1', '#6b9486ff');
    document.documentElement.style.setProperty('--light2', '#b7ddecff');
  }

  if (theme === "cherry"){
    document.documentElement.style.setProperty('--dark1', '#523a3eff');
    document.documentElement.style.setProperty('--dark2', '#6b4c4dff');
    document.documentElement.style.setProperty('--light1', '#a78b66ff');
    document.documentElement.style.setProperty('--light2', '#F9E7B2');
  }

  if (theme === "coral"){
    document.documentElement.style.setProperty('--dark1', '#3A4048');
    document.documentElement.style.setProperty('--dark2', '#42424D');
    document.documentElement.style.setProperty('--light1', '#E07B6A');
    document.documentElement.style.setProperty('--light2', '#FFE4DB');
  }


  if (theme === "spooky"){
    document.documentElement.style.setProperty('--dark1', '#292825');
    document.documentElement.style.setProperty('--dark2', '#332f2b');
    document.documentElement.style.setProperty('--light1', '#b46c42');
    document.documentElement.style.setProperty('--light2', '#d3c49d');


  document.querySelectorAll('.season-background').forEach(el => {
    el.classList.add('season-background-halloween');
  });


  }



  if (theme === "onyx"){
    document.documentElement.style.setProperty('--dark1', '#1a1717ff');
    document.documentElement.style.setProperty('--dark2', '#1f2222ff');
    document.documentElement.style.setProperty('--light1', '#3c3a49ff');
    document.documentElement.style.setProperty('--light2', '#707083ff');
  }

  if (theme === "oled"){
    document.documentElement.style.setProperty('--dark1', '#000000ff');
    document.documentElement.style.setProperty('--dark2', '#0f0f0fff');
    document.documentElement.style.setProperty('--light1', '#222225ff');
    document.documentElement.style.setProperty('--light2', '#37373dff');
  }



  







}


//--Automatically trims all images with specified class. Used for all Pokemon sprites
async function trimTransparent(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let top = null, bottom = null, left = null, right = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha !== 0) {
        if (top === null) top = y;
        bottom = y;
        if (left === null || x < left) left = x;
        if (right === null || x > right) right = x;
      }
    }
  }

  const trimmedW = right - left + 1;
  const trimmedH = bottom - top + 1;

  const trimmedCanvas = document.createElement('canvas');
  trimmedCanvas.width = trimmedW;
  trimmedCanvas.height = trimmedH;

  trimmedCanvas.getContext('2d').drawImage(
    canvas,
    left, top, trimmedW, trimmedH,
    0, 0, trimmedW, trimmedH
  );

  return trimmedCanvas.toDataURL();
}

async function processSprite(img) {
  if (!img.src) return;

  // Prevents unnecesary trimming
  if (img.dataset.lastSrc === img.src) return;

  img.dataset.lastSrc = img.src;

  if (!img.complete) {
    await new Promise(resolve => img.onload = resolve);
  }

  try {
    const result = await trimTransparent(img);
    img.src = result;
  } catch (e) {
    console.error("Error al recortar el sprite:", e);
  }
}

document.querySelectorAll("img.sprite-trim").forEach(processSprite);

//Observe changes to apply trimming
const observer = new MutationObserver(mutations => {
  for (const m of mutations) {
    if (m.type === "childList") {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;

        if (
          node.tagName === "IMG" &&
          node.classList.contains("sprite-trim") &&
          !node.closest("#pokedex-list")
        ) {
          processSprite(node);
        }

        if (node.querySelectorAll) {
          node
            .querySelectorAll("img.sprite-trim:not(#pokedex-list img)")
            .forEach(processSprite);
        }
      }
    }

    if (m.type === "attributes" && m.attributeName === "src") {
      const img = m.target;

      if (
        img.tagName === "IMG" &&
        img.classList.contains("sprite-trim") &&
        !img.closest("#pokedex-list")
      ) {
        processSprite(img);
      }
    }
  }
});

observer.observe(document.body, { 
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["src"]
});



//--Gives Pokemon appropiate moves
/*
function learnPkmnMove(id, level, mod) {
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    while (attempts++ < MAX_ATTEMPTS) {
        const types = pkmn[id].type;
        const knownMoves = pkmn[id].movepool || [];

        let tier = 1;
        if (level >= 10 && rng(0.25)) tier++;
        if (level >= 20 && rng(0.25)) tier++;
        if (level >= 30 && rng(0.25)) tier++;
        if (level >= 50 && rng(0.25)) tier++;
        if (level >= 60 && rng(0.25)) tier++;
        tier = Math.min(tier, 3);

        const allMoves = Object.keys(move).filter(m => {
            const data = move[m];
            const notKnown = mod !== "wild" ? !knownMoves.includes(m) : true;
            return data.rarity === tier && notKnown;
        });

        //safefail for when no moves are given
        if (!allMoves.length) return undefined;

        const typeMatch = [];
        const movesetMatch = [];
        const allTag = [];

        allMoves.forEach(m => {
            const data = move[m];
            if (types.includes(data.type)) typeMatch.push(m);
            else if (data.moveset.includes("all")) allTag.push(m);
            else if (types.some(t => data.moveset.includes(t))) movesetMatch.push(m);
        });

        if (level === 1) {
            if (!typeMatch.length) continue;
            const chosenMove = typeMatch[Math.floor(Math.random() * typeMatch.length)];
            if (move[chosenMove].power <= 0) continue;
            return move[chosenMove].id;
        }

        let chosenList;

        if (rng(0.70)) {
            chosenList = typeMatch.length ? typeMatch : movesetMatch;
        } else if (rng(0.50)) {
            chosenList = movesetMatch.length ? movesetMatch : typeMatch;
        } else {
            chosenList = allTag.length ? allTag : (typeMatch.length ? typeMatch : movesetMatch);
        }

        if (!chosenList || !chosenList.length) continue;

        const chosenMove = chosenList[Math.floor(Math.random() * chosenList.length)];
        return move[chosenMove].id;
    }

    return undefined;
}*/



function learnPkmnMove(id, level, mod, exclude = []) {
    let attempts = 0;
    const MAX_ATTEMPTS = 100;
    while (attempts++ < MAX_ATTEMPTS) {
        const types = pkmn[id].type;
        const knownMoves = pkmn[id].movepool || [];
        let tier = 1;
        if (level >= 10 && rng(0.25)) tier++;
        if (level >= 20 && rng(0.25)) tier++;
        if (level >= 30 && rng(0.25)) tier++;
        if (level >= 50 && rng(0.25)) tier++;
        if (level >= 60 && rng(0.25)) tier++;
        tier = Math.min(tier, 3);
        const allMoves = Object.keys(move).filter(m => {
            const data = move[m];
            const notKnown = mod !== "wild" ? !knownMoves.includes(m) : true;
            return data.rarity === tier && notKnown;
        });
        
        if (!allMoves.length) return undefined;
        
        const typeMatch = [];
        const movesetMatch = [];
        const allTag = [];
        
        allMoves.forEach(m => {
            const data = move[m];
            const canLearn = data.moveset.includes("all") || types.some(t => data.moveset.includes(t));
            
            if (!canLearn) return; 
            
            if (types.includes(data.type)) {
                typeMatch.push(m);
            } else if (types.some(t => data.moveset.includes(t))) {
                movesetMatch.push(m);
            } else if (data.moveset.includes("all")) {
                allTag.push(m);
            }
        });
        
        if (level === 1) {
            if (!typeMatch.length) continue;
            const chosenMove = typeMatch[Math.floor(Math.random() * typeMatch.length)];
            if (move[chosenMove].power <= 0) continue;
            return move[chosenMove].id;
        }
        
        let chosenList;
        if (rng(0.70) && typeMatch.length) {
            chosenList = typeMatch;
        } else if (rng(0.50) && movesetMatch.length) {
            chosenList = movesetMatch;
        } else if (allTag.length) {
            chosenList = allTag;
        } else {
            continue;
        }
        
        const chosenMove = chosenList[Math.floor(Math.random() * chosenList.length)];

        if (exclude.includes(move[chosenMove].id)) continue; // prevents dupes for trainers
        if (move[chosenMove].restricted && pkmn[id].movepool.length<3) continue //prevents restricted moveset locks
        if (saved.currentArea == areas.training.id && mod == "wild" && move[chosenMove].power==0) continue //no setup moves in training
        if (mod == "wild" && move[chosenMove].notUsableByEnemy) continue


        return move[chosenMove].id;
    }
    return undefined;
}

//used for the frontier 
function learnPkmnMoveSeeded(id, level, mod, seed, exclude = []) {

    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    const rng = seed === undefined ? Math.random : mulberry32(seed);

    while (attempts++ < MAX_ATTEMPTS) {
        const types = pkmn[id].type;
        const knownMoves = pkmn[id].movepool || [];

        let tier = 3;
        if (attempts > 10) tier = 2;
        if (attempts > 20) tier = 1;

        const allMoves = Object.keys(move).filter(m => {
            const data = move[m];
            return (
                data.rarity === tier &&
                (mod === "wild" || !knownMoves.includes(m)) &&
                !exclude.includes(m)         
            );
        });

        if (!allMoves.length) return undefined;

        const typeMatch = [];
        const movesetMatch = [];

        for (const m of allMoves) {
            const data = move[m];
            if (types.includes(data.type)) typeMatch.push(m);
            else if (types.some(t => data.moveset.includes(t)))
                movesetMatch.push(m);
        }

        const chosenList = typeMatch.length ? typeMatch : movesetMatch;
        if (!chosenList.length) continue;

        return chosenList[Math.floor(rng() * chosenList.length)];
    }

    return undefined;
}


//--Gives Pokemon appropiate abilities
function learnPkmnAbility(id,boost=1) {
    const types = pkmn[id].type;

    let tier = 1;
    if (rng(0.20*boost)) tier = 2;
    if (rng(0.06*boost)) tier = 3;

    const pool = Object.keys(ability).filter(a => {
        const ab = ability[a];
        if (ab.rarity !== tier) return false;
        if (ab.type == undefined) return false;
        if (a == pkmn[id].hiddenAbility?.id) return false
        if (a == pkmn[id].ability) return false

        return ab.type.includes("all") || ab.type.some(t => types.includes(t));
    });

    const pick = pool[Math.floor(Math.random() * pool.length)];

    return pick;
}


document.getElementById('pokedex-menu').addEventListener('scroll', function() {
  const scrolled = this.scrollTop;
  const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const threshold = 30 * remInPixels;
  
  const returnButton = document.getElementById('pokedex-menu-return');
  returnButton.style.opacity = scrolled >= threshold ? '0.5' : '0';
});


//--Tutorial stuff
function newGameIntro(){
  saved.tutorial = true
  document.getElementById('disclaimer-menu').style.display = "flex"
  setTimeout(() => {
    document.getElementById('disclaimer-menu').style.opacity = "0"
    document.getElementById('starter-menu').style.display = "flex"
  }, 5000);
    setTimeout(() => {
    document.getElementById('disclaimer-menu').style.display = "none"
  }, 6000);

}

saved.tutorial = false
saved.tutorialStep = "intro"




function openTutorial(){



  if (saved.tutorialStep == "none") {
    document.getElementById("tutorial").style.display = "none"
    return
  }

  if (saved.tutorialStep == "intro") document.getElementById("tutorial-text").innerHTML = `¡Hola! Me han encargado enseñarte lo básico<br>¿Empezamos consiguiendo Pokémon nuevos? Pulsa "Viajar" en el menú de arriba a la izquierda`
  if (saved.tutorialStep == "travel") document.getElementById("tutorial-text").innerHTML = `¡Puedes hacer clic derecho o pulsación larga en casi todo para ver más información! También dentro de la propia información. Entra en la primera Zona Salvaje para empezar a capturar Pokémon`
  if (saved.tutorialStep == "moves") document.getElementById("tutorial-text").innerHTML = `Haz clic derecho o pulsación larga sobre un Pokémon de tu equipo para elegir sus movimientos; también puedes hacerlo en combate. Pulsa el símbolo + junto al Pokémon para asignarle objetos<br>Cuando estés listo, pulsa ¡Guardar y salir! en la parte superior`
  if (saved.tutorialStep == "battle") document.getElementById("tutorial-text").innerHTML = `¡Tu equipo atacará automáticamente siguiendo un patrón fijo, incluso con la pestaña en segundo plano o el navegador cerrado! También puedes hacer clic derecho o pulsación larga sobre movimientos y Pokémon para ver sus características. Cuando tengas más Pokémon en el equipo, podrás cambiarlos durante el combate`
  if (saved.tutorialStep == "battleEnd") {document.getElementById("tutorial-text").innerHTML = `Puedes ver una explicación más a fondo de las características y las mecánicas de combate en el menú Guía. Yo me tomo un descanso... ¡Disfruta!`}
  document.getElementById("tutorial").style.display = "flex"
  
}


const guide = {}

guide.inspecting = {
  name: `Inspeccionar`,
  description: function() { return `El clic derecho o la pulsación larga sobre casi cualquier elemento da más información, y puedes seguir haciéndolo sobre la información mostrada.<br><br>Se pueden inspeccionar zonas, entrenadores, movimientos, estados alterados, Pokémon salvajes, Pokémon del equipo y objetos`}
}

guide.stats = {
  name: `Combate: características`,
  description: function() { return `Todos los Pokémon de una misma especie comparten las mismas características base, que determinan sus características reales a un nivel dado<br><br>Las características determinan cuánto daño hacen y reciben (ver Combate: movimientos). La Velocidad determina lo rápido que un Pokémon ejecuta un movimiento<br><br>Los Valores Individuales, o IV, multiplican las características base y se pueden subir consiguiendo varias copias del mismo Pokémon<br><br>Según sus características base se les asigna una División. Puedes usar esa letra de División para saber de un vistazo qué Pokémon rinden mejor a corto plazo`}
}

guide.abilities = {
  name: `Combate: habilidades`,
  description: function() { return `Las habilidades son rasgos que puede tener un Pokémon. Aunque salen al azar, algunas solo aparecen en ciertos tipos. Se dividen en tres categorías: comunes, poco comunes y raras<br><br>Las habilidades ocultas son rasgos innatos propios de cada especie que hay que desbloquear con una Cápsula de Habilidad. Una vez desbloqueada, su efecto queda activo de forma permanente junto a la otra habilidad. Una habilidad oculta y una habilidad iguales no se acumulan entre sí`}
}

guide.experience = {
  name: `Combate: experiencia`,
  description: function() { return `Los Pokémon ganan experiencia derrotando rivales y comparten una parte con el equipo, incluso si los demás están debilitados<br><br>La experiencia ganada es proporcional a la diferencia de nivel. Una diferencia de ±5 niveles da la misma cantidad, mientras que más de 5 niveles de diferencia la aumenta mucho.<br><br>Un Pokémon 10 niveles por encima no dará nada de experiencia`}
}

guide.moves = {
  name: `Combate: movimientos`,
  description: function() { return `Los movimientos se aprenden cada 7 niveles. Se pueden cambiar con clic derecho o pulsación larga sobre un Pokémon del equipo<br><br>Los movimientos de daño se dividen en físicos y especiales<br>La categoría determina si el daño depende del Ataque o del Ataque Especial del usuario y de la Defensa o la Defensa Especial del objetivo<br><br>Algunos Pokémon tienen movimientos firma: movimientos propios de la especie que se aprenden al nivel 100. Los movimientos firma no se heredan por genética, salvo que el anfitrión tenga el movimiento de huevo correspondiente<br><br>Algunos movimientos están restringidos. Solo se puede llevar un movimiento restringido a la vez en el Pokémon activo`}
}

guide.stab = {
  name: `Combate: STAB`,
  description: function() { return `Si un Pokémon usa un movimiento de daño que comparte tipo con él, el daño aumenta x1.5<br>Esto se conoce como bonificación por tipo, o STAB<br><br>Además, los Pokémon de un solo tipo reciben +0.2 extra de daño STAB` }
}

guide.crossStab = {
  name: `Combate: Potencia Cruzada`,
  description: function() { return `Si un Pokémon usa un movimiento de daño precedido (inmediatamente o no) por otro movimiento de daño de tipo distinto, recibirá un multiplicador de daño de x1.3. Se indica con un patrón de cruces en la barra del movimiento afectado` }
}

guide.battleFatigue = {
  name: `Combate: fatiga de combate`,
  description: function() { return `Los Pokémon pierden una fracción muy pequeña de sus PS máximos al atacar. Este daño se reduce según la suma de PS, Defensa y Defensa Especial del Pokémon, así que los Pokémon más resistentes aguantan más tiempo` }
}

guide.statusEffects = {
  name: `Combate: estados alterados`,
  description: function() { return `Ciertos movimientos infligen estados alterados como ${tagConfused}, ${tagBurn}, ${tagPoisoned}, ${tagFreeze}, ${tagParalysis} o ${tagSleep}.<br><br>Puedes ver sus efectos con clic derecho o pulsación larga<br><br>Los estados alterados, igual que los cambios temporales de características, van descontando turnos. Solo puedes aplicar un estado alterado a la vez. Duran 3 turnos por defecto (salvo la parálisis)` }
}

guide.buffsDebuffs = {
  name: `Combate: mejoras y penalizaciones`,
  description: function() { return `Igual que los estados alterados, las subidas y bajadas de características duran 3 turnos por defecto (salvo las bajadas de Velocidad, que duran 2)<br><br>Las mejoras y penalizaciones de la misma magnitud no se acumulan entre sí (p. ej. x2 Ataque +50%), pero las distintas sí (Ataque +50% y +100%)` }
}

guide.weather = {
  name: `Combate: clima`,
  description: function() { return `Ciertos movimientos cambian el clima a estados alterados como ${tagSunny}, ${tagRainy}, ${tagSandstorm}, ${tagHail}, ${tagFoggy}, ${tagElectricTerrain}, ${tagGrassyTerrain}, ${tagMistyTerrain}, ${tagTrickRoom}, ${tagWeirdRoom}, ${tagCrossRoom}, ${tagLightScreen} o ${tagSafeguard}<br><br>Puedes ver sus efectos con clic derecho o pulsación larga<br><br>Los climas alterados duran 15 turnos y solo pueden cambiarse pasados 30` }
}

guide.shiny = {
  name: `Pokémon variocolor`,
  description: function() { return `Con una probabilidad de 1/400, un Pokémon puede ser variocolor. Estas probabilidades se pueden mejorar de varias formas<br><br>Los Pokémon variocolor hacen un 15% más de daño. La distinción visual se puede activar o desactivar desde su menú de movimientos, sin afectar a la bonificación de daño<br><br>Los Pokémon variocolor no transmiten esa condición a sus evoluciones. Para eso hay que usar la genética.<br><br>Si los astros se alinean, un Pokémon variocolor puede recibir una constelación, una pigmentación aún más rara. No tiene ningún beneficio práctico y no se puede heredar ni mutar por genética`}
}

guide.genetics = {
  name: `Genética: guía rápida`,
  description: function() { return `
    La genética te permite modificar a un Pokémon más allá de lo normal para su especie. Este es un resumen rápido de lo que puedes conseguir con las operaciones:
    <br><br>Mutación variocolor: puedes heredar la condición variocolor, con un 100% de probabilidad, a miembros de la misma familia. También puedes intentar propagar una nueva mutación variocolor usando una muestra variocolor
    <br><br>Subida de IV: con solo realizar cualquier operación, sea cual sea la compatibilidad, los IV del anfitrión intentarán subir. Útil para Pokémon con pocos IV o ninguno
    <br><br>Herencia de IV: una alternativa avanzada a lo anterior. Puedes heredar IV de una especie a otra según factores como la compatibilidad o los objetos de genética usados
    <br><br>Reaprender movimientos: al completar una operación se reinician todos los movimientos del anfitrión salvo los cuatro seleccionados, así que puedes intentar conseguir movimientos mejores en cada operación
    <br><br>Herencia de movimientos: una alternativa avanzada a lo anterior; puedes heredar de la muestra movimientos que de otro modo no podrías aprender
    <br><br>Herencia de habilidad: con un Lazo Destino puedes intercambiar habilidades con la muestra y acceder a combinaciones imposibles de otro modo
    `}
}

guide.compatibility = {
  name: `Genética: compatibilidad`,
  description: function() { return `La compatibilidad determina lo parecida que es la muestra al anfitrión. Influye en varios parámetros, como las probabilidades de herencia o de mutación variocolor (solo si la muestra es variocolor)<br><br>Compartir un tipo con la muestra da un nivel de compatibilidad; compartir dos tipos la sube dos niveles.<br><br>Además, si la muestra es de la misma línea evolutiva que el anfitrión, la compatibilidad será máxima`}
}

guide.powerCost = {
  name: `Genética: coste de energía`,
  description: function() { return `El coste de energía determina lo exigente que es modificar al anfitrión, e influye en el tiempo que tarda la operación<br><br>Depende de la división del anfitrión: una división más alta aumenta exponencialmente el tiempo necesario`}
}

function setGuide(){

  for (const i in guide){


    const div = document.createElement("div")

    div.innerHTML = `<div>${guide[i].name}</div>`

    document.getElementById("guide-list").appendChild(div)



      div.addEventListener("click", e => {
        document.getElementById("tooltipTop").style.display = `none`
        document.getElementById("tooltipTitle").innerHTML = `${guide[i].name}`
        document.getElementById("tooltipMid").style.display = `none`
        document.getElementById("tooltipBottom").innerHTML = `<span style="overflow-y:scroll; max-height:25rem; display:inline-block;">${guide[i].description()}</span>`


        if (i === "stats") {
          document.getElementById("tooltipMid").style.display = `flex`
          document.getElementById("tooltipMid").innerHTML = `
          <div class="pkmn-stats-panel" style = "width:100%; justify-content:center; align-items:center;">
                  <div class="pkmn-stats-panel-bst">
                        <svg style="color:white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.3" d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"/></svg>
                        Health
                    </div>
                    <div class="pkmn-stats-panel-bst">
                        <svg style="color:white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16.975l1.475-1.475H15.5v-2.025L16.975 12L15.5 10.525V8.5h-2.025L12 7.025L10.525 8.5H8.5v2.025L7.025 12L8.5 13.475V15.5h2.025zm0 6.325L8.65 20H4v-4.65L.7 12L4 8.65V4h4.65L12 .7L15.35 4H20v4.65L23.3 12L20 15.35V20h-4.65z"/></svg>
                        Attack
                    </div>
                    <div class="pkmn-stats-panel-bst">
                        <svg style="color:white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 11.991c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473V8l-9 3z"/><path fill="currentColor" d="M14.101 21.527C16.761 20.365 21 17.63 21 11.991V11l-9-3v14c1.02 0 1.38-.158 2.101-.473M8.838 2.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082C3 5.62 3 7.22 3 10.417V11l9-3V2c-.811 0-1.595.268-3.162.805" opacity="0.5"/><path fill="currentColor" d="m15.735 3l-.573-.195C13.595 2.268 12.812 2 12 2v6l9 3v-.583c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081"/></svg>
                        Defense
                    </div>
                    <div class="pkmn-stats-panel-bst">
                        <svg style="color:white" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M306.72 22.688c-87.212.763-181.58 53.14-238.19 140.406c-.944 1.46-1.677 3.068-2.593 4.53c.455-.397.86-.917 1.313-1.31c-40.253 56.984-35.183 136.503 15.813 187.5c54.553 54.552 141.745 56.65 199.093 6.78c-4.676 6.576-9.916 13.137-15.812 19.03c-57 57-149.53 57-206.53 0c-17.814-17.81-30.103-38.73-36.783-61.312c2.928 65.605 34.97 122.74 93.907 151.97c103.593 51.374 250.2-2.8 326.875-121C510.904 245.856 502.47 127.374 429.938 65c-10.36-8.91-22.206-16.483-35.156-22.906c-25.897-12.844-54.454-19.11-83.905-19.407c-1.38-.013-2.772-.012-4.156 0zm1.06 62.406c47.14-.705 82.63 23.414 90.376 58.906v.03c1.417 6.492 1.806 13.565 1.344 21.032c-3.682 59.742-68.786 126.655-145.438 149.563c-.945.282-1.872.422-2.812.688l.938-.47c-37.843 12.718-74.086-.708-84.438-33.624c-7.03-22.36-.468-48.544 15.25-70.408c-1.695 7.2-.05 13.91 5.344 18.375c10.643 8.816 31.83 5.575 47.312-7.25c15.483-12.824 19.394-30.37 8.75-39.187c-6.294-5.214-16.287-6.21-26.594-3.5l.532-.313c-.755.257-1.52.54-2.28.813c-.344.123-.69.217-1.033.344a54 54 0 0 0-8 3.344c-.656.307-1.315.61-1.968.937c-42.374 21.24-83.226 68.335-71.656 105.125c3.616 11.497 10.213 20.614 19.094 27.094c-30.253-10.44-48.35-34.526-46.563-68.53c3.682-70.837 83.193-133.31 159.844-156.22c14.673-4.385 28.802-6.553 42-6.75z"/></svg>
                        Special Attack
                    </div>
                    <div class="pkmn-stats-panel-bst">
                        <svg style="color:white" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="m311.874 171.817l65.452-99.754l-.865-.367l50.206 12.144l-.221 17.259l.049 93.284l.119 25.42c.562 109.632-58.957 176.828-107.749 213.459l-11.037 7.917l-15.418 9.91l-9.239 5.345l-8.181 4.374l-12.415 5.962l-6.126 2.563l-6.403-2.682l-5.725-2.644l-7.222-3.591l-10.821-5.871l-12.434-7.468l-10.839-7.169c-48.347-33.416-112.698-97.735-117.398-205.151l-.274-12.587V84.09L256.45 42.668l22.726 5.497l-62.978 142.683l48.901 20.757l-80.615 154.048l176.882-172.827z" clip-rule="evenodd"/></svg>
                        Special Defense
                    </div>
                    <div class="pkmn-stats-panel-bst">
                        <svg style="color:white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 19v-2H5.675q-.5 0-.7-.45t.125-.8l6.15-6.9q.3-.35.75-.35t.75.35l6.15 6.9q.325.35.125.8t-.7.45H15v2q0 .425-.288.713T14 20h-4q-.425 0-.712-.288T9 19m3-13l-5.025 5.675q-.15.15-.35.238t-.4.087q-.65 0-.912-.575t.162-1.075l5.775-6.5q.3-.35.75-.35t.75.35l5.775 6.5q.425.5.163 1.075t-.913.575q-.2 0-.4-.075t-.35-.25z"/></svg>
                        Speed
                    </div>
                </div>
                    `
        }


        openTooltip()
      })


  }

}setGuide()


function info() {
  console.info("Escribe un comando para ver más información");
  console.table([
    {command:"infoPkmn()", info:"Modificar Pokémon"},
    {command:"infoItem()", info:"Modificar objetos"},
    {command:"infoRotation()", info:"Modificar rotaciones"},
    {command:"infoMisc()", info:"Comandos varios"},

  ]);

}

function infoPkmn(){
    console.table([
      {command:"givePkmn(pkmn.NAME, LEVEL)", effect:"Dar Pokémon"},
      {command:"pkmn.NAME.level=LEVEL", effect:"Modificar nivel del Pokémon"},
      {command:"pkmn.NAME.shiny=true", effect:"Modificar el estado variocolor del Pokémon"},
      {command:"pkmn.NAME.ivs.hp=NUMBER", effect:"Modificar IV del Pokémon (hp, atk, satk, def, sdef, spe)"},
      {command:"pkmn.NAME.movepool.push(move.NAME.id)", effect:"Añadir movimiento al Pokémon"},
      {command:"pkmn.NAME.ability=ability.NAME.id", effect:"Modificar habilidad del Pokémon"},
      {command:"pkmn.NAME.hiddenAbilityUnlocked=true", effect:"Desbloquear habilidad oculta"},
      ]);
}

function infoItem(){
    console.table([
      {command:"item.NAME.got=AMOUNT", effect:"Dar objetos"},
      ]);
}

function infoRotation(){
    console.table([
      {command:"rotationWildCurrent=NUMBER", effect:"Modificar rotación salvaje"},
      {command:"rotationDungeonCurrent=NUMBER", effect:"Modificar rotación de mazmorras"},
      {command:"rotationEventCurrent=NUMBER", effect:"Modificar rotación de eventos"},
      {command:"rotationFrontierCurrent=NUMBER", effect:"Modificar rotación de la Frontera"},
      ]);
}

function infoMisc(){
    console.table([
      {command:"saved.overrideBattleTimer=NUMBER", effect:"Alterar la velocidad de combate (por defecto 2000)"},
      {command:"debugGetPkmn(LEVEL,'shiny')", effect:"Conseguir todos los Pokémon a cierto nivel. Variocolor opcional"},
      {command:"debugSetIvs(NUMBER)", effect:"Fijar los IV de todos los Pokémon. Máximo 6"},
      {command:"debugGetItems()", effect:"Conseguir 999 de todos los objetos"},
      {command:"saved.geneticOperation=1", effect:"Completar operación genética"},
      {command:"getMoveset(pkmn.NAME,LEVEL)", effect:"Genera una tabla de movimientos posibles del Pokémon"},
      ]);
}



  saved.gamemodNuzlocke = false
  saved.gamemodHard = false
  saved.gamemodAfk = false
  saved.gamemodIvs = false

  // Modificadores añadidos. Cada entrada de la tabla enlaza la clave de `saved`
  // con el id de su checkbox; updateSettings() los recorre en bloque en vez de
  // repetir dos líneas por cada uno.
  const MODIFICADORES = [
    { clave: `gamemodExp`,     checkbox: `checkbox-mode-exp` },
    { clave: `gamemodDrops`,   checkbox: `checkbox-mode-drops` },
    { clave: `gamemodShiny`,   checkbox: `checkbox-mode-shiny` },
    { clave: `gamemodFatiga`,  checkbox: `checkbox-mode-fatiga` },
    { clave: `gamemodDureza`,  checkbox: `checkbox-mode-dureza` },
    { clave: `gamemodCruce`,   checkbox: `checkbox-mode-cruce` },
  ]

  for (const m of MODIFICADORES) saved[m.clave] = false


//fixes visual bugs of settings, thanks html very cool
function updateSettings(alt){



  document.getElementById("settings-theme").value = saved.theme
  document.getElementById("settings-battle-speed").value = velocidadCombate()

  if (saved.hideGotPkmn == "true") {document.getElementById("settings-hide-got").value = "true"} else document.getElementById("settings-hide-got").value = "false"
  if (saved.alternateWildRotation == "true") {document.getElementById("settings-alternate-rotation").value = "true"} else document.getElementById("settings-alternate-rotation").value = "false"


  if (document.getElementById("tooltip-modifiers-list")) {

  if (alt != true) if (saved.gamemodAfk == true) {document.getElementById("checkbox-mode-afk").checked = true} else document.getElementById("checkbox-mode-afk").checked = false
  if (alt == true) if (document.getElementById("checkbox-mode-afk").checked) {  saved.gamemodAfk = true; } else saved.gamemodAfk = false

  if (alt != true) if (saved.gamemodHard == true) {document.getElementById("checkbox-mode-hard").checked = true} else document.getElementById("checkbox-mode-hard").checked = false
  if (alt == true) if (document.getElementById("checkbox-mode-hard").checked) {  saved.gamemodHard = true; } else saved.gamemodHard = false

  if (alt != true) if (saved.gamemodNuzlocke == true) {document.getElementById("checkbox-mode-nuzloke").checked = true} else document.getElementById("checkbox-mode-nuzloke").checked = false
  if (alt == true) if (document.getElementById("checkbox-mode-nuzloke").checked) {  saved.gamemodNuzlocke = true; } else saved.gamemodNuzlocke = false

  if (alt != true) if (saved.gamemodIvs == true) {document.getElementById("checkbox-mode-ivs").checked = true} else document.getElementById("checkbox-mode-ivs").checked = false
  if (alt == true) if (document.getElementById("checkbox-mode-ivs").checked) {  saved.gamemodIvs = true; } else saved.gamemodIvs = false

  // Modificadores añadidos: misma semántica que los de arriba.
  // alt != true -> el estado guardado manda sobre la casilla (al abrir el menú)
  // alt == true -> la casilla manda sobre el estado guardado (al hacer clic)
  for (const m of MODIFICADORES) {
    const casilla = document.getElementById(m.checkbox)
    if (!casilla) continue
    if (alt == true) saved[m.clave] = casilla.checked
    else casilla.checked = (saved[m.clave] == true)
  }

  }



}