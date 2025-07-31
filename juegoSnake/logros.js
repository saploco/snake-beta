var logrosDesbloqueados = {
    resistencia: localStorage.getItem('resistencia'),
    dietaBalanceada: localStorage.getItem('dietaBalanceada'),
    modoDios: localStorage.getItem('modoDios'),
    presicion: localStorage.getItem('presicion'),
    inmortal: localStorage.getItem('inmortal'),
    autodestruccion: localStorage.getItem('autodestruccion')
};
if (localStorage.getItem('resistencia') === null) localStorage.setItem('resistencia', false);
if (localStorage.getItem('dietaBalanceada') === null) localStorage.setItem('dietaBalanceada', false);
if (localStorage.getItem('modoDios') === null) localStorage.setItem('modoDios', false);
if (localStorage.getItem('presicion') === null) localStorage.setItem('presicion', false);
if (localStorage.getItem('inmortal') === null) localStorage.setItem('inmortal', false);
if (localStorage.getItem('autodestruccion') === null) localStorage.setItem('autodestruccion', false);

var elementosLogros = {
    resistencia: document.getElementById("resistencia"),
    dietaBalanceada: document.getElementById("dietaBalanceada"),
    modoDios: document.getElementById("modoDios"),
    presicion: document.getElementById("presicion"),
    inmortal: document.getElementById("inmortal"),
    autodestruccion: document.getElementById("autodestruccion")
};

function actualizarLogros() {
    for (var logro in logrosDesbloqueados) {
        if (logrosDesbloqueados[logro] == "true") {
            elementosLogros[logro].classList.add("desbloqueado");
        }
    }
}

actualizarLogros();


var figure = document.querySelectorAll('figure')

figure.forEach(function(info) {
    info.addEventListener("mouseenter", function() {
        var infoTexto = info.querySelector("span.infoTexto");
        console.log(infoTexto)
        infoTexto.style.display = "block";
        setTimeout(() => {
            infoTexto.style.opacity = "1";
        }, 1)
    });

    info.addEventListener("mouseleave", function() {
        var infoTexto = info.querySelector("span.infoTexto");
        infoTexto.style.opacity = '0'
        infoTexto.style.display = "none";
    });
});

var botReiniciar = document.getElementById("reiniciar");

botReiniciar.addEventListener('click', function () {
    localStorage.setItem('resistencia', false);
    localStorage.setItem('dietaBalanceada', false);
    localStorage.setItem('modoDios', false);
    localStorage.setItem('presicion', false);
    localStorage.setItem('inmortal', false);
    localStorage.setItem('autodestruccion', false);

    localStorage.setItem('autodestrucciones', 0)
    location.reload();
})