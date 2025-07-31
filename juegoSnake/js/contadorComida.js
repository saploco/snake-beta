var contadorComida = 0;
var recordActual = parseInt(localStorage.getItem("record")) || 0;
var contadorElemento = document.getElementById("comida");

function sumaComida() {
    contadorComida++;
    contadorElemento.innerHTML = '<img src="/descargas/manzana.png">' + contadorComida;

    if (contadorComida > nuevoRecord) {
        newRecord()
    }
    if (nuevoRecord === 0) {
    }

    localStorage.setItem("comida", contadorComida);

    var mas1 = document.createElement("div")
    mas1.className = "mas1";
    mas1.innerHTML = "+1";
    document.querySelector("body").appendChild(mas1);

    setInterval(function() {
        mas1.style.opacity = "0";

        setInterval(function() {
            mas1.style.display = "none";
        },500)
    }, 500);

    if (localStorage.getItem('efectosSonido') === 'true') {
        var audio = new Audio('/descargas/comer.mp3');
        audio.play();
    }
}
