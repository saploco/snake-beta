document.addEventListener("keydown", cambiarDireccion)

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const tamCelda = 20
const filas = canvas.height / tamCelda
const columnas = canvas.width / tamCelda