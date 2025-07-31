var nuevoRecord = 0
function newRecord() {
    nuevoRecord ++
    var elemento = document.getElementById("record")
    elemento.innerHTML = '<img src="/descargas/copa.png" alt="">' + nuevoRecord
    localStorage.setItem("record", contadorComida);
}