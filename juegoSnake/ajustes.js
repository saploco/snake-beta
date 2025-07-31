var audio = new Audio('/descargas/musica.mp3');
audio.volume = 0.3

function playBackgroundMusic() {
    audio.loop = true;
    audio.play().catch(function(error) {
        console.log('Error al reproducir el audio:', error);
    });
}

var musicaFondo = document.getElementById('musicaFondo');
musicaFondo.addEventListener('change', function() {
    if (musicaFondo.checked) {
        localStorage.setItem('musicaFondo', 'true');
        playBackgroundMusic();
    } else {
        localStorage.setItem('musicaFondo', 'false');
        audio.pause();
        audio.currentTime = 0;
    }
});

var efectosSonido = document.getElementById('efectosSonido');
efectosSonido.addEventListener('change', function() {
    localStorage.setItem('efectosSonido', efectosSonido.checked ? 'true' : 'false');
});

window.addEventListener('load', function() {
    if (localStorage.getItem('musicaFondo') === 'true') {
        musicaFondo.checked = true;
        playBackgroundMusic();
    }
    if (localStorage.getItem('efectosSonido') === 'true') {
        efectosSonido.checked = true;
    }
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('audioCurrentTime', audio.currentTime);
});

window.addEventListener('load', function() {
    var savedTime = localStorage.getItem('audioCurrentTime');
    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }
});

var nombre = document.getElementById('nombre');
var nombreGuardado = localStorage.getItem('nombre');
if (nombreGuardado) {
    nombre.value = nombreGuardado;
}

nombre.addEventListener('input', function() {
    localStorage.setItem('nombre', nombre.value);
});


var color = document.getElementById('color');
color.addEventListener('change', function() {
    localStorage.setItem('color', color.value);
});

var colorGuardado = localStorage.getItem('color');
if (colorGuardado) {
    color.value = colorGuardado;
}