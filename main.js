function cambioSelect(data, operacion) {
    switch (operacion) {
        case "add":
            var option = document.createElement("option");
            option.id = data;
            option.value = data;
            option.text = data;
            document.getElementById("catalogo").appendChild(option)
            break;

        case "borrar":
            document.getElementById("catalogo").removeChild(document.getElementById(data))
            break;
    }

}


function guardarExpresion(expresion) {
    console.log(expresion);
    localStorage.setItem(expresion, expresion)
    cambioSelect(expresion, "add")
}

function borrarExpresion(expresion) {
    localStorage.removeItem(expresion)
    cambioSelect(expresion, "borrar")
}


function eventos() {

    var expresion = null

    document.addEventListener("click", evt => {
        console.log(evt)
        switch (evt.target.id) {
            case "help":
                window.open("./ayuda_exp_reg.html", "", "width = 1000; height = 600")
                break;
            case "ejecutar":
                break;
            case "test":
                break;
            case "match":
                break;
            case "replace":
                break;
            case "search":
                break;
            case "split":
                break;
            case "grabar":
                guardarExpresion(document.getElementById("regular").value);
                break;
            case "borrar":
                borrarExpresion(document.getElementById("regular").value);
                break;
        }
    });
    document.getElementById("catalogo").addEventListener("change", evt => {
        expresion = evt.target.value;
        document.getElementById("regular").value = evt.target.value;
    })
}

function preload() {
    if (localStorage.length > 0) {
        for (const elemento in localStorage) {
            if (typeof (elemento) != "function") {
                cambioSelect(localStorage.getItem(elemento));
            }
        }
    }
}
function main() {
    preload();
    eventos();
}
main();