# Pokechill — 60 ideas nuevas (segunda tanda)

> Ninguna repite las de [IDEAS.md](IDEAS.md). Estas parten de lo que **ya
> existe ahora**: prestigio, talentos, logros, estadísticas, asesor, sinergias,
> bendiciones, PWA. Muchas no tenían sentido antes de tener esa base.
>
> Esfuerzo: 🟢 horas · 🟡 días · 🔴 semanas

---

## Diagnóstico del estado actual

Tres cosas cambiaron con lo construido y condicionan qué toca ahora:

**1. El juego ya tiene profundidad, pero no automatización.** Hay 44 logros,
9 talentos, sinergias y bendiciones… y sigues teniendo que hacer clic para
todo. En un idle maduro, la recompensa por progresar es *dejar de hacer cosas*.
Ese es el hueco más grande que queda.

**2. El asesor sabe calcular, pero solo cuando le preguntas.** Toda esa
inteligencia —simular daño, ordenar rotaciones, repartir objetos— está encerrada
detrás de un botón. Aplicarla sola es casi gratis.

**3. Hay muchos datos y ninguna lectura.** Se cuentan 12 estadísticas y hay
gráficas, pero el juego nunca te dice *qué hacer* con eso. Falta la capa que
convierte números en decisiones.

---

## A. Automatización — lo que convierte un idle en un idle de verdad

### 1. Auto-combate por objetivo 🟡
«Quédate en esta zona hasta capturar 3 especies nuevas» o «hasta subir 10
niveles». Hoy tienes que mirar tú. *Engancha en:* `updateWildPkmn()`, donde ya
se detecta la victoria.

### 2. Cola de tareas 🔴
Encadenar objetivos: sube a este al 100 → fárma este objeto → ve a esa zona.
Es la función que separa un idle bueno de uno excelente.

### 3. Auto-equipar al entrar en zona 🟢
El asesor ya calcula el reparto óptimo. Que se aplique solo al cambiar de área
convierte una herramienta en una comodidad. *Engancha en:* `initialiseArea()`.

### 4. Auto-genética en cola 🟡
Encadenar operaciones con condición de parada («hasta que los IV lleguen a 5»).

### 5. Auto-reciclaje 🟢
Reciclar solo al pasar de N copias. La función `Coleccion.reciclarTodo()` ya
existe; falta el disparador automático.

### 6. Reglas condicionales de combate 🔴
«Si mis PS bajan del 20%, cambia de miembro». Programación visual sencilla, al
estilo de las gambits de Final Fantasy XII.

### 7. Auto-prestigio 🟡
Renacer solo cuando la Esencia supere un umbral que tú fijes. Cierra el bucle
del idle: puedes dejarlo horas y volver con varios renaceres hechos.

### 8. Perfiles de automatización 🟡
Guardar configuraciones completas y cambiar entre ellas: «modo farmeo»,
«modo variocolor», «modo torre».

---

## B. Profundizar el prestigio

### 9. Segunda capa: Ascensión 🔴
Reinicia también los talentos a cambio de Fragmentos, una moneda superior.
Es lo que hace que un idle dure años en vez de semanas.

### 10. Reliquias 🟡
Objetos únicos que **sobreviven al renacer**. Se ganan por gestas concretas y
dan efectos que no se pueden comprar con Esencia.

### 11. Desafíos de renacer 🟡
Renacer aceptando restricciones —sin objetos, monotipo, sin variocolor— a
cambio de más Esencia. Convierte el reinicio en una decisión, no en un trámite.

### 12. Talentos con prerrequisitos 🟡
Hoy `TALENTOS` es una lista plana. Con dependencias se vuelve un árbol de
verdad, donde el orden en que gastas importa.

### 13. Especialización excluyente 🟡
Invertir mucho en una rama encarece las otras. Fuerza identidad: no puedes
tenerlo todo en la misma partida.

### 14. Renacer rápido 🟢
Repetir el último renacer sin rejugar, a cambio de un porcentaje de la Esencia.
Elimina el tedio de las partidas 10 en adelante.

### 15. Registro de renaceres 🟢
Tiempos de cada ciclo, para competir contigo mismo. Ya se guardan las
estadísticas; solo falta segmentarlas por renacer.

---

## C. Combate con más decisiones

### 16. Habilidades activas con enfriamiento 🔴
Una por Pokémon, disparable a mano. Da algo que hacer en sesiones activas sin
romper el idle, igual que el modo manual pero con decisión real.

### 17. Jefes con fases 🟡
Al bajar del 50% cambia de tipo o gana resistencia. Obliga a llevar cobertura
en vez de un solo movimiento fuerte.

### 18. Terreno que cambia a mitad del combate 🟡
El clima ya existe y ya rota por zona. Que cambie *durante* la pelea añade
tensión sin código nuevo de fondo.

### 19. Estados encadenados 🟡
Quemado + envenenado = «Infección», con efecto propio. Recompensa llevar
variedad de estados en vez del mismo siempre.

### 20. Contraataques 🟡
Al recibir un supereficaz, devolver un porcentaje. Premia a los Pokémon
defensivos, que hoy no tienen razón de ser.

### 21. Movimientos de relevo con herencia 🟡
Al cambiar de miembro, el siguiente hereda parte de las mejoras. Da sentido
táctico a rotar el equipo.

### 22. Iniciativa de equipo 🟢
La velocidad media del equipo decide quién empieza el combate. Un factor más
para la construcción.

### 23. Combates puzzle 🔴
Peleas con una única solución correcta, donde el reto es deducir la rotación.
Encaja perfecto con el sistema de Retos ya reactivado.

---

## D. Economía con más capas

### 24. Interés por ahorro 🟢
Las Chapas guardadas rinden un pequeño porcentaje diario. Da una razón para no
gastarlo todo al momento.

### 25. Encargos 🟡
Pedidos con plazo: «trae 5 objetos de tipo Fuego en 2 días». Recompensa mayor
que farmear a ciegas.

### 26. Subasta diaria 🟡
Un objeto raro al día, con puja. Crea un momento fijo al que volver.

### 27. Inversión en zonas 🟡
Pagar para mejorar permanentemente los drops de una zona concreta. Convierte el
dinero en progresión y no solo en compras.

### 28. Precios que reaccionan a lo que compras 🟡
Si acaparas un objeto, sube. Ya existe `factorMercado`; falta memoria de tus
compras.

### 29. Segunda moneda del prestigio 🟡
Que la Esencia también compre cosas de un solo uso, no solo talentos
permanentes.

---

## E. Colección y crianza

### 30. Crianza de verdad 🔴
Combinar dos Pokémon para obtener un tercero que hereda de ambos. La genética
actual modifica uno; esto crearía linajes.

### 31. Marcas de nacimiento 🟢
Registrar dónde, cuándo y en qué condiciones lo capturaste. Coste casi nulo y
un enorme apego emocional.

### 32. Árbol genealógico 🟡
Ver de dónde viene cada ejemplar tras varias operaciones genéticas.

### 33. Memorial Nuzlocke 🟢
Un cementerio con los caídos y cómo cayeron. El modo Nuzlocke ya existe pero no
deja rastro de sus pérdidas, que es justo lo que le da peso.

### 34. Intercambio real por código 🟡
Exportar **un Pokémon concreto** a un código e importarlo en otra partida. El
sistema de aliados ya demuestra que el formato funciona.

### 35. Naturalezas ampliadas 🟡
Hoy hay 6. Con 15 y efectos más variados, cada ejemplar se diferencia más sin
tocar la escala de estrellas.

### 36. Colección por generaciones 🟢
Progreso separado por generación, con recompensa al completar cada una.

---

## F. Convertir datos en decisiones

### 37. «¿Qué me conviene hacer ahora?» 🟡
Un panel que mire tus estadísticas y proponga la acción de mayor rendimiento:
qué zona farmear, a quién subir, qué talento comprar. La pieza que le falta a
todo lo que ya se mide.

### 38. Calculadora de tiempo hasta objetivo 🟡
«A este ritmo, completas la Pokédex en 14 h». Con el historial diario ya
guardado, es cuestión de extrapolar.

### 39. Registro de combate 🟡
Un log con qué golpeó, cuánto y por qué (STAB, cruce, efectividad). Es la
herramienta que convierte el combate de caja negra en algo entendible.

### 40. Mapa de calor de zonas 🟢
Dónde has pasado el tiempo y qué te ha rendido. Revela zonas olvidadas.

### 41. Detector de cuellos de botella 🟡
«Tu daño va bien pero mueres rápido»: diagnóstico automático del equipo.

### 42. Comparar builds guardadas 🟡
Guardar configuraciones completas y compararlas con el simulador que ya existe.

### 43. Exportar estadísticas 🟢
CSV o JSON para quien quiera hacer sus propias gráficas.

---

## G. Social sin servidor

### 44. Código de build compartible 🟡
Equipo + movimientos + objetos en un código. El formato de repetición ya lo
hace a medias.

### 45. Retos entre amigos 🟡
Compartir una semilla y un objetivo: quien haga más daño en 10 combates gana.
Sin servidor: se compara contando.

### 46. Tabla local por semilla semanal 🟢
El jefe semanal ya es igual para todos. Guardar tus marcas históricas y
compararlas cuesta poco.

### 47. Exportar equipo en formato Showdown 🟢
Texto estándar que la comunidad Pokémon ya sabe leer.

### 48. Tarjeta de entrenador exportable 🟡
Una imagen con tu rango, especies, mejor variocolor y marca del jefe. El modo
fotografía ya tiene el canvas montado.

### 49. Importar equipos de otros jugadores 🟡
Pegar un código y probarlo en el simulador sin aplicarlo.

---

## H. Presentación

### 50. Sprites animados 🔴
Pokémon Showdown distribuye versiones animadas. Cambiaría por completo la
sensación del combate. Ojo: multiplica el peso de los recursos.

### 51. Retratos del entrenador rival 🟡
Ya existen 101 sprites de entrenador en `img/trainers/`, y en los combates VS
apenas se ven.

### 52. Grabar el combate como GIF 🔴
Compartir un momento concreto. El canvas del modo fotografía es el punto de
partida.

### 53. Modo cine 🟢
Ocultar toda la interfaz y dejar solo el combate. Sorprendentemente agradable
en un idle.

### 54. Transiciones entre zonas 🟢
Un fundido al viajar. Detalle pequeño que hace que el juego se sienta cuidado.

### 55. Música procedural por bioma 🟡
El audio ya se sintetiza con Web Audio. Melodías generadas por bioma serían
coherentes con esa decisión y seguirían sin pesar nada.

---

## I. Accesibilidad avanzada

### 56. Navegación completa por teclado 🟡
Se añadieron `alt` y roles, pero el juego sigue exigiendo ratón. Tabulación y
Enter en todo lo interactivo.

### 57. Atajos configurables 🟢
Teclas para las acciones frecuentes, definibles por el jugador.

### 58. Modo una mano 🟡
En móvil, mover los controles a la mitad inferior. Un idle se juega mucho en
el transporte.

### 59. Narración del combate para lector de pantalla 🟡
Una región `aria-live` que anuncie los golpes importantes. Hoy el combate es
completamente mudo para quien no ve la pantalla.

### 60. Modo lectura fácil 🟡
Versión simplificada de las descripciones, sin jerga. Ayuda a quien empieza y a
quien tiene dificultades de lectura.

---

## Por dónde empezaría

**Lo que más cambia el juego** (y lo que más se nota):

| # | Idea | Por qué |
|---|---|---|
| 1 + 7 | Auto-combate y auto-prestigio | cierran el bucle idle: dejarlo y volver a algo mejor |
| 37 | «¿Qué me conviene hacer ahora?» | da sentido a las 12 estadísticas que ya se miden |
| 9 | Ascensión | el prestigio ya existe; esto le da recorrido de años |
| 3 | Auto-equipar al entrar | el asesor ya calcula; solo falta que actúe solo |
| 39 | Registro de combate | convierte la caja negra en algo que se puede aprender |

**Barato y agradecido** (un rato cada uno): 31 marcas de nacimiento · 33
memorial Nuzlocke · 46 tabla local · 47 formato Showdown · 53 modo cine · 54
transiciones · 24 interés por ahorro.

**Una advertencia distinta a la de la primera lista.** Aquella avisaba de no
subir números. Esta avisa de lo contrario: el riesgo ahora es **añadir sistemas
en vez de conectarlos**. El juego ya tiene muchas piezas —logros, sinergias,
bendiciones, asesor, estadísticas— y varias no se hablan entre sí. Las ideas 3,
37, 39 y 41 no añaden nada nuevo: hacen que lo que ya hay se note. Probablemente
valgan más que las diez siguientes juntas.
