var comida = {
    x: Math.floor(Math.random() * columnas),
    y: Math.floor(Math.random() * filas)
}

function dibujarComida() {
    ctx.fillStyle = "red"
    ctx.fillRect(comida.x * tamCelda, comida.y * tamCelda, tamCelda, tamCelda)

}
function lugarComida() {
    comida = {
        x: Math.floor(Math.random() * columnas),
        y: Math.floor(Math.random() * filas)
    }

    while (snake.some(parte => parte.x === comida.x && parte.y === comida.y)) {
        comida.x = Math.floor(Math.random() * columnas)
        comida.y = Math.floor(Math.random() * filas)
    }
}
