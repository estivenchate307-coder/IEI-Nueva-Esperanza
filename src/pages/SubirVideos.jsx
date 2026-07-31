import { db, auth } from "../firebase/firebaseConfig";
import BotonVolver from "../components/BotonVolver";
import useUsuario from "../hooks/useUsuario";
import {

collection,

addDoc,

doc,
serverTimestamp,
getDoc

}

from "firebase/firestore";

import {

useState,

useEffect

}

from "react";

function SubirVideos(){

const [video,setVideo]=useState(null);

const [titulo,setTitulo]=useState("");

const [descripcion,setDescripcion]=useState("");

const [urlVideo,setUrlVideo]=useState("");

const [categoria,setCategoria]=useState("Deportes");

const { usuario, cargando } = useUsuario();


// Se ejecuta una sola vez al abrir la página


// Función para seleccionar el video
const seleccionarVideo=(e)=>{

setVideo(

e.target.files[0]

);

}


// Aquí después irá subirVideo()
const subirVideo = async()=>{

if(!video){

alert("Selecciona un video");

return;

}

const datos = new FormData();

datos.append("file",video);

datos.append(

"upload_preset",

"colegio_nueva_esperanza"

);

try{

    const respuesta = await fetch(

"https://api.cloudinary.com/v1_1/drysqaxwu/video/upload",

{

method:"POST",

body:datos

}

);

const resultado = await respuesta.json();

console.log(resultado);

const url = resultado.secure_url;

setUrlVideo(url);

console.log(url);

if(cargando){

alert("Cargando información del usuario...");

return;

}

if(!usuario){

alert("No se encontró la información del usuario.");

return;

}

await addDoc(

collection(db,"videos"),

{

titulo,

descripcion,

url,

public_id: resultado.public_id,

uid: usuario.uid,

nombre: usuario.nombre,
correo: usuario.correo,
materia: usuario.materia,
cargo: usuario.cargo,
fotoPerfil: usuario.fotoPerfil || "",
categoria,

estado:"publicada",

fecha: serverTimestamp(),

fechaTexto:new Date().toLocaleDateString(),

horaTexto:new Date().toLocaleTimeString()

}

);

alert("Video guardado correctamente");

}

catch(error){

console.log(error);

alert("Error al subir el video");

}

}

return(

<div>

<h1>

Subir Videos

</h1>
<BotonVolver/>
<input

type="file"

accept="video/*"

onChange={seleccionarVideo}

/>

<input

placeholder="Título del video"

value={titulo}

onChange={(e)=>setTitulo(e.target.value)}

/>

<textarea

placeholder="Descripción"

rows="5"

value={descripcion}

onChange={(e)=>setDescripcion(e.target.value)}

/>

<select

value={categoria}

onChange={(e)=>setCategoria(e.target.value)}

>

<option>Deportes</option>

<option>Música</option>

<option>Eventos</option>

<option>Noticias</option>

</select>

<button

onClick={subirVideo}

>

Subir Video

</button>

{

urlVideo && (

<video

src={urlVideo}

controls

width="400"

/>

)

}

</div>

);

}

export default SubirVideos;