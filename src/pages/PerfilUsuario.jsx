import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "../styles/PerfilUsuario.css";
import { auth, db } from "../firebase/firebaseConfig";

import {
doc,
updateDoc
} from "firebase/firestore";

import { subirArchivoCloudinary } from "../services/cloudinary";

import {

EmailAuthProvider,

reauthenticateWithCredential,

updatePassword

} from "firebase/auth";
import useUsuario from "../hooks/useUsuario";

function PerfilUsuario(){

const { usuario, cargando } = useUsuario();

const [docente,setDocente]=useState(null);
const [nuevaFoto,setNuevaFoto]=useState(null);
const [editando,setEditando]=useState(false);

const [mostrarCambioClave,setMostrarCambioClave]=useState(false);

const [claveActual,setClaveActual]=useState("");

const [nuevaClave,setNuevaClave]=useState("");

const [confirmarClave,setConfirmarClave]=useState("");

useEffect(()=>{

if(usuario){

setDocente(usuario);

}

},[usuario]);

const cambiarFoto = async()=>{

try{

if(!nuevaFoto){

alert("Selecciona una imagen");

return;

}

const resultado = await subirArchivoCloudinary(

nuevaFoto,

"foto"

);

await updateDoc(

doc(db,"usuarios",auth.currentUser.uid),

{

fotoPerfil: resultado.url

}

);

setDocente({

...docente,

fotoPerfil: resultado.url

});

alert("✅ Foto de perfil actualizada");

}

catch(error){

console.log(error);

alert("Error al actualizar la foto");

}

}

const guardarCambios = async()=>{

try{

await updateDoc(

doc(db,"usuarios",auth.currentUser.uid),

{

nombre: docente.nombre,

cargo: docente.cargo,

materia: docente.materia,

descripcion: docente.descripcion

}

);

setEditando(false);

alert("✅ Información actualizada");

}

catch(error){

console.log(error);

alert("Error al guardar los cambios");

}

}

const cambiarContraseña = async()=>{

try{

if(!claveActual || !nuevaClave || !confirmarClave){

alert("Completa todos los campos");

return;

}

if(nuevaClave !== confirmarClave){

alert("Las nuevas contraseñas no coinciden");

return;

}

const usuario = auth.currentUser;

const credencial = EmailAuthProvider.credential(

usuario.email,

claveActual

);

await reauthenticateWithCredential(

usuario,

credencial

);

await updatePassword(

usuario,

nuevaClave

);

alert("✅ Contraseña actualizada correctamente");

setClaveActual("");

setNuevaClave("");

setConfirmarClave("");

setMostrarCambioClave(false);

}

catch(error){

console.log(error);

alert("No fue posible cambiar la contraseña");

}

}
if(cargando){

return null;

}

if(!docente){

return null;

}
return(

<>

<Navbar/>

<div className="perfil-usuario">
<h1>

Mi perfil

</h1>

{

docente && (

<>

{

docente.fotoPerfil ?

<img

src={docente.fotoPerfil}

width="180"

alt="Perfil"

/>

:

<div>

👤

</div>

}

{

editando ?

<input

type="text"

value={docente.nombre}

onChange={(e)=>

setDocente({

...docente,

nombre:e.target.value

})

}

/>

:

<h2>

{docente.nombre}

</h2>

}

{

editando ?

<input

type="text"

value={docente.cargo}

onChange={(e)=>

setDocente({

...docente,

cargo:e.target.value

})

}

/>

:

<p>

💼 {docente.cargo}

</p>


}

{

editando ?

<textarea

rows="4"

placeholder="Escribe una descripción"

value={docente.descripcion || ""}

onChange={(e)=>

setDocente({

...docente,

descripcion:e.target.value

})

}

/>

:

<p>

📝 {docente.descripcion || "Sin descripción"}

</p>

}

{

docente.rol==="docente" && (

<>

{

editando ?

<input

type="text"

value={docente.materia}

onChange={(e)=>

setDocente({

...docente,

materia:e.target.value

})

}

/>

:

<p>

📚 {docente.materia}

</p>

}

</>

)

}

<p>

📧 {docente.correo}

</p>

<button

onClick={cambiarFoto}

>

📷 Cambiar foto de perfil

</button>



<input

type="file"

accept="image/*"

onChange={(e)=>setNuevaFoto(e.target.files[0])}

/>
<button

onClick={()=>setEditando(!editando)}

>

✏ Editar información

</button>




<button

onClick={()=>setMostrarCambioClave(!mostrarCambioClave)}

>

🔒 Cambiar contraseña

</button>

{

mostrarCambioClave && (

<>

<br/>

<input

type="password"

placeholder="Contraseña actual"

value={claveActual}

onChange={(e)=>setClaveActual(e.target.value)}

/>

<br/><br/>

<input

type="password"

placeholder="Nueva contraseña"

value={nuevaClave}

onChange={(e)=>setNuevaClave(e.target.value)}

/>

<br/><br/>

<input

type="password"

placeholder="Confirmar nueva contraseña"

value={confirmarClave}

onChange={(e)=>setConfirmarClave(e.target.value)}

/>

<br/><br/>

<button

onClick={cambiarContraseña}

>

Actualizar contraseña

</button>

</>

)

}

{editando && (

<button

onClick={guardarCambios}

>

💾 Guardar cambios

</button>

)}

</>

)

}

</div>

</>

)

}

export default PerfilUsuario;