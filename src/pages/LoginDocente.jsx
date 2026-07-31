import { auth } from "../firebase/firebaseConfig";

import { signInWithEmailAndPassword }
from "firebase/auth";
import { signOut } from "firebase/auth";

import { db } from "../firebase/firebaseConfig";
import "../styles/LoginDocente.css";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginDocente(){
const navigate = useNavigate();

const iniciarSesion = async()=>{

try{

const usuario = await signInWithEmailAndPassword(

auth,

correo,

contraseña

);

const uid = usuario.user.uid;

const documento = await getDoc(

doc(db,"usuarios",uid)

);

if(!documento.exists()){

alert("No existe información del docente.");

await signOut(auth);

return;

}

const datos = documento.data();
console.log("Datos del docente:", datos);
console.log("Estado:", `"${datos.estado}"`);
console.log("Rol:", datos.rol);
if(datos.rol !== "docente"){

alert("Esta cuenta no pertenece a un docente.");

await signOut(auth);

return;

}

if(datos.estado.toLowerCase() !== "activo"){

alert(

"Discúlpanos, estás inactivo por el momento y no puedes iniciar sesión con tu cuenta. Comunícate con un administrador para activar tu cuenta."

);

await signOut(auth);

return;

}

navigate("/");

}

catch(error){

alert(error.message);

}

}

const [correo,setCorreo]=useState("");

const [contraseña,setContraseña]=useState("");

return(

<div className="login-docente">

<h1>Ingreso Docentes</h1>

<input

placeholder="Correo"

onChange={(e)=>setCorreo(e.target.value)}

/>


<input

type="password"

placeholder="Contraseña"

onChange={(e)=>setContraseña(e.target.value)}

/>


<button

onClick={iniciarSesion}

>

Ingresar

</button>


</div>

)

}

export default LoginDocente;