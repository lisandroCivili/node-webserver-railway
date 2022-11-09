/* Relizamos este prooceso ↓↓↓ ya que "__dirname" no esta disponible en ESM. Lo que se hace es usar el modulo "path" de node
y la funcion "fileURLToPath" del modulo "url" para transformat el url del archivo en el cual estamos trabajando a un path
en forma de string. */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);//Hasta aqui conseguimos todo el path del archivo, incluyendo /app.js
const __dirname = path.dirname(__filename); //"path.dirname" ignora el ultimo directorio, es decir /app.js

/* Con express creamos rapidamente un servidor, sin tener que configurar cada parametro del mismo*/
import express from 'express';
import * as dotenv from 'dotenv';
import hbs from 'hbs';
const app = express();

dotenv.config();
const port = process.env.PORT;


/* ******************************************************************************************************************** */
/*                                               ↓↓↓CONTENIDO SEMIDINAMICO↓↓↓                                           */
/* ******************************************************************************************************************** */

/* Los "parciales" son pedazos de codigo que se guardan en otro archivo, gralmente en una carpeta llamada partials, luego
en el codigo fuente, llamamos a estos parciales con {{> [nombre_parcial] }} y de esa manera se renderiza en el black y 
se muestra en el front */

hbs.registerPartials(__dirname + '/views/partials');

// TO DO require('hbs');
app.set('view engine', 'hbs');
/* 'handlebars' sirve co   mo controlador, renderiza los archivos en el backend para luego mostrarlos en front, por ejemplo,
cuando ingreso a una pagina y muestra mi nombre, se puede hacer con hbs, tambien sirve para reutilizar codigo html,
asi como heads, headers, footers. */
app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'Lisandro Civili',
        titulo: 'Curso NODE'
    });

});

app.get('/elements', (req, res) => {

    res.render('elements', {
        nombre: 'Lisandro Civili',
        titulo: 'Curso NODE'
    });

});

app.get('/generic', (req, res) => {

    res.render('generic', {
        nombre: 'Lisandro Civili',
        titulo: 'Curso NODE'
    });

});
/* "res.render" sirve para indicarle al controlador que archivo debe renderizar, y el segundo argumento sirve para darle
propiedades, que luego en el archivo que se indica en el 1er argumento, debemos reemplazar por las mismas propiedas
entre {{ 'propiedad' }} */

/* ******************************************************************************************************************** */
/*                                               ↓↓↓CONTENIDO ESTATICO↓↓↓                                               */
/* ******************************************************************************************************************** */

                    /********* LO COMENTADO CON '/*' ES EXPLICACION Y CON '//' ES CODIGO ***********/


/* '.use' es un 'middlewere'*, sirve archivos estaticos que normalmente se guardan en una carpeta llamada "public",
ya que todo lo q se guarde en la misma puede ser accedido por medio del url del sitio, en esta se guardan imagenes,
textos, favicon, etc., cosas que no cambian.
Si dentro del '.use()' hay un path igual a uno del '.get()', el del 1ro tiene prioridad y se mostrara antes q el 2do,
este reconoce los archivos index.   
 */
app.use(express.static('public'));
/* *middleware es un intermediario entre la peticion al servidor y la respuesta del mismo.
'.get' sirve para decirle al servidor que devolver en una ruta especifica
Si en public hay carpeta "hola-mundo" que dentro tiene un index, esta sera prioridad.
 */

// app.get('/generic', (req, res) => {
/* Para que una ruta (en este caso "/generic"), no tenga la extension ".html", le decimos al metodo '.get', que cuando
reciba lo q esta en el 1er argumento, devuelva lo del '.sendFile', entonces asi al poner "localhost:8080/generic"
seria lo mismo que poner "localhost:8080/generic.hmtl"
Tambien podemos cambiar el path en el 'nav' del index.html */
    // res.sendFile(__dirname + '/public/generic.html');

// });
// app.get('/elements', (req, res) => {

    // res.sendFile(__dirname + '/public/elements.html');

// });
app.get('*', (req, res) => {

    res.sendFile(__dirname + '/public/404.html');
    /* '.sendFile' sirve un archivo en el path dado,
    '__dirname' devuelve el nombre completo donde se guarda el archivo, en este caso seria
    C:\Users\Usuario\Desktop\Node\05-express + '/public/404.html'. */
    
});

app.listen(port, ()=>{
    console.log(`App de ejemplo en el puerto http//:localhost${port} ${__dirname}`);
})
