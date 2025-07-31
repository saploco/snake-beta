var game = true;
var intervalo;
var contadorRecord = parseInt(localStorage.getItem("record")) || 0;

var cronometro = 0;
var cronometroElemento = document.getElementById('cronometroElemento')
cronometroElemento.innerHTML = 'Tiempo: ' + cronometro;

function iniciarJuego() {
    intervalo = setInterval(bucleJuego, 140);
    reiniciarSnake();
    localStorage.setItem("record", 0);

    setTimeout(function () {
        if (contadorComida >= 25) {
            alertaPrecision()
        }
    },60000)
}

function reiniciarRecord() {
    localStorage.setItem("record", 0);
    contadorRecord = 0;
    var recordElemento = document.getElementById("record");
    if (recordElemento) {
        recordElemento.innerHTML = '<img src="/descargas/copa.png">' + contadorRecord;
    }
}
var finFacil = localStorage.setItem("finFacil", 'false');

var audioDerrotaReproducido = false

function bucleJuego() {
    if (!game) {
        clearInterval(intervalo);

        localStorage.setItem("comida", contadorComida);
        var recordActual = parseInt(localStorage.getItem("record")) || 0;

        if (contadorComida > recordActual) {
            localStorage.setItem("record", contadorComida);
            contadorRecord = contadorComida;
        }


        var partidas = JSON.parse(localStorage.getItem('partidas')) || [];
        var nuevaPartida = {
            nombre: localStorage.getItem('nombre'),
            modo: 'Dificil',
            color: localStorage.getItem('color') || 'Azul',
            tiempo: cronometro + ' S',
            comida: contadorComida,
            record: localStorage.getItem('record')
        }

        partidas.unshift(nuevaPartida)
        localStorage.setItem('partidas', JSON.stringify(partidas))

        setTimeout(function() {
            localStorage.setItem('finFacil', 'true')
            window.location.href = "/index.html";
        }, 450);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (colicion()) {
        if (localStorage.getItem('efectosSonido') === 'true' && audioDerrotaReproducido === false) {
            var audioDerrota = new Audio('/descargas/perder.mp3');
            audioDerrota.play();
            audioDerrotaReproducido = true;
        }
        aplicarAnimacionChoque()
        setTimeout(() => {
            game = false;
        }, 500);
        return;
    }

    moverSnake();
    comer();
    dibujarSnake();
    dibujarComida();
}

// ALERTAS

function alertaResistencia() {
    if (localStorage.getItem('resistencia') === 'false') {
        var alerta = document.createElement('div');
        alerta.classList.add('alerta');
        alerta.innerHTML = '¡Logro desbloqueado! ⏳ Resistencia <small>(sobrevive 5 minutos)</small>';
        document.body.appendChild(alerta);
        localStorage.setItem('resistencia', 'true');
        
        if (document.body.appendChild(alerta)) {
            var audio = new Audio('/descargas/logro.mp3');
            audio.play();
        }
    
        setTimeout(function() {
            alerta.remove();
        }, 5000);
    }
}


function alertaInmortal () {
    if (localStorage.getItem('inmortal') === 'false') {
        var alerta = document.createElement('div');
        alerta.classList.add('alerta');
        alerta.innerHTML = '¡Logro desbloqueado! 🛡️ Inmortal <small>(sobrevive 8 minutos)</small>';
        document.body.appendChild(alerta);
        localStorage.setItem('inmortal', 'true');
    
        if (document.body.appendChild(alerta)) {
            var audio = new Audio('/descargas/logro.mp3');
            audio.play();
        }
    
        setTimeout(function() {
            alerta.remove();
        }, 5000);
    }
}

function alertaDietaBalanceada() {
    if (localStorage.getItem('dietaBalanceada') === 'false') {
        var alerta = document.createElement('div');
        alerta.classList.add('alerta');
        alerta.innerHTML = '¡Logro desbloqueado! 🏆 Dieta Balanceada <small>(come 50 manzanas)</small>';
        document.body.appendChild(alerta);
        localStorage.setItem('dietaBalanceada', 'true');
        
        if (document.body.appendChild(alerta)) {
            var audio = new Audio('/descargas/logro.mp3');
            audio.play();
        }
    
        setTimeout(function() {
            alerta.remove();
        }, 5000);
    }
}

function alertaModoDios() {
    if (localStorage.getItem('modoDios') === 'false') {
        var alerta = document.createElement('div');
        alerta.classList.add('alerta');
        alerta.innerHTML = '¡Logro desbloqueado! 🌟 Modo Dios <small>(alcanza la longitud maxima)</small>';
        var audio = new Audio('/descargas/logro.mp3');
        document.body.appendChild(alerta);
        localStorage.setItem('modoDios', 'true');
        
        if (document.body.appendChild(alerta)) {
            audio.play();
        }
        
        setTimeout(function() {
            alerta.remove();
        }, 5000);
    }
}

function alertaPrecision() {
    if (localStorage.getItem('presicion') === 'false') {
        var alerta = document.createElement('div');
        alerta.classList.add('alerta');
        alerta.innerHTML = '¡Logro desbloqueado! 🎯 Precisión <small>(come 25 manzanas en los primeros 60 segundos)</small>';
        document.body.appendChild(alerta);
        localStorage.setItem('presicion', 'true');
        
        if (document.body.appendChild(alerta)) {
            var audio = new Audio('/descargas/logro.mp3');
            audio.play();
        }
    
        setTimeout(function() {
            alerta.remove();
        }, 5000);
    }
}

function alertaAutodestruccion() {
    if (localStorage.getItem('autodestruccion') === 'false') {
        var alerta = document.createElement('div');
        alerta.classList.add('alerta');
        alerta.innerHTML = '¡Logro desbloqueado! 💀 Autodestrucción <small>(choca contra ti mismo 20 veces)</small>';
        document.body.appendChild(alerta);
        localStorage.setItem('autodestruccion', 'true');
        
        if (document.body.appendChild(alerta)) {
            var audio = new Audio('/descargas/logro.mp3');
            audio.play();
        }
    
        setTimeout(function() {
            alerta.remove();
        }, 10000);
    }
}

var intervaloCronometro = setInterval(function () {
    cronometro += 1;
    cronometroElemento.innerHTML = 'Tiempo: ' + cronometro;

    if (cronometro === 300) {
        alertaResistencia()
    }
    if (cronometro === 480) {
        alertaInmortal()
        
    }
}, 1000);
if (!game) {
    clearInterval(intervaloCronometro);
}

document.addEventListener("DOMContentLoaded", () => {
    var partidaDificilBtn = document.getElementById("partidaDificil");
    if (partidaDificilBtn) {
        partidaDificilBtn.addEventListener("click", reiniciarRecord);
    }
});

iniciarJuego();

var audio = new Audio('/descargas/musica.mp3');
audio.volume = 0.3;

function playBackgroundMusic() {
    audio.loop = true;
    audio.play().catch(function(error) {
        console.log('Error al reproducir el audio:', error);
    });
}

window.addEventListener('load', function() {
    if (localStorage.getItem('musicaFondo') === 'true') {
        playBackgroundMusic();
        var savedTime = localStorage.getItem('audioCurrentTime');
        if (savedTime !== null) {
            audio.currentTime = parseFloat(savedTime);
        }
    }
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('audioCurrentTime', audio.currentTime);
});
