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
            document.getElementById("catalogo").appendChild(option);
            break;

        case "borrar":
            document.getElementById("catalogo").removeChild(document.getElementById(data));
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
        if (data[i] == expresion) {
            pos = i;
        }
    }
    return pos;
}


/**
 * Gestión de eventos
 * @param {array} arrExpresiones - array de expresiones introducidas por el usuario
 */
function eventos(arrExpresiones) {

    /**
     * @type {HTMLTextAreaElement} 
     */
    var cadena = document.getElementById("dattest");
    /**
     * @type {HTMLInputElement}
     */
    var regular = document.getElementById("regular");
    /**
     * @type {HTMLTextAreaElement} 
     */
    var resultado = document.getElementById("result");
    /**
     * @type {HTMLSelectElement}
     */
    var select = document.getElementById("catalogo");

    var exp = null;

    document.addEventListener("click", evt => {
        console.log(evt)
        switch (evt.target.id) {
            case "help":

                window.open("./ayuda_exp_reg.html", "", "width = 1000; height = 600");
                break;

            case "ejecutar":


                if (cadena.value != "" && regular.value != "") {
                    var tabla = ""
                    exp = new RegExp(regular.value, "g");
                    arResult = [];
                    var contador = 0;
                    while (exp.exec(cadena.value) != null) {
                        contador++;
                        arResult.push(JSON.stringify({ indice: contador, posicion: exp.lastIndex }));
                    }
                    console.log(arResult);

                    for (let i = 0; i < arResult.length; i++) {
                        var aux = JSON.parse(arResult[i]);

                        tabla += "Concidencia: " + aux.indice + ", posición: " + aux.posicion + "\n";
                    }

                    resultado.value = tabla;
                } else {
                    alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
                }

                break;

            case "test":


                if (cadena.value != "" && regular.value != "") {
                    exp = new RegExp(regular.value, "g");
                    arResult = [];
                    resultado.value = exp.test(cadena.value);
                } else {
                    alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
                }

                break;

            case "match":


                if (cadena.value != "" && regular.value != "") {
                    exp = new RegExp(regular.value, "g");
                    resultado.value = cadena.value.match(exp);
                } else {
                    alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
                }
                break;

            case "replace":

                if (cadena.value != "" && regular.value != "") {
                    exp = new RegExp(regular.value, "g");
                    var cambio = prompt("Cadena de reemplazo");
                    resultado.value = cadena.value.replace(exp, cambio);
                } else {
                    alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
                }

                break;

            case "search":

                if (cadena.value != "" && regular.value != "") {
                    exp = new RegExp(regular.value, "g");
                    resultado.value = cadena.value.search(exp);
                } else {
                    alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
                }

                break;

            case "split":

                if (cadena.value != "" && regular.value != "") {
                    exp = new RegExp(regular.value, "g");
                    resultado.value = cadena.value.split(exp);
                } else {
                    alert("Acuerdate de escribir una cadena de caracteres y de elegir una expresión ya guardada")
                }
                break;

            case "grabar":

                if (buscaPos(arrExpresiones, regular.value) === false) {
                    arrExpresiones.push(regular.value);
                    localStorage.setItem("regExp", JSON.stringify(arrExpresiones));
                    cambioSelect(regular.value, "add");
                } else {
                    alert("Esa expresión ya está registrada");
                }
                break;

            case "borrar":

                var pos = buscaPos(arrExpresiones, regular.value)
                if (typeof (pos) == "number") {
                    arrExpresiones.splice(pos, 1);
                    localStorage.setItem("regExp", JSON.stringify(arrExpresiones));
                    cambioSelect(regular.value, "borrar");
                }
                break;

        }
    });
    select.addEventListener("change", evt => {
        expresion = evt.target.value;
        regular.value = evt.target.value;

    })
}

/**
 * Precarga de los datos guardados en localStorage
 * @returns Array
 */
function preload() {
    if (localStorage.getItem("regExp")) {
        console.log(localStorage.getItem("regExp"));
        var expresiones = JSON.parse(localStorage.getItem("regExp"));
        return expresiones;
    } else {
        return new Array();
    }
}

/**
 * Funcion principal, gestion de la secuencia
 */
function main() {
    var arExp = preload();
    if (arExp.length > 0) {
        for (let i = 0; i < arExp.length; i++) {
            cambioSelect(arExp[i], "add");
        }
    }
    eventos(arExp);
}

main();