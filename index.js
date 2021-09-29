const http = require('http')
const url = require('url')
const fs = require('fs')


http
    .createServer((req, res) => {
        const params = url.parse(req.url, true).query
        const archivo = params.archivo
        const contenido = params.contenido
        const nombre = params.nombre
        const nuevoNombre = params.nuevoNombre
        if (req.url.includes('/crear')) {
            fs.writeFile(archivo, `${getDateFormated()}k\n${contenido}`, () => {
                res.write('Archivo creado con exito')
                res.end();
            })
        }
        if (req.url.includes('/leer')) {
            fs.readFile(archivo, (err, resultado) => {
                res.write(resultado)
                res.end();
            })
        }
        if (req.url.includes('/renombrar')) {
            fs.rename(nombre, nuevoNombre, () => {
                res.write(`Archivo ${nombre} renombrado a ${nuevoNombre}`)
                res.end();
            })
        }
        if (req.url.includes('/eliminar')) {
            res.write(`Tu solicitud para eliminar ${archivo} esta siendo procesada`)
            setTimeout(() => {
                fs.unlink(archivo, () => {
                    res.write(`Archivo ${archivo} eliminado`)
                    res.end();
                })
            },3000)
        }
    })
    .listen(8080, () => console.log("LISTENING 8080 "))



const getDateFormated = () => {

    let date = new Date()
    return `${date.getDay() < 10 ? "0" + date.getDay() : date.getDay()}/${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}/${date.getFullYear()}`

}