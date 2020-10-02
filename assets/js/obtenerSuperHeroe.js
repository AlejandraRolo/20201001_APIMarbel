// Obtenemos la API por medio de promesas

/** 
 * fecth() a 2015 es una funcionalidad nueva de JS
 * permite controlar errores mas facilmente
 * trabaja por medio de http o https y se basa en "promesas"
 * se basa en un sistema de peticiones y respuestas (cliente-servidor)
*/

const apiKey= '556259208e6c2a67ab6e95fc6d0da2ba';
const privKey= 'd95286f47eb0c55c21beb312fa9af2da2e25380a';
const timeStamp= moment().format();
const hash= md5(timeStamp + privKey + apiKey).toString();

// URL de la API
const urlBase= 'https://gateway.marvel.com/';
const recurso= 'v1/public/characters';
const tamImagen= '/portrait_xlarge.';

// Obtener el retorno de la API
const obtenerDataAll = (urlBase, recurso) => {
    // recuperar url completa de API para obtener personajes
    const api= construirUrlApiPersonaje(urlBase, recurso);
    return fetch(api)
        // obtener listado de pokemones y mapear la respuesta en formato Json
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json);
        })
        .catch((error) => {
            console.log('Error: ', error)
        });
}

const construirUrlApiPersonaje = (urlBase, recurso) =>{
    // json que almacena parametros de envio a la url
    const params = {
        apikey: apiKey,
        ts: timeStamp,
        hash: hash
    }
    const urlBaseRecurso= urlBase + recurso;
    const api= urlBaseRecurso.concat('?apikey=', params.apikey, '&ts=', params.ts, '&hash=', params.hash, '&limit=60');
    return api;
}

// llenar datos en nuestra página
const llenarDatos = (data)=> {
    let html= '';
    data.data.results.forEach((item) => {
        // construir imagen superheroe
        const imagen= item.thumbnail.path.concat(tamImagen, item.thumbnail.extension);
        html += '<div class="col-sm-12 col-md-6 col-lg-3">';
        html += '<div class="card border-container mb-3" style="width: 15rem">';
        html += `<img src="${imagen}" class="card-img-top" alt="">`;
        html += '<div class="card-body">';
        html += `<h5 class="card-title">${item.name}</h5>`;
        html += `<p class="card-text">Descripción: ${item.description}</p>`;
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    // Imprimer datos en html
    document.getElementById('datosPersonajes').innerHTML= html;
}

// Activo o invoco la función
obtenerDataAll(urlBase, recurso);


