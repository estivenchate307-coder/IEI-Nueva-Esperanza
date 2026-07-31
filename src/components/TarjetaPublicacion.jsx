import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "../styles/TarjetaPublicacion.css";
import { useState } from "react";
import VisorPublicacion from "./VisorPublicacion";
import DescripcionExpandible from "./DescripcionExpandible";
function TarjetaPublicacion({

publicacion,

cargarPublicaciones,

mostrarBotones = true

}){

const navigate = useNavigate();
const [visorAbierto,setVisorAbierto]=useState(false);

const [indiceActual,setIndiceActual]=useState(0);
const abrirVisor = (indice)=>{

setIndiceActual(indice);

setVisorAbierto(true);

}
const eliminarPublicacion = async()=>{

const confirmar = window.confirm(

`¿Deseas eliminar la publicación?

"${publicacion.titulo}"

Esta acción no se puede deshacer.`

);

if(!confirmar){

return;

}

try{

await deleteDoc(

doc(

db,

"publicaciones",

publicacion.id

)

);

alert("Publicación eliminada");

if(cargarPublicaciones){

cargarPublicaciones(publicacion.uid);

}

}

catch(error){

console.log(error);

alert("Error al eliminar");

}

}

return(

<>

<div className="tarjeta-publicacion">

<div className="encabezado-publicacion">

<div className="foto-autor">

{

publicacion.fotoPerfil ?

(

<img

src={publicacion.fotoPerfil}

alt={publicacion.nombre}

className="foto-publicador"

/>

)

:

(

<div className="foto-publicador-vacia">

👤

</div>

)

}

</div>

<div className="datos-publicacion">

<strong>

{publicacion.nombre}

</strong>

<p>

{publicacion.cargo}

</p>

<p>

📅 {publicacion.fechaTexto} • 🕒 {publicacion.horaTexto}

</p>

</div>

</div>


<h2 className="titulo-publicacion">

{publicacion.titulo}

</h2>

{

publicacion.archivos && publicacion.archivos.length > 0 ? (

<div
className={`contenedor-archivos total-${Math.min(publicacion.archivos.length,4)}`}
>

{

publicacion.archivos.slice(0,4).map((archivo,index)=>(

<div
key={index}
className="archivo-publicacion"
onClick={()=>abrirVisor(index)}
>

{

archivo.tipo==="foto"

?

(

<img

src={archivo.url}

alt={publicacion.titulo}

className="imagen-publicacion"

/>

)

:

archivo.tipo==="video"

?

(

<video

src={archivo.url}

controls

className="imagen-publicacion"

/>

)

:

(

<iframe

className="youtube-publicacion"

src={

archivo.url

.replace("watch?v=","embed/")

.replace("youtu.be/","youtube.com/embed/")

}

title={publicacion.titulo}

frameBorder="0"

allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

allowFullScreen

/>

)

}

{

index===3 && publicacion.archivos.length>4 && (

<div className="overlay-mas">

+{publicacion.archivos.length-4}

</div>

)

}

</div>

))

}

</div>

)

:

(

publicacion.url && (

<img

src={publicacion.url}

alt={publicacion.titulo}

className="imagen-publicacion"

onClick={()=>abrirVisor(0)}

/>

)

)

}

<div className="descripcion-publicacion">

<DescripcionExpandible
texto={publicacion.descripcionGeneral}
/>

</div>

{

mostrarBotones && (

<div className="acciones-publicacion">

<button
onClick={()=>navigate(`/editar-publicacion/${publicacion.tipo}/${publicacion.id}`)}
>

✏ Editar

</button>

<button
onClick={eliminarPublicacion}
>

🗑 Eliminar

</button>

</div>

)

}

</div>

{

visorAbierto && (

<VisorPublicacion

archivos={

publicacion.archivos

?

publicacion.archivos

:

[

{

tipo:"foto",

url:publicacion.url,

descripcion:publicacion.descripcion

}

]

}

indiceInicial={indiceActual}

cerrar={()=>setVisorAbierto(false)}

/>

)

}

</>

)

}

export default TarjetaPublicacion;