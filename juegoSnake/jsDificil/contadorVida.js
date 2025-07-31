var vidas = 1
function lessLife() {
    var contadorVida = document.getElementById("vidas");
    vidas--;
    contadorVida.innerHTML = '<img src="/descargas/corazon.png" alt="">' + vidas;
    if (vidas <= 0) {
        return true;
    }
    return false;
}

var snake;
var direccion;

function reiniciarSnake() {
    snake = JSON.parse(JSON.stringify(snakeInicial));
    direccion = { ...direccionInicial };
    nuevaDireccion = direccionInicial
    contadorComida = 0
    contadorElemento.innerHTML = '<img src="/descargas/manzana.png">' + contadorComida
}
