# Pokechill — 60 ideas para convertirlo en una obra maestra

> Escrito tras leer el código entero. Cada idea indica **dónde engancha** y una
> estimación honesta de esfuerzo. Las referencias `archivo:línea` son reales.
>
> Leyenda de esfuerzo: 🟢 horas · 🟡 días · 🔴 semanas

---

## Diagnóstico previo

Cuatro cosas que condicionan todo lo demás:

**1. La Potencia Cruzada es el alma del juego y es casi invisible.** Toda la
profundidad estratégica está en «alterna tipos entre movimientos para ×1.3»
([explore.js:2684](scripts/explore.js:2684)) y el juego solo lo comunica con una
textura de cruces en la barra. Un jugador nuevo no descubre la mecánica central.
Es la mayor oportunidad de diseño que tiene el juego.

**2. Es un idle sin capa de prestigio.** Verificado: no existe. El único objetivo
a largo plazo es completar 1.376 especies, y es lineal. Todos los idle que
retienen a la gente años tienen un bucle de reinicio con ganancia permanente.

**3. `statToRating` aplana todo a 1–6 estrellas** ([pkmnDictionary.js:20222](scripts/pkmnDictionary.js:20222)).
Es una decisión deliberada y buena para el tono «chill», pero hace que muchos
Pokémon se sientan intercambiables. Las ideas que diferencian sin romper esa
escala (habilidades, movimientos firma, naturalezas, constelaciones) son la
palanca correcta. Subir números no lo es.

**4. Hay contenido terminado y apagado.** `challenges.js` son 1.131 líneas
completas, comentadas en [index.html:1730](index.html:1730). Es la mejor
relación valor/esfuerzo del repositorio entero.

---

## A. El corazón: rotación y Potencia Cruzada

### 1. Editor de rotación con vista previa del cruce 🟡
Al colocar los 4 movimientos, marcar con un icono cuáles activarán ×1.3 y cuáles
no, en tiempo real. Hoy el jugador tiene que simularlo mentalmente. Esto solo
—hacer legible la mecánica que ya existe— cambia la percepción del juego.
*Engancha en:* `updatePreviewTeam()` ([teams.js:864](scripts/teams.js:864)).

### 2. Cadenas de cruce escalonadas 🟡
Ahora el bonus es plano (×1.3). Que encadenar 3 tipos distintos seguidos dé
×1.4, y 4 distintos ×1.5. Convierte «alterna» en «diseña una secuencia», que es
mucho más rico y premia los movepools variados.
*Engancha en:* el bloque de `crossPowerBonus`, guardando un historial corto en
vez de solo `lastCrossStab`.

### 3. Simulador de daño offline 🟡
Un panel que calcule «este equipo hace X daño/min en esta área» sin combatir,
usando la fórmula real. Permite iterar equipos sin prueba y error de 5 minutos.
Es la función que más piden los jugadores en juegos así.

### 4. Sinergias de equipo 🟡
Bonificaciones por composición: monotipo (+15% defensa), seis tipos distintos
(+10% cruce), misma familia evolutiva (+EXP compartida). Da razones para
construir equipos temáticos en vez de «los seis con más estrellas».

### 5. Combos entre miembros del equipo 🔴
Si el slot 1 lanza Fuego y el slot 2 lanza Planta justo después, se dispara un
efecto conjunto. Añade una capa de orden *entre* Pokémon, no solo dentro de uno.

### 6. Modo manual opcional 🟡
Un botón para adelantar un movimiento con enfriamiento. Da algo que hacer en las
sesiones activas sin romper el idle: quien no lo toque juega exactamente igual.

### 7. Vista previa de efectividad contra el salvaje actual 🟢
Un pequeño indicador ×0.5 / ×1 / ×1.5 junto a cada movimiento según el tipo del
rival. Información que el juego ya calcula y no muestra.

### 8. Variantes de IA en los salvajes 🟡
Que algunos salvajes sean agresivos (atacan más rápido, defensa baja) o
defensivos. Rompe la monotonía de que todos se comporten igual.

---

## B. Progresión a largo plazo

### 9. Prestigio / Renacer 🔴 ← *la más importante*
Reiniciar el progreso a cambio de una moneda permanente que compra multiplicadores.
Es lo que convierte un idle de 20 horas en uno de 500. Sin esto, el juego se
acaba cuando completas la Pokédex.
*Diseño sugerido:* la moneda escala con especies capturadas y nivel medio, de
modo que cada renacer sea más rápido que el anterior.

### 10. Árbol de talentos del entrenador 🔴
Donde se gasta la moneda de prestigio. Ramas: Coleccionista (más variocolor y
drops), Estratega (más cruce y STAB), Criador (genética más rápida y barata).
Da identidad a cada partida.

### 11. Logros con recompensa 🟡
No existe ninguno. 100–150 logros, cada uno con un bonus permanente pequeño.
Es el sistema que más engagement da por línea de código escrita.

### 12. Estadísticas de partida 🟢
Tampoco existe ninguna. Contar combates, daño total, capturas, tiempo jugado,
variocolores encontrados. Es la base para logros, para gráficas y para que el
jugador sienta que su historial importa.

### 13. Misiones diarias y semanales 🟡
«Derrota 50 de tipo Agua», «captura 3 nuevos», «gana sin perder ningún Pokémon».
Dan una razón para entrar cada día que no sea solo la rotación.

### 14. Pase de temporada 🟡
El objeto `battlePass` ya existe ([itemDictionary.js:1581](scripts/itemDictionary.js:1581))
y solo da 3 chapas doradas. Convertirlo en una progresión de recompensas por
niveles aprovecha algo que ya está a medias.

### 15. Rangos de entrenador 🟡
Un nivel meta que sube con todo lo que haces y desbloquea funciones (más ranuras
de equipo guardado, más operaciones genéticas simultáneas).

### 16. Hitos de Pokédex 🟢
Recompensas al llegar a 100 / 250 / 500 / 1.000 especies. Ahora completar la
Pokédex no da absolutamente nada por el camino.

---

## C. Colección y Pokédex

### 17. Contador de encuentros para variocolor 🟢
«Llevas 347 Ratatta sin variocolor». Los cazadores de shiny viven de este número.
Es trivial de implementar y crea un enganche enorme.

### 18. Pokédex viviente como objetivo rastreado 🟡
Marcar y seguir el objetivo de tener un ejemplar de cada especie a la vez, no
solo registrado.

### 19. Galería / museo 🟡
Una vitrina donde exponer tus mejores ejemplares: variocolores, IVs perfectos,
cintas raras. Los juegos de colección necesitan un sitio donde *presumir*.

### 20. Historia por especie ampliada 🟡
Solo 48 especies tienen `lore` y están muy bien escritas. Ampliarlo, aunque sea
por generaciones, da alma. Es contenido puro sin riesgo técnico.

### 21. Cintas por gestas concretas 🟡
El sistema `ribbon` ya existe con 3 cintas. Añadir cintas por hazañas: ganar sin
recibir daño, capturar variocolor, completar la torre. Historial visible.

### 22. Motes con efecto 🟢
Que ponerle mote a un Pokémon le dé un +1% simbólico o una cinta. Empuja al
jugador a encariñarse con ejemplares concretos.

### 23. Modo fotografía 🟡
Componer una escena con tus Pokémon y sus decoraciones y exportarla como imagen.
El sistema de `decor` arrastrable ya está hecho ([decor.js](scripts/decor.js)).

---

## D. Economía y objetos

### 24. Crafteo con duplicados 🟡
Ya existe el nivelado por acumulación ([explore.js:2076](scripts/explore.js:2076)).
Añadir combinar duplicados para crear objetos superiores da salida al excedente
tardío, que hoy no vale para nada.

### 25. Conjuntos de objetos 🟡
Equipar 2 o 3 objetos relacionados da un bonus extra. Convierte la elección de
objeto en una decisión de equipo, no individual.

### 26. Mercado con precios variables 🟡
Que la tienda fluctúe por día. Da una razón para revisarla y premia al que se
fija.

### 27. Ruta de mejora visible de cada objeto 🟢
Mostrar «te faltan 4 para nivel 3» siempre, no solo en el tooltip. Ya está
calculado en `returnItemLevel(id, "left")`.

### 28. Reciclaje de objetos clave caducados 🟢
Los objetos de evento caducan y quedan muertos en la bolsa. Canjearlos por algo.

### 29. Banco / almacén con búsqueda 🟡
Con 507 objetos, la bolsa necesita mejor organización que 8 pestañas.

---

## E. Contenido nuevo

### 30. Reactivar Challenges 🟢 ← *máximo valor por esfuerzo*
1.131 líneas ya escritas y probadas, apagadas en tres sitios. Encenderlo y pulir
lo que falle es contenido nuevo casi gratis.

### 31. Torre roguelite con bendiciones 🟡
La Torre Espiral ya escala infinitamente. Añadir que cada 5 plantas elijas entre
3 mejoras temporales la convierte en un modo con decisiones, no solo aguante.

### 32. Modo historia 🔴
Un hilo narrativo que dé contexto a las zonas y entrenadores. El juego ya tiene
buena prosa en el `lore`; hay voz de autor que se puede aprovechar.

### 33. Jefes globales semanales 🔴
Un jefe con una barra de vida enorme compartida por toda la comunidad. Requiere
servidor, pero es el tipo de cosa que crea comunidad.

### 34. Incursiones cooperativas asíncronas 🟡
Sin servidor: compartir un código de equipo que otro jugador usa como aliado en
su propia partida. Cooperación sin infraestructura.

### 35. Mazmorras generadas proceduralmente 🔴
Semilla diaria compartida por todos los jugadores, como ya se hace con la
rotación de áreas ([explore.js:4743](scripts/explore.js:4743)). Contenido
infinito reutilizando un sistema existente.

### 36. Clima dinámico por zona 🟡
Que cada área tenga su clima propio que cambie con el tiempo real. El sistema de
climas ya está completo; solo falta darle un motor.

### 37. Eventos de temporada ampliados 🟡
Ya existe el andamiaje (`season`, eventos con caducidad). Más ocasiones y
recompensas exclusivas.

---

## F. Calidad de vida

### 38. Copias de seguridad rotativas automáticas 🟢
Guardar las 3 últimas partidas en claves distintas de `localStorage`. Hoy un
`saveGame()` corrupto se lleva por delante 100 horas sin vuelta atrás. **Esto es
lo primero que haría de toda la lista técnica.**

### 39. Blindar el namespace del guardado 🟡
`saveGame()` vuelca objetos, tienda, áreas y Pokémon en el mismo objeto plano
([save.js](scripts/save.js)). Hoy no hay colisiones —lo comprobé sobre las 2.433
claves— pero el día que alguien añada un objeto llamado igual que un área, los
saves se corrompen en silencio. Prefijar por categoría lo elimina para siempre.

### 40. Equipos por área 🟡
Recordar qué equipo usaste en cada zona y ofrecer cambiar automáticamente.

### 41. Notificaciones del navegador 🟢
Avisar cuando termina una operación genética o se completa una incursión.

### 42. Búsqueda global 🟡
Un buscador único sobre Pokémon, movimientos, objetos y áreas. El motor difuso
ya está cargado (Fuse.js).

### 43. Comparador lado a lado 🟡
Poner dos Pokémon en paralelo para decidir cuál usar.

### 44. Deshacer en acciones destructivas 🟢
Liberar un Pokémon, gastar un objeto raro. Una ventana de 5 segundos.

### 45. Varias ranuras de partida 🟡
Hoy solo hay un `gameData` en `localStorage`. Perfiles independientes permiten
probar un Nuzlocke sin sacrificar la partida principal, o compartir el navegador.

### 46. Onboarding por capas 🟡
El tutorial actual son 4 mensajes de texto seguidos. Escalonarlo: enseñar la
rotación cuando tienes 2 movimientos, el cruce cuando tienes 2 tipos, la genética
al llegar a nivel 100. Enseñar cada sistema cuando el jugador lo necesita.

---

## G. Presentación, sonido y feedback

### 47. Sonido y música 🟡 ← *la ausencia más llamativa*
Verificado: **no hay un solo archivo de audio en el repositorio.** Un idle que
suena bien se juega el triple de tiempo. Con efectos discretos (golpe, captura,
subida de nivel) y música ambiental por bioma se transforma. Imprescindible:
control de volumen y silencio por defecto hasta que el jugador decida.

### 48. Números de daño flotantes 🟢
Ver el daño saliendo del Pokémon. Es el feedback más básico de un juego de
combate y no está.

### 49. Animaciones de impacto por tipo 🟡
Ya existe `voidAnimation()` y varias animaciones CSS. Ampliarlo a un efecto por
tipo de movimiento.

### 50. Gráficas de progreso 🟡
Curvas de capturas, nivel medio y daño a lo largo del tiempo. Depende de la
idea 12 (estadísticas).

### 51. Modo compacto 🟢
Un ajuste de densidad para ver más información en pantalla. En móvil se agradece
mucho.

### 52. Repetición de combates 🟡
Guardar la semilla y el equipo de un combate para reproducirlo o compartirlo.
El generador con semilla ya existe (`mulberry32`, [explore.js:110](scripts/explore.js:110)).

### 53. Temas creados por el jugador 🟡
Ya hay 8 temas y 19 variables CSS. Dejar definir los colores propios es casi
gratis y genera comunidad.

---

## H. Salud técnica y accesibilidad

### 54. Accesibilidad básica 🟡
Verificado y es grave: **0 atributos `aria-*`, 0 `alt=` en 70 imágenes, ningún
`prefers-reduced-motion`.** El juego es inutilizable con lector de pantalla y
puede marear a quien tenga sensibilidad al movimiento. Añadir `alt`, roles ARIA,
navegación por teclado y respetar `prefers-reduced-motion` es media semana y
abre el juego a gente que hoy no puede jugarlo.

### 55. Modo para daltónicos 🟢
El juego codifica los 18 tipos **solo por color**. Para un daltónico, Fuego y
Planta son el mismo botón. Añadir el icono del tipo junto al color lo resuelve.

### 56. Arrancar con `DOMContentLoaded` 🟢
Hoy usa `window.load` ([explore.js:10513](scripts/explore.js:10513)), así que el
juego no empieza hasta descargar los 20 MB de imágenes. Cambiarlo acelera mucho
el primer arranque.

### 57. Render incremental en vez de `innerHTML` 🔴
228 sitios en `explore.js` y 212 en `tooltip.js` reconstruyen árboles DOM
enteros. Es lo que limitaba el acelerador a x10 y lo que hace pesada la Pokédex
con 1.376 entradas. Es la refactorización más rentable a largo plazo.

### 58. Instalable y sin conexión (PWA) 🟡
Es un sitio estático: un manifest y un service worker lo convierten en una app
instalable que funciona sin internet. Para un idle que se juega en ratos muertos
desde el móvil, esto es transformador. Además arregla de raíz el problema de
caché que hemos sufrido al probar.

### 59. Más idiomas reutilizando la capa de traducción 🟡
`scripts/es.js` ya demuestra que el gancho de `format()` funciona. Un
`en.js` / `pt.js` con la misma forma y un selector de idioma abre el juego a
mucha más gente sin rehacer nada.

### 60. Tests de las fórmulas de combate 🟡
No hay ninguno. No hace falta cobertura completa: bastan tests sobre
`typeEffectiveness`, `statToRating` y la fórmula de daño para poder tocar el
balance sin miedo.

---

## Por dónde empezaría

**Primero, lo barato y de alto impacto** (un fin de semana):

| # | Idea | Por qué |
|---|---|---|
| 30 | Reactivar Challenges | 1.131 líneas de contenido gratis |
| 38 | Copias de seguridad rotativas | evita la pérdida catastrófica de partidas |
| 17 | Contador de variocolor | enganche enorme, código trivial |
| 12 | Estadísticas de partida | base de logros y gráficas |
| 46 | Números de daño flotantes | el feedback que falta |
| 52 | Modo daltónicos | corrige una barrera real |

**Después, lo que cambia el juego** (semanas):

| # | Idea | Por qué |
|---|---|---|
| 9 + 10 | Prestigio y árbol de talentos | convierte 20 h de juego en 500 |
| 1 + 2 | Rotación visible y cadenas de cruce | hace legible y profunda la mecánica central |
| 45 | Sonido | la ausencia más llamativa del proyecto |
| 11 | Logros | máximo engagement por línea escrita |
| 51 | Accesibilidad | abre el juego a quien hoy no puede jugarlo |

**Y una advertencia de diseño:** la tentación al añadir cosas será subir números
(más daño, más estrellas, más niveles). Este juego no va de eso. Su identidad es
`statToRating` aplanando todo a 1–6 y una rotación de 4 movimientos donde lo que
importa es el *orden*. Las mejores ideas de esta lista son las que profundizan esa
decisión en vez de diluirla.
