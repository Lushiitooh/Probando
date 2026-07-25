const item = {}

item.blackBelt = {
    subtitle: `(Lucha)`,
    type: "held",
     evo: true,
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Lucha x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.blackGlasses = {
    subtitle: `(Siniestro)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Siniestro x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.charcoal = {
    subtitle: `(Fuego)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Fuego x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.dragonFang = {
    subtitle: `(Dragón)`,
    type: "held",
    evo: true,
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Dragón x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.fairyFeather = {
    subtitle: `(Hada)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Hada x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.hardStone = {
    subtitle: `(Roca)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Roca x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.magnet = {
    subtitle: `(Eléctrico)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Eléctrico x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.metalCoat = {
    subtitle: `(Acero)`,
    type: "held",
    evo: true,
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Acero x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.miracleSeed = {
    subtitle: `(Planta)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Planta x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.mysticWater = {
    subtitle: `(Agua)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Agua x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.neverMeltIce = {
    subtitle: `(Hielo)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Hielo x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.poisonBarb = {
    subtitle: `(Veneno)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Veneno x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.sharpBeak = {
    subtitle: `(Volador)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Volador x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.silkScarf = {
    subtitle: `(Normal)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Normal x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.silverPowder = {
    subtitle: `(Bicho)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Bicho x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.softSand = {
    subtitle: `(Tierra)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Tierra x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.spellTag = {
    subtitle: `(Fantasma)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Fantasma x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.twistedSpoon = {
    subtitle: `(Psíquico)`,
    type: "held",
    info: function() {return `Equipado: aumenta el daño de los movimientos de tipo Psíquico x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.eviolite = {
    type: "held",
    info: function() {return `Equipado: si el Pokémon no ha evolucionado del todo, reduce el daño recibido x${this.power().toFixed(2)}. No se aplica a Pokémon de fase final con Megaevolución`},
    power : function() { return 1+(returnItemLevel(this.id)/5)}
}

item.lightClay = {
    type: "held",
    info: function() {return `Equipado: aumenta en 1 turno la duración de las mejoras usadas y aumenta el daño infligido x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.06*returnItemLevel(this.id))}
}

item.mentalHerb = {
    type: "held",
    info: function() {return `Equipado: reduce en 1 turno la duración de los efectos negativos recibidos y reduce el daño recibido x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.06*returnItemLevel(this.id))}
}

item.flameOrb = {
    type: "held",
    info: function() {return `Equipado: aumenta el daño del usuario x${this.power().toFixed(2)}, pero le inflige ${tagBurn}`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.toxicOrb = {
    type: "held",
    info: function() {return `Equipado: aumenta el daño del usuario x${this.power().toFixed(2)}, pero le inflige ${tagPoisoned}`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.choiceBand = {
    type: "held",
    info: function() {return `Equipado: aumenta el Ataque del usuario x${this.power().toFixed(2)}, pero le impide cambiar`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.choiceSpecs = {
    type: "held",
    info: function() {return `Equipado: aumenta el Ataque Especial del usuario x${this.power().toFixed(2)}, pero le impide cambiar`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.lifeOrb = {
    type: "held",
    info: function() {return `Equipado: aumenta el daño del usuario x${this.power().toFixed(2)}, pero pierde 1/10 de sus PS máximos por turno`},
    power : function() { return 1+(0.2*returnItemLevel(this.id))}
}

item.assaultVest = {
    type: "held",
    info: function() {return `Equipado: aumenta la defensa general x${this.power().toFixed(2)}, pero el usuario no puede usar movimientos de potencia 0`},
    power : function() { return 1+(0.2*returnItemLevel(this.id))}
}

item.clearAmulet = {
    type: "held",
    info: function() {return `Equipado: reduce en ${Math.floor(this.power())} turnos la duración de los efectos negativos recibidos`},
    power : function() { return 0.5+(0.5*returnItemLevel(this.id))}
}

item.ejectPack = {
    type: "held",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)}, pero al ejecutar todos sus movimientos cambia al miembro anterior del equipo`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.ejectButton = {
    type: "held",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)}, pero al ejecutar todos sus movimientos cambia al siguiente miembro del equipo`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.quickClaw = {
    type: "held",
    info: function() {return `Equipado: los movimientos que atacan más rápido de lo normal se ejecutan x${this.power().toFixed(2)} más rápido`},
    power : function() { return 1+(0.15*returnItemLevel(this.id))}
}

item.loadedDice = {
    type: "held",
    info: function() {return `Equipado: los movimientos de golpes múltiples golpean siempre el máximo de veces y hacen x${this.power().toFixed(2)} más de daño`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.metronome = {
    type: "held",
    info: function() {return `Equipado: los movimientos que ganan potencia al acumularse hacen x${this.power().toFixed(2)} más de daño`},
    power : function() { return 1+(0.2*returnItemLevel(this.id))}
}

item.powerHerb = {
    type: "held",
    info: function() {return `Equipado: los movimientos de potencia 0 se ejecutan x${this.power().toFixed(2)} más rápido`},
    power : function() { return 1+(0.2*returnItemLevel(this.id))}
}

item.luckyPunch = {
    type: "held",
    info: function() {return `Equipado: los movimientos afectados por Puño Férreo hacen x${this.power().toFixed(2)} más de daño, y sus efectos secundarios se ejecutan dos veces`},
    power : function() { return 1.1+(0.15*returnItemLevel(this.id))}
}

item.laggingTail = {
    type: "held",
    info: function() {return `Equipado: los movimientos que atacan más lento de lo normal hacen x${this.power().toFixed(2)} más de daño`},
    power : function() { return 1.1+(0.15*returnItemLevel(this.id))}
}

item.weaknessPolicy = {
    type: "held",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y aumenta la Velocidad un 50% durante 8 turnos al recibir un movimiento supereficaz`},
    power : function() { return 1+(0.06*returnItemLevel(this.id))}
}

item.heavyDutyBoots = {
    type: "held",
    info: function() {return `Equipado: evita el daño del efecto de campo Trampa Rocas y reduce el daño recibido x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.06*returnItemLevel(this.id))}
}

item.leftovers = {
    type: "held",
    info: function() {return `Equipado: reduce el daño por fatiga del usuario x${this.power().toFixed(2)}`},
    power : function() { return 1+(0.2*returnItemLevel(this.id))}
}



item.bugGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Bicho reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.darkGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Siniestro reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.dragonGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Dragón reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.electricGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Eléctrico reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.fairyGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Hada reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.fightingGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Lucha reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.fireGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Fuego reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.flyingGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Volador reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.ghostGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Fantasma reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.grassGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Planta reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.groundGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Tierra reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.iceGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Hielo reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.normalGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Normal reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.poisonGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Veneno reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.psychicGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Psíquico reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.rockGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Roca reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.steelGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Acero reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}

item.waterGem = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: aumenta el daño infligido x${this.power().toFixed(2)} y permite que los movimientos de tipo Agua reciban bonificación por tipo (STAB)`},
    power : function() { return 1+(0.1*returnItemLevel(this.id))}
}













item.luckIncense = {
    type: "held",
    info: function() {return `Equipado: aumenta un ${this.power()}% la probabilidad de objetos raros. Funciona siempre para todos, sea quien sea el portador`},
    power : function() { return 0.5+(0.5*returnItemLevel(this.id))}
}

item.pureIncense = {
    type: "held",
    info: function() {return `Equipado: aumenta un ${this.power()}% la probabilidad de Pokémon raros. Funciona siempre para todos, sea quien sea el portador`},
    power : function() { return 0.5+(0.5*returnItemLevel(this.id))}
}

item.luckyEgg = {
    type: "held",
    info: function() {return `Equipado: aumenta un ${this.power()}% la experiencia que gana el Pokémon`},
    power : function() { return 40+(10*returnItemLevel(this.id))}
}

item.shinyCharm = {
    type: "held",
    info: function() {return `Equipado: aumenta un ${this.power()}% la probabilidad de encontrar un Pokémon variocolor salvaje. Funciona siempre para todos, sea quien sea el portador`},
    power : function() { return 0+(10*returnItemLevel(this.id))}
}


item.occaBerry = {
    subtitle: `(Fuego)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Fuego`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.passhoBerry = {
    subtitle: `(Agua)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Agua`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.wacanBerry = {
    subtitle: `(Eléctrico)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Eléctrico`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.rindoBerry = {
    subtitle: `(Planta)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Planta`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.yacheBerry = {
    subtitle: `(Hielo)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Hielo`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.chopleBerry = {
    subtitle: `(Lucha)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Lucha`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.kebiaBerry = {
    subtitle: `(Veneno)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Veneno`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.shucaBerry = {
    subtitle: `(Tierra)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Tierra`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.cobaBerry = {
    subtitle: `(Volador)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Volador`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.payapaBerry = {
    subtitle: `(Psíquico)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Psíquico`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.tangaBerry = {
    subtitle: `(Bicho)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Bicho`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.chartiBerry = {
    subtitle: `(Roca)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Roca`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.kasibBerry = {
    subtitle: `(Fantasma)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Fantasma`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.habanBerry = {
    subtitle: `(Dragón)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Dragón`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.colburBerry = {
    subtitle: `(Siniestro)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Siniestro`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.babiriBerry = {
    subtitle: `(Acero)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Acero`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}

item.roseliBerry = {
    subtitle: `(Hada)`,
    type: "held",
    sort: "berry",
    info: function() {return `Equipado: reduce un ${this.power()}% el daño supereficaz recibido de movimientos de tipo Hada`},
    power : function() { return 30+(10*returnItemLevel(this.id))}
}


item.terrainExtender = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración de ${tagTrickRoom}, ${tagWeirdRoom}, ${tagCrossRoom}, ${tagLightScreen} y ${tagSafeguard}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.dampRock = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración del clima ${tagRainy}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.heatRock = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración del clima ${tagSunny}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.icyRock = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración del clima ${tagHail}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.smoothRock = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración del clima ${tagSandstorm}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.electricSeed = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración de ${tagElectricTerrain}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.grassySeed = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración de ${tagGrassyTerrain}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.mistySeed = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración de ${tagMistyTerrain}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}

item.foggySeed = {
    type: "held",
    info: function() {return `Equipado: aumenta en ${this.power()} turnos la duración del clima ${tagFoggy}`},
    power : function() { return 5+(2*returnItemLevel(this.id))}
}








item.bottleCap = {
    type: "key",
    info: function() {return `Se obtiene al acumular objetos de sobra (20 o más en objetos equipables) o canjeando otras monedas`},
}

item.goldenBottleCap = {
    type: "key",
    info: function() {return `Se obtiene en la Frontera de Combate`},
}




item.timeCandy = {
    type: "key",
    usable: true,
    effect: function() {  if(afkSeconds<=0 && saved.currentArea!==areas.frontierSpiralingTower.id && saved.currentArea!==undefined) {afkSeconds += 10*60; this.got--; updateItemBag()} else {document.getElementById("tooltipTop").style.display = "none"; document.getElementById("tooltipMid").style.display = "none"; document.getElementById("tooltipBottom").innerHTML = `Ahora mismo no puedes hacer eso`; openTooltip()}  },
    info: function() {return `Uso: adelanta 10 minutos el tiempo de combate. Debe usarse durante un combate`},
}

item.timeCandyXL = {
    type: "key",
    usable: true,
    effect: function() {  if(afkSeconds<=0 && saved.currentArea!==areas.frontierSpiralingTower.id && saved.currentArea!==undefined) {afkSeconds += 30*60; this.got--; updateItemBag()} else {document.getElementById("tooltipTop").style.display = "none"; document.getElementById("tooltipMid").style.display = "none"; document.getElementById("tooltipBottom").innerHTML = `Ahora mismo no puedes hacer eso`; openTooltip()}  },
    info: function() {return `Uso: adelanta 30 minutos el tiempo de combate. Debe usarse durante un combate`},
}

item.festivalTicket = {
    type: "key",
    usable: true,
    effect: function() {
        seasonalSwitch() 
    },
    info: function() {return `Uso: activa un evento de temporada concreto durante los 10 días siguientes. Durará esos 10 días y será reemplazado por los que estén en curso. Eso sí, la tienda de temporada de ese evento no se abrirá`},
}






item.rareCandy = {
    type: 'key',
    itemToUse: true,
    info: function() {return `Uso: sube 1 nivel a un Pokémon`},
}

item.abilityPatch = {
    type: 'key',
    itemToUse: true,
    info: function() {return `Uso: vuelve a sortear la habilidad de un Pokémon`},
}

item.abilityCapsule = {
    type: 'key',
    itemToUse: true,
    info: function() {return `Uso: desbloquea la habilidad oculta de un Pokémon`},
}

item.heartScale = {
    type: 'key',
    itemToUse: true,
    info: function() {return `Uso: vuelve a aprender un movimiento obtenido antes por herencia genética (salvo los heredados con Cápsulas Candado)`},
}

item.energyRoot = {
    type: "key",
    usable: true,
    effect: function() {  if(saved.geneticOperation > 1) {afkSecondsGenetics += 30*60; this.got--; updateItemBag()} else {document.getElementById("tooltipTop").style.display = "none"; document.getElementById("tooltipMid").style.display = "none"; document.getElementById("tooltipBottom").innerHTML = `Ahora mismo no puedes hacer eso`; openTooltip()}  },
    info: function() {return `Uso: adelanta 30 minutos una operación genética. Debe usarse con una operación en curso`},
}

item.fashionCase = {
    type: 'key',
    usable: true,
    info: function() {return `Uso: obtén una decoración al azar`},
    effect: function() {

    let pickedDecor = []

    for (const i in item){
        if (item[i].type !== "decor") continue
        if (item[i].rarity == undefined) continue
        if (item[i].rarity == "rare" && rng(0.1)) pickedDecor.push(i)
        if (item[i].rarity == "common") pickedDecor.push(i)
    }

    pickedDecor = arrayPick(pickedDecor)


        document.getElementById("tooltipTop").style.display = `inline`
        document.getElementById("tooltipTitle").style.display = `none`
        document.getElementById("tooltipBottom").style.display = `none`
        document.getElementById("tooltipMid").style.display = "inline"
        document.getElementById("tooltipTop").innerHTML = `<img alt="" src="img/decor/${pickedDecor}.png" style="scale:2">`
        document.getElementById("tooltipMid").innerHTML = `
        <div class="genetics-overview-tags" >
        <div style="filter:hue-rotate(100deg)" >${format(pickedDecor)} Decor got!</div>
        </div>
        `

    item[pickedDecor].got++
    this.got--;
    updateItemBag()
    openTooltip()


    

    },
}



item.neutralMint = {
    type: 'key',
    itemToUse: true,
    info: function() {return `Uso: elimina la naturaleza de un Pokémon`},
}



item.autoRefightTicket = {
    type: "key",
    info: function() {return `Sirve para repetir combates automáticamente. No funciona con el navegador cerrado. Se consume al ganar un combate`},
}














item.yellowApricorn = {
    type: "key",
    info: function() {return `Se obtiene en incursiones T3 y T4. Se canjea en la Poké Tienda`},
}

item.pinkApricorn = {
    type: "key",
    info: function() {return `Se obtiene en incursiones T3 y T4. Se canjea en la Poké Tienda`},
}

item.greenApricorn = {
    type: "key",
    info: function() {return `Se obtiene en incursiones T3 y T4. Se canjea en la Poké Tienda`},
}

item.whiteApricorn = {
    type: "key",
    info: function() {return `Se obtiene en incursiones de megadimensión ★ y ★★. Se canjea en la Poké Tienda`},
}

item.blackApricorn = {
    type: "key",
    info: function() {return `Se obtiene en incursiones de megadimensión ★★★ y ★★★★. Se canjea en la Poké Tienda`},
}







item.megaShard = {
    type: "key",
    info: function() {return `Sirve para capturar Pokémon en la Megadimensión. Caduca cuando acaba la rotación actual de la Megadimensión`},
}

item.megaPiece = {
    type: "key",
    info: function() {return `Sirve para capturar Pokémon en la Megadimensión. Caduca cuando acaba la rotación actual de la Megadimensión`},
}

item.megaChunk = {
    type: "key",
    info: function() {return `Sirve para capturar Pokémon en la Megadimensión. Caduca cuando acaba la rotación actual de la Megadimensión`},
}

item.megaCluster = {
    type: "key",
    info: function() {return `Sirve para capturar Pokémon en la Megadimensión. Caduca cuando acaba la rotación actual de la Megadimensión`},
}

item.primalEarth = {
    type: "key",
    rotation: 2,
    itemToUse : true,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}


item.thunderousRock = {
    type: "key",
    rotation: 1,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.articRock = {
    type: "key",
    rotation: 1,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.ancientOrchid = {
    type: "key",
    rotation: 2,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.futureDisk = {
    type: "key",
    rotation: 5,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.ancientKeystone = {
    type: "key",
    rotation: 3,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
    
}

item.steelKeystone = {
    type: "key",
    rotation: 3,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.frozenKeystone = {
    type: "key",
    rotation: 3,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.aetherKeycard = {
    type: "key",
    rotation: 4,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.wormholeResidue = {
    type: "key",
    rotation: 4,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.futureContraption = {
    type: "key",
    rotation: 5,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}


item.redChain = {
    type: "key",
    rotation: 6,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.wisdomPetal = {
    type: "key",
    rotation: 6,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.epochFeather = {
    type: "key",
    rotation: 1,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}

item.pokeflute = {
    type: "key",
    rotation: 1,
    info: function() {return `Sirve para capturar Pokémon de evento. Caduca cuando termina el evento`},
}










item.oldGateau = {
    type: "key",
    event: `halloween`,
    info: function() {return `Objeto de temporada, cae al azar al derrotar Pokémon salvajes. Caduca el ${season[saved.currentSeason].end.day}/${season[saved.currentSeason].end.month}`},
}































item.hpUp = {
    subtitle: `(PS)`,
    type: 'key',
    vitamin: true,
    info: function() {return `Uso: aumenta en 1 el IV de PS de un Pokémon`},
}

item.protein = {
    subtitle: `(Ataque)`,
    type: 'key',
    vitamin: true,
    info: function() {return `Uso: aumenta en 1 el IV de Ataque de un Pokémon`},
}

item.iron = {
    subtitle: `(Defensa)`,
    type: 'key',
    vitamin: true,
    info: function() {return `Uso: aumenta en 1 el IV de Defensa de un Pokémon`},
}

item.calcium = {
    subtitle: `(Ataque Especial)`,
    type: 'key',
    vitamin: true,
    info: function() {return `Uso: aumenta en 1 el IV de Ataque Especial de un Pokémon`},
}

item.zinc = {
    subtitle: `(Defensa Especial)`,
    type: 'key',
    vitamin: true,
    info: function() {return `Uso: aumenta en 1 el IV de Defensa Especial de un Pokémon`},
}

item.carbos = {
    subtitle: `(Velocidad)`,
    type: 'key',
    vitamin: true,
    info: function() {return `Uso: aumenta en 1 el IV de Velocidad de un Pokémon`},
}




item.waterStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.thunderStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.sunStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}

item.linkStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel4} o superior)`},
}

item.ovalStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.moonStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.leafStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.iceStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}

item.fireStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.duskStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}
item.dawnStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}

item.shinyStone = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel2} o superior)`},
}

item.oddRock = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a ciertos Pokémon (debe ser de nivel ${wildAreaLevel4} o superior)`},
}


item.everstone = {
    rename: `neverstone`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: vuelve a sortear la habilidad del Pokémon anfitrión, con más probabilidad de obtener habilidades poco comunes y raras`},
}

item.powerAnklet = {
    subtitle: `(Velocidad)`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: garantiza la herencia de los IV de Velocidad`},
}

item.powerBand = {
    subtitle: `(Defensa Especial)`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: garantiza la herencia de los IV de Defensa Especial`},
}

item.powerBelt = {
    subtitle: `(Defensa)`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: garantiza la herencia de los IV de Defensa`},
}

item.powerBracer = {
    subtitle: `(Ataque)`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: garantiza la herencia de los IV de Ataque`},
}

item.powerLens = {
    subtitle: `(Ataque Especial)`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: garantiza la herencia de los IV de Ataque Especial`},
}

item.powerWeight = {
    subtitle: `(PS)`,
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: garantiza la herencia de los IV de PS`},
}

item.machoBrace = {
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: multiplica por 10 la probabilidad de heredar IV`},
}

item.lockCapsule = {
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: transfiere los movimientos equipados de la muestra al repertorio del anfitrión. El anfitrión conserva tanto los suyos como los nuevos, pero la muestra pierde los que tenía equipados. Solo puede usarse con al menos un nivel de compatibilidad, y no funciona con movimientos firma`},
}

item.destinyKnot = {
    type: "key",
    genetics: true,
    info: function() {return `Objeto de genética: intercambia la habilidad del Pokémon con la de la muestra. Solo puede usarse con al menos un nivel de compatibilidad y no funciona con habilidades ocultas`},
}













item.abomasite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAbomasnow.id },
}

item.absolite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAbsol.id },
}

item.aerodactylite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAerodactyl.id },
}

item.aggronite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAggron.id },
}

item.alakazite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAlakazam.id },
}

item.altarianite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAltaria.id },
}

item.ampharosite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAmpharos.id },
}

item.audinite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaAudino.id },
}

item.banettite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaBanette.id },
}

item.barbaracite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaBarbaracle.id },
}

item.baxcaliburite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaBaxcalibur.id },
}

item.beedrillite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaBeedrill.id },
}

item.blastoisinite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaBlastoise.id },
}

item.blazikenite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaBlaziken.id },
}

item.cameruptite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaCamerupt.id },
}

item.charizarditeX = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaCharizardX.id },
}

item.charizarditeY = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaCharizardY.id },
}

item.diancite = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaDiancie.id },
}

item.dragonitite = {
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaDragonite.id },
}

item.falinksite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaFalinks.id },
}

item.galladite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaGallade.id },
}

item.garchompite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaGarchomp.id },
}

item.glalitite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaGlalie.id },
}

item.gardevoirite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaGardevoir.id },
}

item.gengarite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaGengar.id },
}

item.gyaradosite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaGyarados.id },
}

item.heracronite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaHeracross.id },
}

item.houndoominite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaHoundoom.id },
}

item.hawluchanite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaHawlucha.id },
}

item.kangaskhanite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaKangaskhan.id },
}

item.lopunnite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaLopunny.id },
}

item.lucarionite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaLucario.id },
}

item.manectite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaManectric.id },
}

item.mawilite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaMawile.id },
}

item.medichamite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaMedicham.id },
}

item.metagrossite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaMetagross.id },
}

item.mewtwoniteX = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaMewtwoX.id },
}

item.mewtwoniteY = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaMewtwoY.id },
}

item.pidgeotite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaPidgeot.id },
}

item.pyroarite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaPyroar.id },
}


item.pinsirite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaPinsir.id },
}


item.raichutiteX = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaRaichuX.id },
}

item.raichutiteY = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaRaichuY.id },
}

item.sablenite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSableye.id },
}



item.salamencite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSalamence.id },
}

item.sceptilite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSceptile.id },
}

item.scizorite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaScizor.id },
}

item.sharpedonite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSharpedo.id },
}

item.slowbronite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSlowbro.id },
}

item.steelixite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSteelix.id },
}

item.swampertite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaSwampert.id },
}

item.tyranitarite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaTyranitar.id },
}

item.venusaurite = {
    
    evo: true,
    info: function() {return `Uso: hace evolucionar a cierto Pokémon<br>Equipado: aumenta el daño infligido por ${format(this.heldBonusPkmn())} x${this.heldBonusPower().toFixed(2)}`},
    heldBonusPower: function() { return 1.15+(0.1*returnItemLevel(this.id)) },
    heldBonusPkmn: function() { return pkmn.megaVenusaur.id },
}

















item.magazineSubscription = {
    type: "key",
    info: function() {return `Mejora permanente: las recompensas diarias de exportación dan un Neceser extra`},
}

item.battlePass = {
    type: "key",
    info: function() {return `Mejora permanente: los entrenadores de la Frontera de Combate dan +3 Chapas Doradas extra`},
}

item.replicatorUpgradeS = {
    type: "key",
    info: function() {return `Mejora permanente: reduce en 30 minutos el tiempo de las operaciones genéticas (hasta un mínimo de 10 minutos)`},
}

item.replicatorUpgradeE = {
    type: "key",
    info: function() {return `Mejora permanente: permite heredar TODOS los movimientos a un anfitrión de división B o inferior (incluidos los movimientos firma y de huevo). Para ello hacen falta al menos dos niveles de compatibilidad<br><br>Dos o más movimientos de huevo idénticos transferidos así no pueden estar a la vez en un mismo equipo, salvo que el usuario del movimiento lo tenga como movimiento de huevo o firma propio`},
}



item.mysteryEgg = {
    info: function() {return `¡Un huevo sin eclosionar. Sal del combate para descubrir qué hay dentro!`},
    hidden:true
}

item.tmDummy = {
    hidden:true
}

item.nothing = {
    hidden:true
}






item.buginiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Bicho si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `bug`
}

item.darkiniumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Siniestro si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `dark`
}

item.dragoniumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Dragón si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `dragon`
}

item.electriumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Eléctrico si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `electric`
}

item.fairiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Hada si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `fairy`
}

item.fightiniumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Lucha si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `fighting`
}

item.firiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Fuego si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `fire`
}

item.flyiniumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Volador si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `flying`
}

item.ghostiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Fantasma si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `ghost`
}

item.grassiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Planta si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `grass`
}

item.groundiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Tierra si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `ground`
}

item.iciumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Hielo si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `ice`
}

item.normaliumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Normal si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `normal`
}

item.poisoniumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Veneno si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `poison`
}

item.psychiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Psíquico si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `psychic`
}

item.rockiumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Roca si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `rock`
}

item.steeliumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Acero si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `steel`
}

item.wateriumZ = {
    type: "held",
    sort: "gem",
    info: function() {return `Equipado: sea quien sea el portador, cada ${this.power()} turnos ejecuta un ataque coordinado de tipo Agua si el portador no está debilitado. Que sea físico o especial depende de la característica más alta del portador (si están igualadas, será al azar, pero hará x1.25 más de daño). Este ataque se beneficia de las características y el tipo del portador, pero no de sus habilidades ni de sus mejoras. Solo se puede equipar un cristal Z por equipo`},
    power : function() { return 20-(2*returnItemLevel(this.id))},
    zType: `water`
}




//normal
item.quickAttackTm  = {}
item.swiftTm  = {}
item.strengthTm  = {}
//fire
item.emberTm  = {}
item.incinerateTm = {}
item.flamethrowerTm = {}
//electric    
item.nuzzleTm = {}
item.thunderPunchTm = {}
item.thunderboltTm = {}
//ground
item.mudSlapTm = {}
item.bulldozeTm = {}
item.earthquakeTm = {}
//steel
item.bulletPunchTm = {}
item.metalClawTm = {}
item.flashCannonTm = {}
//flying
item.peckTm = {}
item.acrobaticsTm = {}
item.flyTm = {}
//poison
item.acidTm = {}
item.crossPoisonTm = {}
item.sludgeBombTm = {}
//ice
item.iceShardTm = {}
item.avalancheTm = {}
item.iceBeamTm = {}
//bug
item.twineedleTm = {}
item.bugBiteTm = {}
item.bugBuzzTm = {}
//water
item.waterGunTm = {}
item.waterPulseTm = {}
item.aquaTailTm = {}
//grass
item.leafageTm = {}
item.magicalLeafTm = {}
item.leafBladeTm = {}
//fighting
item.rockSmashTm = {}
item.forcePalmTm = {}
item.auraSphereTm = {}
//psychic
item.confusionTm = {}
item.psychoCutTm = {}
item.psychicTm = {}
//rock
item.rockThrowTm = {}
item.rockSlideTm = {}
item.powerGemTm = {}
//ghost
item.lickTm = {}
item.hexTm = {}
item.shadowBallTm = {}
//dragon
item.twisterTm = {}
item.dragonTailTm = {}
item.dragonRushTm = {}
item.dragonPulseTm = {}
//fighting
item.pursuitTm = {}
item.biteTm = {}
item.darkPulseTm = {}
//fairy
item.disarmingVoiceTm = {}
item.dazzlingGleamTm = {}
item.playRoughTm = {}

//shop


item.tackleTm = {}
item.quickAttackTm = {}
item.leerTm = {}


item.bulkUpTm = {}
item.thunderWaveTm = {}
item.toxicTm = {}
item.willOWispTm = {}

item.calmMindTm = {}
item.sunnyDayTm = {}
item.rainDanceTm = {}

item.crunchTm = {}
item.xScissorTm = {}
item.moonblastTm = {}

item.fireBlastTm = {}
item.hydroPumpTm = {}
item.thunderTm = {}
item.hyperBeamTm = {}

//frontier
item.swaggerTm = {}
item.ironDefenseTm = {}
item.feintAttackTm = {}
item.chillingWaterTm = {}
item.silverWindTm = {}
item.avalancheTm = {}
item.knockOffTm = {}
item.ominousWindTm = {}
item.flameChargeTm = {}
item.acidSprayTm = {}

item.hailTm = {}
item.fogTm = {}
item.sandstormTm = {}
item.electricTerrainTm = {}
item.mistyTerrainTm = {}
item.grassyTerrainTm = {}

item.nastyPlotTm = {}
item.swordsDanceTm = {}
item.voltSwitchTm = {}
item.uTurnTm = {}

item.chargeBeamTm = {}
item.dischargeTm = {}
item.scorchingSandsTm = {}
item.airShlashTm = {rename:`airSlashTm`}
item.poisonJabTm = {}
item.liquidationTm = {}
item.energyBallTm = {}
item.skyUppercutTm = {}
item.dracoMeteorTm = {}
item.spiritBreakTm = {}




item.trickRoomTm = {}
item.crossRoomTm = {}
item.weirdRoomTm = {}
item.safeguardTm = {}
item.lightScreenTm = {}



//memory

item.hydratationMemory = {rename:`hydrationMemory`}
item.sandVeilMemory = {}
item.snowCloakMemory = {}
item.marvelScaleMemory = {}
item.livingShieldMemory = {}
item.bigPecksMemory = {}
item.hyperCutterMemory = {}
item.synchronizeMemory = {}
item.iceBodyMemory = {}

item.rainDishMemory = {}
item.solarPowerMemory = {}
item.sandForceMemory = {}
item.scrappyMemory = {}

item.strongJawMemory = {}
item.toughClawsMemory = {}
item.ironFistMemory = {}
item.magicGuardMemory = {}

item.pickPocketMemory = {}







//decor


item.blueBarrette = { type: "decor", rarity: `common`} 
item.pinkBarrette = { type: "decor", rarity: `common`} 
item.greenBarrette = { type: "decor", rarity: `common`} 
item.blueBarrette = { type: "decor", rarity: `common`} 

item.blueFlower = { type: "decor", rarity: `common` } 
item.purpleFlower = { type: "decor", rarity: `common` } 
item.redFlower = { type: "decor", rarity: `common` } 

item.blueBalloon = { type: "decor", rarity: `common` } 
item.redBalloon = { type: "decor", rarity: `common` } 
item.greenBalloon = { type: "decor", rarity: `common` } 

item.professorHat = { type: "decor", rarity: `common` } 
item.academicHat = { type: "decor", rarity: `common` } 

item.redBall = { type: "decor", rarity: `common` } 
item.greenBall = { type: "decor", rarity: `common` } 
item.blueBall = { type: "decor", rarity: `common` } 

item.redHeaddress = { type: "decor", rarity: `common` } 
item.purpleHeaddress = { type: "decor", rarity: `common` } 
item.tealHeaddress = { type: "decor", rarity: `common` } 

item.blackTie = { type: "decor", rarity: `common` } 
item.whiteTie = { type: "decor", rarity: `common` } 
item.stripedTie = { type: "decor", rarity: `common` } 
item.greenTie = { type: "decor", rarity: `common` } 
item.orangeTie = { type: "decor", rarity: `common` } 
item.blueTie = { type: "decor", rarity: `common` } 

item.blackBowtie = { type: "decor", rarity: `common` } 
item.pinkBowtie = { type: "decor", rarity: `common` } 
item.blueBowtie = { type: "decor", rarity: `common` } 
item.yellowBowtie = { type: "decor", rarity: `common` } 

item.tealHeadband = { type: "decor", rarity: `common` } 
item.greenHeadband = { type: "decor", rarity: `common` } 
item.yellowHeadband = { type: "decor", rarity: `common` } 

item.blackScarf = { type: "decor", rarity: `common` } 
item.whiteScarf = { type: "decor", rarity: `common` } 
item.redScarf = { type: "decor", rarity: `common` } 
item.blueScarf = { type: "decor", rarity: `common` } 

item.yellowStar = { type: "decor", rarity: `common` } 
item.tealStar = { type: "decor", rarity: `common` } 
item.redStar = { type: "decor", rarity: `common` } 

item.blackMoustache = { type: "decor", rarity: `common` } 
item.whiteMoustache = { type: "decor", rarity: `common` } 

item.microphone = { type: "decor", rarity: `common` } 
item.oldUmbrella = { type: "decor", rarity: `common` } 
item.coloredParasol = { type: "decor", rarity: `common` } 
item.pokeballFlag = { type: "decor", rarity: `common` } 
item.pinkMushroom = { type: "decor", rarity: `common` } 
item.yellowStarBalloon = { type: "decor", rarity: `common` } 
item.blackSpecs = { type: "decor", rarity: `common` } 
item.googlySpecs = { type: "decor", rarity: `common` } 
item.topHat = { type: "decor", rarity: `common` } 
item.gentlemanHat = { type: "decor", rarity: `common` } 
item.silverTiara = { type: "decor", rarity: `common` } 


//rare decor
item.frillyApron = { type: "decor", rarity: `rare` } 
item.chefHat = { type: "decor", rarity: `rare` } 
item.fluffyBeard = { type: "decor", rarity: `rare` } 
item.hummingNote = { type: "decor", rarity: `rare` } 
item.prettyDewdrop = { type: "decor", rarity: `rare` } 
item.spotlight = { type: "decor", rarity: `rare` } 
item.glitterPowder = { type: "decor", rarity: `rare` } 
item.confetti = { type: "decor", rarity: `rare` } 
item.comet = { type: "decor", rarity: `rare` } 
item.gorgeousSpecs = { type: "decor", rarity: `rare` } 
item.mysticSmoke = { type: "decor", rarity: `rare` } 













item.flashHerbaMemory = { rarity: "common", }
item.flashFaeMemory = { rarity: "common", }
item.flashPsychaMemory = { rarity: "common", }
item.flashCryoMemory = { rarity: "common", }
item.flashVenumMemory = { rarity: "common", }
item.flashUmbraMemory = { rarity: "common", }
item.flashPyroMemory = { rarity: "common", }
item.flashAquaMemory = { rarity: "common", }
item.flashElectroMemory = { rarity: "common", }
item.liberoMemory = { rarity: "common", }
item.recklessMemory = { rarity: "common", }
item.filterMemory = { rarity: "common", }
item.justifiedMemory = { rarity: "common", }
item.angerPointMemory = { rarity: "common", }
item.sharpnessMemory = { rarity: "common", }
item.gutsMemory = { rarity: "common", }
item.multiscaleMemory = { rarity: "common", }
item.noGuardMemory = { rarity: "common",  typings : ["fighting"] }
item.ambidextrousMemory = { rarity: "common",  typings : ["bug"] }
item.adaptabilityMemory = { rarity: "common",  typings : ["normal"] }
item.thickFatMemory = { rarity: "common", }
item.levitateMemory = { rarity: "common", }
item.sheerForceMemory = { rarity: "common", }
item.strategistMemory = { rarity: "common", }
item.moxieMemory = { rarity: "common", }
item.unburdenMemory = { rarity: "common", }
item.dauntingLookMemory = { rarity: "common", }
item.intimidateMemory = { rarity: "common", }
item.sandRushMemory = { rarity: "common", }
item.swiftSwimMemory = { rarity: "common", }
item.slushRushMemory = { rarity: "common", }
item.moltShedMemory = { rarity: "common", }
item.faeRushMemory = { rarity: "common", }
item.hyperconductorMemory = { rarity: "common", }
item.intangibleMemory = { rarity: "common", }
item.climaTactMemory = { rarity: "common", }
item.spikyPeltMemory = { rarity: "common", }
item.blackPeltMemory = { rarity: "common", }
item.pixiePeltMemory = { rarity: "common", rename:`fuzzyPeltMemory`}
item.fieryPeltMemory = { rarity: "common", }
item.moistPeltMemory = { rarity: "common", }
item.icyPeltMemory = { rarity: "common", }
item.sandyPeltMemory = { rarity: "common", }
item.grassyPeltMemory = { rarity: "common", }




//has
item.stonedMemory = { typings : ["rock"], rarity: "rare" }
item.staminaMemory = { typings : ["fighting"], rarity: "rare" }
item.gooeyMemory = { typings : ["poison"], rarity: "rare" }
item.shieldsDownMemory = { typings : ["steel"], rarity: "rare" }
item.costarMemory = { typings : ["fairy"], rarity: "rare" }
item.purifyingSaltMemory = { typings : ["rock"], rarity: "rare" }
item.scorchMemory = { typings : ["fire"], rarity: "rare" }
item.corrosionMemory = { typings : ["poison"], rarity: "rare" }
item.megaLauncherMemory = { typings : ["electric"], rarity: "rare" }
item.metalheadMemory = { typings : ["steel"], rarity: "rare" }
item.moodyMemory = { typings : ["normal"], rarity: "rare" }
item.mercilessMemory = { typings : ["dark"], rarity: "rare" }
item.colorSporeMemory = { typings : ["grass"], rarity: "rare" }
item.sandStreamMemory = { typings : ["ground"], rarity: "rare" }
item.snowWarningMemory = { typings : ["ice"], rarity: "rare" }
item.somberFieldMemory = { typings : ["dark"], rarity: "rare" }


//white exclusive
item.dancerMemory = { typings : ["fighting"], rarity: "white" }
item.cacophonyMemory = { typings : ["normal"], rarity: "white" }
item.windRiderMemory = { typings : ["flying"], rarity: "white" }
item.gorillaTacticsMemory = { typings : ["fighting"], rarity: "white" }
item.imposterMemory = { typings : ["dark"], rarity: "white" }
item.drizzleMemory = { typings : ["water"], rarity: "white" }
item.droughtMemory = { typings : ["fire"], rarity: "white" }
item.electricSurgeMemory = { typings : ["electric"], rarity: "white" }
item.grassySurgeMemory = { typings : ["grass"], rarity: "white" }
item.mistySurgeMemory = { typings : ["psychic"], rarity: "white" }
item.ferrilateMemory = { typings : ["steel"], rarity: "white" }
item.glaciateMemory = { typings : ["ice"], rarity: "white" }
item.terralateMemory = { typings : ["ground"], rarity: "white" }
item.toxilateMemory = { typings : ["poison"], rarity: "white" }
item.hydrolateMemory = { typings : ["water"], rarity: "white" }
item.pyrolateMemory = { typings : ["fire"], rarity: "white" }
item.chrysilateMemory = { typings : ["bug"], rarity: "white" }
item.galvanizeMemory = { typings : ["electric"], rarity: "white" }
item.gloomilateMemory = { typings : ["dark"], rarity: "white" }
item.espilateMemory = { typings : ["psychic"], rarity: "white" }
item.aerilateMemory = { typings : ["flying"], rarity: "white" }
item.pixilateMemory = { typings : ["fairy"], rarity: "white" }
item.verdifyMemory = { typings : ["grass"], rarity: "white" }
item.dragonMawMemory = { typings : ["dragon"], rarity: "white" }
item.iaidoMemory = { typings : ["steel"], rarity: "white" }




/*
item.blackCape = { type: "decor" } 
item.crown = { type: "decor" } 
item.determination = { type: "decor" } 
item.pinkHeartBalloon = { type: "decor" } 
item.silverTiara = { type: "decor" } 
*/

item.wealthyCoins = { type: "decor"} 
item.witchyHat = { type: "decor"} 


for (const i in item){
    item[i].id = i
    item[i].newItem = 0
    item[i].got = 0
}

//tms
for (const i in item){
    if (i.endsWith("Tm")) {
        item[i].move = i.slice(0, -2); 
        item[i].type = "tm";
        
        item[i].info = function () { return `Uso: enseña el movimiento <span data-move="${move[item[i].move].id}" ><span  style="color:white;cursor:help;padding: 0.1rem 0.7rem; border-radius: 0.2rem; font-size:1.1rem; width: auto; background: ${returnTypeColor(move[item[i].move].type)}">${format(move[item[i].move].id)}</span></span> to ${joinWithOr(move[item[i].move].moveset)} Pokemon`}        
    }

    if (i.endsWith("Memory")) {
        item[i].ability = i.slice(0, -6); 
        item[i].type = "memory";
        
        item[i].image = "dark"
        

        if (item[i].typings && item[i].typings[0]!="normal") item[i].image = item[i].typings[0]
        else if (item[i].typings== undefined && ability[item[i].ability].type[0]!="all" && ability[item[i].ability].type[0]!="normal") item[i].image = ability[item[i].ability].type[0]

        if (item[i].typings!=undefined) item[i].info = function () { return `Uso: enseña la habilidad <span data-ability="${ability[item[i].ability].id}" ><span  style="color:white;cursor:help;padding: 0.1rem 0.7rem; border-radius: 0.2rem; font-size:1.1rem; width: auto; background: ${returnTypeColor(item[i].image)}">${format(ability[item[i].ability].id)}</span></span> to ${joinWithOr(item[i].typings)} Pokemon`}        
        else item[i].info = function () { return `Uso: enseña la habilidad <span data-ability="${ability[item[i].ability].id}" ><span  style="color:white;cursor:help;padding: 0.1rem 0.7rem; border-radius: 0.2rem; font-size:1.1rem; width: auto; background: ${returnTypeColor(item[i].image)}">${format(ability[item[i].ability].id)}</span></span> to ${joinWithOr(ability[item[i].ability].type)} Pokemon`}        
    }

    if (item[i].type == "decor") {
    item[i].itemToUse =  true,
    item[i].info = function () { return `Uso: desbloquea este adorno para un Pokémon elegido`}
    }        

}

function joinWithOr(list) {
    if (list.includes("all")) return "todos";

    const formatted = list.map(x => format(x));
    const len = formatted.length;

    if (len === 0) return "";
    if (len === 1) return formatted[0];
    if (len === 2) return `${formatted[0]} o ${formatted[1]}`;

    return `${formatted.slice(0, -1).join(", ")} o ${formatted[len - 1]}`;
}

function joinWithAnd(list) {
    if (list.includes("all")) return "todos";

    const formatted = list.map(x => format(x));
    const len = formatted.length;

    if (len === 0) return "";
    if (len === 1) return formatted[0];
    if (len === 2) return `${formatted[0]} y ${formatted[1]}`;

    return `${formatted.slice(0, -1).join(", ")} y ${formatted[len - 1]}`;
}

