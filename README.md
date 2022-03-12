# pokemon-flashcards
A little web app that displays Pokémon information on visually pleasing flashcards

## Características
0. **Fetch de la PokeAPI**
    * Debe traer datos de los Pokemon mediante XMLHttpRequest.
    * La cantidad maximo de Pokemon por petición es de 18.
    * Cada **fetcheo** debe *guardar* el link al cual se realizó.
    * Debe **manejar errores** cuando el *fetcheo* falle.
    * Al inicio de la aplicación se debe ejecutar para obtener datos que ayuden de forma general al flujo de la app.

1. **Pagina principal con galería**.
    * Debe *mostrar* un maximo de 18 Pokemon, con nombre e imagen, ademas que al hacerle *click* deben *mostrar* una **flashcard**.
    * Debe tener botones de "anterior" y "siguiente", los cuales deben *desactivarse* y *activarse* según haya o no haya resultados para mostrar.

2. **Barra de busqueda**
    * Debe *recibir* el nombre específico del Pokemon, y *mostrar* su **flashcard**.
    * En caso de que el nombre sea incorrecto, debe **manejar el error**.

3. **Boton de sort**
    * Al hacerle *click* debe *mostrar* y *desaparecer* un menu con 4 opciones: "nombre", "pokedex", "peso" y "altura".
    * Cada opción, al hacerle *click* debe *ordenar* los Pokemon que se *mostrarán* en la **galería**, y *desaparecer* el menu.
    * La opción seleccionada debe *activarse* y *desactivar* la opción anterior.
    * Al inicio de la aplicación, la opcion "pokedex" debe estar *activada*.

4. **Filtros de Pokemon**
    * Debe tener tres titulos de grupos de filtros: "tipo", "grupo huevo" y "generacion", cada titulo de grupo debe *mostrar* y *desaparecer* sus botones de filtros al ser *clickeado*.
    * Los filtros de generacion son: "I", "II", "III"...
    * Cada boton de filtro debe *filtrar* los Pokemon que se *mostrarán* en la **galería** al ser *clickeado*, además de *activarse* o *desactivarse* cuando está aplicado o no, respectivamente.
    * Pueden *activarse* múltiples filtros a la vez.
    * Al inicio de la aplicación no debe estar activo ningún filtro.

5. **Renderizado de flashcard**
    * Se debe realizar el **fetcheo** del Pokemon.
    * Despues, se debe *mostrar* en el centro de la **galería** la **flashcard** con los datos del Pokemon: nombre, indice de la pokedex nacional, imagen, tipos, habilidades, estadisticas base, altura, peso, grupos huevo, generacion, si es legendario, si es singular.
    * Debe tener un boton de cerrar y *desaparecer* cuando se haga *click* en el boton.
    * Al inicio de la app no debe mostrarse ninguna **flashcard**.

6. **Mensaje de cargando...**
    * Este mensaje debe *mostrarse* cuando suceda algún **fetcheo** o algún cambio en la **galería**, y debe *desaparecer* al final de este.

7. **Manejo de errores**
    * En caso de que haya algún error de **fetcheo**, se debe *mostrar* un mensaje de error, con un boton para intentar de nuevo.
    * El error debe contener el enlace al cual fue realizada el **fetcheo** fallido.
    * El boton de intentar de nuevo, al recibir un *click*, debe volver a **fetchear** al link fallido, y después *desaparecer*.

## Estructura de la aplicacion

* Una carpeta por funcionalidad.
* Una carpeta para la manipulacion del DOM.
* Una carpeta para helpers.