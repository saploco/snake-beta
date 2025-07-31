var comidaElemento = document.getElementById("comidaValor");
var recordElemento = document.getElementById("recordValor");

var contadorComidaIni = parseInt(localStorage.getItem("comida")) || 0
var contadorRecordIni = parseInt(localStorage.getItem("record")) || 0

function actualizarContadores() {
    if (comidaElemento) {
        comidaElemento.innerHTML = contadorComidaIni;
    }
    if (recordElemento) {
        recordElemento.innerHTML = contadorRecordIni;
    }
}
document.addEventListener("DOMContentLoaded", actualizarContadores)