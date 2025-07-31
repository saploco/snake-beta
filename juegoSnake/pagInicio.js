var infoElements = document.querySelectorAll(".info");

infoElements.forEach(function(info) {
    info.addEventListener("mouseenter", function() {
        var infoTexto = info.nextElementSibling;
        infoTexto.style.display = "inline";
    });

    info.addEventListener("mouseleave", function() {
        var infoTexto = info.nextElementSibling;
        infoTexto.style.display = "none";
    });
});

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

    if (localStorage.getItem('borrarHistorial') === 'true') {
        localStorage.setItem('partidas', JSON.stringify([]));
        localStorage.setItem('borrarHistorial', 'false');
    }

    var partidas = JSON.parse(localStorage.getItem("partidas")) || [];
    var tbody = document.querySelector("#estadisticas tbody");
    tbody.innerHTML = "";

    partidas.forEach(function(partida) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${partida.nombre}</td>
            <td>${partida.modo}</td>
            <td>${partida.color}</td>
            <td>${partida.tiempo}</td>
            <td>${partida.comida}</td>
            <td>${partida.record}</td>
        `;
        tbody.appendChild(row);
    });
});

window.addEventListener('beforeunload', function() {
    localStorage.setItem('audioCurrentTime', audio.currentTime);
});

var fondo = document.getElementById('fondoVerde')

var nombre = localStorage.getItem('nombre')

var nombreElemento = document.createElement('input')
nombreElemento.placeholder = 'nombre...';
nombreElemento.value = nombre
nombreElemento.style.width = '100%'
nombreElemento.style.outline = 'none'
nombreElemento.style.height = '100%'
nombreElemento.style.background = 'transparent'
nombreElemento.style.border = 'none'
nombreElemento.style.fontSize = '24px'
nombreElemento.style.textAlign = 'center'
nombreElemento.style.paddingBlock = '25px'
nombreElemento.style.color = 'greenyellow'
fondo.appendChild(nombreElemento)

nombreElemento.addEventListener('input', function() {
    localStorage.setItem('nombre', nombreElemento.value);
});

var iconoCerrar = document.getElementById('iconoCerrar')
var marco = document.getElementById('marco')
var tabla = document.getElementById('estadisticas')
var fondoTabla = document.getElementsByClassName('fondoEstadisticas')
var botonBorrar = document.getElementById('borrarHistorial')

iconoCerrar.addEventListener('click', function() {
    tabla.style.display = 'none'
    marco.style.display = 'none'
    fondoTabla[0].style.display = 'none'
    iconoCerrar.style.display = 'none'
    botonBorrar.style.display = 'none'
    localStorage.setItem('finFacil', 'false')
});

finFacil = localStorage.getItem('finFacil')

if (finFacil === 'true') {
    tabla.style.display = 'table'
    fondoTabla[0].style.display = 'block'
    iconoCerrar.style.display = 'block'
    marco.style.display = 'block'
    botonBorrar.style.display = 'block'
}

console.log(finFacil)

botonBorrar.addEventListener('click', function () {
    localStorage.setItem('partidas', '[]')
    location.reload()
});