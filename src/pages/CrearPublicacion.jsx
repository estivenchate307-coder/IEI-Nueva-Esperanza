import { useState } from "react";
import BotonVolver from "../components/BotonVolver";
import useUsuario from "../hooks/useUsuario";
import "../styles/CrearPublicacion.css";
import Navbar from "../components/Navbar";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { subirArchivoCloudinary } from "../services/cloudinary";
function CrearPublicacion(){

const { usuario, cargando } = useUsuario();

const [titulo,setTitulo]=useState("");

const [descripcionGeneral,setDescripcionGeneral]=useState("");

const [categoria,setCategoria]=useState("Deportes");
const [tipoContenido,setTipoContenido]=useState("archivos");

const [youtubeUrl,setYoutubeUrl]=useState("");
const [archivos,setArchivos]=useState([]);

const seleccionarArchivos=(e)=>{

const lista = Array.from(e.target.files).map((archivo)=>({

archivo,

descripcion:"",

preview:URL.createObjectURL(archivo)

}));

setArchivos(lista);

}
const publicar = async()=>{

try{

if(titulo.trim()===""){

alert("Escribe un título.");

return;

}

if(tipoContenido==="archivos" && archivos.length===0){

alert("Debes seleccionar al menos un archivo.");

return;

}

if(tipoContenido==="youtube" && youtubeUrl.trim()===""){

alert("Debes pegar un enlace de YouTube.");

return;

}

alert("Todo correcto, comenzaremos a subir.");
let archivosSubidos = [];

if(tipoContenido==="archivos"){

for(const item of archivos){

const tipo = item.archivo.type.startsWith("image")

? "foto"

: "video";

const resultado = await subirArchivoCloudinary(

item.archivo,

tipo

);

archivosSubidos.push({

tipo,

url: resultado.url,

public_id: resultado.public_id,

descripcion: item.descripcion

});

}

}

else{

archivosSubidos.push({

tipo:"youtube",

url:youtubeUrl,

descripcion:""

});

}

await addDoc(

collection(db,"publicaciones"),

{
tipoContenido,

youtubeUrl,

titulo,

descripcionGeneral,

categoria,

archivos: archivosSubidos,

uid: usuario.uid,

nombre: usuario.nombre,

correo: usuario.correo,

cargo: usuario.cargo,

fotoPerfil: usuario.fotoPerfil || "",

estado:"publicada",

fecha: serverTimestamp(),

fechaTexto:new Date().toLocaleDateString(),

horaTexto:new Date().toLocaleTimeString()

}

);

alert("✅ Publicación creada correctamente.");
}
catch(error){

console.error(error);

alert(error.message);

}
}
return(

    <>

<Navbar/>


<div className="crear-publicacion">

<BotonVolver/>

<div className="cabecera-publicacion">

{

usuario?.fotoPerfil ?

<img

src={usuario.fotoPerfil}

className="foto-autor"

alt="perfil"

/>

:

<div className="foto-vacia">

👤

</div>

}

<div>

<h2>

{usuario?.nombre}

</h2>

<p>

{usuario?.cargo}

</p>

</div>

</div>

<h1 className="titulo-publicar">

¿Qué deseas publicar hoy?

</h1>

<div className="contenedor-publicacion">


<input

type="text"

placeholder="Título"

value={titulo}

onChange={(e)=>setTitulo(e.target.value)}

/>

<textarea

placeholder="Descripción"

rows="5"

value={descripcionGeneral}

onChange={(e)=>setDescripcionGeneral(e.target.value)}

/>
<h3>

Tipo de contenido

</h3>

<select

value={tipoContenido}

onChange={(e)=>setTipoContenido(e.target.value)}

>

<option value="archivos">

📷 Fotos / Videos

</option>

<option value="youtube">

▶ Video de YouTube

</option>

</select>
<select

value={categoria}

onChange={(e)=>setCategoria(e.target.value)}

>

<option>Deportes</option>

<option>Música</option>

<option>Eventos</option>

<option>Noticias</option>

</select>
{
tipoContenido==="archivos" && (
<>
<input

id="selector-archivos"

type="file"

multiple

accept="image/*,video/*"

onChange={seleccionarArchivos}

hidden

/>

<label

htmlFor="selector-archivos"

className="boton-archivos"

>

+ Agregar fotos o videos

</label>

{

archivos.length>0 && (

<p className="contador-archivos">

📂 {archivos.length} archivo(s) seleccionado(s)

</p>

)
}

<div className="lista-archivos">

{

archivos.map((item,index)=>(

<div
className="archivo-item"
key={index}
>

{

item.archivo.type.startsWith("image")

?

<img
src={item.preview}
className="preview-publicacion"
/>

:

<video
src={item.preview}
controls
className="preview-publicacion"
/>

}

<textarea

placeholder="Descripción de este archivo..."

rows="3"

value={item.descripcion}

onChange={(e)=>{

const copia=[...archivos];

copia[index].descripcion=e.target.value;

setArchivos(copia);

}}

>

</textarea>

</div>

))

}

</div>
</>
)
}
{
tipoContenido==="youtube" && (

<input

type="text"

placeholder="🔗 Pega aquí el enlace de YouTube"

value={youtubeUrl}

onChange={(e)=>setYoutubeUrl(e.target.value)}

/>

)
}
<button

onClick={publicar}

>

Publicar

</button>

</div>

</div>

</>
)

}

export default CrearPublicacion;