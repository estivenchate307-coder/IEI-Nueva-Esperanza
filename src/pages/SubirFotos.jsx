import { db, auth } from "../firebase/firebaseConfig";
import { subirArchivoCloudinary } from "../services/cloudinary";
import {
collection,
addDoc,
doc,
getDoc,

serverTimestamp

} from "firebase/firestore";
import BotonVolver from "../components/BotonVolver";
import { useState, useEffect } from "react";
import useUsuario from "../hooks/useUsuario";
import "../styles/SubirFotos.css";
function SubirFotos(){

const [imagenes, setImagenes] = useState([]);

const [titulo,setTitulo]=useState("");

const [descripcion,setDescripcion]=useState("");

const [urlImagen,setUrlImagen]=useState("");

const [categoria,setCategoria]=useState("Deportes");

const { usuario, cargando } = useUsuario();

const subirImagen = async()=>{ 

if(!imagen){

alert("Selecciona una imagen");

return;

}

try{

const resultado = await subirArchivoCloudinary(

imagen,

"foto"

);

const url = resultado.url;

setUrlImagen(url);

if(cargando){

alert("Cargando información del usuario...");

return;

}

if(!usuario){

alert("No se encontró la información del usuario.");

return;

}

await addDoc(

collection(db,"fotos"),

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

estado: "publicada",

fecha: serverTimestamp(),

fechaTexto: new Date().toLocaleDateString(),

horaTexto: new Date().toLocaleTimeString()
}

);
alert("Imagen guardada correctamente");




}

catch(error){

console.log(error);

alert("Error al subir imagen");

}

}


const seleccionarImagen = (e)=>{

setImagenes(Array.from(e.target.files));

}


return (

<div className="subir-fotos">

<h1>Subir Fotos</h1>

<BotonVolver/>

<div className="formulario-publicacion">

<input
type="file"
multiple
accept="image/*"
onChange={seleccionarImagen}
/>

<input
placeholder="Título de la publicación"
value={titulo}
onChange={(e)=>setTitulo(e.target.value)}
/>

<textarea
placeholder="Descripción de la publicación..."
value={descripcion}
onChange={(e)=>setDescripcion(e.target.value)}
rows="5"
/>

<button onClick={subirImagen}>
Publicar
</button>

</div>

</div>

)

}


export default SubirFotos;