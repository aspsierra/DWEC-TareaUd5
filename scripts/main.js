/**
 * Array de espresiones guardadas
 */
var arrExpresiones = []
/**
 * Numero de veces que se pulsó el botón de guardar
 */
var cuentaGrabar = 0;
/**
 * Contador del numero de coincidencias encontradas
 */
var contador = 0;

/**
 * Carga de localStorage si existe e inicialización del formulario
 */
function main() {
    if (localStorage.getItem("regExp")) {
        console.log(localStorage.getItem("regExp"));
        arrExpresiones = JSON.parse(localStorage.getItem("regExp"));
    } else {
        //Expresión de prueba
        arrExpresiones.push(['/([A-Z])\\w+/g', 'Cadena de Prueba\n\nEscogemos cualquier palabra que empiece con una letra Mayuscula', 'Expresión regular de prueba']);
    }
    for (let i = 0; i < arrExpresiones.length; i++) {
        cambioSelect(arrExpresiones[i][0], "add", i);
    }
    if (arrExpresiones.length > 1) {
        iniciarForm(1);
    } else {
        iniciarForm(0);
    }
}

/**
 * Iniciar el formulario en la posición del array especificada
 * @param {Number} posicion - Posición en la que iniciar el formulario
 */
function iniciarForm(posicion) {
    catalogo.selectedIndex = posicion;
    regular.value = arrExpresiones[posicion][0];
    dattest.value = arrExpresiones[posicion][1];
    descri.value = arrExpresiones[posicion][2];
}

/**
 * Cambio las opciones del select en funcion de la operacion elegida
 * @param {string} data - Valor a introducir en el select
 * @param {string} operacion - operación, Add o Borrar
 */
function cambioSelect(data, operacion) {
    switch (operacion) {
        case "add":
            var option = document.createElement("option");
            option.id = data;
            option.value = data;
            option.text = data;
            catalogo.appendChild(option);
            catalogo.selectedIndex = catalogo.children.length - 1
            break;
        case "borrar":
            catalogo.removeChild(document.getElementById(data));
            break;
    }
}

/**
 * Si se quiere añadir una expresión compruebo si ya existe la expresión a registrar y devuelvo un false si no lo está
 * o si se va a borrar devuelvo la posición de la expresión a borrar
 * @param {Array} data - array de expresiones registradas
 * @param {String} expresion - expresion a comprobar
 * @returns boolean || number
 */
function buscaPos(data, expresion) {
    var pos = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == expresion) {
            pos = i;
        }
    }
    return pos;
}


ejecutar.addEventListener('click', function () {
    result.value = '';
    if (dattest.value != "" && regular.value != "") {
        exp = eval(regular.value);
        contador = 0;
        if (exp.test(dattest.value)) {
            do {
                contador++;
                result.value += "Concidencia: " + contador + ", posición: " + exp.lastIndex + "\n";

            } while (exp.exec(dattest.value) != null);
        } else {
            result.value = "No hay ninguna coincidencia";
        }

    } else {
        alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
    }
});
test.addEventListener('click', function () {
    if (dattest.value != "" && regular.value != "") {
        exp = eval(regular.value);
        contador = 0;
        if (exp.test(dattest.value)) {
            do {
                contador++;
            } while (exp.exec(dattest.value) != null);       
            result.value = "Coincidencias encontradas: " + contador;
        } else {
            result.value = "No se encontraron coincidencias";
        }
    } else {
        alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
    }
});
match.addEventListener('click', function () {
    if (dattest.value != "" && regular.value != "") {
        exp = eval(regular.value);
        result.value = "Resultado de comparar la cadena con la expresión: \n"
            + dattest.value.match(exp);
    } else {
        alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
    }
});
replace.addEventListener('click', function () {
    if (dattest.value != "" && regular.value != "") {
        exp = eval(regular.value);
        var cambio = prompt("Cadena de reemplazo");
        if (cambio != null) {
            result.value = "Reemplazar las coincidencias por '" + cambio + "':\n"
                + dattest.value.replace(exp, cambio);
        }
    } else {
        alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
    }
});
split.addEventListener('click', function () {
    if (dattest.value != "" && regular.value != "") {
        exp = eval(regular.value);
        result.value = "Separando la cadena usando la expresión regular:\n"
            + dattest.value.split(exp);
    } else {
        alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
    }
});
search.addEventListener('click', function () {
    if (dattest.value != "" && regular.value != "") {
        exp = eval(regular.value);
        result.value = "Posición de la primera coincidencia: " + dattest.value.search(exp);
    } else {
        alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
    }
});
grabar.addEventListener('click', function () {
    switch (cuentaGrabar) {
        case 0:
            alert("Introduce una expresión regular, una descripción y "
                + "opcionalmente una cadena de test descripción")
            setdescri.style.display = "block";
            cuentaGrabar++;
            break;

        case 1:
            if (buscaPos(arrExpresiones, regular.value) === false) {
                if (descri.value != "") {
                    arrExpresiones.push([regular.value, dattest.value, descri.value]);
                    localStorage.setItem("regExp", JSON.stringify(arrExpresiones));
                    cambioSelect(arrExpresiones[arrExpresiones.length - 1][0], "add");
                    setdescri.style.display = "none";
                    cuentaGrabar = 0;
                } else {
                    alert("La descripción no puede ir vacía");
                }
            } else {
                alert("Esa expresión ya está registrada");
            }
            break;
    }
});
borrar.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (catalogo.selectedIndex == 0) {
        alert("No se puede eliminar la expresión de prueba");
    } else {
        var pos = buscaPos(arrExpresiones, regular.value);
        if (typeof (pos) == "number") {
            iniciarForm(pos - 1);
            cambioSelect(arrExpresiones[pos][0], "borrar");
            arrExpresiones.splice(pos, 1);
            localStorage.setItem("regExp", JSON.stringify(arrExpresiones));
        }
    }
});
help.addEventListener('click', function () {
    window.open("./ayuda_exp_reg.html", "", "width = 1000; height = 600");
});
catalogo.addEventListener("change", function () {
    iniciarForm(buscaPos(arrExpresiones, catalogo.value));
})

main();