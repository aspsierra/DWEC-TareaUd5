function eventos() {
    document.addEventListener("click", evt => {
        console.log(evt)
        switch (evt.target.id) {
            case "help":
                window.open("./ayuda_exp_reg.html", "", "width: 800px; height: 600px")
                break;

            default:
                break;
        }
    })
}

function main() {
    eventos()
}
main();