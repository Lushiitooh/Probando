

const demeritBp = 150
const t4Base = 120

const ability = {}


//tier 1

ability.hydratation = {  
    rename: `hydration`,
    type: [`water`,`grass`],
    rarity: 1,
    info: function() {return `Impide los estados alterados con clima ${tagRainy}`},
}

ability.sandVeil = {  
    type: [`ground`],
    rarity: 1,
    info: function() {return `Impide los estados alterados con clima ${tagSandstorm}`},
}

ability.snowCloak = {  
    type: [`ice`],
    rarity: 1,
    info: function() {return `Impide los estados alterados con clima ${tagHail}`},
}

ability.grabGuard = {
    type: [`fighting`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Lucha`},
}

ability.waterGuard = {
    type: [`water`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Agua`},
}

ability.flameGuard = {
    type: [`fire`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Fuego`},
}

ability.curseGuard = {
    type: [`fairy`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Fantasma`},
}

ability.poisonGuard = {
    type: [`poison`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Veneno`},
}

ability.iceGuard = {
    type: [`ice`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Hielo`},
}

ability.psychicGuard = {
    type: [`psychic`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Psíquico`},
}

ability.fairyGuard = {
    type: [`fairy`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Hada`},
}

ability.leafGuard = {
    type: [`grass`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Planta`},
}

ability.plainGuard = {
    type: [`normal`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Normal`},
}

ability.sinisterGuard = {
    type: [`dark`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Siniestro`},
}

ability.steelGuard = {
    type: [`steel`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Acero`},
}

ability.dragonGuard = {
    type: [`fairy`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Dragón`},
}

ability.bugGuard = {
    type: [`bug`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Bicho`},
}

ability.rockGuard = {
    type: [`rock`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Roca`},
}

ability.groundGuard = {
    type: [`ground`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Tierra`},
}

ability.flyingGuard = {
    type: [`flying`],
    rarity: 1,
    info: function() {return `Reduce a la mitad el daño recibido de los movimientos de tipo Volador`},
}

ability.insomnia = {
    type: [`all`],
    rarity: 1,
    info: function() {return `Otorga inmunidad a ${tagSleep}`},
}

ability.immunity = {
    type: [`all`],
    rarity: 1,
    info: function() {return `Otorga inmunidad a ${tagPoisoned}`},
}

ability.limber = {
    type: [`all`],
    rarity: 1,
    info: function() {return `Otorga inmunidad a ${tagParalysis}`},
}

ability.ownTempo = {
    type: [`all`],
    rarity: 1,
    info: function() {return `Otorga inmunidad a ${tagConfused}`},
}

ability.magmaArmor = {
    type: [`fire`],
    rarity: 1,
    info: function() {return `Otorga inmunidad a ${tagFreeze}`},
}

ability.waterVeil = {
    type: [`water`, `ice`],
    rarity: 1,
    info: function() {return `Otorga inmunidad a ${tagBurn}`},
}

ability.marvelScale = {
    type: [`water`, `dragon`],
    rarity: 1,
    info: function() {return `Aumenta la Defensa un 50% si sufre un estado alterado`},
}

ability.livingShield = {
    type: [`bug`,`grass`],
    rarity: 1,
    info: function() {return `Aumenta la Defensa Especial un 50% si sufre un estado alterado`},
}


ability.overgrow = {
    type: [`grass`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Planta por debajo del 50% de PS`},
}

ability.blaze = {
    type: [`fire`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Fuego por debajo del 50% de PS`},
}

ability.swarm = {
    type: [`bug`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Bicho por debajo del 50% de PS`},
}

ability.torrent = {
    type: [`water`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Agua por debajo del 50% de PS`},
}

ability.bastion = {
    type: [`steel`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Acero por debajo del 50% de PS`},
}

ability.average = {
    type: [`normal`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Normal por debajo del 50% de PS`},
}

ability.resolve = {
    type: [`fighting`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Lucha por debajo del 50% de PS`},
}

ability.mistify = {
    type: [`psychic`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Psíquico por debajo del 50% de PS`},
}

ability.hexerei = {
    type: [`ghost`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Fantasma por debajo del 50% de PS`},
}

ability.glimmer = {
    type: [`fairy`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Hada por debajo del 50% de PS`},
}

ability.skyward = {
    type: [`flying`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Volador por debajo del 50% de PS`},
}

ability.draconic = {
    type: [`dragon`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Dragón por debajo del 50% de PS`},
}

ability.noxious = {
    type: [`poison`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Veneno por debajo del 50% de PS`},
}

ability.solid = {
    type: [`rock`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Roca por debajo del 50% de PS`},
}

ability.rime = {
    type: [`ice`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Hielo por debajo del 50% de PS`},
}

ability.voltage = {
    type: [`electric`],
    rarity: 1,
    info: function() {return `Aumenta un 30% la potencia de los movimientos de tipo Eléctrico por debajo del 50% de PS`},
}

ability.hyperCutter = {
    type: [`bug`],
    rarity: 1,
    info: function() {return `Impide que baje la característica de Ataque`},
}

ability.bigPecks = {
    type: [`flying`],
    rarity: 1,
    info: function() {return `Impide que baje la característica de Defensa`},
}

ability.wonderSkin = {
    type: [`all`],
    rarity: 1,
    info: function() {return `50% de probabilidad de que fallen los estados alterados recibidos`},
}


//tier 2

ability.synchronize = {
    type: [`psychic`, `all`],
    rarity: 2,
    info: function() {return `Inflige los estados alterados activos también al atacante en el momento de aplicarlos`},
}

ability.solarPower = {  
    type: [`fire`,`grass`],
    rarity: 2,
    info: function() {return `Aumenta el Ataque Especial un 50% con clima ${tagSunny}`},
}

ability.iceBody = {  
    type: [`ice`],
    rarity: 2,
    info: function() {return `Aumenta la Defensa un 50% con clima ${tagHail}`},
}

ability.rainDish = {  
    type: [`water`, `grass`],
    rarity: 2,
    info: function() {return `Aumenta el Ataque Especial un 50% con clima ${tagRainy}`},
}

ability.sandForce = {  
    type: [`ground`],
    rarity: 2,
    info: function() {return `Aumenta el Ataque un 50% con clima ${tagSandstorm}`},
}

ability.static = {
    type: [`electric`],
    rarity: 2,
    info: function() {return `15% de probabilidad de infligir ${tagParalysis} al ser atacado`},
}

ability.flameBody = {
    type: [`fire`],
    rarity: 2,
    info: function() {return `15% de probabilidad de infligir ${tagBurn} al ser atacado`},
}

ability.poisonPoint = {
    type: [`poison`],
    rarity: 2,
    info: function() {return `15% de probabilidad de infligir ${tagPoisoned} al ser atacado`},
}

ability.strangeCharm = {
    type: [`psychic`, `fairy`],
    rarity: 2,
    info: function() {return `15% de probabilidad de infligir ${tagConfused} al ser atacado`},
}

ability.effectSpore = {
    type: [`grass`],
    rarity: 2,
    info: function() {return `5% de probabilidad de infligir ${tagSleep} al ser atacado`},
}

ability.glacialBody = {
    type: [`ice`],
    rarity: 2,
    info: function() {return `5% de probabilidad de infligir ${tagFreeze} al ser atacado`},
}

ability.naturalCure = {
    type: [`all`],
    rarity: 2,
    info: function() {return `Los estados alterados se curan al cambiar de Pokémon`},
}

ability.technician = {
    type: [`all`],
    rarity: 2,
    info: function() {return `Multiplica x1.5 el daño base de los movimientos con potencia igual o inferior a 60`},
}



ability.scrappy = {
    type: [`fighting` , `normal`],
    rarity: 2,
    info: function() {return `Los Pokémon de tipo Fantasma pueden ser golpeados por movimientos de tipo Normal y Lucha`},
}

ability.unaware = {
    type: [`all`],
    rarity: 2,
    info: function() {return `Al atacar, ignora los cambios de características del objetivo`},
}

ability.magicGuard = {
    type: [`psychic`, `fairy`],
    rarity: 2,
    info: function() {return `Solo recibe daño de movimientos que dañan directamente`},
}

ability.voltAbsorb = {
    type: [`electric`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Eléctrico recibidos`},
}

ability.waterAbsorb = {
    type: [`water`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Agua recibidos`},
}

ability.flareAbsorb = {
    type: [`fire`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Fuego recibidos`},
}

ability.curseAbsorb = {
    type: [`dark`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Fantasma recibidos`},
}

ability.poisonAbsorb = {
    type: [`poison`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Veneno recibidos`},
}

ability.frostAbsorb = {
    type: [`ice`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Hielo recibidos`},
}

ability.psychicAbsorb = {
    type: [`psychic`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Psíquico recibidos`},
}

ability.lightAbsorb = {
    type: [`fairy`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Hada recibidos`},
}

ability.growthAbsorb = {
    type: [`grass`],
    rarity: 2,
    info: function() {return `Anula los movimientos de tipo Planta recibidos`},
}




ability.strongJaw = {
    type: [`dark`],
    rarity: 2,
    info: function() {return `Los movimientos de tipo "colmillo" multiplican su potencia base x2 <span style="opacity:0.7">(${joinWithAnd(movesAffectedByStrongJaw)})</span>`},
}

ability.toughClaws = {
    type: [`dragon`],
    rarity: 2,
    info: function() {return `Los movimientos de tipo "garra" multiplican su potencia base x2 <span style="opacity:0.7">(${joinWithAnd(movesAffectedByToughClaws)})</span>`},
}

ability.ironFist = {
    type: [`fighting`],
    rarity: 2,
    info: function() {return `Los movimientos de tipo "puño" multiplican su potencia base x1.5 <span style="opacity:0.7">(${joinWithAnd(movesAffectedByIronFist)})</span>`},
}



ability.rivalry = {
    type: [`dragon`, `dark`],
    rarity: 2,
    info: function() {return `Multiplica el daño x1.5 cuando el Pokémon rival comparte un tipo`},
}

ability.pickPocket = {
    type: [`dark`, `flying`, `normal`],
    rarity: 2,
    info: function() {return `Aumenta un 1% la probabilidad de objetos raros (acumulable). Funciona siempre para todos, sea quien sea el usuario`},
}


ability.brittleArmor = {
    type: [`ice`,`rock`],
    rarity: 2,
    info: function() {return `Aumenta el Ataque Especial un 50% si sufre un estado alterado`},
}



ability.chlorophyll  = {  
    type: [`grass`],
    rarity: 2,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagSunny}`},
}





//tier 3

//tier 3 names based on gemini, pisces, o luna, mars, etc


ability.grassyPelt = {  
    type: [`grass`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagGrassyTerrain}`},
}

ability.sandyPelt = {  
    type: [`rock`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagSandstorm}`},
}

ability.icyPelt = {  
    type: [`ice`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagHail}`},
}

ability.moistPelt = {  
    type: [`water`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagRainy}`},
}

ability.fieryPelt = {  
    type: [`fire`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagSunny}`},
}

ability.pixiePelt = {  
    rename: `fuzzyPelt`,
    type: [`psychic`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagMistyTerrain}`},
}

ability.blackPelt = {  
    type: [`ghost`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagFoggy}`},
}

ability.spikyPelt = {  
    type: [`electric`],
    rarity: 3,
    info: function() {return `Impide las bajadas de características y los estados alterados con clima ${tagElectricTerrain}`},
}

ability.climaTact  = {  
    type: [`fairy`],
    rarity: 3,
    info: function() {return `El clima cambiado por el usuario dura 15 turnos más`},
}

ability.intangible  = {  
    type: [`dark`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagFoggy}`},
}

ability.hyperconductor  = {  
    type: [`steel`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagElectricTerrain}`},
}

ability.faeRush  = {  
    type: [`fairy`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagMistyTerrain}`},
}

ability.moltShed  = {  
    type: [`bug`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagGrassyTerrain}`},
}

ability.slushRush  = { 
    type: [`ice`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagHail}`},
}

ability.swiftSwim  = { 
    type: [`water`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagRainy}`},
}

ability.sandRush  = { 
    type: [`ground`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% con clima ${tagSandstorm}`},
}

ability.intimidate = {
    type: [`dragon`, `ghost`],
    rarity: 3,
    info: function() {return `Reduce el Ataque del enemigo un 50% cuando el Pokémon rival entra en combate`},
}

ability.dauntingLook = {
    type: [`bug`, `fire`, `fighting`],
    rarity: 3,
    info: function() {return `Reduce el Ataque Especial del enemigo un 50% cuando el Pokémon rival entra en combate`},
}

ability.unburden = {
    type: [`normal`, `fighting`, `flying`],
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% si no lleva ningún objeto`},
}

ability.moxie = {
    type: [`dark`],
    rarity: 3,
    info: function() {return `Aumenta el Ataque un 50% al derrotar a un Pokémon`},
}

ability.strategist = {
    type: [`psychic`],
    rarity: 3,
    info: function() {return `Aumenta el Ataque Especial un 50% al derrotar a un Pokémon`},
}

ability.sheerForce = {
    type: [`ground`, `steel`, `rock`],
    rarity: 3,
    info: function() {return `Se eliminan los efectos secundarios positivos de los movimientos de daño, y su daño se multiplica x1.25`},
}

ability.levitate = {
    type: [`electric`, `steel`],
    rarity: 3,
    info: function() {return `Otorga inmunidad a los movimientos de tipo Tierra`},
}

ability.thickFat = {
    type: [`normal`, `ice`],
    rarity: 3,
    info: function() {return `Reduce a la mitad el daño recibido de movimientos de tipo Fuego y Hielo`},
}

ability.adaptability = {
    type: [`all`],
    rarity: 3,
    info: function() {return `Aumenta la bonificación por tipo (STAB) en +0.2`},
}

ability.ambidextrous = {
    type: [`all`],
    rarity: 3,
    info: function() {return `Aumenta la Potencia Cruzada en +0.3`},
}

ability.noGuard = {
    type: [`all`],
    rarity: 3,
    info: function() {return `Los movimientos siempre aciertan, sea cual sea el tipo`},
}

ability.multiscale = {
    type: [`water`],
    rarity: 3,
    info: function() {return `El daño recibido se reduce a la mitad por encima del 50% de PS`},
}

ability.guts = {
    type: [`normal`],
    rarity: 3,
    info: function() {return `Aumenta el Ataque un 50% si sufre un estado alterado, y anula la bajada de característica que este provoca`},
}

ability.skillLink = {
    type: [`bug`,`normal`],
    rarity: 3,
    info: function() {return `Los movimientos de golpes múltiples siempre golpean el máximo de veces`},
}

ability.sharpness = {
    type: [`steel`],
    rarity: 3,
    info: function() {return `Los movimientos de tipo "corte" multiplican su potencia base x1.5 <span style="opacity:0.7">(${joinWithAnd(movesAffectedBySharpness)})</span>`},
}

ability.angerPoint = {
    type: [`fire`],
    rarity: 3,
    info: function() {return `Aumenta el Ataque un 100% al recibir un movimiento supereficaz`},
}

ability.justified = {
    type: [`fighting`],
    rarity: 3,
    info: function() {return `Aumenta el Ataque Especial un 100% al recibir un movimiento supereficaz`},
}

ability.filter = {
    type: [`bug`,`ground`],
    rarity: 3,
    info: function() {return `El multiplicador de daño supereficaz recibido se reduce a la mitad`},
}

ability.reckless = {
    type: [`flying`],
    rarity: 3,
    info: function() {return `Los movimientos que se ejecutan más lento de lo normal multiplican su potencia base x1.5`},
}

ability.libero = {
    type: [`fairy`,`psychic`],
    rarity: 3,
    info: function() {return `Los movimientos que se ejecutan más rápido de lo normal multiplican su potencia base x2`},
}

ability.flashElectro = {
    type: [`electric`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Eléctrico recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashAqua = {
    type: [`water`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Agua recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashPyro = {
    type: [`fire`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Fuego recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashUmbra = {
    type: [`dark`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Fantasma recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashVenum = {
    type: [`poison`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Veneno recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashCryo = {
    type: [`ice`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Hielo recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashPsycha = {
    type: [`psychic`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Psíquico recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashFae = {
    type: [`fairy`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Hada recibidos y aumenta la Velocidad un 50% al recibir uno`},
}

ability.flashHerba = {
    type: [`grass`],
    rarity: 3,
    info: function() {return `Anula los movimientos de tipo Planta recibidos y aumenta la Velocidad un 50% al recibir uno`},
}





//hidden


ability.stoned = {
    rarity: 3,
    info: function() {return `Las subidas de características duran x3 más`},
    nerf: `Como habilidad no oculta: los turnos se reducen a x2`
}

ability.powerOfAlchemy = {
    rarity: 3,
    info: function() {return `El usuario obtiene temporalmente la habilidad (no oculta) del último Pokémon derrotado de tu equipo. Esta habilidad temporal se suma a las que ya tiene. Aplicar una segunda habilidad temporal reemplaza a la primera`},
}

ability.stamina = {
    rarity: 3,
    info: function() {return `Reduce x2 el daño por fatiga del usuario`},
}

ability.gooey = {
    rarity: 3,
    info: function() {return `Reduce la Velocidad del enemigo un 50% al ser golpeado`},
}

ability.flowerVeil = {
    rarity: 3,
    info: function() {return `Impide ${tagParalysis} a todo tu equipo`},
}

ability.aromaVeil = {
    rarity: 3,
    info: function() {return `Impide ${tagBurn} a todo tu equipo`},
}

ability.sweetVeil = {
    rarity: 3,
    info: function() {return `Impide ${tagConfused} a todo tu equipo`},
}

ability.pastelVeil = {
    rarity: 3,
    info: function() {return `Impide ${tagPoisoned} a todo tu equipo`},
}

ability.shieldsDown = {
    rarity: 3,
    info: function() {return `El daño supereficaz pasa a ser neutro`},
}

ability.colorSpore = {
    rarity: 3,
    info: function() {return `Los estados alterados aplicados al objetivo duran x3 más`},
    //nerf: `Como habilidad no oculta: los turnos se reducen a x2`
}

ability.merciless = {
    rarity: 3,
    info: function() {return `Multiplica x1.5 el daño infligido si el objetivo sufre un estado alterado`},
    nerf: `Como habilidad no oculta: el daño se reduce a x1.35`
}

ability.costar = {
    rarity: 3,
    info: function() {return `Cuando a cualquier miembro del equipo le sube una característica, al usuario también`},
}

ability.purifyingSalt = {
    rarity: 3,
    info: function() {return `Reduce un 25% el daño de todos los movimientos de tipo Fantasma (acumulable). Funciona siempre para todos, sea quien sea el usuario`},
}






ability.treasureOfRuin = {
    rarity: 3,
    info: function() {return `Aumenta la Potencia Cruzada en +0.5`},
}

ability.thousandArms = {
    rarity: 3,
    info: function() {return `Todos los golpes pasan a ser supereficaces, sea cual sea el tipo`},
}

ability.goodAsGold = {
    rarity: 3,
    info: function() {return `Aumenta un 15% la probabilidad de encontrar un Pokémon variocolor salvaje. Funciona siempre para todos, sea quien sea el usuario`},
}

ability.wonderGuard = {
    rarity: 3,
    info: function() {return `El daño recibido de movimientos no supereficaces se reduce un 80%`},
}

ability.tintedLens = {  
    rarity: 3,
    info: function() {return `Los movimientos resistidos por tipo pasan a hacer daño normal`},
}

ability.prankster = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo Fantasma y Siniestro se ejecutan x1.5 más rápido de lo normal`},
}

ability.galeWings = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo Volador y Bicho se ejecutan x1.5 más rápido de lo normal`},
}

ability.neuroforce = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo Psíquico y Hada se ejecutan x1.5 más rápido de lo normal`},
}

ability.speedBoost = {
    rarity: 3,
    info: function() {return `Aumenta la Velocidad un 50% al derrotar a un Pokémon`},
}

ability.scorch = {
    rarity: 3,
    info: function() {return `El daño periódico de ${tagBurn} en el enemigo se dobla mientras este Pokémon esté activo`},
    nerf: `Como habilidad no oculta: el daño se reduce a x1.5`
}

ability.corrosion = {
    rarity: 3,
    info: function() {return `El daño periódico de ${tagPoisoned} en el enemigo se dobla mientras este Pokémon esté activo`},
    nerf: `Como habilidad no oculta: el daño se reduce a x1.5`
}

ability.dancer = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo "danza" se ejecutan el doble de rápido <span style="opacity:0.7">(${joinWithAnd(movesAffectedByDancer)})<span>`},
    nerf: `Como habilidad no oculta: la velocidad se reduce a x1.5`
}

ability.cacophony = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo "sonido" se ejecutan el doble de rápido <span style="opacity:0.7">(${joinWithAnd(movesAffectedByCacophony)})<span>`},
    nerf: `Como habilidad no oculta: la velocidad se reduce a x1.5`
}

ability.windRider = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo "viento" se ejecutan el doble de rápido <span style="opacity:0.7">(${joinWithAnd(movesAffectedByWindRider)})<span>`},
    nerf: `Como habilidad no oculta: la velocidad se reduce a x1.5`
}


ability.iaido = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo "corte" se ejecutan el doble de rápido <span style="opacity:0.7">(${joinWithAnd(movesAffectedBySharpness)})<span>`},
    nerf: `Como habilidad no oculta: la velocidad se reduce a x1.5`
}





ability.megaLauncher = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo "pulso" multiplican su potencia base x1.5 <span style="opacity:0.7">(${joinWithAnd(movesAffectedByMegaLauncher)})<span>`},
}

ability.metalhead = {
    rarity: 3,
    info: function() {return `Los movimientos de tipo "cabezazo" multiplican su potencia base x1.5 <span style="opacity:0.7">(${joinWithAnd(movesAffectedByMetalhead)})<span>`},
}

ability.imposter = {
    info: function() {return `Copia las subidas de características del enemigo`},
    rarity: 3,
}

ability.toxicBoost = {
    info: function() {return `Aumenta x1.2 el daño infligido cuando sufre ${tagPoisoned}, y anula el daño periódico que este provoca`},
    rarity: 3,
}

ability.flareBoost = {
    info: function() {return `Aumenta x1.2 el daño infligido cuando sufre ${tagBurn}, y anula el daño periódico que este provoca`},
    rarity: 3,
}

ability.fullMetalBody = {
    info: function() {return `Impide todas las bajadas de características`},
    rarity: 3,
}

ability.supremeOverlord = {
    info: function() {return `Aumenta x1.15 el daño infligido por cada miembro del equipo derrotado`},
    rarity: 3,
}

ability.gorillaTactics = {
    info: function() {return `Aumenta el Ataque x1.5, pero impide cambiar de Pokémon`},
    nerf: `Como habilidad no oculta: el daño se reduce a x1.35`,
    rarity: 3,
}

ability.beastBoost = {
    info: function() {return `Aumenta un 50% la característica más alta del usuario al derrotar a un Pokémon`},
    rarity: 3,
}

ability.quarkDrive = {
    info: function() {return `Aumenta un 50% la característica más alta del usuario con ${tagElectricTerrain}`},
    rarity: 3,
}

ability.protosynthesis = {
    info: function() {return `Aumenta un 50% la característica más alta del usuario con clima ${tagSunny}`},
    rarity: 3,
}

ability.drizzle = {
    info: function() {return `Cambia el clima a ${tagRainy} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.drought = {
    info: function() {return `Cambia el clima a ${tagSunny} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.sandStream = {
    info: function() {return `Cambia el clima a ${tagSandstorm} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.snowWarning = {
    info: function() {return `Cambia el clima a ${tagHail} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.somberField = {
    info: function() {return `Cambia el clima a ${tagFoggy} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.electricSurge = {
    info: function() {return `Cambia el clima a ${tagElectricTerrain} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.grassySurge = {
    info: function() {return `Cambia el clima a ${tagGrassyTerrain} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.mistySurge = {
    info: function() {return `Cambia el clima a ${tagMistyTerrain} al entrar en combate o al relevar`},
    rarity: 3,
}

ability.sereneGrace = {
    info: function() {return `Los efectos secundarios de los movimientos se ejecutan dos veces`},
    rarity: 3,
}

ability.hugePower = {
    info: function() {return `El daño físico infligido se multiplica x2`},
    rarity: 3,
}

ability.contrary = {
    info: function() {return `Invierte los cambios de características. Las subidas se vuelven bajadas y viceversa`},
    rarity: 3,
}

ability.protean = {
    info: function() {return `Cambia el tipo del usuario al del movimiento usado`},
    rarity: 3,
}

ability.simple = {
    info: function() {return `Los cambios de características del usuario suben un nivel más`},
    rarity: 3,
}

ability.parentalBond = {
    info: function() {return `Los movimientos se ejecutan una segunda vez, a media potencia`},
    rarity: 3,
}

ability.moody = {
    info: function() {return `Cada turno, sube dos características un 100% durante un turno`},
    rarity: 3,
}

ability.darkAura = {
    info: function() {return `Multiplica x1.1 la potencia de los movimientos de tipo Siniestro de todo el equipo`},
    rarity: 3,
}


ability.soulAsterism = {
    info: function() {return `Multiplica x1.1 el daño de los movimientos de tipo Fantasma de todo el equipo`},
    rarity: 3,
}


ability.normalize = {
    info: function() {return `Todos los movimientos pasan a ser de tipo Normal, y su potencia se multiplica x1.3`},
    rarity: 3,
}


ability.ferrilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Acero, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.glaciate = {
    rename: `refrigerate`,
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Hielo, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.terralate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Tierra, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.toxilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Veneno, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.hydrolate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Agua, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.pyrolate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Fuego, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.chrysilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Bicho, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.galvanize = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Eléctrico, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.gloomilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Siniestro, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.espilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Psíquico, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.aerilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Volador, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.pixilate = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Hada, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.verdify = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Planta, y su potencia se multiplica por x1.3`},
    rarity: 3,
}

ability.dragonMaw = {
    info: function() {return `Los movimientos de tipo Normal pasan a ser de tipo Dragón, y su potencia se multiplica por x1.3`},
    rarity: 3,
}


for (const i in ability){
    ability[i].id = i
}








const berryMemoryRare = [ ability.flashHerba.id, ability.flashFae.id, ability.flashPsycha.id, ability.flashCryo.id, ability.flashVenum.id, ability.flashUmbra.id,
    ability.flashPyro.id, ability.flashAqua.id, ability.flashElectro.id, ability.libero.id, ability.reckless.id, ability.filter.id, ability.justified.id,
    ability.angerPoint.id, ability.sharpness.id, ability.skillLink.id, ability.guts.id, ability.multiscale.id, ability.noGuard.id, ability.ambidextrous.id,
    ability.adaptability.id, ability.thickFat.id, ability.levitate.id, ability.sheerForce.id, ability.strategist.id, ability.moxie.id, ability.unburden.id,
    ability.dauntingLook.id, ability.intimidate.id, ability.sandRush.id, ability.swiftSwim.id, ability.slushRush.id, ability.moltShed.id, ability.faeRush.id,
    ability.hyperconductor.id, ability.intangible.id, ability.climaTact.id, ability.spikyPelt.id, ability.blackPelt.id, ability.pixiePelt.id, ability.fieryPelt.id,
    ability.moistPelt.id, ability.icyPelt.id, ability.sandyPelt.id, ability.grassyPelt.id,
 ]

 //todo
 //nerf non HA HA's
 //buff protean make it receive crosspower
 


 const apricornMemoryHA1 = [ 
    ability.stamina.id, ability.gooey.id, ability.shieldsDown.id, ability.costar.id,
    ability.purifyingSalt.id, ability.scorch.id, ability.corrosion.id, ability.megaLauncher.id,
    ability.metalhead.id, ability.moody.id, ability.merciless.id, ability.colorSpore.id, ability.sandStream.id,
    ability.snowWarning.id, ability.somberField.id, ability.stoned.id,
 ]



 //ability.quarkDrive.id, ability.protosynthesis.id,


 const apricornMemoryHA2 = [  
    ability.dancer.id, ability.cacophony.id, ability.windRider.id, ability.gorillaTactics.id,
    ability.imposter.id,
    ability.drizzle.id, ability.drought.id, ability.electricSurge.id,
    ability.grassySurge.id, ability.mistySurge.id, ability.ferrilate.id, ability.glaciate.id,
    ability.terralate.id, ability.toxilate.id, ability.hydrolate.id, ability.pyrolate.id, ability.chrysilate.id,
    ability.galvanize.id, ability.gloomilate.id, ability.espilate.id, ability.aerilate.id, ability.pixilate.id,
    ability.verdify.id, ability.dragonMaw.id, ability.iaido.id,
 ]

 /*const apricornMemoryHA2 = [   ability.treasureOfRuin.id, ability.dancer.id, ability.cacophony.id, 
    ability.imposter.id, ability.quarkDrive.id, ability.protosynthesis.id, ability.drizzle.id, ability.drought.id,  ability.electricSurge.id, ability.grassySurge.id, ability.mistySurge.id, 
    ability.ferrilate.id, ability.glaciate.id, ability.terralate.id, ability.toxilate.id,
    ability.hydrolate.id, ability.pyrolate.id, ability.chrysilate.id, ability.galvanize.id, ability.gloomilate.id, ability.espilate.id, ability.aerilate.id, ability.pixilate.id,
    ability.verdify.id, ability.dragonMaw.id,
 ]*/

 const apricornMemoryHA3 = [   ability.tintedLens.id, ability.prankster.id, ability.galeWings.id, ability.speedBoost.id,
    ability.toxicBoost.id, ability.flareBoost.id, ability.fullMetalBody.id, ability.supremeOverlord.id, ability.beastBoost.id, ability.sereneGrace.id,
    ability.contrary.id, ability.simple.id, ability.normalize.id, 
 ]

 const apricornMemoryHA4 = [  ability.hugePower.id, ability.powerOfAlchemy.id, ability.wonderGuard.id, ability.protean.id, ability.parentalBond.id,
 ]

























const move = {}

const defaultPlayerMoveTimer = 2000


//tier 1 - 20-40 uncompromised dmg
//tier 2 - 50-70 uncompromised dmg
//tier 3 - 80-100 uncompromised dmg

//signatures need to be learnt through cloning inheriting!



//normal


move.quickAttack = {
    moveset: [`normal`, `all`],
    split: "physical",
    rarity: 1,
    type: "normal",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.tackle = {
    moveset: [`normal`, `all`],
    split: "physical",
    rarity: 1,
    type: "normal",
    power: 40
}

move.doubleSlap = {  
    moveset: [`normal`, `fighting`],
    split: "physical",
    rarity: 1,
    type: "normal",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.cut = {
    moveset: [`normal`, `grass`],
    split: "physical",
    rarity: 1,
    type: "normal",
    power: 50,
    affectedBy: [ability.sharpness.id]
}

move.leer = {
    moveset: [`normal`, `all`],
    split: "special",
    rarity: 1,
    type: "normal",
    power: 0,
    info: function() {return `Reduce la Defensa del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1') },
    restricted: true,
}

move.growl = { 
    moveset: [`normal`, `all`, `dark`],
    split: "special",
    rarity: 1,
    type: "normal",
    power: 0,
    info: function() {return `Reduce el Ataque del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1') },
    affectedBy: [ability.cacophony.id]
}

move.swagger = {
    moveset: [`all`],
    split: "special",
    rarity: 2,
    type: "normal",
    power: 0,
    info: function() {return `Inflige ${tagConfused}, pero aumenta el Ataque del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'confused'); moveBuff(target,'atkup2') },
}

move.doubleHit = {  
    moveset: [`normal`],
    split: "physical",
    rarity: 2,
    type: "normal",
    power: 35,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
}

move.playNice = {
    moveset: [`normal`, `all`],
    split: "special",
    rarity: 2,
    type: "normal",
    power: 0,
    info: function() {return `Reduce el Ataque del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1') },
}

move.swift = {
    moveset: [`normal`, `all`],
    split: "special",
    rarity: 2,
    type: "normal",
    power: 60,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.dizzyPunch = {
    moveset: [`normal`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "normal",
    power: 70,
    info: function() {return `10% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'confused') },
    affectedBy: [ability.ironFist.id]
}

move.stomp = {
    moveset: [`normal`],
    split: "physical",
    rarity: 2,
    type: "normal",
    power: 65
}

move.screech = {
    moveset: [`bug`],
    split: "special",
    rarity: 3,
    type: "normal",
    power: 0,
    info: function() {return `Reduce la Defensa del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'defdown2') },
    affectedBy: [ability.cacophony.id],
    restricted: true,
}

move.smellingSalts = {  
    moveset: [`normal`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 70,
    info: function() {return `La potencia se dobla si el objetivo está paralizado`},
    powerMod : function() { if (wildBuffs.paralysis>0) { return 2} else return 1 },
}

move.facade = {  
    moveset: [`normal`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 70,
    info: function() {return `La potencia se dobla si el usuario está paralizado, quemado o envenenado`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.burn > 0 || team[exploreActiveMember].buffs?.poisoned > 0 || team[exploreActiveMember].buffs?.paralysis > 0) { return 2} else return 1 },
}

move.slash = {
    moveset: [`normal`, `grass`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 90,
    affectedBy: [ability.sharpness.id]
}

move.extremeSpeed = {
    moveset: [`normal`, `all`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 75,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.strength = {
    moveset: [`normal`, `all`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 100
}

move.hyperVoice = {
    moveset: [`normal`],
    split: "special",
    rarity: 3,
    type: "normal",
    power: 90,
    affectedBy: [ability.cacophony.id]
}

move.bodyPress = { 
    moveset: [`normal`, `fighting`, `rock`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 90,
    info: function() {return `La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.hyperBeam = {
    moveset: [`normal`, `all`],
    split: "special",
    rarity: 3,
    type: "normal",
    power: 150,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`} ,
}

move.gigaImpact = {  
    moveset: [`normal`, `all`],
    split: "physical",
    rarity: 3,
    type: "normal",
    power: 150,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`} ,
}

move.swordsDance = {  
    moveset: [`steel`,"all"],
    split: "special",
    rarity: 3,
    type: "normal",
    power: 0,
    info: function() {return `Aumenta el Ataque un 100%`},
    hitEffect: function(target) { moveBuff(target,'atkup2',"self");},
    affectedBy: [ability.dancer.id],
    restricted: true,
}



//fire
move.ember = {
    moveset: [`fire`, `dragon`],
    split: "special",
    rarity: 1,
    type: "fire",
    power: 40,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
}

move.fireSpin = {  
    moveset: [`fire`],
    split: "special",
    rarity: 1,
    type: "fire",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.flameCharge = {
    moveset: [`fire`],
    split: "physical",
    rarity: 2,
    type: "fire",
    power: 50,
    info: function() {return `50% de probabilidad de aumentar la Velocidad un 50%`},
    hitEffect: function(target) { if (rng(0.50))  moveBuff(target,'speup1','self') },
}

move.incinerate = {
    moveset: [`fire`, `dragon`],
    split: "special",
    rarity: 2,
    type: "fire",
    power: 60
}

move.fireFang = {
    moveset: [`fire`, `dark`, `dragon`],
    split: "physical",
    rarity: 2,
    type: "fire",
    power: 65,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
    affectedBy: [ability.strongJaw.id]
}

move.firePunch = {
    moveset: [`fire`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "fire",
    power: 75,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
    affectedBy: [ability.ironFist.id]
}


move.sunnyDay = { 
    moveset: [`fire`,`ground`],
    split: "special",
    rarity: 3,
    type: "fire",
    power: 0,
    info: function() {return `Cambia el clima a ${tagSunny}`} ,
    hitEffect: function(target) { changeWeather("sunny") },
}

move.flamethrower = {
    moveset: [`fire`, `dragon`],
    split: "special",
    rarity: 3,
    type: "fire",
    power: 90,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
}

move.heatWave = {
    moveset: [`fire`],
    split: "special",
    rarity: 3,
    type: "fire",
    power: 60,
    info: function() {return `50% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'burn') },
    affectedBy: [ability.windRider.id]
}

move.fireBlast = {
    moveset: [`fire`, `dragon`],
    split: "special",
    rarity: 3,
    type: "fire",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`},
    affectedBy: [ability.megaLauncher.id]
}

move.flareBlitz = {
    moveset: [`fire`],
    split: "physical",
    rarity: 3,
    type: "fire",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}


move.overheat = {  
    moveset: [`fire`],
    split: "special",
    rarity: 3,
    type: "fire",
    power: demeritBp,
    info: function() {return `Reduce el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}







//electric
move.nuzzle = {
    moveset: [`electric`, `fairy`],
    split: "physical",
    rarity: 1,
    type: "electric",
    power: 40,
    info: function() {return `30% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'paralysis') },
}

move.magneticFlux = {
    moveset: [`electric`, `steel`],
    split: "special",
    rarity: 1,
    type: "electric",
    power: 0,
    info: function() {return `Aumenta la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'sdefup1',"self") },
}

move.thunderShock = {
    moveset: [`electric`],
    split: "special",
    rarity: 1,
    type: "electric",
    power: 40,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
}

move.thunderWave = {
    moveset: [`electric`, `psychic`, `ghost`, `fairy`],
    split: "special",
    rarity: 2,
    type: "electric",
    power: 0,
    info: function() {return `Inflige ${tagParalysis}`},
    hitEffect: function(target) { moveBuff(target,'paralysis') },
}

move.chargeBeam = {
    moveset: [`electric`, `psychic`],
    split: "special",
    rarity: 2,
    type: "electric",
    power: 60,
    info: function() {return `50% de probabilidad de aumentar el Ataque Especial un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'satkup1',"self") },
}

move.electroWeb = {
    moveset: [`bug`],
    split: "special",
    rarity: 2,
    type: "electric",
    power: 55,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.thunderFang = {
    moveset: [`electric`, `dark`, `dragon`],
    split: "physical",
    rarity: 2,
    type: "electric",
    power: 65,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
    affectedBy: [ability.strongJaw.id]
}

move.thunderPunch = {
    moveset: [`electric`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "electric",
    power: 75,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
    affectedBy: [ability.ironFist.id]
}

move.thunderbolt = {
    moveset: [`electric`, `psychic`],
    split: "special",
    rarity: 3,
    type: "electric",
    power: 90,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
}

move.discharge = {
    moveset: [`electric`],
    split: "special",
    rarity: 3,
    type: "electric",
    power: 70,
    info: function() {return `30% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'paralysis') },
}

move.electricTerrain = { 
    moveset: [`electric`,`steel`],
    split: "special",
    rarity: 3,
    type: "electric",
    power: 0,
    info: function() {return `Cambia el clima a ${tagElectricTerrain}`} ,
    hitEffect: function(target) { changeWeather("electricTerrain") },
}

move.thunder = {
    moveset: [`electric`],
    split: "special",
    rarity: 3,
    type: "electric",
    power: 110,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.voltSwitch = {
    moveset: [`electric`],
    split: "special",
    rarity: 3,
    type: "electric",
    power: 70,
    info: function() {return `Cambia al siguiente miembro del equipo`},
    hitEffect: function(target) { if (target=="wild" && saved.currentArea != "training") switchMemberNext() },
}

move.wildCharge = {  
    moveset: [`electric`],
    split: "physical",
    rarity: 3,
    type: "electric",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.supercellSlam = {  //new
    moveset: [`electric`],
    split: "physical",
    rarity: 3,
    type: "electric",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}



//ground
move.mudSlap = {
    moveset: [`ground`, `water`, `poison`],
    split: "special",
    rarity: 1,
    type: "ground",
    power: 20
}

move.magnitude = {  
    moveset: [`ground`, `rock`],
    split: "physical",
    rarity: 1,
    type: "ground",
    power: 10,
    info: function() {return `La potencia varía al azar de x1 a x8`},
    powerMod : function() { return random(1,8) },
}

move.mudShot = {
    moveset: [`ground`, `water`, `poison`],
    split: "special",
    rarity: 2,
    type: "ground",
    power: 55,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.bulldoze = {
    moveset: [`ground`, `rock`],
    split: "physical",
    rarity: 2,
    type: "ground",
    power: 60,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}


move.sandstorm = { 
    moveset: [`rock`,`ground`],
    split: "special",
    rarity: 2,
    type: "ground",
    power: 0,
    info: function() {return `Cambia el clima a ${tagSandstorm}`} ,
    hitEffect: function(target) { changeWeather("sandstorm") },
    affectedBy: [ability.windRider.id]
}

move.scorchingSands = {
    moveset: [`ground`],
    split: "special",
    rarity: 2,
    type: "ground",
    power: 70,
    info: function() {return `30% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'burn') },
}

move.rototiller = {
    moveset: [`ground`, `grass`],
    split: "special",
    rarity: 3,
    type: "ground",
    power: 0,
    info: function() {return `Aumenta el Ataque y el Ataque Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'atkup2',"self"); moveBuff(target,'satkup2',"self") },
    restricted: true,
}

move.earthquake = {
    moveset: [`ground`, `rock`],
    split: "physical",
    rarity: 3,
    type: "ground",
    power: 100
}

move.dig = {
    moveset: [`ground`],
    split: "physical",
    rarity: 3,
    type: "ground",
    power: 80,
    info: function() {return `La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.earthPower = {
    moveset: [`ground`],
    split: "special",
    rarity: 3,
    type: "ground",
    power: 90,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
}

move.stompingTantrum = {  //new
    moveset: [`ground`],
    split: "physical",
    rarity: 3,
    type: "ground",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}



//steel
move.bulletPunch = {
    moveset: [`steel`, `fighting`],
    split: "physical",
    rarity: 1,
    type: "steel",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`},
    affectedBy: [ability.ironFist.id]
}

move.metalClaw = {
    moveset: [`steel`, `flying`, `dragon`],
    split: "physical",
    rarity: 1,
    type: "steel",
    power: 50,
    info: function() {return `30% de probabilidad de aumentar el Ataque un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'atkup1',"self") },
    affectedBy: [ability.toughClaws.id]
}

move.magnetBomb = {
    moveset: [`steel`, `electric`],
    split: "physical",
    rarity: 2,
    type: "steel",
    power: 60
}

move.mirrorShot = { //edit
    moveset: [`steel`],
    split: "special",
    rarity: 2,
    type: "steel",
    power: 70
}

move.steelWing = {
    moveset: [`flying`],
    split: "physical",
    rarity: 2,
    type: "steel",
    power: 70,
    info: function() {return `50% de probabilidad de aumentar la Defensa un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'defup1',"self") },
}

move.ironHead = {
    moveset: [`steel`],
    split: "physical",
    rarity: 2,
    type: "steel",
    power: 80,
    affectedBy: [ability.metalhead.id]
}

move.sharkJaws = {  
    moveset: [`water`],
    split: "physical",
    rarity: 2,
    type: "steel",
    power: 70,
    info: function() {return `10% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'defdown1') },
    affectedBy: [ability.strongJaw.id]
}

move.ironSlug = {  
    moveset: [`rock`],
    split: "physical",
    rarity: 2,
    type: "steel",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.flashCannon = {
    moveset: [`steel`, `electric`, `psychic`],
    split: "special",
    rarity: 3,
    type: "steel",
    power: 80,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
    affectedBy: [ability.megaLauncher.id]
}


move.ironTail = {
    moveset: [`steel`],
    split: "physical",
    rarity: 3,
    type: "steel",
    power: 90,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal. La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.smartStrike = {  
    moveset: [`electric`],
    split: "physical",
    rarity: 3,
    type: "steel",
    power: 90,
    affectedBy: [ability.sharpness.id]
}

move.metalSound = {
    moveset: [`steel`],
    split: "special",
    rarity: 3,
    type: "steel",
    power: 0,
    info: function() {return `Reduce la Defensa Especial del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'sdefdown2') },
    affectedBy: [ability.cacophony.id],
    restricted: true,
}

move.ironDefense = {
    moveset: [`steel`, `fighting`],
    split: "special",
    rarity: 3,
    type: "steel",
    power: 0,
    info: function() {return `Aumenta la Defensa un 100%`},
    hitEffect: function(target) { moveBuff(target,'defup2',"self");},
}







//flying
move.peck = {
    moveset: [`flying`],
    split: "physical",
    rarity: 1,
    type: "flying",
    power: 35
}

move.gust = {
    moveset: [`flying`],
    split: "special",
    rarity: 1,
    type: "flying",
    power: 40,
    affectedBy: [ability.windRider.id]
}

move.skyDrop = {
    moveset: [`flying`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "flying",
    power: 50,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.dualWingbeat = {  
    moveset: [`flying`],
    split: "physical",
    rarity: 2,
    type: "flying",
    power: 30,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
}

move.acrobatics = {  
    moveset: [`flying`, `bug`],
    split: "physical",
    rarity: 2,
    type: "flying",
    power: 65,
    info: function() {return `La potencia se dobla si el usuario no lleva ningún objeto`},
    powerMod : function() { if (team[exploreActiveMember].item === undefined ) { return 2} else return 1 },
}

move.airShlash = {
    rename: `airSlash`,
    moveset: [`flying`],
    split: "special",
    rarity: 3,
    type: "flying",
    power: 75,
    affectedBy: [ability.sharpness.id],
    info: function() {return `30% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'sdefdown1') },
}

move.drillPeck = {
    moveset: [`flying`],
    split: "physical",
    rarity: 2,
    type: "flying",
    power: 80
}

move.tailwind = {
    moveset: [`flying`],
    split: "special",
    rarity: 2,
    type: "flying",
    power: 0,
    info: function() {return `Aumenta la Velocidad un 50% a todo el equipo. Ataca x1.5 más lento de lo normal`},
    timer: defaultPlayerMoveTimer*1.5,
    hitEffect: function(target) { moveBuff(target,'speup1',"team"); },
    affectedBy: [ability.windRider.id]
}

move.fly = {
    moveset: [`flying` ,`dragon`],
    split: "physical",
    rarity: 3,
    type: "flying",
    power: 90
}

move.featherDance = {
    moveset: [`flying`],
    split: "special",
    rarity: 3,
    type: "flying",
    power: 0,
    info: function() {return `Reduce el Ataque del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'atkdown2') },
    affectedBy: [ability.dancer.id]
}

move.bounce = {
    moveset: [`flying`],
    split: "physical",
    rarity: 3,
    type: "flying",
    power: 75,
    info: function() {return `La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.hurricane = {
    moveset: [`flying`],
    split: "special",
    rarity: 3,
    type: "flying",
    power: 100,
    info: function() {return `10% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'confused') },
    affectedBy: [ability.windRider.id]
}

move.razorTalons = {  
    moveset: [`dragon`],
    split: "physical",
    rarity: 3,
    type: "flying",
    power: 40,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
    affectedBy: [ability.toughClaws.id]
}



//poison
move.acid = {
    moveset: [`poison`, `grass`],
    split: "special",
    rarity: 1,
    type: "poison",
    power: 40,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
}

move.poisonSting = {
    moveset: [`bug`],
    split: "physical",
    rarity: 1,
    type: "poison",
    power: 15,
    info: function() {return `30% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'poisoned') },
}

move.smog = {
    moveset: [`poison`],
    split: "special",
    rarity: 1,
    type: "poison",
    power: 30,
    info: function() {return `30% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'poisoned') },
}

move.poisonPowder = {
    moveset: [`grass`,],
    split: "special",
    rarity: 2,
    type: "poison",
    power: 0,
    info: function() {return `Inflige ${tagPoisoned}`},
    hitEffect: function(target) { moveBuff(target,'poisoned') },
}

move.toxic = {
    moveset: [`poison`, `all`],
    split: "special",
    rarity: 2,
    type: "poison",
    power: 0,
    info: function() {return `Inflige ${tagPoisoned}`},
    hitEffect: function(target) { moveBuff(target,'poisoned') },
}

move.poisonFang = {
    moveset: [`poison`, `dark`],
    split: "physical",
    rarity: 2,
    type: "poison",
    power: 60,
    info: function() {return `10% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'poisoned') },
    affectedBy: [ability.strongJaw.id]
}

move.sludge = {
    moveset: [`poison`],
    split: "special",
    rarity: 2,
    type: "poison",
    power: 65,
    info: function() {return `30% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'poisoned') },
}

move.crossPoison = {
    moveset: [`poison`, `fighting`, `dark`],
    split: "physical",
    rarity: 2,
    type: "poison",
    power: 70,
    info: function() {return `10% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'poisoned') },
}

move.poisonClaw = {  
    moveset: [`dragon`],
    split: "physical",
    rarity: 2,
    type: "poison",
    power: 75,
    info: function() {return `10% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'poisoned') },
    affectedBy: [ability.toughClaws.id]
}

move.poisonJab = {
    moveset: [`poison`, `fighting`, `dark`],
    split: "physical",
    rarity: 3,
    type: "poison",
    power: 80,
    info: function() {return `10% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'poisoned') },
    affectedBy: [ability.ironFist.id]
}

move.sludgeBomb = {
    moveset: [`poison`, `ground`, `grass`],
    split: "special",
    rarity: 3,
    type: "poison",
    power: 80,
    info: function() {return `30% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'poisoned') },
}

move.sludgeWave = {
    moveset: [`poison`],
    split: "special",
    rarity: 3,
    type: "poison",
    power: 95,
    info: function() {return `10% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'poisoned') },
}

move.coil = {
    moveset: [`poison`],
    split: "special",
    rarity: 3,
    type: "poison",
    power: 0,
    info: function() {return `Aumenta el Ataque y la Defensa un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkup1',"self"); moveBuff(target,'defup1',"self") },
    restricted: true,
}

move.acidArmor = {
    moveset: [`poison`],
    split: "special",
    rarity: 3,
    type: "poison",
    power: 0,
    info: function() {return `Aumenta la Defensa un 100%`},
    hitEffect: function(target) { moveBuff(target,'defup2',"self") },
}

move.acidSpray = {
    moveset: [`poison`],
    split: "special",
    rarity: 3,
    type: "poison",
    power: 50,
    info: function() {return `50% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'sdefdown1') },
}


move.noxiousTorque = {  //new
    moveset: [`poison`],
    split: "physical",
    rarity: 3,
    type: "poison",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}




//ice
move.iceShard = {
    moveset: [`ice`],
    split: "physical",
    rarity: 1,
    type: "ice",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`},
    affectedBy: [ability.sharpness.id]
}

move.powderSnow = {
    moveset: [`ice`],
    split: "special",
    rarity: 1,
    type: "ice",
    power: 40,
    info: function() {return `10% de probabilidad de infligir ${tagFreeze}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'freeze') },
}

move.icicleSpear = {  
    moveset: [`ice`],
    split: "physical",
    rarity: 2,
    type: "ice",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}



move.hail = { 
    moveset: [`ice`],
    split: "special",
    rarity: 2,
    type: "ice",
    power: 0,
    info: function() {return `Cambia el clima a ${tagHail}`} ,
    hitEffect: function(target) { changeWeather("hail") },
}

move.icyWind = {
    moveset: [`ice`],
    split: "special",
    rarity: 2,
    type: "ice",
    power: 55,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
    affectedBy: [ability.windRider.id]
}

move.avalanche = {
    moveset: [`ice`, `rock`],
    split: "physical",
    rarity: 2,
    type: "ice",
    power: 60,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.frostBreath = {
    moveset: [`ice`],
    split: "special",
    rarity: 2,
    type: "ice",
    power: 60,
    info: function() {return `30% de probabilidad de reducir el Ataque Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'satkdown1') },
}

move.auroraBeam = {
    moveset: [`ice`, `water`],
    split: "special",
    rarity: 2,
    type: "ice",
    power: 65,
    info: function() {return `50% de probabilidad de reducir el Ataque del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'atkdown1') },
    affectedBy: [ability.megaLauncher.id]
}

move.iceFang = { 
    moveset: [`ice`, `dark`],
    split: "physical",
    rarity: 2,
    type: "ice",
    power: 65,
    info: function() {return `10% de probabilidad de infligir ${tagFreeze}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'freeze') },
    affectedBy: [ability.strongJaw.id]
}

move.icePunch = { 
    moveset: [`ice`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "ice",
    power: 75,
    info: function() {return `10% de probabilidad de infligir ${tagFreeze}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'freeze') },
    affectedBy: [ability.ironFist.id]
}

move.iceBeam = {
    moveset: [`ice`, `water`, `psychic`],
    split: "special",
    rarity: 3,
    type: "ice",
    power: 90,
    info: function() {return `10% de probabilidad de infligir ${tagFreeze}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'freeze') },
}

move.blizzard = {
    moveset: [`ice`],
    split: "special",
    rarity: 3,
    type: "ice",
    power: 100,
    affectedBy: [ability.windRider.id]
}

move.icicleCrash = {
    moveset: [`ice`],
    split: "physical",
    rarity: 3,
    type: "ice",
    power: 85
}


move.safeguard = {
    moveset: [`ice`],
    split: "special",
    rarity: 3,
    type: "ice",
    power: 0,
    info: function() {return `Cambia el clima a ${tagSafeguard}`} ,
    hitEffect: function(target) { changeWeather("safeguard") },
    notUsableByEnemy: true,
}

move.freezyFrost = {  //new
    moveset: [`ice`],
    split: "special",
    rarity: 3,
    type: "ice",
    power: demeritBp,
    info: function() {return `Reduce el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}


//bug

move.twineedle = {
    moveset: [`bug`],
    split: "physical",
    rarity: 1,
    type: "bug",
    power: 25,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
}

move.furyCutter = { 
    moveset: [`bug`],
    split: "physical",
    rarity: 1,
    type: "bug",
    power: 20,
    info: function() {return `Multiplica la potencia base x1.2 cada vez que se usa, hasta 5 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.2,this.buildup) },
    hitEffect: function(target) { if (this.buildup<5) this.buildup++;   },
    affectedBy: [ability.sharpness.id]
}

move.infestation = {  
    moveset: [`bug`],
    split: "special",
    rarity: 2,
    type: "bug",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.pinMissile = {  
    moveset: [`bug`],
    split: "physical",
    rarity: 2,
    type: "bug",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.stickyWeb = {
    moveset: [`bug`],
    split: "special",
    rarity: 2,
    type: "bug",
    power: 0,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.pounce = {
    moveset: [`bug`],
    split: "physical",
    rarity: 2,
    type: "bug",
    power: 50,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.struggleBug = {
    moveset: [`bug`],
    split: "special",
    rarity: 2,
    type: "bug",
    power: 50,
    info: function() {return `Reduce el Ataque Especial del enemigo un 50%. La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    hitEffect: function(target) { moveBuff(target,'satkdown1') },
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.bugBite = {
    moveset: [`bug`, `dark`],
    split: "physical",
    rarity: 2,
    type: "bug",
    power: 60,
    affectedBy: [ability.strongJaw.id]
}

move.bugBuzz = {
    moveset: [`bug`],
    split: "special",
    rarity: 3,
    type: "bug",
    power: 90,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
    affectedBy: [ability.cacophony.id]
}

move.signalBeam = {
    moveset: [`bug`, `electric`],
    split: "special",
    rarity: 3,
    type: "bug",
    power: 70,
    info: function() {return `30% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'confused') },
}

move.silverWind = {
    moveset: [`bug`, `flying`],
    split: "special",
    rarity: 3,
    type: "bug",
    power: 55,
    info: function() {return `50% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'sdefdown1') },
    affectedBy: [ability.windRider.id]
}

move.xScissor = {
    moveset: [`bug`],
    split: "physical",
    rarity: 3,
    type: "bug",
    power: 80,
    affectedBy: [ability.sharpness.id]
}

move.firstImpression = {  
    moveset: [`bug`],
    split: "physical",
    rarity: 3,
    type: "bug",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.stringShot = {
    moveset: [`bug`],
    split: "special",
    rarity: 3,
    type: "bug",
    power: 0,
    info: function() {return `Reduce la Velocidad del enemigo un 75%`},
    hitEffect: function(target) { moveBuff(target,'spedown2') },
}

move.uTurn = {
    moveset: [`bug`],
    split: "physical",
    rarity: 3,
    type: "bug",
    power: 70,
    info: function() {return `Cambia al siguiente miembro del equipo`},
    hitEffect: function(target) { if (target=="wild" && saved.currentArea != "training") switchMemberNext() },
}

move.weirdRoom = {
    moveset: [`bug`],
    split: "special",
    rarity: 3,
    type: "bug",
    power: 0,
    info: function() {return `Cambia el clima a ${tagWeirdRoom}`} ,
    hitEffect: function(target) { changeWeather("weirdRoom") },
}

move.savageStinger = {  //new
    moveset: [`bug`],
    split: "physical",
    rarity: 3,
    type: "bug",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.quiverDance = {
    moveset: [`bug`],
    split: "special",
    rarity: 3,
    type: "bug",
    power: 0,
    timer: defaultPlayerMoveTimer*1.4,
    info: function() {return `Aumenta el Ataque Especial y la Velocidad un 50%. Ataca x1.4 más lento de lo normal`},
    hitEffect: function(target) { moveBuff(target,'speup1',"self"); moveBuff(target,'satkup1',"self") },
    affectedBy: [ability.dancer.id],
    restricted: true,
}


//water
move.waterGun = {
    moveset: [`water`],
    split: "special",
    rarity: 1,
    type: "water",
    power: 40
}

move.aquaJet = {
    moveset: [`water`],
    split: "physical",
    rarity: 1,
    type: "water",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.whirlpool = {  
    moveset: [`water`],
    split: "special",
    rarity: 2,
    type: "water",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.waterPulse = {
    moveset: [`water`, `psychic`],
    split: "special",
    rarity: 2,
    type: "water",
    power: 60,
    info: function() {return `30% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'confused') },
    affectedBy: [ability.megaLauncher.id]
}

move.chillingWater = {
    moveset: [`water`, `ice`],
    split: "special",
    rarity: 2,
    type: "water",
    power: 50,
    info: function() {return `Reduce el Ataque del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1') },
}


move.bubbleBeam = {
    moveset: [`water`],
    split: "special",
    rarity: 2,
    type: "water",
    power: 65,
    info: function() {return `30% de probabilidad de reducir la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'spedown1') },
}

move.foamShot = { 
    moveset: [`ice`],
    split: "physical",
    rarity: 2,
    type: "water",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.rainDance = { 
    moveset: [`water`],
    split: "special",
    rarity: 3,
    type: "water",
    power: 0,
    info: function() {return `Cambia el clima a ${tagRainy}`} ,
    hitEffect: function(target) { changeWeather("rainy") },
    affectedBy: [ability.dancer.id]
}

move.waterfall = {
    moveset: [`water`],
    split: "physical",
    rarity: 3,
    type: "water",
    power: 80
}

move.scald = {
    moveset: [`water`],
    split: "special",
    rarity: 3,
    type: "water",
    power: 75,
    info: function() {return `30% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'burn') },
}

move.liquidation = {
    moveset: [`water`],
    split: "physical",
    rarity: 3,
    type: "water",
    power: 80,
    info: function() {return `30% de probabilidad de aumentar la Defensa un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'defup1',"self") },
}

move.aquaTail = {
    moveset: [`water`],
    split: "physical",
    rarity: 3,
    type: "water",
    power: 90
}

move.surf = {
    moveset: [`water`],
    split: "special",
    rarity: 3,
    type: "water",
    power: 90
}

move.muddyWater = {  
    moveset: [`ground`],
    split: "special",
    rarity: 3,
    type: "water",
    power: 100,
    info: function() {return `30% de probabilidad de reducir la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'spedown1') },
}

move.hydroPump = {
    moveset: [`water`],
    split: "special",
    rarity: 3,
    type: "water",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}


move.waveCrash = {  //new
    moveset: [`water`],
    split: "physical",
    rarity: 3,
    type: "water",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}



//grass
move.leafage = {
    moveset: [`grass`],
    split: "physical",
    rarity: 1,
    type: "grass",
    power: 40
}

move.vineWhip = {
    moveset: [`grass`],
    split: "physical",
    rarity: 1,
    type: "grass",
    power: 45
}

move.magicalLeaf = {
    moveset: [`grass`, `psychic`, `fairy`],
    split: "special",
    rarity: 2,
    type: "grass",
    power: 50,
    info: function() {return `50% de probabilidad de reducir el Ataque Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'satkdown1') },
}

move.bulletSeed = {  
    moveset: [`grass`],
    split: "physical",
    rarity: 2,
    type: "grass",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.razorLeaf = {
    moveset: [`grass`],
    split: "physical",
    rarity: 2,
    type: "grass",
    power: 65,
    affectedBy: [ability.sharpness.id],
    info: function() {return `30% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'defdown1') },
}

move.stunSpore = {
    moveset: [`grass`],
    split: "special",
    rarity: 2,
    type: "grass",
    power: 0,
    info: function() {return `Inflige ${tagParalysis}`},
    hitEffect: function(target) { moveBuff(target,'paralysis') },
}


move.ragePowder = {
    moveset: [`grass`],
    split: "special",
    rarity: 2,
    type: "grass",
    power: 0,
    info: function() {return `Inflige ${tagConfused}, pero aumenta el Ataque Especial del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'confused'); moveBuff(target,'satkup2') },
}

move.leafBlade = {
    moveset: [`grass`],
    split: "physical",
    rarity: 3,
    type: "grass",
    power: 80,
    affectedBy: [ability.sharpness.id]
}

move.energyBall = {
    moveset: [`grass`],
    split: "special",
    rarity: 3,
    type: "grass",
    power: 90,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
    affectedBy: [ability.megaLauncher.id]
}

move.solarBeam = {
    moveset: [`grass`],
    split: "special",
    rarity: 3,
    type: "grass",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.solarBlade = { 
    moveset: [`grass`],
    split: "physical",
    rarity: 3,
    type: "grass",
    power: 125,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`},
}

move.seedBomb = {
    moveset: [`grass`],
    split: "physical",
    rarity: 3,
    type: "grass",
    power: 90,
    info: function() {return `10% de probabilidad de reducir el Ataque del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'atkdown1') },
}

move.cottonSpore = {
    moveset: [`grass`],
    split: "special",
    rarity: 3,
    type: "grass",
    power: 0,
    info: function() {return `Reduce la Velocidad del enemigo un 75%`},
    hitEffect: function(target) { moveBuff(target,'spedown2') },
}

move.spore = {
    moveset: [`grass`],
    split: "special",
    rarity: 3,
    type: "grass",
    power: 0,
    info: function() {return `50% de probabilidad de infligir ${tagSleep}`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'sleep') },
}

move.grassyTerrain = { 
    moveset: [`grass`,`bug`],
    split: "special",
    rarity: 3,
    type: "grass",
    power: 0,
    info: function() {return `Cambia el clima a ${tagGrassyTerrain}`} ,
    hitEffect: function(target) { changeWeather("grassyTerrain") },
}

move.leafStorm = {  
    moveset: [`grass`],
    split: "special",
    rarity: 3,
    type: "grass",
    power: demeritBp,
    info: function() {return `Reduce el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
    affectedBy: [ability.windRider.id]
}



//fighting
move.rockSmash = {
    moveset: [`fighting`,`steel`,`rock`],
    split: "physical",
    rarity: 1,
    type: "fighting",
    power: 40,
    affectedBy: [ability.metalhead.id]
}

move.vacuumWave = {
    moveset: [`fighting`],
    split: "special",
    rarity: 1,
    type: "fighting",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.machPunk = {
    rename: `machPunch`,
    moveset: [`fighting`],
    split: "physical",
    rarity: 1,
    type: "fighting",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`},
    affectedBy: [ability.ironFist.id]
}

move.armThrust = {  
    moveset: [`fighting`],
    split: "physical",
    rarity: 2,
    type: "fighting",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.powerupPunch = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 2,
    type: "fighting",
    power: 50,
    info: function() {return `50% de probabilidad de aumentar el Ataque un 50%`},
    hitEffect: function(target) { if (rng(0.50))  moveBuff(target,'atkup1','self') },
    affectedBy: [ability.ironFist.id]
}


move.stormThrow = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 2,
    type: "fighting",
    power: 60,
    info: function() {return `La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.lowSweep = {
    moveset: [`fighting`, `normal`],
    split: "physical",
    rarity: 2,
    type: "fighting",
    power: 60,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.forcePalm = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 2,
    type: "fighting",
    power: 75,
    affectedBy: [ability.ironFist.id]
}

move.brickBreak = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 3,
    type: "fighting",
    power: 70,
    info: function() {return `30% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'defdown1') },
}

move.skyUppercut = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 3,
    type: "fighting",
    power: 85,
    info: function() {return `La potencia se dobla si el objetivo es de tipo Volador`},
    powerMod : function() { if (pkmn[saved.currentPkmn].type.includes("flying")) { return 2} else return 1 },
}

move.hammerArm = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 3,
    type: "fighting",
    power: demeritBp,
    info: function() {return `Reduce la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.auraSphere = {
    moveset: [`fighting`,`ghost`,`psychic`],
    split: "special",
    rarity: 3,
    type: "fighting",
    power: 80,
    affectedBy: [ability.megaLauncher.id]
}

move.bulkUp = {
    moveset: [`fighting`],
    split: "special",
    rarity: 3,
    type: "fighting",
    power: 0,
    info: function() {return `Aumenta el Ataque y la Defensa un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkup1',"self"); moveBuff(target,'defup1',"self") },
    restricted: true,
}

move.crossChop = {
    moveset: [`fighting`],
    split: "physical",
    rarity: 3,
    type: "fighting",
    power: 90
}

move.closeCombat = {  
    moveset: [`fighting`],
    split: "physical",
    rarity: 3,
    type: "fighting",
    power: 120,
    info: function() {return `Reduce la Defensa y la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1','self'); moveBuff(target,'sdefdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.superpower = {  
    moveset: [`fighting`],
    split: "physical",
    rarity: 3,
    type: "fighting",
    power: 150,
    info: function() {return `Reduce la Defensa y el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1','self'); moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.focusBlast = {
    moveset: [`fighting`],
    split: "special",
    rarity: 3,
    type: "fighting",
    power: 100*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`},
    affectedBy: [ability.megaLauncher.id]
}


move.crossRoom = {
    moveset: [`fighting`],
    split: "special",
    rarity: 3,
    type: "fighting",
    power: 0,
    info: function() {return `Cambia el clima a ${tagCrossRoom}`} ,
    hitEffect: function(target) { changeWeather("crossRoom") },
}



//psychic
move.confusion = {
    moveset: [`psychic`,`ghost`],
    split: "special",
    rarity: 1,
    type: "psychic",
    power: 35,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.psybeam = {
    moveset: [`psychic`],
    split: "special",
    rarity: 2,
    type: "psychic",
    power: 60,
    info: function() {return `30% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'confused') },
}

move.futureSight = {
    moveset: [`psychic`],
    split: "special",
    rarity: 2,
    type: "psychic",
    power: 120,
    timer: defaultPlayerMoveTimer*2,
    info: function() {return `Ataca x2 más lento de lo normal`} ,
}

move.psychoCut = {
    moveset: [`psychic`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "psychic",
    power: 75,
    affectedBy: [ability.sharpness.id]
}

move.psychicFangs = {  
    moveset: [`dark`],
    split: "physical",
    rarity: 2,
    type: "psychic",
    power: 75,
    affectedBy: [ability.strongJaw.id]
}

move.zenHeadbut = {  
    rename: `zenHeadbutt`,
    moveset: [`fighting`, `psychic`],
    split: "physical",
    rarity: 3,
    type: "psychic",
    power: 90,
    affectedBy: [ability.metalhead.id]
}

move.twinBeam = {  
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 40,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
}

move.psychic = {
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 90,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
}

move.extrasensory = {  
    moveset: [`ghost`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 100
}

move.amnesia = {
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 0,
    info: function() {return `Aumenta la Defensa Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'sdefup2',"self")},
}

move.barrier = {
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 0,
    info: function() {return `Aumenta la Defensa un 100%`},
    hitEffect: function(target) { moveBuff(target,'defup2',"self")},
}

move.agility = {   
    moveset: [`flying`, `bug`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 0,
    info: function() {return `Aumenta la Velocidad un 75%`},
    hitEffect: function(target) { moveBuff(target,'speup2',"self")},
    affectedBy: [ability.dancer.id],
    restricted: true,
}

move.calmMind = {
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 0,
    info: function() {return `Aumenta la Defensa Especial y el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'sdefup1',"self"); moveBuff(target,'satkup1',"self") },
    restricted: true,
}



move.psychoBoost = {  //new
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: demeritBp,
    info: function() {return `Reduce el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}


/*
move.reflect = {
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "psychic",
    power: 0,
    info: function() {return `Cambia el clima a ${tagReflect}`} ,
    hitEffect: function(target) { changeWeather("reflect") },
}*/



//rock
move.rockThrow = {
    moveset: [`rock`],
    split: "physical",
    rarity: 1,
    type: "rock",
    power: 50
}

move.accelerock = {
    moveset: [`rock`],
    split: "physical",
    rarity: 1,
    type: "rock",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.rockBlast = {  
    moveset: [`rock`],
    split: "physical",
    rarity: 2,
    type: "rock",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
    affectedBy: [ability.megaLauncher.id]
}

move.rollout = { 
    moveset: [`rock`],
    split: "physical",
    rarity: 2,
    type: "rock",
    power: 55,
    info: function() {return `Multiplica la potencia base x1.2 cada vez que se usa, hasta 5 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.2,this.buildup) },
    hitEffect: function(target) { if (this.buildup<5) this.buildup++;   },
}

move.ancientPower = {
    moveset: [`rock`, "psychic"],
    split: "special",
    rarity: 2,
    type: "rock",
    power: 60,
    info: function() {return `10% de probabilidad de aumentar todas las características un 50%`},
    hitEffect: function(target) { if (rng(0.10)) {moveBuff(target,'satkup1',"self");moveBuff(target,'atkup1',"self");moveBuff(target,'defup1',"self");moveBuff(target,'sdefup1',"self");moveBuff(target,'speup1',"self");} },
}

move.smackDown = {
    moveset: [`rock`],
    split: "physical",
    rarity: 2,
    type: "rock",
    power: 50,
    info: function() {return `La potencia se dobla si el objetivo es de tipo Volador`},
    powerMod : function() { if (pkmn[saved.currentPkmn].type.includes("flying")) { return 2} else return 1 },
}

move.gemstoneCrush = { 
    moveset: [`fairy`],
    split: "special",
    rarity: 2,
    type: "rock",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.rockTomb = {
    moveset: [`rock`],
    split: "physical",
    rarity: 3,
    type: "rock",
    power: 60,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}



move.rockSlide = {
    moveset: [`rock`],
    split: "physical",
    rarity: 3,
    type: "rock",
    power: 75,
    info: function() {return `La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.powerGem = {
    moveset: [`rock`, `fairy`],
    split: "special",
    rarity: 3,
    type: "rock",
    power: 85
}

move.stoneEdge = {
    moveset: [`rock`],
    split: "physical",
    rarity: 3,
    type: "rock",
    power: 100
}

move.meteorBeam = {  
    moveset: [`psychic`],
    split: "special",
    rarity: 3,
    type: "rock",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.rockPolish = {
    moveset: [`rock`],
    split: "special",
    rarity: 3,
    type: "rock",
    power: 0,
    info: function() {return `Aumenta la Velocidad un 75%`},
    hitEffect: function(target) { moveBuff(target,'speup2',"self")},
    restricted: true,
}

move.wrathOfTheLand = {  //new
    moveset: [`rock`],
    split: "special",
    rarity: 3,
    type: "rock",
    power: demeritBp,
    info: function() {return `Reduce el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}


//ghost
move.lick = {
    moveset: [`ghost`, `normal`],
    split: "physical",
    rarity: 1,
    type: "ghost",
    power: 30,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
}

move.shadowSneak = {
    moveset: [`ghost`],
    split: "physical",
    rarity: 1,
    type: "ghost",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.confuseRay = {
    moveset: [`ghost`, `psychic`, `all`],
    split: "special",
    rarity: 2,
    type: "ghost",
    power: 0,
    info: function() {return `Inflige ${tagConfused}`},
    hitEffect: function(target) { moveBuff(target,'confused') },
}




move.willOWisp = {  
    moveset: [`fire`, `ghost`],
    split: "special",
    rarity: 2,
    type: "ghost",
    power: 0,
    info: function() {return `Inflige ${tagBurn}`},
    hitEffect: function(target) { moveBuff(target,'burn') },
}

move.fog = { 
    moveset: [`dark`,`ghost`],
    split: "special",
    rarity: 2,
    type: "ghost",
    power: 0,
    info: function() {return `Cambia el clima a ${tagFoggy}`} ,
    hitEffect: function(target) { changeWeather("foggy") },
}

move.ominousWind = {
    moveset: [`ghost`, "flying"],
    split: "special",
    rarity: 2,
    type: "ghost",
    power: 60,
    info: function() {return `10% de probabilidad de aumentar todas las características un 50%`},
    hitEffect: function(target) { if (rng(0.10)) {moveBuff(target,'satkup1',"self");moveBuff(target,'atkup1',"self");moveBuff(target,'defup1',"self");moveBuff(target,'sdefup1',"self");moveBuff(target,'speup1',"self");} },
    affectedBy: [ability.windRider.id]
}

move.hex = {  
    moveset: [`ghost`],
    split: "special",
    rarity: 2,
    type: "ghost",
    power: 65,
    info: function() {return `La potencia se dobla si el objetivo sufre un estado alterado`},
    powerMod : function() { if (wildBuffs.paralysis>0 || wildBuffs.burn>0 || wildBuffs.freeze>0  || wildBuffs.confused>0  || wildBuffs.poisoned>0  ) { return 2} else return 1 },
}

move.shadowClaw = {  
    moveset: [`ghost`],
    split: "physical",
    rarity: 2,
    type: "ghost",
    power: 60,
    affectedBy: [ability.toughClaws.id]
}

move.shadowPunch = {
    moveset: [`ghost`],
    split: "physical",
    rarity: 2,
    type: "ghost",
    power: 75,
    affectedBy: [ability.ironFist.id]
}

move.shadowBall = {
    moveset: [`ghost`, `psychic`],
    split: "special",
    rarity: 3,
    type: "ghost",
    power: 80,
    info: function() {return `10% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'sdefdown1') },
    affectedBy: [ability.megaLauncher.id]
}

move.phantomForce = {  
    moveset: [`ghost`],
    split: "physical",
    rarity: 3,
    type: "ghost",
    power: 120,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

//dragon
move.twister = {
    moveset: [`dragon`, `flying`],
    split: "special",
    rarity: 1,
    type: "dragon",
    power: 40
}

move.dragonTail = {
    moveset: [`dragon`],
    split: "physical",
    rarity: 2,
    type: "dragon",
    power: 60,
    info: function() {return `30% de probabilidad de aumentar el Ataque un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'atkup1',"self") },
}

move.dualChop = {  
    moveset: [`dragon`],
    split: "physical",
    rarity: 2,
    type: "dragon",
    power: 40,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
}

move.dragonBreath = {
    moveset: [`dragon`],
    split: "special",
    rarity: 2,
    type: "dragon",
    power: 65,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
}

move.dragonClaw = {
    moveset: [`dragon`],
    split: "physical",
    rarity: 2,
    type: "dragon",
    power: 65,
    affectedBy: [ability.toughClaws.id]
}

move.scaleShot = { 
    moveset: [`water`],
    split: "physical",
    rarity: 2,
    type: "dragon",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.dragonPulse = {
    moveset: [`dragon`],
    split: "special",
    rarity: 3,
    type: "dragon",
    power: 85,
    affectedBy: [ability.megaLauncher.id]
}


move.dragonRush = {
    moveset: [`dragon`],
    split: "physical",
    rarity: 3,
    type: "dragon",
    power: 90,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal. La potencia aumenta x1.2-1.5 si la Defensa o la Defensa Especial están subidas`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.defup2 > 0 || team[exploreActiveMember].buffs?.sdefup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.defup1 > 0 || team[exploreActiveMember].buffs?.sdefup1 > 0) {return 1.2} else return 1 },
}

move.outrage = {  
    moveset: [`dragon`],
    split: "physical",
    rarity: 3,
    type: "dragon",
    power: demeritBp,
    info: function() {return `Inflige ${tagConfused} al usuario`},
    hitEffect: function(target) { moveBuff(target,'confused',"self") },
    unaffectedBy: [ability.sheerForce.id],
}

move.dracoMeteor = {  
    moveset: [`dragon`],
    split: "special",
    rarity: 3,
    type: "dragon",
    power: demeritBp,
    info: function() {return `Reduce el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.dragonDance = {
    moveset: [`dragon`],
    split: "special",
    rarity: 3,
    type: "dragon",
    power: 0,
    timer: defaultPlayerMoveTimer*1.4,
    info: function() {return `Aumenta el Ataque y la Velocidad un 50%. Ataca x1.4 más lento de lo normal`},
    hitEffect: function(target) { moveBuff(target,'atkup1',"self"); moveBuff(target,'speup1',"self") },
    affectedBy: [ability.dancer.id],
    restricted: true,
}


//dark
move.pursuit = {
    moveset: [`dark`],
    split: "physical",
    rarity: 1,
    type: "dark",
    power: 40
}

move.snarl = {
    moveset: [`dark`],
    split: "special",
    rarity: 2,
    type: "dark",
    power: 55,
    info: function() {return `Reduce el Ataque Especial del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkdown1') },
    affectedBy: [ability.cacophony.id]
}

move.bite = {
    moveset: [`dark`, `bug`],
    split: "physical",
    rarity: 2,
    type: "dark",
    power: 60,
    affectedBy: [ability.strongJaw.id]
}

move.feintAttack = {
    moveset: [`dark`, `normal`],
    split: "physical",
    rarity: 2,
    type: "dark",
    power: 40,
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`},
}

move.knockOff = {
    moveset: [`dark`, `fighting`],
    split: "physical",
    rarity: 2,
    type: "dark",
    power: 65,
    info: function() {return `30% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'defdown1') },
}


move.crunch = {
    moveset: [`dark`],
    split: "physical",
    rarity: 2,
    type: "dark",
    power: 70,
    info: function() {return `10% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'defdown1') },
    affectedBy: [ability.strongJaw.id]
}

move.darkPulse = {
    moveset: [`dark`, `psychic`],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 80,
    affectedBy: [ability.megaLauncher.id]
}


move.honeClaws = {
    moveset: [`dark`, `steel`],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 0,
    timer: defaultPlayerMoveTimer*1.4,
    info: function() {return `Aumenta el Ataque y la Velocidad un 50%. Ataca x1.4 más lento de lo normal`},
    hitEffect: function(target) { moveBuff(target,'atkup1',"self"); moveBuff(target,'speup1',"self") },
    restricted: true,
}


move.nightDaze = {  
    moveset: [`dark`],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 85,
    info: function() {return `10% de probabilidad de reducir la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'spedown1') }
}

move.nightSlash = {
    moveset: [`dark`],
    split: "physical",
    rarity: 3,
    type: "dark",
    power: 85,
    affectedBy: [ability.sharpness.id]
}

move.fakeTears = {
    moveset: [`dark`, `fairy`],
    split: "physical",
    rarity: 3,
    type: "dark",
    power: 0,
    info: function() {return `Reduce la Defensa Especial del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'sdefdown2') },
    restricted: true,
}

move.nastyPlot = {
    moveset: [`dark`,"all"],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 0,
    info: function() {return `Aumenta el Ataque Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'satkup2',"self");},
    restricted: true,
}

move.memento = {
    moveset: [`dark`],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 0,
    info: function() {return `Debilita al usuario y reduce el Ataque y el Ataque Especial del enemigo un 100%`},
    hitEffect: function(target) { if (target=="wild") {
        moveBuff(target,'satkdown2');
        moveBuff(target,'atkdown2');
        pkmn[ team[exploreActiveMember].pkmn.id ].playerHp = 0;
        updateTeamPkmn()
    } },
    unaffectedBy: [ability.sheerForce.id],
}

move.trickRoom = {
    moveset: [`dark`],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 0,
    info: function() {return `Cambia el clima a ${tagTrickRoom}`} ,
    hitEffect: function(target) { changeWeather("trickRoom") },
}

move.embargo = { //new
    moveset: [`dark`],
    split: "special",
    rarity: 3,
    type: "dark",
    power: 0,
    info: function() {return `Impide al enemigo usar el movimiento de la ranura en la que se usó Embargo. Se considera un estado alterado`},
    hitEffect: function(target) { moveBuff(target,'embargo') },
    notUsableByEnemy: true,
}


move.brutalSwing = {  //new
    moveset: [`dark`],
    split: "physical",
    rarity: 3,
    type: "dark",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}



//fairy

move.disarmingVoice = {
    moveset: [`fairy`, `normal`],
    split: "special",
    rarity: 1,
    type: "fairy",
    power: 40,
    affectedBy: [ability.cacophony.id],
    timer: defaultPlayerMoveTimer/1.2,
    info: function() {return `Ataca x1.2 más rápido de lo normal`} ,
}

move.drainingKiss = {  
    moveset: [`fairy`],
    split: "physical",
    rarity: 2,
    type: "fairy",
    power: 50,
    info: function() {return `50% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'defdown1') }
}

move.fairyWind = {
    moveset: [`fairy`],
    split: "special",
    rarity: 2,
    type: "fairy",
    power: 60,
    info: function() {return `30% de probabilidad de reducir la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'spedown1') },
    affectedBy: [ability.windRider.id]
}

move.echoedVoice = { 
    moveset: [`fairy`, `normal`],
    split: "special",
    rarity: 2,
    type: "fairy",
    power: 50,
    info: function() {return `Multiplica la potencia base x1.2 cada vez que se usa, hasta 5 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.2,this.buildup) },
    hitEffect: function(target) { if (this.buildup<5) this.buildup++;   },
    affectedBy: [ability.cacophony.id]
}

move.alluringVoice = {
    moveset: [`fairy`],
    split: "special",
    rarity: 2,
    type: "fairy",
    power: 65,
    affectedBy: [ability.cacophony.id]
}

move.mirrorShrapnel = {  
    moveset: [`steel`],
    split: "physical",
    rarity: 2,
    type: "fairy",
    power: 20,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.spiritBreak = {  
    moveset: [`fairy`],
    split: "physical",
    rarity: 3,
    type: "fairy",
    power: 75,
    info: function() {return `50% de probabilidad de reducir el Ataque del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'atkdown1') },
}



move.dazzlingGleam = {
    moveset: [`fairy`],
    split: "special",
    rarity: 3,
    type: "fairy",
    power: 85
}

move.playRough = {
    moveset: [`fairy`, `dark`],
    split: "physical",
    rarity: 3,
    type: "fairy",
    power: 90
}

move.auroraPunch = {  
    moveset: [`ice`],
    split: "physical",
    rarity: 3,
    type: "fairy",
    power: 80,
    affectedBy: [ability.ironFist.id]
}

move.moonblast = {
    moveset: [`fairy`],
    split: "special",
    rarity: 3,
    type: "fairy",
    power: 95,
    info: function() {return `10% de probabilidad de reducir el Ataque Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'satkdown1') },
    affectedBy: [ability.megaLauncher.id]
}


move.babydollEyes = {
    moveset: [`fairy`, `normal`],
    split: "special",
    rarity: 1,
    type: "fairy",
    power: 0,
    info: function() {return `Reduce el Ataque del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1') },
}

move.charm = {
    moveset: [`fairy`],
    split: "special",
    rarity: 2,
    type: "fairy",
    power: 0,
    info: function() {return `Reduce el Ataque del enemigo un 100%`},
    hitEffect: function(target) { moveBuff(target,'atkdown2') },
}

move.sweetKiss = {
    moveset: [`fairy`],
    split: "special",
    rarity: 1,
    type: "fairy",
    power: 0,
    info: function() {return `Inflige ${tagConfused}`},
    hitEffect: function(target) { moveBuff(target,'confused') },
}

move.mistyTerrain = { 
    moveset: [`fairy`,`psychic`],
    split: "special",
    rarity: 3,
    type: "fairy",
    power: 0,
    info: function() {return `Cambia el clima a ${tagMistyTerrain}`} ,
    hitEffect: function(target) { changeWeather("mistyTerrain") },
}


move.lightScreen = {
    moveset: [`fairy`],
    split: "special",
    rarity: 3,
    type: "fairy",
    power: 0,
    info: function() {return `Cambia el clima a ${tagLightScreen}`} ,
    hitEffect: function(target) { changeWeather("lightScreen") },
    notUsableByEnemy: true,
}

move.magicalTorque = {  //new
    moveset: [`fairy`],
    split: "physical",
    rarity: 3,
    type: "fairy",
    power: demeritBp,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

//unique skills

//tier 4 - learnt by normal pokemon = 120 uncompromised dmg
//tier 5 - learnt by legendary pokemon = 140 uncompromised dmg


move.acupressure = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Sube un 100% dos características al azar`},
    hitEffect: function(target) { 
        const picked = arrayPick(["atkup2","satkup2","defup2","sdefup2","speup2",],2)
        moveBuff(target,picked[0],"self");
        moveBuff(target,picked[1],"self");
    },
}

move.batonPass = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `El usuario transfiere todos sus cambios de características y estados a todo el equipo y se debilita. Este movimiento solo puede estar una vez por equipo`},
    hitEffect: function(target) { 
    for (const member in team){
        for (const i in team[exploreActiveMember].buffs){
            if (team[exploreActiveMember].buffs[i]>0) {
                moveBuff("wild",i,"team")
            }
        } 
    }
    for (const i in team[exploreActiveMember].buffs){
        if (team[exploreActiveMember].buffs[i]>0) team[exploreActiveMember].buffs[i] = 0;
    }
    updateTeamBuffs();

            pkmn[ team[exploreActiveMember].pkmn.id ].playerHp = 0;
        updateTeamPkmn()

},
}

move.bellyDrum = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Aumenta el Ataque un 150% pero reduce la Defensa y la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1',"self"); moveBuff(target,'sdefdown1',"self"); moveBuff(target,'atkup1',"self"); moveBuff(target,'atkup2',"self") },
    affectedBy: [ability.dancer.id],
    restricted: true,
}

move.boomburst = {
    split: "special",
    type: "normal",
    power: t4Base+15,
    affectedBy: [ability.cacophony.id]
}

move.eggBomb = {
    split: "special",
    type: "normal",
    power: t4Base+30,
}

move.cometPunch = {
    split: "physical",
    type: "flying",
    power: t4Base/3,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
    affectedBy: [ability.ironFist.id]
}

move.payDay = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Al usarse, aumenta un 1% la probabilidad de objetos raros durante el combate actual. Varios usos no se acumulan. Funciona siempre para todos, sea quien sea el usuario`},
    hitEffect: function(target) { 
        saved.hasPayDayBeenUsed = true
    },
}

move.teatime = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Al usarse, aumenta un 1% la probabilidad de Pokémon raros durante el combate actual. Varios usos no se acumulan. Funciona siempre para todos, sea quien sea el usuario`},
    hitEffect: function(target) { 
        saved.hasTeatimeBeenUsed = true
    },
}

move.metronome = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `El usuario ejecuta un movimiento cualquiera al azar`},
}

move.mimic = {
    split: "special",
    type: "psychic",
    power: 0,
    info: function() {return `Ejecuta el primer movimiento del rival, con el doble de daño`},
}

move.meFirst = {
    split: "special",
    type: "normal",
    power: 0,
    timer: defaultPlayerMoveTimer/3,
    info: function() {return `Ejecuta el primer movimiento del rival. Ataca x3 más rápido de lo normal`} ,
}

move.burnUp = {
    split: "special",
    type: "fire",
    power: t4Base-60,
    info: function() {return `Inflige ${tagBurn}`},
    hitEffect: function(target) { moveBuff(target,'burn') },
}

move.magmaStorm = {
    split: "special",
    type: "fire",
    power: t4Base-60,
    info: function() {return `Cambia el clima a ${tagSunny}`},
    hitEffect: function(target) { changeWeather("sunny"); },
    affectedBy: [ability.windRider.id]
}

move.inferno = {
    split: "special",
    type: "fire",
    power: t4Base+60,
    info: function() {return `Reduce la Defensa y la Defensa Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'defdown2',"self"); moveBuff(target,'sdefdown2',"self"); },
    unaffectedBy: [ability.sheerForce.id],
}

move.aquaStep = {
    split: "physical",
    type: "water",
    power: t4Base-60,
    info: function() {return `Aumenta la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'speup1','self') },
    affectedBy: [ability.dancer.id]
}

move.hydroCannon = {
    split: "special",
    type: "water",
    power: t4Base*1.5,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`},
    affectedBy: [ability.megaLauncher.id]
}

move.gigatonHammer = {
    split: "physical",
    type: "steel",
    power: t4Base*1.5,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`}
}

move.razorShell = {
    split: "physical",
    type: "water",
    power: t4Base-20,
    info: function() {return `50% de probabilidad de reducir la Defensa del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'defdown1') },
    affectedBy: [ability.sharpness.id]
}

move.tripleDive = {  
    split: "physical",
    type: "water",
    power: (t4Base+30)/3,
    info: function() {return `Golpea 3 veces`},
    multihit: [3,3],
}

move.electroBall = {
    split: "special",
    type: "electric",
    power: t4Base/2,
    timer: defaultPlayerMoveTimer/2,
    info: function() {return `Ataca x2 más rápido de lo normal`} ,
}

move.charge = {
    split: "special",
    type: "electric",
    power: 0,
    info: function() {return `Aumenta el Ataque Especial un 100%, la Defensa un 50% y la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkup2',"self"); moveBuff(target,'sdefup1',"self"), moveBuff(target,'defup1',"self") },
    restricted:true
}

move.ionise = {
    split: "special",
    type: "electric",
    power: 0,
    info: function() {return `Aumenta el Ataque Especial un 100% y la Defensa Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'satkup2',"self"); moveBuff(target,'sdefup2',"self") },
    restricted:true
}

move.appleAcid = {
    split: "special",
    type: "grass",
    power: t4Base-50,
    info: function() {return `Reduce la Defensa del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1') },
}

move.chloroblast = {
    split: "special",
    type: "grass",
    power: t4Base+20,
    affectedBy: [ability.megaLauncher.id]
}

move.frenzyPlant = {
    split: "special",
    type: "grass",
    power: t4Base*1.5,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`} ,
}

move.trailblaze = {
    split: "physical",
    type: "grass",
    power: t4Base-30,
    info: function() {return `Aumenta la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'speup1','self') },
}

move.auraWheel = { 
    split: "physical",
    type: "electric",
    power: t4Base-40,
    info: function() {return `Aumenta la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'speup1','self') },
}

move.freezeDry = {
    split: "special",
    type: "ice",
    power: t4Base,
    info: function() {return `Supereficaz contra los tipo Agua`} ,
}

move.snowscape = { 
    split: "special",
    type: "ice",
    power: 0,
    info: function() {return `Cambia el clima a ${tagHail} y aumenta el Ataque Especial un 50%`} ,
    hitEffect: function(target) { changeWeather("hail"); moveBuff(target,'satkup1',"self") },
}

move.venoshock = {  
    split: "special",
    type: "poison",
    power: (t4Base+20)/2,
    info: function() {return `La potencia se dobla si el objetivo sufre ${tagPoisoned}`},
    powerMod : function() { if (wildBuffs.poisoned>0 ) { return 2} else return 1 },
}

move.toxicThread = {
    split: "special",
    type: "poison",
    power: 0,
    info: function() {return `Inflige ${tagPoisoned} y reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'poisoned'); moveBuff(target,'spedown1') },
}

move.highHorsepower = {
    split: "physical",
    type: "ground",
    power: t4Base,
}

move.blazeKick = {
    split: "physical",
    type: "fire",
    power: t4Base,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
}

move.pyroBall = {
    split: "physical",
    type: "fire",
    power: t4Base/2,
    timer: defaultPlayerMoveTimer/2,
    info: function() {return `Ataca x2 más rápido de lo normal`} ,
    affectedBy: [ability.megaLauncher.id]

}

move.braveBird = {
    split: "physical",
    type: "flying",
    power: t4Base*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.spectralThief = {
    split: "physical",
    type: "ghost",
    power: t4Base-20,
    info: function() {return `Roba los cambios de características del enemigo`},
    hitEffect: function(target) { 

    for (const buff in wildBuffs){
    if (/burn|freeze|confused|paralysis|poisoned|sleep/.test(buff)) continue
    if (wildBuffs[buff]) moveBuff("wild",buff,"self");
    wildBuffs[buff] = 0
    }


     },

}

move.snipeShot = {
    split: "special",
    type: "water",
    power: t4Base+20,
}

move.moongeistBeam = {
    split: "special",
    type: "ghost",
    power: t4Base,
    info: function() {return `Ignora todas las subidas de defensa`},
    defenseBypass : true,
}

move.sunsteelStrike = {
    split: "physical",
    type: "steel",
    power: t4Base,
    info: function() {return `Ignora todas las subidas de defensa`},
    defenseBypass : true,
}

move.rockWrecker = {
    split: "physical",
    type: "rock",
    power: t4Base,
    affectedBy: [ability.metalhead.id]
}

move.aeroblast = {
    split: "special",
    type: "flying",
    power: t4Base,
    affectedBy: [ability.windRider.id]
}

move.sacredFire = {
    split: "physical",
    type: "fire",
    power: t4Base,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
}

move.crabhammer = {
    split: "physical",
    type: "water",
    power: (t4Base+10)*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
    affectedBy: [ability.toughClaws.id]
}

move.iceHammer = {
    split: "physical",
    type: "ice",
    power: demeritBp+30,
    info: function() {return `Reduce la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.dragonDarts = {  
    split: "physical",
    type: "dragon",
    power: 50,
    info: function() {return `Golpea 2 veces`},
    multihit: [2,2],
    affectedBy: [ability.megaLauncher.id]
}

move.hiJumpKick = {
    split: "physical",
    type: "fighting",
    power: t4Base+20,
}

move.falseSurrender = { 
    split: "physical",
    type: "dark",
    power: t4Base,
}

move.headCharge = {
    split: "physical",
    type: "normal",
    power: t4Base,
    affectedBy: [ability.metalhead.id]
}

move.megahorn = {
    split: "physical",
    type: "bug",
    power: t4Base,
    affectedBy: [ability.metalhead.id]
}

move.needleArm = {
    split: "physical",
    type: "grass",
    power: demeritBp+60,
    info: function() {return `Reduce el Ataque un 100%`},
    hitEffect: function(target) { moveBuff(target,'atkdown2',`self`); },
    unaffectedBy: [ability.sheerForce.id],
}

move.anchorShot = { 
    split: "physical",
    type: "steel",
    power: t4Base,
}

move.darkestLariat = { 
    split: "physical",
    type: "dark",
    power: t4Base,
}

move.dragonEnergy = {
    split: "special",
    type: "dragon",
    power: t4Base*1.5,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`} ,
}

move.thunderCage = {
    split: "special",
    type: "electric",
    power: t4Base/2,
    timer: defaultPlayerMoveTimer/2,
    info: function() {return `Ataca x2 más rápido de lo normal`} ,
}


move.ruination = {
    split: "physical",
    type: "dark",
    power: t4Base,
    info: function() {return `El ataque pasa a ser físico o especial según la característica más alta del usuario`},
    castEffect: function(target) {
    if (pkmn[ team[exploreActiveMember].pkmn.id ].bst.atk>pkmn[ team[exploreActiveMember].pkmn.id ].bst.satk){
        this.split = "physical"
    } else this.split = "special"
    },
}

move.mindBlown = {
    split: "special",
    type: "fire",
    power: t4Base,
}

move.sparklingAria = {
    split: "special",
    type: "water",
    power: t4Base,
    info: function() {return `Cura ${tagBurn} a todo el equipo`},
    hitEffect: function(target) { 
        for (const slot in team) {
            team[slot].buffs.burn = 0
        }
     },
    affectedBy: [ability.cacophony.id]
}

move.floralHealing = {
    split: "special",
    type: "fairy",
    power: 0,
    info: function() {return `Cura todos los estados alterados a todo el equipo`},
    hitEffect: function(target) { 
        for (const slot in team) {
            team[slot].buffs.burn = 0
            team[slot].buffs.freeze = 0
            team[slot].buffs.paralysis = 0
            team[slot].buffs.poisoned = 0
            team[slot].buffs.sleep = 0
            team[slot].buffs.confused = 0
        }
     },
}

move.revelationDance = {
    split: "special",
    type: "normal",
    power: 100,
    info: function() {return `El tipo cambia según el primer tipo del usuario`},
    castEffect: function(target) {
        this.type = pkmn[ team[exploreActiveMember].pkmn.id ].type[0]
        
    },
    affectedBy: [ability.dancer.id]
}

move.weatherBall = { //añade forecast ability guarro
    split: "special",
    type: "normal",
    power: (t4Base+30)/2,
    info: function() {return `La potencia se dobla bajo un clima, y el tipo cambia según cuál sea (${tagSunny} es Fuego, ${tagRainy} es Agua, ${tagSandstorm} es Tierra, ${tagHail} es Hielo, ${tagFoggy} es Fantasma, ${tagElectricTerrain} es Eléctrico, ${tagGrassyTerrain} es Planta, ${tagMistyTerrain} es Psíquico )`},
    castEffect: function(target) {
        this.power = (t4Base+30)/2,
        this.type = "normal"
        if (saved.weatherTimer>0){
            this.power = ((t4Base+30)/2)*2
            if (saved.weather=="sunny") this.type = "fire"
            if (saved.weather=="rainy") this.type = "water"
            if (saved.weather=="sandstorm") this.type = "ground"
            if (saved.weather=="hail") this.type = "ice"
            if (saved.weather=="foggy") this.type = "ghost"
            if (saved.weather=="electricTerrain") this.type = "electric"
            if (saved.weather=="mistyTerrain") this.type = "psychic"
            if (saved.weather=="grassyTerrain") this.type = "grass"
        }
    },
}



move.poisonTail = {
    split: "physical",
    type: "poison",
    power: t4Base+20,
    info: function() {return `20% de probabilidad de infligir ${tagPoisoned}`},
    hitEffect: function(target) { if (rng(0.20)) moveBuff(target,'poisoned') },
}



move.heatCrash = {
    split: "physical",
    type: "fire",
    power: demeritBp+30,
    info: function() {return `Reduce el Ataque un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1',`self`); },
    unaffectedBy: [ability.sheerForce.id],
}

move.chatter = {
    split: "special",
    type: "flying",
    power: t4Base+30,
    info: function() {return `20% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.20)) moveBuff(target,'confused') },
    affectedBy: [ability.cacophony.id]
}

move.voltTackle = {
    split: "physical",
    type: "electric",
    power: t4Base,
    info: function() {return `10% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'paralysis') },
}

move.zingZap = {
    split: "physical",
    type: "electric",
    power: t4Base+20,
    affectedBy: [ability.strongJaw.id]
}

move.lovelyKiss = {
    split: "physical",
    type: "fairy",
    power: t4Base+30,
    info: function() {return `10% de probabilidad de infligir ${tagConfused}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'confused') },
}

move.crushGrip = {
    split: "physical",
    type: "normal",
    power: t4Base+20
}

move.lightOfRuin = {
    split: "special",
    type: "fairy",
    power: 300,
    timer: defaultPlayerMoveTimer*2,
    info: function() {return `Ataca x2 más lento de lo normal`} ,
}

move.spacialRend = {
    split: "special",
    type: "dragon",
    power: t4Base,
    affectedBy: [ability.sharpness.id]
}

move.fishiousRend = { 
    split: "physical",
    type: "water",
    power: 100,
    affectedBy: [ability.strongJaw.id]
}

move.armorCannon = { 
    split: "special",
    type: "fire",
    power: t4Base-10,
    affectedBy: [ability.megaLauncher.id]
}

move.bitterBlade = { 
    split: "physical",
    type: "fire",
    power: t4Base-10,
    affectedBy: [ability.sharpness.id]
}

move.brutalClaw = { 
    split: "physical",
    type: "fire",
    power: t4Base-40,
    affectedBy: [ability.toughClaws.id]
}

move.noRetreat = { 
    split: "special",
    type: "fighting",
    power: 0,
    info: function() {return `Aumenta todas las características un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkup1',"self");moveBuff(target,'atkup1',"self");moveBuff(target,'defup1',"self");moveBuff(target,'sdefup1',"self");moveBuff(target,'speup1',"self"); },
    restricted: true,
}

move.storedPower = { 
    split: "special",
    type: "psychic",
    power: 60,
    info: function() {return `Aumenta la potencia base en 30 por cada característica distinta subida del usuario`},
    castEffect: function(target) {
        let power = 60
        if (team[exploreActiveMember].buffs?.satkup1 > 0) power += 30
        if (team[exploreActiveMember].buffs?.satkup2 > 0) power += 30
        if (team[exploreActiveMember].buffs?.atkup1 > 0) power += 30
        if (team[exploreActiveMember].buffs?.atkup2 > 0) power += 30
        if (team[exploreActiveMember].buffs?.speup1 > 0) power += 30
        if (team[exploreActiveMember].buffs?.speup2 > 0) power += 30
        if (team[exploreActiveMember].buffs?.defup1 > 0) power += 30
        if (team[exploreActiveMember].buffs?.defup2 > 0) power += 30
        if (team[exploreActiveMember].buffs?.sdefup1 > 0) power += 30
        if (team[exploreActiveMember].buffs?.sdefup2 > 0) power += 30
        this.power = power
    },
}

move.chillyReception = { 
    split: "special",
    type: "ice",
    power: 0,
    info: function() {return `Cambia el clima a ${tagHail} y cambia al siguiente miembro del equipo`} ,
    hitEffect: function(target) { changeWeather("hail"); if (target=="wild" && saved.currentArea != "training") switchMemberNext() },
}

move.camouflage = { 
    split: "special",
    type: "bug",
    power: 0,
    info: function() {return `Cambia temporalmente el tipo del usuario según el clima, y aumenta la Velocidad un 75%`},
    hitEffect: function(target) {
        moveBuff(target,'speup2',"self");
        if (saved.weatherTimer>0){
            if (saved.weather=="sunny") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["fire"]
            if (saved.weather=="rainy") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["water"]
            if (saved.weather=="sandstorm") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["ground"]
            if (saved.weather=="hail") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["ice"]
            if (saved.weather=="foggy") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["ghost"]
            if (saved.weather=="electricTerrain") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["electric"]
            if (saved.weather=="mistyTerrain") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["psychic"]
            if (saved.weather=="grassyTerrain") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["grass"]
            if (saved.weather=="trickRoom") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["dark"]
            if (saved.weather=="weirdRoom") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["bug"]
            if (saved.weather=="crossRoom") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["fighting"]
            if (saved.weather=="safeguard") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["normal"]
            if (saved.weather=="lightScreen") pkmn[ team[exploreActiveMember].pkmn.id ].type = ["fairy"]
        }
     },
     restricted: true,
}


move.tailGlow = { 
    split: "special",
    type: "bug",
    power: 0,
    info: function() {return `Aumenta el Ataque Especial un 150%. Ataca x1.5 más lento de lo normal`},
    hitEffect: function(target) { moveBuff(target,'satkup1',"self"); moveBuff(target,'satkup2',"self") },
    affectedBy: [ability.dancer.id],
    restricted: true,
    timer: defaultPlayerMoveTimer*1.5,
}

move.luminaCrash = { 
    split: "special",
    type: "psychic",
    power: t4Base,
    info: function() {return `La potencia aumenta x1.2-1.5 si la Velocidad está subida`},
    powerMod : function() { if (team[exploreActiveMember].buffs?.speup2 > 0) { return 1.5} else if (team[exploreActiveMember].buffs?.speup1 > 0) {return 1.2} else return 1 },
}


move.flyingPress = { 
    split: "physical",
    type: "fighting",
    power: t4Base*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.mountainGale = { 
    split: "physical",
    type: "ice",
    power: demeritBp+50,
    info: function() {return `Reduce la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1','self') },
    unaffectedBy: [ability.sheerForce.id],
}

move.jetPunch = { 
    split: "physical",
    type: "water",
    power: t4Base/1.5,
    timer: defaultPlayerMoveTimer/1.5,
    info: function() {return `Ataca x1.5 más rápido de lo normal`},
    unaffectedBy: [ability.ironFist.id],
}


move.roarOfTime = {
    split: "special",
    type: "dragon",
    power: t4Base*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`},
    affectedBy: [ability.cacophony.id]
}

move.doomDesire = {
    split: "special",
    type: "steel",
    power: t4Base*1.5,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`} ,
}

move.beakBlast = {
    split: "physical",
    type: "normal",
    power: t4Base*1.5,
    timer: defaultPlayerMoveTimer*1.5,
    info: function() {return `Ataca x1.5 más lento de lo normal`} ,
}

move.shadowForce = { 
    split: "physical",
    type: "ghost",
    power: t4Base-20,
    info: function() {return `Puede golpear sea cual sea el tipo`},
}

move.blueFlare = {
    split: "special",
    type: "fire",
    power: t4Base-20,
    info: function() {return `30% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'burn') },
}

move.boltStrike = {
    split: "special",
    type: "electric",
    power: t4Base-20,
    info: function() {return `30% de probabilidad de infligir ${tagParalysis}`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'paralysis') },
}

move.glaciate = {
    split: "special",
    type: "ice",
    power: t4Base-30,
    info: function() {return `20% de probabilidad de infligir ${tagFreeze}`},
    hitEffect: function(target) { if (rng(0.20)) moveBuff(target,'freeze') },
}

move.howl = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Aumenta el Ataque un 100% a todo el equipo`},
    hitEffect: function(target) { moveBuff(target,'atkup2',"team")},
    affectedBy: [ability.cacophony.id],
    restricted : true,
}

move.lunarDance = {
    split: "special",
    type: "psychic",
    power: 0,
    info: function() {return `Aumenta el Ataque Especial un 100% a todo el equipo`},
    hitEffect: function(target) { moveBuff(target,'satkup2',"team")},
    affectedBy: [ability.dancer.id],
    restricted : true,
}

move.aromaticMist = {
    split: "special",
    type: "fairy",
    power: 0,
    info: function() {return `Aumenta la Defensa Especial un 100% a todo el equipo`},
    hitEffect: function(target) { moveBuff(target,'sdefup2',"team")},
}

move.fairyLock = { 
    split: "special",
    type: "fairy",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Hada al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("fairy")) return; pkmn[saved.currentPkmn].temporalType = [`fairy`] },
}

move.electrify = {
    split: "special",
    type: "electric",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Eléctrico al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("electric")) return; pkmn[saved.currentPkmn].temporalType = [`electric`] },
}

move.forestCurse = {
    split: "special",
    type: "grass",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Planta al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("grass")) return; pkmn[saved.currentPkmn].temporalType = [`grass`] },
}

move.trickOrTreat = {
    split: "special",
    type: "ghost",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Fantasma al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("ghost")) return; pkmn[saved.currentPkmn].temporalType = [`ghost`] },
}

move.soak = {
    split: "special",
    type: "water",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Agua al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("water")) return; pkmn[saved.currentPkmn].temporalType = [`water`] },
}

move.magicPowder = {
    split: "special",
    type: "psychic",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Psíquico al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("psychic")) return; pkmn[saved.currentPkmn].temporalType = [`psychic`] },
}

move.mudSport = {
    split: "special",
    type: "ground",
    power: 0,
    info: function() {return `Añade temporalmente el tipo Tierra al enemigo. El daño extra por supereficacia de los tipos temporales se reduce a la mitad, y aplicar un segundo tipo temporal reemplaza al primero`},
    hitEffect: function(target) { if (pkmn[saved.currentPkmn].type.includes("ground")) return; pkmn[saved.currentPkmn].temporalType = [`ground`] },
}

move.boneRush = {
    split: "physical",
    type: "ground",
    power: t4Base/3,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.clamp = {
    split: "physical",
    type: "water",
    power: t4Base/3,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.waterShuriken = {
    split: "special",
    type: "water",
    power: t4Base/3,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.barbBarrage = {
    split: "physical",
    type: "poison",
    power: 40,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.barrage = {
    split: "special",
    type: "grass",
    power: (t4Base+30)/3,
    info: function() {return `Golpea de 2 a 5 veces`},
    multihit: [2,5],
}

move.mysticalPower = {
    split: "special",
    type: "psychic",
    power: t4Base-20,
    info: function() {return `50% de probabilidad de aumentar el Ataque Especial un 50%`},
    hitEffect: function(target) { if (rng(0.50))  moveBuff(target,'satkup1','self') },
}

move.psyshieldBash = {
    split: "special",
    type: "psychic",
    power: t4Base-20,
    info: function() {return `Aumenta la Defensa un 50%`},
    hitEffect: function(target) { moveBuff(target,'defup1',"self") },
    affectedBy: [ability.metalhead.id]
}

move.sketch = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Ejecuta el movimiento de la primera ranura`},
}


move.prismaticLaser = {
    split: "special",
    type: "psychic",
    power: t4Base*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`} ,
}

move.lusterPurge = {
    split: "special",
    type: "psychic",
    power: t4Base-20,
    info: function() {return `50% de probabilidad de reducir la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'sdefdown1') },
}

move.mistBall = {
    split: "special",
    type: "psychic",
    power: t4Base-10,
    info: function() {return `50% de probabilidad de reducir el Ataque Especial del enemigo un 50%`},
    hitEffect: function(target) { if (rng(0.50)) moveBuff(target,'satkdown1') },
}

move.dynamicPunch = {
    split: "physical",
    type: "fighting",
    power: t4Base-40,
    info: function() {return `Inflige ${tagConfused}`},
    hitEffect: function(target) { moveBuff(target,'confused') },
    affectedBy: [ability.ironFist.id]
}

move.thunderousKick = {
    split: "physical",
    type: "fighting",
    power: t4Base-40,
    info: function() {return `Reduce la Defensa del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1') },
}

move.fieryWrath = {
    split: "special",
    type: "dark",
    power: t4Base-40,
    info: function() {return `Reduce la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'sdefdown1') },
}

move.freezingGlare = {
    split: "special",
    type: "psychic",
    power: t4Base-40,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
}

move.meteorAssault = { 
    split: "physical",
    type: "fighting",
    power: (t4Base+20)*1.2,
    timer: defaultPlayerMoveTimer*1.2,
    info: function() {return `Ataca x1.2 más lento de lo normal`},
}

move.cottonGuard = {
    split: "special",
    type: "grass",
    power: 0,
    info: function() {return `Aumenta la Defensa un 100% y la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'defup2',"self"); moveBuff(target,'sdefup1',"self")},
}


move.kingsShield = {
    split: "special",
    type: "steel",
    power: 0,
    info: function() {return `Aumenta la Defensa Especial un 100% y la Defensa un 50%`},
    hitEffect: function(target) { moveBuff(target,'defup1',"self"); moveBuff(target,'sdefup2',"self")},
}

move.drumBeating = {
    split: "physical",
    type: "grass",
    power: t4Base-30,
    info: function() {return `Reduce la Velocidad del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'spedown1') },
    affectedBy: [ability.dancer.id]
}

move.tropKick = {
    split: "physical",
    type: "grass",
    power: t4Base,
    info: function() {return `Reduce el Ataque del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkdown1') },
}

move.fireLash = {
    rename: `noxiousLash`,
    split: "special",
    type: "fire",
    power: t4Base-40,
    info: function() {return `Inflige ${tagPoisoned}`},
    hitEffect: function(target) { moveBuff(target,'poisoned') },
}

move.clangingScales = {
    split: "special",
    type: "dragon",
    power: t4Base-20,
    info: function() {return `Reduce la Defensa del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1') },
    affectedBy: [ability.cacophony.id]
}

move.shiftGear = {
    split: "special",
    type: "steel", 
    power: 0,
    info: function() {return `Aumenta el Ataque un 50% y la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'atkup1',"self"); moveBuff(target,'speup1',"self") },
    restricted: true,
}

move.kinesis = {
    split: "special",
    type: "psychic",
    power: 0,
    info: function() {return `Aumenta el Ataque Especial un 100% y la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkup2',"self"); moveBuff(target,'sdefup1',"self") },
    restricted: true,
}

move.gearUp = { 
    split: "special",
    type: "steel",
    power: 0,
    info: function() {return `Aumenta el Ataque y la Velocidad un 50% a todo el equipo`},
    hitEffect: function(target) { moveBuff(target,'atkup1',"team"); moveBuff(target,'speup1',"team");},
    restricted: true,
}

move.relicSong = {
    split: "special",
    type: "normal",
    power: t4Base-30,
    info: function() {return `20% de probabilidad de infligir ${tagSleep}`},
    hitEffect: function(target) { if (rng(0.20)) moveBuff(target,'sleep') },
    affectedBy: [ability.cacophony.id]
}

move.zapCannon = {
    split: "special",
    type: "electric",
    power: t4Base-50,
    info: function() {return `Inflige ${tagParalysis}`},
    hitEffect: function(target) { moveBuff(target,'paralysis'); },
    affectedBy: [ability.megaLauncher.id]
}

move.triAttack = {
    split: "special",
    type: "normal",
    power: t4Base+10,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}, ${tagParalysis} o ${tagFreeze}`},
    hitEffect: function(target) { if (rng(0.10)){ if (rng(0.33)) {moveBuff(target,'burn')} else if (rng(0.50)) { moveBuff(target,'paralysis')} else moveBuff(target,'freeze') }},
}

move.judgment = { 
    split: "special",
    type: "normal",
    power: t4Base+50
}

move.rageFist = { 
    split: "physical",
    type: "ghost",
    power: t4Base/2,
    info: function() {return `Multiplica la potencia base x1.2 cada vez que se usa, hasta 5 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.2,this.buildup) },
    hitEffect: function(target) { if (this.buildup<5) this.buildup++;    },
    affectedBy: [ability.ironFist.id]
}

move.iceBall = {
    split: "physical",
    type: "ice",
    power: (t4Base+30)/3,
    info: function() {return `Multiplica la potencia base x1.2 cada vez que se usa, hasta 5 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.2,this.buildup) },
    hitEffect: function(target) { if (this.buildup<5) this.buildup++; },
}

move.tripleAxel = { 
    split: "physical",
    type: "ice",
    power: t4Base/2,
    info: function() {return `Multiplica la potencia base x1.3 cada vez que se usa, hasta 3 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.3,this.buildup) },
    hitEffect: function(target) { if (this.buildup<3) this.buildup++;   },
    affectedBy: [ability.sharpness.id]

}

move.attackOrder = { 
    split: "physical",
    type: "bug",
    power: (t4Base+30)/3,
    info: function() {return `Multiplica la potencia base x1.15 cada vez que se usa, hasta 10 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.15,this.buildup) },
    hitEffect: function(target) { if (this.buildup<10) this.buildup++;  },
}

move.populationBomb = { 
    split: "physical",
    type: "normal",
    power: (t4Base+30)/3,
    info: function() {return `Multiplica la potencia base x1.15 cada vez que se usa, hasta 10 veces. Pierde todas las acumulaciones al cambiar de Pokémon`},
    buildup: 0,
    powerMod : function() { return 1 * Math.pow(1.15,this.buildup) },
    hitEffect: function(target) { if (this.buildup<10) this.buildup++;  },
}

move.nobleRoar = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Reduce el Ataque del enemigo un 100% y el Ataque Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'atkdown2'); moveBuff(target,'satkdown2') },
}

move.hyperDrill = { 
    split: "physical",
    type: "normal",
    power: t4Base+80
}


//aqui me queo



move.fieryDance = {
    split: "special",
    type: "fire",
    power: t4Base-20,
    info: function() {return `30% de probabilidad de aumentar el Ataque Especial un 50%`},
    hitEffect: function(target) { if (rng(0.30)) moveBuff(target,'satkup1',"self") },
    affectedBy: [ability.dancer.id]
}

move.torchSong = {
    split: "special",
    type: "fire",
    power: t4Base-40,
    info: function() {return `Aumenta el Ataque Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'satkup1',"self") },
    affectedBy: [ability.cacophony.id]
}

move.seedFlare = {
    split: "special",
    type: "grass",
    power: t4Base-40,
    info: function() {return `Reduce la Defensa Especial del enemigo un 50%`},
    hitEffect: function(target) { moveBuff(target,'sdefdown1') },
}


move.vCreate = { 
    split: "physical",
    type: "fire",
    power: demeritBp+120,
    info: function() {return `Reduce la Defensa, la Defensa Especial y la Velocidad un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1',`self`); moveBuff(target,'sdefdown1',`self`); moveBuff(target,'spedown1',`self`); },
    unaffectedBy: [ability.sheerForce.id],
}

move.dragonAscent = { 
    split: "physical",
    type: "flying",
    power: demeritBp+60,
    info: function() {return `Reduce la Defensa y la Defensa Especial un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1',`self`); moveBuff(target,'sdefdown1',`self`); },
    unaffectedBy: [ability.sheerForce.id],
}

move.mysticalFire = {
    split: "special",
    type: "fire",
    power: demeritBp+60,
    info: function() {return `Reduce el Ataque Especial un 100%`},
    hitEffect: function(target) { moveBuff(target,'satkdown2',`self`); },
    unaffectedBy: [ability.sheerForce.id],
}

move.headlongRush = {
    split: "physical",
    type: "ground",
    power: demeritBp+30,
    info: function() {return `Reduce la Defensa un 50%`},
    hitEffect: function(target) { moveBuff(target,'defdown1',`self`) },
    unaffectedBy: [ability.sheerForce.id],
    affectedBy: [ability.metalhead.id]
}

move.sandsearStorm = {
    split: "special",
    type: "ground",
    power: t4Base,
    info: function() {return `10% de probabilidad de infligir ${tagBurn}`},
    hitEffect: function(target) { if (rng(0.10)) moveBuff(target,'burn') },
    affectedBy: [ability.windRider.id]
}

move.splash = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `...`} ,
}

move.conversion = {
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Cambia temporalmente el tipo del usuario al del primer movimiento, y aumenta la Velocidad un 75%`},
    hitEffect: function(target) { moveBuff(target,'speup2',"self"); pkmn[ team[exploreActiveMember].pkmn.id ].type = [ move[ pkmn[ team[exploreActiveMember].pkmn.id] .moves.slot1  ].type  ] },
    restricted: true,
}

move.flameBurst = {
    split: "special",
    type: "fire",
    power: t4Base+30,
    info: function() {return `Inflige ${tagBurn} a todo el equipo`},
    hitEffect: function(target) { moveBuff(target,'burn',"team") },
}

move.morningSun = { 
    split: "special",
    type: "normal",
    power: 0,
    info: function() {return `Cambia el clima a ${tagSunny} y aumenta el Ataque Especial un 50%`} ,
    hitEffect: function(target) { changeWeather("sunny"); moveBuff(target,'satkup1',"self") },
}






const movesAffectedByToughClaws = []
const movesAffectedByIronFist = []
const movesAffectedBySharpness = []
const movesAffectedByStrongJaw = []
const movesAffectedByMegaLauncher = []
const movesAffectedByDancer = []
const movesAffectedByWindRider = []
const movesAffectedByCacophony = []
const movesAffectedByMetalhead = []

for (const i in move){




    //sheer force
    if (move[i].power>0 && move[i].hitEffect && !move[i].unaffectedBy?.includes(ability.sheerForce.id) && move[i].buildup==undefined) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.sheerForce.id)} else move[i].affectedBy = [ability.sheerForce.id] }
    //serene grace/pbond
    if (move[i].hitEffect && move[i].hitEffect?.toString().includes('rng(')) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.sereneGrace.id)} else move[i].affectedBy = [ability.sereneGrace.id] }
    //if (move[i].hitEffect && move[i].hitEffect?.toString().includes('rng(')) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.parentalBond.id)} else move[i].affectedBy = [ability.parentalBond.id] }
    //technician
    if (move[i].power>0 && move[i].power<=60) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.technician.id)} else move[i].affectedBy = [ability.technician.id] }
    //skill link
    if (move[i].multihit && move[i].multihit[1]>move[i].multihit[0]) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.skillLink.id)} else move[i].affectedBy = [ability.skillLink.id] }
    //reckless/libero
    if (move[i].power>0 && move[i].timer>defaultPlayerMoveTimer) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.reckless.id)} else move[i].affectedBy = [ability.reckless.id] }
    if (move[i].power>0 && move[i].timer<defaultPlayerMoveTimer) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.libero.id)} else move[i].affectedBy = [ability.libero.id] }
    //climaTact
    if (move[i].hitEffect && move[i].hitEffect?.toString().includes('changeWeather(')) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.climaTact.id)} else move[i].affectedBy = [ability.climaTact.id] }
    
        
    


    if (move[i].affectedBy?.includes(ability.toughClaws.id)) movesAffectedByToughClaws.push(i)
    if (move[i].affectedBy?.includes(ability.ironFist.id)) movesAffectedByIronFist.push(i)
    if (move[i].affectedBy?.includes(ability.sharpness.id)) movesAffectedBySharpness.push(i)
    if (move[i].affectedBy?.includes(ability.strongJaw.id)) movesAffectedByStrongJaw.push(i)
    if (move[i].affectedBy?.includes(ability.megaLauncher.id)) movesAffectedByMegaLauncher.push(i)
    if (move[i].affectedBy?.includes(ability.dancer.id)) movesAffectedByDancer.push(i)
    if (move[i].affectedBy?.includes(ability.windRider.id)) movesAffectedByWindRider.push(i)
    if (move[i].affectedBy?.includes(ability.cacophony.id)) movesAffectedByCacophony.push(i)
    if (move[i].affectedBy?.includes(ability.metalhead.id)) movesAffectedByMetalhead.push(i)


    if (move[i].affectedBy?.includes(ability.sharpness.id)) { if (move[i].affectedBy) {move[i].affectedBy.push(ability.iaido.id); } else move[i].affectedBy = [ability.iaido.id] }



    move[i].id = i
    if (move[i].timer == undefined) move[i].timer = defaultPlayerMoveTimer
}


