import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { subirArchivoCloudinary } from "../services/cloudinary";
import {

doc,

getDoc,

updateDoc

} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function EditarPublicacion(){
const { tipo, id } = useParams();
const [publicacion,setPublicacion]=useState({

titulo:"",

descripcionGeneral:"",

categoria:"",

archivos:[]

});
const [archivoNuevo,setArchivoNuevo]=useState(null);
useEffect(()=>{

cargarPublicacion();

},[]);

const cargarPublicacion = async()=>{

try{

const documento = await getDoc(

doc(db,"publicaciones",id)

);

if(documento.exists()){

console.log(documento.data());
console.log("Archivos:", documento.data().archivos);
setPublicacion({

titulo: documento.data().titulo || "",

descripcionGeneral: documento.data().descripcionGeneral || "",

categoria: documento.data().categoria || "",

archivos: documento.data().archivos || []

});
console.log(documento.data());
}

}catch(error){

console.log(error);

}

}

const actualizarPublicacion = async()=>{

try{

    let archivosActuales = publicacion.archivos || [];

if(archivoNuevo){

const tipoArchivo = archivoNuevo.type.startsWith("image")

? "foto"

: "video";

const resultado = await subirArchivoCloudinary(

archivoNuevo,

tipoArchivo

);

archivosActuales = [

{

tipo: tipoArchivo,

url: resultado.url,

public_id: resultado.public_id,

descripcion: ""

}

];

}
await updateDoc(

doc(db,"publicaciones",id),

{

titulo: publicacion.titulo,

descripcionGeneral: publicacion.descripcionGeneral,

categoria: publicacion.categoria,

archivos: archivoNuevo

? archivosActuales

: publicacion.archivos

}

);

alert("✅ Publicación actualizada");

}

catch(error){

console.log(error);

}

}

return(

<>
<Navbar/>

<div className="crear-publicacion">

<h1>Editar publicación</h1>

<input
type="text"
placeholder="Título"
value={publicacion.titulo}
onChange={(e)=>
setPublicacion({
...publicacion,
titulo:e.target.value
})
}
/>

<textarea
rows="5"
placeholder="Descripción general"
value={publicacion.descripcionGeneral}
onChange={(e)=>
setPublicacion({
...publicacion,
descripcionGeneral:e.target.value
})
}
/>

<select
value={publicacion.categoria}
onChange={(e)=>
setPublicacion({
...publicacion,
categoria:e.target.value
})
}
>

<option>Deportes</option>
<option>Música</option>
<option>Eventos</option>
<option>Noticias</option>

</select>

<br/><br/>

{

publicacion.archivos?.map((archivo,index)=>(

<div
key={index}
style={{
border:"1px solid #555",
padding:"10px",
marginBottom:"15px"
}}
>

{

archivo.tipo==="foto"

?

<img
src={archivo.url}
style={{
width:"200px",
borderRadius:"8px"
}}
/>

:

<video
src={archivo.url}
controls
style={{
width:"250px"
}}
/>

}

<br/><br/>

<textarea

rows="3"

placeholder="Descripción"

value={archivo.descripcion}

onChange={(e)=>{

const copia=[...publicacion.archivos];

copia[index].descripcion=e.target.value;

setPublicacion({

...publicacion,

archivos:copia

});

}}

>

</textarea>

</div>

))

}

<button
onClick={actualizarPublicacion}
>

Actualizar publicación

</button>

</div>

</>

)

}

export default EditarPublicacion;