import { useState, useEffect } from "react";
import "../styles/VisorPublicacion.css";

function VisorPublicacion({

archivos,

indiceInicial,

cerrar

}){

const [indice,setIndice]=useState(indiceInicial);

useEffect(()=>{

setIndice(indiceInicial);

},[indiceInicial]);

const siguiente=()=>{

if(indice<archivos.length-1){

setIndice(indice+1);

}

}

const anterior=()=>{

if(indice>0){

setIndice(indice-1);

}

}

const archivo=archivos[indice];

return(

<div className="visor-fondo">

<button
className="cerrar-visor"
onClick={cerrar}
>

✕

</button>

<button
className="flecha izquierda"
onClick={anterior}
>

❮

</button>

<div className="contenido-visor">

{

archivo.tipo==="foto"

?

<img

src={archivo.url}

className="imagen-visor"

alt=""

/>

:

<video

src={archivo.url}

controls

className="imagen-visor"

/>

}

{

archivo.descripcion && (

<p className="descripcion-visor">

{archivo.descripcion}

</p>

)

}

</div>

<button
className="flecha derecha"
onClick={siguiente}
>

❯

</button>

</div>

);

}

export default VisorPublicacion;