import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import BotonVolver from "../components/BotonVolver";
import "../styles/CrearAdministrador.css";
function CrearAdministrador(){

const [nombre,setNombre]=useState("");
const [correo,setCorreo]=useState("");
const [contraseña,setContraseña]=useState("");
const [cargo,setCargo]=useState("");
const [telefono,setTelefono]=useState("");
const [descripcion,setDescripcion]=useState("");

const crearAdministrador = async()=>{

try{

const usuario = await createUserWithEmailAndPassword(

auth,

correo,

contraseña

);

await setDoc(

doc(db,"usuarios",usuario.user.uid),

{

nombre,

correo,
cargo,
telefono,
descripcion,

rol:"admin",

estado:"Activo",

fotoPerfil:""

}

);

alert("Administrador creado correctamente");

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

<div className="crear-administrador">

<h1>Crear Administrador</h1>

<input
placeholder="Nombre"
onChange={(e)=>setNombre(e.target.value)}
/>

<input
placeholder="Correo"
onChange={(e)=>setCorreo(e.target.value)}
/>

<input
type="password"
placeholder="Contraseña"
onChange={(e)=>setContraseña(e.target.value)}
/>

<input
placeholder="Cargo"
onChange={(e)=>setCargo(e.target.value)}
/>

<input
placeholder="Teléfono"
onChange={(e)=>setTelefono(e.target.value)}
/>

<textarea
placeholder="Descripción"
onChange={(e)=>setDescripcion(e.target.value)}
></textarea>

<button
onClick={crearAdministrador}
>

Crear Administrador

</button>

</div>

</>

);

}

export default CrearAdministrador;