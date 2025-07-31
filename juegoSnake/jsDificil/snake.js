function dibujarSnake() {
    switch (localStorage.getItem('color')) {
        case 'blue':
            ctx.fillStyle = "#4A6EE0"
            break;
            
        case 'green':
            ctx.fillStyle = "rgb(25, 153, 25)"
        break;
        
        case 'gray':
            ctx.fillStyle = "gray"
        break;
        
    
        default:
            ctx.fillStyle = "#4A6EE0"
            break;
    }
    snake.forEach(function (segment) {
        ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
    });
}

var snakeInicial = [{x: 9, y: 9}, {x: 8, y: 9}, {x: 7, y: 9}]
var direccionInicial = {x: 1, y: 0}
var nuevaDireccion = direccionInicial

var choqueAudio = new Audio('/descargas/choque.mp3');
choqueAudio.volume = 0.5

function cambiarDireccion(event) {
    const tecla = event.key;

    switch (tecla) {
        case "ArrowUp":
            if (direccion.y === 0) {
                nuevaDireccion = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (direccion.y === 0) {
                nuevaDireccion = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (direccion.x === 0) {
                nuevaDireccion = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direccion.x === 0) {
                nuevaDireccion = { x: 1, y: 0 };
            }
            break;
    }
}

function colicion() {
    if (obtenerPosicionChoque()) {
        if (localStorage.getItem('efectosSonido') === 'true') {
            choqueAudio.play();
        }
        aplicarAnimacionChoque();
        return true;
    }
    return false;
}

var posicionChoque = null;

function obtenerPosicionChoque() {
    var cabeza = snake[0];

    if (cabeza.x < 0 || cabeza.x >= columnas || cabeza.y < 0 || cabeza.y >= filas) {
        posicionChoque = { x: cabeza.x, y: cabeza.y };
        return true;
    }

    for (var i = 1; i < snake.length; i++) {
        if (cabeza.x === snake[i].x && cabeza.y === snake[i].y) {
            posicionChoque = { x: cabeza.x, y: cabeza.y };
            autodestruccion()
            return true;
        }
    }
    return false;
}

var autodestrucciones = parseInt(localStorage.getItem('autodestrucciones')) || 0;
let autodestruccionEjecutada = false;

function autodestruccion() {
    if (autodestruccionEjecutada) return;
    autodestruccionEjecutada = true;

    autodestrucciones++;
    localStorage.setItem('autodestrucciones', autodestrucciones);

    console.log('Autodestrucciones:', autodestrucciones);

    if (autodestrucciones >= 20) {
        alertaAutodestruccion();
    }

    console.log('Autodestrucciones:', autodestrucciones);
    console.log("autodestrucciones localStorage" + localStorage.getItem('autodestrucciones'));

    setTimeout(() => {
        autodestruccionEjecutada = false;
    }, 450);
}

function moverSnake() {
    direccion = nuevaDireccion;

    if (nuevaDireccion) {
        direccion = nuevaDireccion;
    }

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const cabeza = {
        x: snake[0].x + direccion.x,
        y: snake[0].y + direccion.y
    };
    snake.unshift(cabeza);
    snake.pop();
}

function aplicarAnimacionChoque() {
    if (!posicionChoque) return;
    
    setTimeout(() => {
        ctx.fillStyle = "red";
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 0);

    setTimeout(() => {
        ctx.fillStyle = localStorage.getItem('color');
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 80);

    setTimeout(() => {
        ctx.fillStyle = "red";
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 160);

    setTimeout(() => {
        ctx.fillStyle = localStorage.getItem('color');
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 240);

    setTimeout(() => {
        ctx.fillStyle = "red";
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 320);

    setTimeout(() => {
        ctx.fillStyle = localStorage.getItem('color');
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 400);

    setTimeout(() => {
        ctx.fillStyle = "red";
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 480);

    setTimeout(() => {
        ctx.fillStyle = localStorage.getItem('color');
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 560);

    setTimeout(() => {
        ctx.fillStyle = "red";
        snake.forEach(function (segment) {
            ctx.fillRect(segment.x * tamCelda, segment.y * tamCelda, tamCelda, tamCelda);
        });
    }, 640);
}

function comer() {
    var cabeza = snake[0]

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        crecer()
        lugarComida()
        sumaComida()
    }
}

function crecer() {
    const tamano = snake[snake.length - 1]
    snake.push(tamano)
}