var game = true;
var intervalo;
var contadorRecord = parseInt(localStorage.getItem("record")) || 0

var cronometro = 0;
var cronometroElemento = document.getElementById('cronometroElemento')
cronometroElemento.innerHTML = 'Tiempo: ' + cronometro;


function iniciarJuego() {
    intervalo = setInterval(bucleJuego, 180);
    reiniciarSnake();
    localStorage.setItem("record", 0);
}

function reiniciarRecord() {
    localStorage.setItem("record", 0);
    contadorRecord = 0;
    let recordElemento = document.getElementById("record");
    if (recordElemento) {
        recordElemento.innerHTML = '<img src="/descargas/copa.png">' + contadorRecord;
    }
}

function bucleJuego() {
    if (!game) {
        clearInterval(intervalo);

        localStorage.setItem("comida", contadorComida);
        let recordActual = parseInt(localStorage.getItem("record")) || 0;

        if (contadorComida > recordActual) {
            localStorage.setItem("record", contadorComida);
            contadorRecord = contadorComida
        }

        var partidas = JSON.parse(localStorage.getItem('partidas')) || [];
        var nuevaPartida = {
            nombre: localStorage.getItem('nombre'),
            modo: 'Facil',
            color: localStorage.getItem('color') || 'Azul',
            tiempo: cronometro + ' S',
            comida: contadorComida,
            record: localStorage.getItem('record')
        }
        partidas.unshift(nuevaPartida)
        
        if (partidas.length >= 20) {
            partidas.pop()
        }
        localStorage.setItem('partidas', JSON.stringify(partidas))

        setTimeout(function() {
            localStorage.setItem('finFacil', 'true')
            window.location.href = "/index.html";
        }, 450);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (colicion()) {
        if (lessLife()) {
            if (localStorage.getItem('efectosSonido') === 'true') {
                var audioDerrota = new Audio('/descargas/perder.mp3');
                audioDerrota.play();
                aplicarAnimacionChoque()
        }
            game = false;
        } else {
            reiniciarSnake();
        }
    }

    moverSnake();
    comer();
    dibujarSnake();
    dibujarComida();
}


var intervaloCronometro = setInterval(function () {
    cronometro += 1;
    cronometroElemento.innerHTML = 'Tiempo: ' + cronometro;
}, 1000);
if (!game) {
    clearInterval(intervaloCronometro);
}

document.addEventListener("DOMContentLoaded", () => {
    var partidaFacilBtn = document.getElementById("partidaFacil");
    if (partidaFacilBtn) {
        partidaFacilBtn.addEventListener("click", reiniciarRecord);
    }
});

iniciarJuego();


var audio = new Audio('/descargas/musica.mp3');
audio.volume = 0.3

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
