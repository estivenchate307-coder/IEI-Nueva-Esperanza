import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {collection,}from "firebase/firestore";
import { useState } from "react";
import {createUserWithEmailAndPassword}from "firebase/auth";
import {auth}from "../firebase/firebaseConfig";
import "../styles/CrearDocente.css";
import Navbar from "../components/Navbar";
import BotonVolver from "../components/BotonVolver";
function CrearDocente(){

    const [nombre,setNombre]=useState("");

const [correo,setCorreo]=useState("");

const [contraseña,setContraseña]=useState("");

const [materia,setMateria]=useState("");

const [cargo,setCargo]=useState("");

const [telefono,setTelefono]=useState("");

const [descripcion,setDescripcion]=useState("");

const [fechaIngreso,setFechaIngreso]=useState("");

const [estado,setEstado]=useState("activo");

const [cursos,setCursos]=useState("");

const [gradoDirector,setGradoDirector]=useState("");



const [subirFotos,setSubirFotos]=useState(false);

const [subirVideos,setSubirVideos]=useState(false);

const [publicarNoticias,setPublicarNoticias]=useState(false);

const [editarPublicaciones,setEditarPublicaciones]=useState(false);

const [eliminarPublicaciones,setEliminarPublicaciones]=useState(false);


const [editarFotos,setEditarFotos]=useState(false);

const [eliminarFotos,setEliminarFotos]=useState(false);

const [editarVideos,setEditarVideos]=useState(false);

const [eliminarVideos,setEliminarVideos]=useState(false);

const [editarNoticias,setEditarNoticias]=useState(false);

const [eliminarNoticias,setEliminarNoticias]=useState(false);

const guardarDocente = async()=>{
console.log("Botón presionado");

try{

console.log(correo);

console.log("Contraseña",contraseña);

    const usuarioCreado =

await createUserWithEmailAndPassword(

auth,

correo,

contraseña

);



const uid = usuarioCreado.user.uid;

console.log("Entró al try");


await setDoc(

doc(db,"usuarios",uid),

{

nombre,

correo,

materia,

cargo,

telefono,

descripcion,

fechaIngreso,

estado,

cursos,

gradoDirector,

subirFotos,

subirVideos,

publicarNoticias,

editarPublicaciones,

eliminarPublicaciones,

editarFotos,

eliminarFotos,

editarVideos,

eliminarVideos,

editarNoticias,

eliminarNoticias,

rol:"docente",

fotoPerfil:""

}

);


console.log("Documento guardado");

alert("Docente guardado");



}


catch(error){

console.log(error);

alert(error.message);

}



}

return(

<>

<Navbar/>

<BotonVolver destino="/"/>
<div className="crear-docente">

<h1>

Crear Docente

</h1>


<input placeholder="Nombre completo"onChange={(e)=>
setNombre(e.target.value)}
/>

<input placeholder="Correo"
onChange={(e)=>setCorreo(e.target.value)}/>

<input placeholder="Contraseña"type="password"
onChange={(e)=>setContraseña(e.target.value)}
/>

<input placeholder="Materia"
onChange={(e)=>setMateria(e.target.value)}/>

<input placeholder="Cargo"
onChange={(e)=>setCargo(e.target.value)}/>

<input placeholder="Teléfono"
onChange={(e)=>setTelefono(e.target.value)}/>

<input placeholder="Descripción"
onChange={(e)=>setDescripcion(e.target.value)}/>

<input placeholder="Fecha ingreso"
onChange={(e)=>setFechaIngreso(e.target.value)}/>

<input placeholder="Cursos asignados"
onChange={(e)=>setCursos(e.target.value)}/>

<input placeholder="Grado director"
onChange={(e)=>setGradoDirector(e.target.value)}/>


<select
value={estado}
onChange={(e)=>setEstado(e.target.value)}
>

<option value="activo">
Activo
</option>

<option value="inactivo">
Inactivo
</option>

</select>

<h3>Permisos de Fotos</h3>

<label>

<input
type="checkbox"
onChange={(e)=>setSubirFotos(e.target.checked)}
/>

Puede subir fotos

</label>

<label>

<input
type="checkbox"
onChange={(e)=>setEditarFotos(e.target.checked)}
/>

Puede editar sus fotos

</label>

<label>

<input
type="checkbox"
onChange={(e)=>setEliminarFotos(e.target.checked)}
/>

Puede eliminar sus fotos

</label>

<hr/>

<h3>Permisos de Videos</h3>

<label>

<input
type="checkbox"
onChange={(e)=>setSubirVideos(e.target.checked)}
/>

Puede subir videos

</label>

<label>

<input
type="checkbox"
onChange={(e)=>setEditarVideos(e.target.checked)}
/>

Puede editar sus videos

</label>

<label>

<input
type="checkbox"
onChange={(e)=>setEliminarVideos(e.target.checked)}
/>

Puede eliminar sus videos

</label>

<hr/>

<h3>Permisos de Noticias</h3>

<label>

<input
type="checkbox"
onChange={(e)=>setPublicarNoticias(e.target.checked)}
/>

Puede publicar noticias

</label>

<label>

<input
type="checkbox"
onChange={(e)=>setEditarNoticias(e.target.checked)}
/>

Puede editar sus noticias

</label>

<label>

<input
type="checkbox"
onChange={(e)=>setEliminarNoticias(e.target.checked)}
/>

Puede eliminar sus noticias

</label>




<button onClick={guardarDocente}>
Crear Docente
</button>

</div>

</>

)

}

export default CrearDocente;