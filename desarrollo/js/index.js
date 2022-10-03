const contenido = document.getElementById('content');
const ROUTER = new Router(PATHS);



sessionStorage.clear()

const menuPrincipal = async () => {

    await ROUTER.load('inicio');
}

const menuCAPITAL = async () => {

    await ROUTER.load('asignadosCAPITAL');
}

const menuINTERIOR = async () => {
    await ROUTER.load('asignadosINTERIOR');
}

const menuCONTROL = async () => {
    await ROUTER.load('contrologin');
}
const menuLOGIN = async () => {
    await ROUTER.load('inicio');
}

const menuTELEFONIA = async () => {
    await ROUTER.load('asignadosTELEFONIA');

}
const menuAgentes = async () => {
    //await ROUTER.load('agentes');

}





function doSearch(tabla) {
    if (tabla.id == 'buscarAsignados') {
        var tableReg = document.getElementById('casosAsignadosCAPITAL');
        var searchText = document.getElementById('buscarAsignados').value.toLowerCase();
    }
    if (tabla.id == 'buscarIncidencia') {
        var tableReg = document.getElementById('tablaIncidencias');
        var searchText = document.getElementById('buscarIncidencia').value.toLowerCase();
    }

    let total = 0;


    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    //mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length ];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");

    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        lastTR.classList.remove('red');
        lastTR.classList.add('text-success');
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.remove('text-success');
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }

}

document.getElementById('navPrincipal').addEventListener('click', menuPrincipal)
//document.getElementById('navINTERIOR').addEventListener('click', menuCONTROL)
document.getElementById('navINTERIOR').addEventListener('click', menuINTERIOR)
document.getElementById('navCAPITAL').addEventListener('click', menuCAPITAL)
document.getElementById('navTelefonia').addEventListener('click', menuTELEFONIA)

