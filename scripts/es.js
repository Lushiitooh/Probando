/* =========================================================================
   Pokechill — Traducción al español
   =========================================================================

   Este archivo NO modifica los diccionarios. Solo define una tabla de
   nombres que `format()` (scripts/explore.js) consulta antes de aplicar su
   formateo automático.

   Ventajas de tenerlo aparte:
     - Los diccionarios originales quedan intactos y se pueden actualizar
       desde el repositorio original sin conflictos.
     - Cualquier id sin traducir sigue mostrándose en inglés, así que el
       juego nunca se rompe por una traducción que falte.
     - Todo el vocabulario del juego está en un solo sitio, fácil de revisar.

   Debe cargarse DESPUÉS de los diccionarios y ANTES de explore.js.

   Nota sobre las especies: en español los nombres de Pokémon son idénticos
   a los ingleses, así que solo se traducen aquí las variantes regionales y
   las formas alternativas.
   ========================================================================= */

var ES = {};


/* ---------------------------------------------------------------- CAMPOS */

ES.field = {
    // Votos elementales
    normalPledge:      `Voto Normal`,
    firePledge:        `Voto Fuego`,
    waterPledge:       `Voto Agua`,
    grassPledge:       `Voto Planta`,
    electricPledge:    `Voto Eléctrico`,
    IcePledge:         `Voto Hielo`,
    fightingPledge:    `Voto Lucha`,
    poisonPledge:      `Voto Veneno`,
    groundPledge:      `Voto Tierra`,
    flyingPledge:      `Voto Volador`,
    psychicPledge:     `Voto Psíquico`,
    bugPledge:         `Voto Bicho`,
    rockPledge:        `Voto Roca`,
    ghostPledge:       `Voto Fantasma`,
    dragonPledge:      `Voto Dragón`,
    darkPledge:        `Voto Siniestro`,
    steelPledge:       `Voto Acero`,
    fairyPledge:       `Voto Hada`,

    // Climas y terrenos
    harshSun:          `Sol Abrasador`,
    heavyRain:         `Diluvio`,
    fierceHail:        `Granizo Feroz`,
    coarseSandstorm:   `Tormenta de Arena`,
    thickFog:          `Niebla Densa`,
    mistyField:        `Campo de Niebla`,
    grassyField:       `Campo de Hierba`,
    electricField:     `Campo Eléctrico`,
    heavyWeather:      `Clima Severo`,
    deltaStream:       `Corriente Delta`,

    // Efectos especiales
    simpleAura:        `Aura Simple`,
    moodyAura:         `Aura Veleta`,
    serendipity:       `Serendipia`,
    averageTime:       `Tiempo Uniforme`,
    trickField:        `Campo Truco`,
    reverseField:      `Campo Invertido`,
    ironBody:          `Cuerpo de Hierro`,
    wonderWard:        `Guarda Prodigiosa`,
    noMercy:           `Sin Piedad`,
    neutralisingGas:   `Gas Reactivo`,
    stealthRocks:      `Trampa Rocas`,
    unnerve:           `Nerviosismo`,
    fatiguingCurse:    `Maldición Agotadora`,
    weakeningCurse:    `Maldición Debilitante`,
};


/* ----------------------------------------------------------- HABILIDADES */

ES.ability = {

    /* --- Familia "por debajo del 50% de PS, +30% al tipo" --- */
    overgrow:          `Espesura`,        // planta  (oficial)
    blaze:             `Mar Llamas`,      // fuego   (oficial)
    torrent:           `Torrente`,        // agua    (oficial)
    swarm:             `Enjambre`,        // bicho   (oficial)
    average:           `Empeño`,          // normal
    bastion:           `Bastión`,         // acero
    resolve:           `Coraje`,          // lucha
    mistify:           `Videncia`,        // psíquico
    hexerei:           `Aquelarre`,       // fantasma
    glimmer:           `Centelleo`,       // hada
    skyward:           `Alzada`,          // volador
    draconic:          `Dracónico`,       // dragón
    noxious:           `Miasma`,          // veneno
    solid:             `Solidez`,         // roca
    rime:              `Escarcha`,        // hielo
    voltage:           `Voltaje`,         // eléctrico

    /* --- Familia "anula el tipo recibido y sube Velocidad" --- */
    flashAqua:         `Reflejo Acuático`,
    flashCryo:         `Reflejo Gélido`,
    flashElectro:      `Reflejo Eléctrico`,
    flashFae:          `Reflejo Feérico`,
    flashHerba:        `Reflejo Vegetal`,
    flashPsycha:       `Reflejo Psíquico`,
    flashPyro:         `Reflejo Ígneo`,
    flashUmbra:        `Reflejo Espectral`,
    flashVenum:        `Reflejo Tóxico`,

    /* --- Familia "absorbe" --- */
    waterAbsorb:       `Absorbe Agua`,
    voltAbsorb:        `Absorbe Electricidad`,
    flareAbsorb:       `Absorbe Fuego`,
    frostAbsorb:       `Absorbe Hielo`,
    growthAbsorb:      `Absorbe Planta`,
    poisonAbsorb:      `Absorbe Veneno`,
    psychicAbsorb:     `Absorbe Psíquico`,
    curseAbsorb:       `Absorbe Maldición`,
    lightAbsorb:       `Absorbe Luz`,

    /* --- Familia "guardia": mitad de daño de un tipo --- */
    plainGuard:        `Guardia Normal`,
    flameGuard:        `Guardia Ígnea`,
    waterGuard:        `Guardia Acuática`,
    leafGuard:         `Defensa Hoja`,    // (oficial)
    iceGuard:          `Guardia Gélida`,
    grabGuard:         `Guardia Marcial`,
    poisonGuard:       `Guardia Tóxica`,
    groundGuard:       `Guardia Telúrica`,
    flyingGuard:       `Guardia Aérea`,
    psychicGuard:      `Guardia Mental`,
    bugGuard:          `Guardia Insecto`,
    rockGuard:         `Guardia Rocosa`,
    curseGuard:        `Guardia Espectral`,
    dragonGuard:       `Guardia Dracónica`,
    sinisterGuard:     `Guardia Siniestra`,
    steelGuard:        `Guardia Férrea`,
    fairyGuard:        `Guardia Feérica`,

    /* --- Familia "pelaje": protege según el clima --- */
    sandVeil:          `Velo Arena`,      // (oficial)
    snowCloak:         `Manto Níveo`,     // (oficial)
    hydratation:       `Hidratación`,     // (oficial)
    blackPelt:         `Pelaje Sombrío`,
    fieryPelt:         `Pelaje Ígneo`,
    icyPelt:           `Pelaje Gélido`,
    moistPelt:         `Pelaje Húmedo`,
    sandyPelt:         `Pelaje Arenoso`,
    spikyPelt:         `Pelaje Púa`,
    grassyPelt:        `Manto Frondoso`,  // (oficial)
    pixiePelt:         `Pelaje Mullido`,

    /* --- Familia "piel": convierte los movimientos Normal --- */
    aerilate:          `Piel Celeste`,    // (oficial)
    pixilate:          `Piel Feérica`,    // (oficial)
    galvanize:         `Piel Eléctrica`,  // (oficial)
    ferrilate:         `Piel Férrea`,
    glaciate:          `Piel Glacial`,
    terralate:         `Piel Terrestre`,
    toxilate:          `Piel Tóxica`,
    hydrolate:         `Piel Acuática`,
    pyrolate:          `Piel Ígnea`,
    chrysilate:        `Piel Crisálida`,
    gloomilate:        `Piel Sombría`,
    espilate:          `Piel Mental`,
    dragonMaw:         `Fauces Dracónicas`,
    verdify:           `Piel Vegetal`,
    normalize:         `Normalidad`,      // (oficial)

    /* --- Climas automáticos --- */
    drizzle:           `Llovizna`,
    drought:           `Sequía`,
    sandStream:        `Chorro Arena`,
    snowWarning:       `Nevada`,
    somberField:       `Campo Sombrío`,
    electricSurge:     `Electrogénesis`,
    grassySurge:       `Herbogénesis`,
    mistySurge:        `Nebulogénesis`,
    climaTact:         `Climatáctica`,

    /* --- Velocidad y prioridad --- */
    prankster:         `Bromista`,
    galeWings:         `Alas Vendaval`,
    neuroforce:        `Fuerza Cerebral`,
    speedBoost:        `Impulso`,
    swiftSwim:         `Nado Rápido`,
    chlorophyll:       `Clorofila`,
    sandRush:          `Ímpetu Arena`,
    slushRush:         `Quitanieves`,
    unburden:          `Liviano`,
    quarkDrive:        `Carga Cuark`,
    protosynthesis:    `Paleosíntesis`,
    iaido:             `Iaido`,
    dancer:            `Pareja de Baile`,
    cacophony:         `Cacofonía`,
    windRider:         `Surcavientos`,
    hyperconductor:    `Hiperconductor`,
    faeRush:           `Ímpetu Feérico`,

    /* --- Potencia de movimientos --- */
    technician:        `Experto`,
    ironFist:          `Puño Férreo`,
    strongJaw:         `Mandíbula Fuerte`,
    toughClaws:        `Garra Dura`,
    sharpness:         `Cortante`,
    megaLauncher:      `Megadisparador`,
    metalhead:         `Testarudo`,
    reckless:          `Audaz`,
    libero:            `Líbero`,
    hugePower:         `Potencia`,
    sheerForce:        `Potencia Bruta`,
    adaptability:      `Adaptable`,
    ambidextrous:      `Ambidiestro`,
    treasureOfRuin:    `Vasija de Ruina`,
    parentalBond:      `Amor Filial`,
    thousandArms:      `Mil Brazos`,
    rivalry:           `Rivalidad`,
    tintedLens:        `Cromolente`,
    scrappy:           `Intrépido`,
    noGuard:           `Indefenso`,
    skillLink:         `Encadenado`,
    strategist:        `Estratega`,
    soulAsterism:      `Asterismo del Alma`,
    supremeOverlord:   `General Supremo`,
    gorillaTactics:    `Monotema`,
    beastBoost:        `Ultraimpulso`,
    moxie:             `Autoestima`,
    angerPoint:        `Irascible`,
    justified:         `Justiciero`,
    solarPower:        `Poder Solar`,
    sandForce:         `Poder Arena`,
    guts:              `Agallas`,
    toxicBoost:        `Ímpetu Tóxico`,
    flareBoost:        `Ímpetu Ardiente`,
    merciless:         `Ensañamiento`,
    scorch:            `Chamuscar`,

    /* --- Defensa y resistencia --- */
    filter:            `Filtro`,
    multiscale:        `Multiescamas`,
    marvelScale:       `Escama Especial`,
    magicGuard:        `Muro Mágico`,
    wonderGuard:       `Superguarda`,
    wonderSkin:        `Piel Milagro`,
    thickFat:          `Sebo`,
    fullMetalBody:     `Cuerpo Puro`,
    goodAsGold:        `Cuerpo Áureo`,
    purifyingSalt:     `Sal Purificadora`,
    shieldsDown:       `Escudo Limitado`,
    stamina:           `Firmeza`,
    livingShield:      `Escudo Viviente`,
    brittleArmor:      `Armadura Frágil`,
    intangible:        `Intangible`,
    levitate:          `Levitación`,
    stoned:            `Petrificación`,
    moltShed:          `Muda`,
    glacialBody:       `Cuerpo Glacial`,
    iceBody:           `Gélido`,
    rainDish:          `Cura Lluvia`,
    magmaArmor:        `Escudo Magma`,
    hyperCutter:       `Corte Fuerte`,
    bigPecks:          `Sacapecho`,

    /* --- Estados alterados --- */
    immunity:          `Inmunidad`,
    insomnia:          `Insomnio`,
    limber:            `Flexibilidad`,
    waterVeil:         `Velo Agua`,
    flowerVeil:        `Velo Flor`,
    sweetVeil:         `Velo Dulce`,
    aromaVeil:         `Velo Aroma`,
    pastelVeil:        `Velo Pastel`,
    naturalCure:       `Cura Natural`,
    ownTempo:          `Ritmo Propio`,
    synchronize:       `Sincronía`,
    effectSpore:       `Efecto Espora`,
    colorSpore:        `Espora Cromática`,
    poisonPoint:       `Punto Tóxico`,
    flameBody:         `Cuerpo Llama`,
    static:            `Electricidad Estática`,
    corrosion:         `Corrosión`,
    strangeCharm:      `Encanto Extraño`,
    sereneGrace:       `Dicha`,

    /* --- Interacción y utilidad --- */
    intimidate:        `Intimidación`,
    dauntingLook:      `Mirada Amedrentadora`,
    darkAura:          `Aura Oscura`,
    unaware:           `Ignorante`,
    simple:            `Simple`,
    contrary:          `Respondón`,
    moody:             `Veleta`,
    imposter:          `Impostor`,
    protean:           `Mutatipo`,
    costar:            `Compiplot`,
    powerOfAlchemy:    `Reacción Química`,
    pickPocket:        `Hurto`,
    gooey:             `Viscosidad`,
};


/* ---------------------------------------------------------- MOVIMIENTOS */

ES.move = {

    /* --- Normal --- */
    tackle:            `Placaje`,
    quickAttack:       `Ataque Rápido`,
    doubleSlap:        `Doble Bofetón`,
    cut:               `Corte`,
    leer:              `Malicioso`,
    growl:             `Gruñido`,
    swagger:           `Contoneo`,
    doubleHit:         `Doble Golpe`,
    cometPunch:        `Puño Cometa`,
    dizzyPunch:        `Puño Mareo`,
    headCharge:        `Ariete`,
    stomp:             `Pisotón`,
    stompingTantrum:   `Pataleta`,
    strength:          `Fuerza`,
    slash:             `Cuchillada`,
    swift:             `Rapidez`,
    barrage:           `Bombardeo`,
    eggBomb:           `Bomba Huevo`,
    payDay:            `Día de Pago`,
    facade:            `Imagen`,
    hyperVoice:        `Vozarrón`,
    echoedVoice:       `Eco Voz`,
    boomburst:         `Estruendo`,
    hyperBeam:         `Hiperrayo`,
    gigaImpact:        `Gigaimpacto`,
    extremeSpeed:      `Veloc. Extrema`,
    triAttack:         `Triataque`,
    smartStrike:       `Cornada`,
    bodyPress:         `Plancha`,
    populationBomb:    `Plaga de Ratas`,
    gigatonHammer:     `Martillo Gigatón`,
    crushGrip:         `Agarre Aplastante`,
    trailblaze:        `Pisotón Fervoroso`,
    pounce:            `Brinco`,
    playNice:          `Camaradería`,
    charm:             `Encanto`,
    babydollEyes:      `Ojitos Tiernos`,
    fakeTears:         `Llanto Falso`,
    featherDance:      `Danza Pluma`,
    howl:              `Aullido`,
    bellyDrum:         `Tambor`,
    swordsDance:       `Danza Espada`,
    honeClaws:         `Afilagarras`,
    bulkUp:            `Corpulencia`,
    agility:           `Agilidad`,
    amnesia:           `Amnesia`,
    barrier:           `Barrera`,
    acidArmor:         `Armadura Ácida`,
    ironDefense:       `Defensa Férrea`,
    cottonGuard:       `Rizo Algodón`,
    coil:              `Enrosque`,
    calmMind:          `Paz Mental`,
    nastyPlot:         `Maquinación`,
    tailGlow:          `Luz Cola`,
    quiverDance:       `Danza Aleteo`,
    shiftGear:         `Cambio de Marcha`,
    rockPolish:        `Pulimento`,
    noRetreat:         `Sin Retirada`,
    storedPower:       `Poder Reserva`,
    camouflage:        `Camuflaje`,
    conversion:        `Conversión`,
    acupressure:       `Acupresión`,
    batonPass:         `Relevo`,
    memento:           `Legado`,
    metronome:         `Metrónomo`,   // colisiona con el objeto homónimo; mismo nombre
    mimic:             `Mimético`,
    sketch:            `Esquema`,
    meFirst:           `Yo Primero`,
    embargo:           `Embargo`,
    splash:            `Salpicadura`,
    screech:           `Chirrido`,
    metalSound:        `Eco Metálico`,
    smellingSalts:     `Estímulo`,
    teatime:           `Hora del Té`,
    nobleRoar:         `Rugido de Guerra`,
    safeguard:         `Velo Sagrado`,
    lightScreen:       `Pantalla de Luz`,
    weatherBall:       `Meteorobola`,
    judgment:          `Sentencia`,
    revelationDance:   `Danza Despertar`,
    relicSong:         `Canto Arcaico`,
    gearUp:            `Piñón Auxiliar`,
    magneticFlux:      `Aura Magnética`,
    rototiller:        `Fertilizante`,

    /* --- Fuego --- */
    ember:             `Ascuas`,
    flamethrower:      `Lanzallamas`,
    fireBlast:         `Llamarada`,
    firePunch:         `Puño Fuego`,
    fireFang:          `Colmillo Ígneo`,
    fireSpin:          `Giro Fuego`,
    flameBurst:        `Pirotecnia`,
    flameCharge:       `Nitrocarga`,
    flareBlitz:        `Envite Ígneo`,
    blazeKick:         `Patada Ígnea`,
    heatWave:          `Onda Ígnea`,
    heatCrash:         `Golpe Calor`,
    incinerate:        `Calcinación`,
    inferno:           `Infierno`,
    magmaStorm:        `Lluvia Ígnea`,
    sacredFire:        `Fuego Sagrado`,
    blueFlare:         `Llama Azul`,
    vCreate:           `Creación`,
    burnUp:            `Llama Final`,
    mysticalFire:      `Fuego Místico`,
    fieryDance:        `Danza Llama`,
    fieryWrath:        `Furia Ardiente`,
    fireLash:          `Látigo Ígneo`,
    pyroBall:          `Balón Ígneo`,
    torchSong:         `Canto Ardiente`,
    armorCannon:       `Cañón Armadura`,
    mindBlown:         `Cabeza Ígnea`,
    overheat:          `Sofoco`,
    willOWisp:         `Fuego Fatuo`,
    sunnyDay:          `Día Soleado`,
    morningSun:        `Sol Matinal`,
    scorchingSands:    `Arenas Ardientes`,
    sandsearStorm:     `Tormenta Arenisca`,

    /* --- Agua --- */
    waterGun:          `Pistola Agua`,
    bubbleBeam:        `Rayo Burbuja`,
    hydroPump:         `Hidrobomba`,
    surf:              `Surf`,
    waterfall:         `Cascada`,
    aquaJet:           `Acua Jet`,
    aquaTail:          `Cola Acuática`,
    aquaStep:          `Danza Acuática`,
    waterPulse:        `Hidropulso`,
    waterShuriken:     `Shuriken de Agua`,
    scald:             `Escaldar`,
    liquidation:       `Hidroariete`,
    razorShell:        `Concha Filo`,
    crabhammer:        `Martillazo`,
    clamp:             `Tenaza`,
    whirlpool:         `Torbellino`,
    muddyWater:        `Agua Lodosa`,
    hydroCannon:       `Hidrocañón`,
    spacialRend:       `Corte Vacío`,
    sparklingAria:     `Aria Burbuja`,
    waveCrash:         `Envite Acuático`,
    fishiousRend:      `Branquibocado`,
    jetPunch:          `Puño Torrente`,
    chillingWater:     `Agua Fría`,
    foamShot:          `Disparo Espuma`,
    sharkJaws:         `Fauces de Tiburón`,
    soak:              `Empapar`,
    rainDance:         `Danza Lluvia`,
    mudSport:          `Chapoteo Lodo`,

    /* --- Planta --- */
    vineWhip:          `Látigo Cepa`,
    razorLeaf:         `Hoja Afilada`,
    leafage:           `Follaje`,
    magicalLeaf:       `Hoja Mágica`,
    leafBlade:         `Hoja Aguda`,
    solarBeam:         `Rayo Solar`,
    solarBlade:        `Filo Solar`,
    energyBall:        `Energibola`,
    seedBomb:          `Bomba Germen`,
    bulletSeed:        `Semilladora`,
    leafStorm:         `Lluevehojas`,
    frenzyPlant:       `Planta Feroz`,
    appleAcid:         `Ácido Málico`,
    drumBeating:       `Batería Asalto`,
    chloroblast:       `Cloroexplosión`,
    seedFlare:         `Destello Semilla`,
    needleArm:         `Brazo Pincho`,
    tropKick:          `Patada Tropical`,
    grassyTerrain:     `Campo de Hierba`,
    forestCurse:       `Maldición Silvana`,
    cottonSpore:       `Esporagodón`,
    stunSpore:         `Paralizador`,
    poisonPowder:      `Polvo Veneno`,
    spore:             `Espora`,
    ragePowder:        `Polvo Ira`,
    magicPowder:       `Polvo Mágico`,
    stringShot:        `Disparo Demora`,
    wrathOfTheLand:    `Ira de la Tierra`,

    /* --- Eléctrico --- */
    thunderShock:      `Impactrueno`,
    thunderbolt:       `Rayo`,
    thunder:           `Trueno`,
    thunderPunch:      `Puño Trueno`,
    thunderFang:       `Colmillo Rayo`,
    thunderWave:       `Onda Trueno`,
    discharge:         `Chispazo`,
    electroBall:       `Bola Voltio`,
    electroWeb:        `Electrotela`,
    chargeBeam:        `Rayo Carga`,
    charge:            `Carga`,
    wildCharge:        `Voltio Cruel`,
    voltTackle:        `Placaje Eléctrico`,
    voltSwitch:        `Voltiocambio`,
    uTurn:             `Ida y Vuelta`,
    zapCannon:         `Electrocañón`,
    zingZap:           `Zumbido Eléctrico`,
    boltStrike:        `Ataque Fulgor`,
    thunderCage:       `Electrojaula`,
    thunderousKick:    `Patada Relámpago`,
    supercellSlam:     `Impacto Eléctrico`,
    nuzzle:            `Moflete Estático`,
    electricTerrain:   `Campo Eléctrico`,
    electrify:         `Electrificación`,
    ionise:            `Ionización`,
    auraWheel:         `Rueda Aural`,

    /* --- Hielo --- */
    powderSnow:        `Nieve Polvo`,
    iceBeam:           `Rayo Hielo`,
    blizzard:          `Ventisca`,
    icePunch:          `Puño Hielo`,
    iceFang:           `Colmillo Hielo`,
    iceShard:          `Esquirla Helada`,
    icicleSpear:       `Carámbano`,
    icicleCrash:       `Chuzos`,
    iceHammer:         `Martillo Hielo`,
    iceBall:           `Bola Hielo`,
    icyWind:           `Viento Hielo`,
    frostBreath:       `Aliento Hielo`,
    freezeDry:         `Liofilización`,
    freezyFrost:       `Gélido Manto`,
    freezingGlare:     `Mirada Heladora`,
    avalanche:         `Alud`,
    glaciate:          `Glaciación`,  // colisiona con la habilidad homónima
    mountainGale:      `Cellisca`,
    tripleAxel:        `Triple Axel`,
    tripleDive:        `Triple Inmersión`,
    hail:              `Granizo`,
    snowscape:         `Paisaje Nevado`,
    chillyReception:   `Bromita Helada`,

    /* --- Lucha --- */
    armThrust:         `Empujón`,
    brickBreak:        `Demolición`,
    closeCombat:       `A Bocajarro`,
    crossChop:         `Tajo Cruzado`,
    dynamicPunch:      `Puño Dinámico`,
    machPunk:          `Puño Mach`,
    bulletPunch:       `Puño Bala`,
    powerupPunch:      `Puño Incremento`,
    focusBlast:        `Onda Certera`,
    auraSphere:        `Esfera Aural`,
    vacuumWave:        `Onda Vacío`,
    forcePalm:         `Palma Fuerza`,
    hiJumpKick:        `Patada Salto Alta`,
    lowSweep:          `Patada Baja`,
    skyUppercut:       `Gancho Alto`,
    stormThrow:        `Llave Corsé`,
    superpower:        `Fuerza Bruta`,
    flyingPress:       `Plancha Voladora`,
    rockSmash:         `Golpe Roca`,
    hammerArm:         `Machada`,
    meteorAssault:     `Asalto Estelar`,
    auroraPunch:       `Puño Aurora`,
    auroraBeam:        `Rayo Aurora`,
    rageFist:          `Puño Furia`,
    firstImpression:   `Escaramuza`,

    /* --- Veneno --- */
    poisonSting:       `Picotazo Venenoso`,
    acid:              `Ácido`,
    acidSpray:         `Bomba Ácida`,
    sludge:            `Residuos`,
    sludgeBomb:        `Bomba Lodo`,
    sludgeWave:        `Onda Tóxica`,
    smog:              `Polución`,
    poisonJab:         `Puya Nociva`,
    poisonFang:        `Colmillo Veneno`,
    poisonTail:        `Cola Veneno`,
    poisonClaw:        `Garra Tóxica`,
    crossPoison:       `Veneno X`,
    venoshock:         `Carga Tóxica`,
    barbBarrage:       `Ráfaga Púas`,
    noxiousTorque:     `Giro Ponzoñoso`,
    savageStinger:     `Aguijón Salvaje`,
    toxic:             `Tóxico`,
    toxicThread:       `Hilo Venenoso`,

    /* --- Tierra --- */
    mudSlap:           `Bofetón Lodo`,
    mudShot:           `Disparo Lodo`,
    earthquake:        `Terremoto`,
    earthPower:        `Tierra Viva`,
    dig:               `Excavar`,
    bulldoze:          `Terratemblor`,
    magnitude:         `Magnitud`,
    highHorsepower:    `Fuerza Equina`,
    headlongRush:      `Arremetida`,
    boneRush:          `Ataque Óseo`,
    sandstorm:         `Tormenta de Arena`,

    /* --- Volador --- */
    peck:              `Picotazo`,
    drillPeck:         `Pico Taladro`,
    gust:              `Tornado`,
    airShlash:         `Tajo Aéreo`,
    braveBird:         `Pájaro Osado`,
    hurricane:         `Vendaval`,
    fly:               `Vuelo`,
    bounce:            `Bote`,
    skyDrop:           `Caída Libre`,
    acrobatics:        `Acrobacia`,
    dualWingbeat:      `Ala Bis`,
    beakBlast:         `Pico Cañón`,
    aeroblast:         `Aerochorro`,
    dragonAscent:      `Ascenso Draco`,
    razorTalons:       `Garras Afiladas`,
    tailwind:          `Viento Afín`,
    fog:               `Niebla`,
    ominousWind:       `Viento Aciago`,
    silverWind:        `Viento Plata`,

    /* --- Psíquico --- */
    confusion:         `Confusión`,
    psybeam:           `Psicorrayo`,
    psychic:           `Psíquico`,
    psychoCut:         `Psicocorte`,
    psychoBoost:       `Psicoimpulso`,
    psychicFangs:      `Psicocolmillo`,
    zenHeadbut:        `Cabezazo Zen`,
    psyshieldBash:     `Asalto Psi`,
    extrasensory:      `Paranormal`,
    futureSight:       `Premonición`,
    doomDesire:        `Deseo Oculto`,
    lusterPurge:       `Resplandor`,
    mistBall:          `Bola Neblina`,
    prismaticLaser:    `Láser Prisma`,
    luminaCrash:       `Fotocolisión`,
    mysticalPower:     `Poder Místico`,
    kinesis:           `Kinético`,
    mistyTerrain:      `Campo de Niebla`,
    trickRoom:         `Espacio Raro`,
    weirdRoom:         `Zona Extraña`,
    crossRoom:         `Zona Cruzada`,
    lunarDance:        `Danza Lunar`,
    moongeistBeam:     `Rayo Umbrío`,
    sunsteelStrike:    `Meteoimpacto`,
    meteorBeam:        `Rayo Meteórico`,

    /* --- Bicho --- */
    bugBite:           `Picadura`,
    bugBuzz:           `Zumbido`,
    signalBeam:        `Rayo Señal`,
    xScissor:          `Tijera X`,
    furyCutter:        `Corte Furia`,
    megahorn:          `Megacuerno`,
    pinMissile:        `Misil Aguja`,
    twineedle:         `Doble Ataque`,
    attackOrder:       `Al Ataque`,
    struggleBug:       `Estoicismo`,
    infestation:       `Acoso`,
    stickyWeb:         `Red Viscosa`,

    /* --- Roca --- */
    rockThrow:         `Lanzarrocas`,
    rockSlide:         `Avalancha`,
    rockBlast:         `Pedrada`,
    rockTomb:          `Tumba Rocas`,
    rockWrecker:       `Romperrocas`,
    stoneEdge:         `Roca Afilada`,
    ancientPower:      `Poder Pasado`,
    powerGem:          `Joya de Luz`,
    accelerock:        `Roca Veloz`,
    smackDown:         `Antiaéreo`,
    rollout:           `Desenrollar`,
    gemstoneCrush:     `Trituragemas`,

    /* --- Fantasma --- */
    lick:              `Lengüetazo`,
    shadowBall:        `Bola Sombra`,
    shadowClaw:        `Garra Umbría`,
    shadowPunch:       `Puño Sombra`,
    shadowSneak:       `Sombra Vil`,
    shadowForce:       `Golpe Umbrío`,
    phantomForce:      `Golpe Fantasma`,
    spectralThief:     `Robasombra`,
    spiritBreak:       `Choque Anímico`,
    hex:               `Infortunio`,
    confuseRay:        `Rayo Confuso`,
    trickOrTreat:      `Halloween`,
    mirrorShrapnel:    `Metralla Espejo`,

    /* --- Dragón --- */
    dragonBreath:      `Dragoaliento`,
    dragonClaw:        `Garra Dragón`,
    dragonPulse:       `Pulso Dragón`,
    dragonRush:        `Carga Dragón`,
    dragonTail:        `Cola Dragón`,
    dragonDance:       `Danza Dragón`,
    dragonDarts:       `Dracoflechas`,
    dragonEnergy:      `Dracoenergía`,
    dracoMeteor:       `Cometa Draco`,
    outrage:           `Enfado`,
    twister:           `Ciclón`,
    clangingScales:    `Fragor Escamas`,
    scaleShot:         `Ráfaga Escamas`,
    roarOfTime:        `Distorsión`,
    dualChop:          `Golpe Bis`,
    hyperDrill:        `Hipertaladro`,
    magicalTorque:     `Giro Feérico`,

    /* --- Siniestro --- */
    bite:              `Mordisco`,
    crunch:            `Triturar`,
    darkPulse:         `Pulso Umbrío`,
    nightSlash:        `Tajo Umbrío`,
    nightDaze:         `Pulso Noche`,
    feintAttack:       `Finta`,
    pursuit:           `Persecución`,
    knockOff:          `Desarme`,
    snarl:             `Alarido`,
    brutalSwing:       `Giro Vil`,
    darkestLariat:     `Lariat Oscuro`,
    falseSurrender:    `Reverencia Aciaga`,
    snipeShot:         `Disparo Certero`,
    ruination:         `Fatalidad`,
    brutalClaw:        `Garra Brutal`,
    lovelyKiss:        `Beso Amoroso`,

    /* --- Acero --- */
    metalClaw:         `Garra Metal`,
    ironHead:          `Cabeza de Hierro`,
    ironTail:          `Cola Férrea`,
    steelWing:         `Ala de Acero`,
    flashCannon:       `Foco Resplandor`,
    magnetBomb:        `Bomba Imán`,
    mirrorShot:        `Disparo Espejo`,
    anchorShot:        `Anclaje`,
    bitterBlade:       `Hoja Amarga`,
    ironSlug:          `Proyectil Férreo`,
    kingsShield:       `Escudo Real`,

    /* --- Hada --- */
    fairyWind:         `Viento Feérico`,
    dazzlingGleam:     `Brillo Mágico`,
    moonblast:         `Fuerza Lunar`,
    drainingKiss:      `Beso Drenaje`,
    playRough:         `Carantoña`,
    disarmingVoice:    `Voz Cautivadora`,
    alluringVoice:     `Voz Seductora`,
    lightOfRuin:       `Luz Aniquiladora`,
    floralHealing:     `Cura Floral`,
    aromaticMist:      `Bruma Aromática`,
    sweetKiss:         `Beso Dulce`,
    fairyLock:         `Cerrojo Feérico`,
    chatter:           `Cháchara`,
    twinBeam:          `Doble Rayo`,
};


/* ---------------------------------------------------------------- TIPOS */

ES.tipo = {
    normal: `Normal`,   fire:    `Fuego`,     water:   `Agua`,
    electric: `Eléctrico`, grass: `Planta`,   ice:     `Hielo`,
    fighting: `Lucha`,  poison:  `Veneno`,    ground:  `Tierra`,
    flying: `Volador`,  psychic: `Psíquico`,  bug:     `Bicho`,
    rock:   `Roca`,     ghost:   `Fantasma`,  dragon:  `Dragón`,
    dark:   `Siniestro`, steel:  `Acero`,     fairy:   `Hada`,
    stellar: `Astral`,
};


/* -------------------------------------------------------------- OBJETOS */

ES.item = {

    /* --- Equipables: potenciadores de tipo --- */
    blackBelt:         `Cinturón Negro`,
    blackGlasses:      `Gafas de Sol`,
    charcoal:          `Carbón`,
    dragonFang:        `Colmillo Dragón`,
    fairyFeather:      `Pluma Feérica`,
    hardStone:         `Piedra Dura`,
    magnet:            `Imán`,
    metalCoat:         `Revestimiento Metálico`,
    miracleSeed:       `Semilla Milagro`,
    mysticWater:       `Agua Mística`,
    neverMeltIce:      `Antiderretir`,
    poisonBarb:        `Flecha Venenosa`,
    sharpBeak:         `Pico Afilado`,
    silkScarf:         `Pañuelo Seda`,
    silverPowder:      `Polvo Plata`,
    softSand:          `Arena Fina`,
    spellTag:          `Hechizo`,
    twistedSpoon:      `Cuchara Torcida`,

    /* --- Equipables: combate --- */
    lifeOrb:           `Vidasfera`,
    choiceBand:        `Cinta Elegida`,
    choiceSpecs:       `Gafas Elegidas`,
    assaultVest:       `Chaleco Asalto`,
    weaknessPolicy:    `Seguro Debilidad`,
    leftovers:         `Restos`,
    flameOrb:          `Piedra Llama`,
    toxicOrb:          `Piedra Tóxica`,
    quickClaw:         `Garra Rápida`,
    luckyPunch:        `Puño Suerte`,
    loadedDice:        `Dado Trucado`,
    laggingTail:       `Cola Plúmbea`,
    ejectButton:       `Botón Escape`,
    ejectPack:         `Mochila Escape`,
    lightClay:         `Refleluz`,
    mentalHerb:        `Hierba Mental`,
    powerHerb:         `Hierba Única`,
    clearAmulet:       `Amuleto Puro`,
    heavyDutyBoots:    `Botas Gruesas`,
    destinyKnot:       `Lazo Destino`,
    everstone:         `Piedra Eterna`,
    eviolite:          `Mineral Evolutivo`,
    metronome:         `Metrónomo`,
    luckIncense:       `Incienso Suerte`,
    pureIncense:       `Incienso Puro`,
    luckyEgg:          `Huevo Suerte`,
    shinyCharm:        `Amuleto Iris`,
    machoBrace:        `Brazal Firme`,
    terrainExtender:   `Cubresuelos`,

    /* --- Equipables: rocas y semillas de clima --- */
    dampRock:          `Roca Lluvia`,
    heatRock:          `Roca Calor`,
    icyRock:           `Roca Helada`,
    smoothRock:        `Roca Suave`,
    articRock:         `Roca Ártica`,
    oddRock:           `Roca Extraña`,
    thunderousRock:    `Roca Atronadora`,
    electricSeed:      `Semilla Eléctrica`,
    grassySeed:        `Semilla Hierba`,
    mistySeed:         `Semilla Niebla`,
    foggySeed:         `Semilla Niebla Densa`,

    /* --- Equipables: potenciadores de EV --- */
    powerAnklet:       `Franja Poder`,
    powerBand:         `Banda Poder`,
    powerBelt:         `Cinto Poder`,
    powerBracer:       `Brazal Poder`,
    powerLens:         `Lente Poder`,
    powerWeight:       `Pesa Poder`,

    /* --- Vitaminas y potenciadores --- */
    hpUp:              `Más PS`,
    protein:           `Proteína`,
    iron:              `Hierro`,
    calcium:           `Calcio`,
    zinc:              `Zinc`,
    carbos:            `Carburante`,
    rareCandy:         `Caramelo Raro`,
    timeCandy:         `Caramelo Temporal`,
    timeCandyXL:       `Caramelo Temporal XL`,
    bottleCap:         `Chapa Plateada`,
    goldenBottleCap:   `Chapa Dorada`,
    abilityCapsule:    `Cápsula Habilidad`,
    abilityPatch:      `Parche Habilidad`,
    neutralMint:       `Menta Neutra`,
    energyRoot:        `Raíz Energía`,
    oldGateau:         `Tarta Antigua`,
    heartScale:        `Escama Corazón`,

    /* --- Piedras evolutivas --- */
    fireStone:         `Piedra Fuego`,
    waterStone:        `Piedra Agua`,
    thunderStone:      `Piedra Trueno`,
    leafStone:         `Piedra Hoja`,
    moonStone:         `Piedra Lunar`,
    sunStone:          `Piedra Solar`,
    shinyStone:        `Piedra Día`,
    duskStone:         `Piedra Noche`,
    dawnStone:         `Piedra Alba`,
    iceStone:          `Piedra Hielo`,
    ovalStone:         `Piedra Oval`,
    linkStone:         `Piedra Enlace`,
    ancientOrchid:     `Orquídea Ancestral`,
    epochFeather:      `Pluma del Tiempo`,
    prettyDewdrop:     `Rocío Precioso`,
    wisdomPetal:       `Pétalo de Sabiduría`,
    mysteryEgg:        `Huevo Misterioso`,
    redChain:          `Cadena Roja`,
    pokeflute:         `Poké Flauta`,

    /* --- Megapiedras --- */
    abomasite:         `Abomasnowita`,
    absolite:          `Absolita`,
    aerodactylite:     `Aerodactylita`,
    aggronite:         `Aggronita`,
    alakazite:         `Alakazamita`,
    altarianite:       `Altarianita`,
    ampharosite:       `Ampharosita`,
    audinite:          `Audinita`,
    banettite:         `Banetita`,
    barbaracite:       `Barbaraclita`,
    baxcaliburite:     `Baxcaliburita`,
    beedrillite:       `Beedrillita`,
    blastoisinite:     `Blastoisita`,
    blazikenite:       `Blazikenita`,
    cameruptite:       `Cameruptita`,
    charizarditeX:     `Charizardita X`,
    charizarditeY:     `Charizardita Y`,
    diancite:          `Diancita`,
    dragonitite:       `Dragonitita`,
    falinksite:        `Falinksita`,
    galladite:         `Galladita`,
    garchompite:       `Garchompita`,
    gardevoirite:      `Gardevoirita`,
    gengarite:         `Gengarita`,
    glalitite:         `Glalita`,
    gyaradosite:       `Gyaradosita`,
    hawluchanite:      `Hawluchanita`,
    heracronite:       `Heracrossita`,
    houndoominite:     `Houndoomita`,
    kangaskhanite:     `Kangaskhanita`,
    lopunnite:         `Lopunnita`,
    lucarionite:       `Lucarita`,
    manectite:         `Manectricita`,
    mawilite:          `Mawilita`,
    medichamite:       `Medichamita`,
    metagrossite:      `Metagrossita`,
    mewtwoniteX:       `Mewtwoita X`,
    mewtwoniteY:       `Mewtwoita Y`,
    pidgeotite:        `Pidgeotita`,
    pinsirite:         `Pinsirita`,
    pyroarite:         `Pyroarita`,
    raichutiteX:       `Raichutita X`,
    raichutiteY:       `Raichutita Y`,
    sablenite:         `Sableynita`,
    salamencite:       `Salamencita`,
    sceptilite:        `Sceptilita`,
    scizorite:         `Scizorita`,
    sharpedonite:      `Sharpedonita`,
    slowbronite:       `Slowbronita`,
    steelixite:        `Steelixita`,
    swampertite:       `Swampertita`,
    tyranitarite:      `Tyranitarita`,
    venusaurite:       `Venusaurita`,

    /* --- Bayas reductoras de daño --- */
    babiriBerry:       `Baya Baribá`,
    chartiBerry:       `Baya Alcho`,
    chopleBerry:       `Baya Chilan`,
    cobaBerry:         `Baya Kouba`,
    colburBerry:       `Baya Ispera`,
    habanBerry:        `Baya Kambur`,
    kasibBerry:        `Baya Kasib`,
    kebiaBerry:        `Baya Kebia`,
    occaBerry:         `Baya Caqui`,
    passhoBerry:       `Baya Pasio`,
    payapaBerry:       `Baya Payapa`,
    rindoBerry:        `Baya Tamar`,
    roseliBerry:       `Baya Rosel`,
    shucaBerry:        `Baya Acardo`,
    tangaBerry:        `Baya Tanga`,
    wacanBerry:        `Baya Wacan`,
    yacheBerry:        `Baya Yecana`,

    /* --- Bonguris --- */
    blackApricorn:     `Bonguri Negro`,
    greenApricorn:     `Bonguri Verde`,
    pinkApricorn:      `Bonguri Rosa`,
    whiteApricorn:     `Bonguri Blanco`,
    yellowApricorn:    `Bonguri Amarillo`,

    /* --- Llaves y objetos clave --- */
    aetherKeycard:     `Tarjeta Aether`,
    ancientKeystone:   `Piedra Clave Ancestral`,
    frozenKeystone:    `Piedra Clave Helada`,
    steelKeystone:     `Piedra Clave de Acero`,
    primalEarth:       `Tierra Primigenia`,
    futureContraption: `Artilugio del Futuro`,
    futureDisk:        `Disco del Futuro`,
    wormholeResidue:   `Residuo de Ultraumbral`,
    battlePass:        `Pase de Combate`,
    festivalTicket:    `Entrada de Festival`,
    autoRefightTicket: `Ticket de Revancha Automática`,
    magazineSubscription: `Suscripción a la Revista`,
    fashionCase:       `Neceser`,
    lockCapsule:       `Cápsula Candado`,
    replicatorUpgradeE:`Mejora del Replicador E`,
    replicatorUpgradeS:`Mejora del Replicador S`,
    pokeballFlag:      `Bandera Poké Ball`,
    wealthyCoins:      `Monedas de Fortuna`,
    megaShard:         `Fragmento Mega`,
    megaPiece:         `Pieza Mega`,
    megaChunk:         `Trozo Mega`,
    megaCluster:       `Cúmulo Mega`,
    pinkMushroom:      `Seta Rosa`,
    nothing:           `Nada`,
    tmDummy:           `MT`,


    /* --- Cristales Z (mantienen su nombre en español) --- */
    normaliumZ:        `Normalium Z`,
    firiumZ:           `Firium Z`,
    wateriumZ:         `Waterium Z`,
    electriumZ:        `Electrium Z`,
    grassiumZ:         `Grassium Z`,
    iciumZ:            `Icium Z`,
    fightiniumZ:       `Fightinium Z`,
    poisoniumZ:        `Poisonium Z`,
    groundiumZ:        `Groundium Z`,
    flyiniumZ:         `Flyinium Z`,
    psychiumZ:         `Psychium Z`,
    buginiumZ:         `Buginium Z`,
    rockiumZ:          `Rockium Z`,
    ghostiumZ:         `Ghostium Z`,
    dragoniumZ:        `Dragonium Z`,
    darkiniumZ:        `Darkinium Z`,
    steeliumZ:         `Steelium Z`,
    fairiumZ:          `Fairium Z`,

    /* --- Decoración --- */
    academicHat:       `Birrete`,
    chefHat:           `Gorro de Chef`,
    gentlemanHat:      `Sombrero de Caballero`,
    professorHat:      `Sombrero de Profesor`,
    topHat:            `Chistera`,
    witchyHat:         `Sombrero de Bruja`,
    silverTiara:       `Tiara Plateada`,
    blackBowtie:       `Pajarita Negra`,
    blueBowtie:        `Pajarita Azul`,
    pinkBowtie:        `Pajarita Rosa`,
    yellowBowtie:      `Pajarita Amarilla`,
    blackTie:          `Corbata Negra`,
    blueTie:           `Corbata Azul`,
    greenTie:          `Corbata Verde`,
    orangeTie:         `Corbata Naranja`,
    stripedTie:        `Corbata de Rayas`,
    whiteTie:          `Corbata Blanca`,
    blackScarf:        `Bufanda Negra`,
    blueScarf:         `Bufanda Azul`,
    redScarf:          `Bufanda Roja`,
    whiteScarf:        `Bufanda Blanca`,
    blackSpecs:        `Gafas Negras`,
    googlySpecs:       `Gafas Saltonas`,
    gorgeousSpecs:     `Gafas Elegantes`,
    blackMoustache:    `Bigote Negro`,
    whiteMoustache:    `Bigote Blanco`,
    fluffyBeard:       `Barba Esponjosa`,
    blueBarrette:      `Pasador Azul`,
    greenBarrette:     `Pasador Verde`,
    pinkBarrette:      `Pasador Rosa`,
    greenHeadband:     `Cinta Verde`,
    tealHeadband:      `Cinta Turquesa`,
    yellowHeadband:    `Cinta Amarilla`,
    purpleHeaddress:   `Tocado Morado`,
    redHeaddress:      `Tocado Rojo`,
    tealHeaddress:     `Tocado Turquesa`,
    blueBall:          `Pelota Azul`,
    greenBall:         `Pelota Verde`,
    redBall:           `Pelota Roja`,
    blueBalloon:       `Globo Azul`,
    greenBalloon:      `Globo Verde`,
    redBalloon:        `Globo Rojo`,
    yellowStarBalloon: `Globo Estrella`,
    redStar:           `Estrella Roja`,
    yellowStar:        `Estrella Amarilla`,
    tealStar:          `Estrella Turquesa`,
    blueFlower:        `Flor Azul`,
    purpleFlower:      `Flor Morada`,
    redFlower:         `Flor Roja`,
    coloredParasol:    `Sombrilla de Colores`,
    oldUmbrella:       `Paraguas Viejo`,
    frillyApron:       `Delantal con Volantes`,
    microphone:        `Micrófono`,
    hummingNote:       `Nota Musical`,
    spotlight:         `Foco`,
    confetti:          `Confeti`,
    glitterPowder:     `Purpurina`,
    mysticSmoke:       `Humo Místico`,
    comet:             `Cometa`,
};


/* -------------------------------------------------------------------------
   Objetos derivados: se generan a partir de los nombres ya traducidos.

     <idMovimiento>Tm      ->  "MT <movimiento>"      (105 objetos)
     <idHabilidad>Memory   ->  "Disco <habilidad>"    (103 objetos)
     <tipo>Gem             ->  "Gema <tipo>"          ( 18 objetos)

   Así, al traducir un movimiento o una habilidad, su MT o su Disco quedan
   traducidos solos y siempre coherentes. Una entrada manual en ES.item
   siempre tiene prioridad sobre la generada.
   ------------------------------------------------------------------------- */

(function generarObjetosDerivados() {
    if (typeof item === 'undefined') return;

    for (const id in item) {
        if (ES.item[id] !== undefined) continue;

        let m;
        if ((m = id.match(/^(.+)Tm$/)) && ES.move[m[1]]) {
            ES.item[id] = `MT ${ES.move[m[1]]}`;
        } else if ((m = id.match(/^(.+)Memory$/)) && ES.ability[m[1]]) {
            ES.item[id] = `Disco ${ES.ability[m[1]]}`;
        } else if ((m = id.match(/^(.+)Gem$/)) && ES.tipo[m[1]]) {
            ES.item[id] = `Gema ${ES.tipo[m[1]]}`;
        }
    }
})();


/* ---------------------------------------------------------------- ÁREAS */

ES.areas = {

    /* --- Zonas salvajes --- */
    verdantForest:     `Bosque Verdeante`,
    foggyGraveyard:    `Cementerio Neblinoso`,
    woodlandConcert:   `Concierto del Bosque`,
    mantleCore:        `Núcleo del Manto`,
    fidoPark:          `Parque Canino`,
    citySewers:        `Alcantarillado`,
    activeVolcano:     `Volcán Activo`,
    powerPlant:        `Central Eléctrica`,
    quietMeadow:       `Pradera Tranquila`,
    urbanWalkway:      `Paseo Urbano`,
    sandyDunes:        `Dunas de Arena`,
    sunkenShip:        `Barco Hundido`,
    offshoreRigger:    `Plataforma Marina`,
    safariZone:        `Zona Safari`,
    coolBeach:         `Playa Fresca`,
    computeringLab:    `Laboratorio Informático`,
    gemstoneCavern:    `Caverna de Gemas`,
    frozenLake:        `Lago Helado`,
    abandonedManor:    `Mansión Abandonada`,
    dracoLair:         `Guarida Draco`,
    mountainTrail:     `Sendero de Montaña`,
    teaParlor:         `Salón de Té`,
    pokemonDojo:       `Dojo Pokémon`,
    skyHigh:           `Cielo Abierto`,
    dankCave:          `Cueva Húmeda`,
    forestShrine:      `Santuario del Bosque`,
    streetCircus:      `Circo Callejero`,
    weaponsFacility:   `Fábrica de Armas`,
    scorchingBadlands: `Yermo Abrasador`,
    lavaLake:          `Lago de Lava`,
    crashingSeaside:   `Costa Brava`,
    strangeSpace:      `Espacio Extraño`,
    chargestoneCave:   `Cueva Electroroca`,
    seafoamCurrents:   `Corrientes Espuma`,
    valorLakeside:     `Orilla del Lago Valor`,
    thornwoodForest:   `Bosque Espinoso`,
    unovaWorks:        `Fábrica de Teselia`,
    snowpointCliff:    `Acantilado Puntaneva`,
    hollowNest:        `Nido Hueco`,
    poniCanyon:        `Cañón Poni`,
    seaBed:            `Lecho Marino`,
    lonLonRanch:       `Rancho Lon Lon`,
    saruTemple:        `Templo Saru`,
    evilSummit:        `Cumbre Siniestra`,
    fuegoIronworks:    `Herrería Fuego`,
    permafrostGrotto:  `Gruta de Permafrost`,
    berryForest:       `Bosque de Bayas`,
    relicPassage:      `Pasaje Ancestral`,

    /* --- Mazmorras --- */
    sinnohUndergroundI:   `Subsuelo de Sinnoh I`,
    sinnohUndergroundII:  `Subsuelo de Sinnoh II`,
    sinnohUndergroundIII: `Subsuelo de Sinnoh III`,
    beginnerDojoI:        `Dojo Principiante I`,
    beginnerDojoII:       `Dojo Principiante II`,
    beginnerDojoIII:      `Dojo Principiante III`,
    advancedDojoI:        `Dojo Avanzado I`,
    advancedDojoII:       `Dojo Avanzado II`,
    advancedDojoIII:      `Dojo Avanzado III`,
    expertDojoI:          `Dojo Experto I`,
    expertDojoII:         `Dojo Experto II`,
    expertDojoIII:        `Dojo Experto III`,
    victoryRoadI:         `Calle Victoria I`,
    victoryRoadII:        `Calle Victoria II`,
    victoryRoadIII:       `Calle Victoria III`,
    glisteringCaveI:      `Cueva Reluciente I`,
    glisteringCaveII:     `Cueva Reluciente II`,
    glisteringCaveIII:    `Cueva Reluciente III`,
    sunkenTempleI:        `Templo Sumergido I`,
    sunkenTempleII:       `Templo Sumergido II`,
    sunkenTempleIII:      `Templo Sumergido III`,

    /* --- Eventos sin nombre propio --- */
    cosplayConvention:    `Convención de Cosplay`,
    suspiciousManor:      `Mansión Sospechosa`,
    summitOfSeasons:      `Cumbre de las Estaciones`,
    ceruleanCave:         `Cueva Celeste`,
    lamodeDogwalk:        `Paseo Canino de Moda`,
    primitiveGrove:       `Arboleda Primitiva`,
    zoologyLab:           `Laboratorio de Zoología`,
    primalFissure:        `Fisura Primigenia`,
    exoticPond:           `Estanque Exótico`,
    meteorCave:           `Cueva Meteorito`,
    ancientTomb:          `Tumba Ancestral`,
    steelTomb:            `Tumba de Acero`,
    paupauFestival:       `Festival Paupau`,
    flowerMeadow:         `Pradera Florida`,
    aetherHeadquarters:   `Cuartel General Aether`,
    wormholeSpace:        `Espacio de Ultraumbral`,
    ecosphere:            `Ecosfera`,
    protonCity:           `Ciudad Protón`,
    climatologyLab:       `Laboratorio de Climatología`,
    fusionPlant:          `Planta de Fusión`,
    alphaRuins:           `Ruinas Alfa`,
    lakeValor:            `Lago Valor`,
    galacticWarehouse:    `Almacén Galaxia`,
    galacticHeadquarters: `Cuartel General Galaxia`,

    /* --- Dimensiones --- */
    dimensionPalkia:       `Dimensión Palkia`,
    dimensionPikachuGmax:  `Dimensión Pikachu Gigamax`,
    dimensionKyuremWhite:  `Dimensión Kyurem Blanco`,
    dimensionMegaRayquaza: `Dimensión Mega-Rayquaza`,

    /* --- Frontera de Combate --- */
    frontierSpiralingTower: `Torre Espiral`,
    frontierBattleFactory:  `Fábrica de Combate`,

    /* --- Varios --- */
    trickyForest:      `Bosque Travieso`,
    wildlifePark:      `Parque Natural`,
    training:          `Entrenamiento`,
    missingArea:       `Área Perdida`,
    studioA:           `Estudio A`,
    secretGhost:       `Secreto: Fantasma`,
    secretOnix:        `Secreto: Onix`,
    secretHumanoid:    `Secreto: Humanoide`,
    secretAerodactly:  `Secreto: Aerodactyl`,
    secretKabutops:    `Secreto: Kabutops`,
};


/* -------------------------------------------------------------------------
   Títulos de entrenador y sustantivos de lugar.

   Los nombres de las áreas `vs` y `event` no pasan por format(): el juego lee
   `areas[id].name` directamente. Como siguen patrones muy regulares
   ("Gym Leader X", "X Mega-Showdown", "X Revival"...), se traducen por reglas
   y no uno a uno. Lo que las reglas no cubran se pone en ES.nombreArea.
   ------------------------------------------------------------------------- */

ES.titulo = {
    'Youngster':         `Joven`,
    'Aroma Lady':        `Dama del Aroma`,
    'Bug Catcher':       `Cazabichos`,
    'Black Belt':        `Cinturón Negro`,
    'School Kid':        `Colegial`,
    'Swimmer':           `Nadador`,
    'Veteran':           `Veterano`,
    'Clown':             `Payaso`,
    'Twin Trainers':     `Entrenadoras Gemelas`,
    'Ace Trainer':       `Entrenador Guay`,
    'Gym Leader':        `Líder de Gimnasio`,
    'Elite Trainer':     `Entrenador de Élite`,
    'Elite Four':        `Alto Mando`,
    'Team Leader':       `Líder de Equipo`,
    'Master Trainer':    `Entrenador Maestro`,
    'Legend Trainer':    `Entrenador Legendario`,
    'Ultra Entity':      `Entidad Ultra`,
    'Pokemon Professor': `Profesor Pokémon`,
    'Rocket Grunt':      `Recluta Rocket`,
};

ES.lugar = {
    'Mega-Showdown': `Megaduelo`,
    'Revival':       `Resurrección`,
    'Shrine':        `Santuario`,
    'Roost':         `Nido`,
    'Cavern':        `Caverna`,
    'Tomb':          `Tumba`,
    'Reality':       `Realidad`,
    'Ruins':         `Ruinas`,
    'Trench':        `Fosa`,
    'Tower':         `Torre`,
    'Space':         `Espacio`,
    'Plains':        `Llanura`,
    'Nebula':        `Nebulosa`,
    'Mountain':      `Montaña`,
    'Meadow':        `Pradera`,
    'Lair':          `Guarida`,
    'Lab':           `Laboratorio`,
    'Den':           `Cubil`,
    'Cloudscape':    `Mar de Nubes`,
    'Volcano':       `Volcán`,
};

// Nombres que las reglas no cubren
ES.nombreArea = {
    'Weak Dimensional Rift':     `Fisura Dimensional Débil`,
    'Dimensional Rift':          `Fisura Dimensional`,
    'Savage Dimensional Rift':   `Fisura Dimensional Salvaje`,
    'Critical Dimensional Rift': `Fisura Dimensional Crítica`,
    'Strange Wormhole':          `Ultraumbral Extraño`,
    'Spooky Encounter':          `Encuentro Escalofriante`,
    // "Strange Space" caería en la regla de sufijo "Space" y daría
    // "Espacio de Strange"; aquí "Strange" es adjetivo, no nombre propio.
    'Strange Space':             `Espacio Extraño`,
};


/* -------------------------------------------------------------------------
   Aplicación: sobrescribe areas[id].name y rellena ES.areas para la Frontera.
   ------------------------------------------------------------------------- */

(function traducirNombresDeArea() {
    if (typeof areas === 'undefined') return;

    // La Frontera muestra solo el nombre del entrenador: frontierMorty -> "Morty"
    for (const id in areas) {
        if (!/^frontier/.test(id) || ES.areas[id]) continue;
        const bruto = id.replace(/^frontier/, '');
        ES.areas[id] = bruto
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, c => c.toUpperCase());
    }

    function traducirNombre(n) {
        if (ES.nombreArea[n]) return ES.nombreArea[n];

        // "Gym Leader Brock" -> "Líder de Gimnasio Brock"
        for (const en in ES.titulo) {
            if (n === en) return ES.titulo[en];
            if (n.startsWith(en + ' ')) return ES.titulo[en] + ' ' + n.slice(en.length + 1);
        }

        // "Charizard Mega-Showdown X" -> "Megaduelo de Charizard X"
        // "Great Tusk Revival"        -> "Resurrección de Great Tusk"
        for (const en in ES.lugar) {
            const re = new RegExp('^(.*?)\\s+' + en + '(\\s+[XY])?$', 'i');
            const m = n.match(re);
            if (m) return ES.lugar[en] + ' de ' + m[1] + (m[2] || '');
        }
        return null;
    }

    for (const id in areas) {
        if (typeof areas[id].name !== 'string') continue;
        const t = traducirNombre(areas[id].name);
        if (t) areas[id].name = t;
    }
})();


/* =========================================================================
   Índice plano que consulta format().

   El orden de mezcla reproduce el de format() en explore.js: cuando un mismo
   id existe en varias categorías, gana la última. Se usa `var` a propósito
   para que `typeof ES_NOMBRES` nunca lance si este archivo no se cargara.
   ========================================================================= */

var ES_NOMBRES = Object.assign(
    {},
    ES.move, ES.pkmn, ES.ability, ES.item, ES.field, ES.areas
);
