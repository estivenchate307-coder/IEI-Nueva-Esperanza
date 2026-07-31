import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import useUsuario from "../hooks/useUsuario";
import "../styles/MenuUsuario.css";
function MenuUsuario(){

const { usuario, cargando } = useUsuario();

const [menuAbierto,setMenuAbierto]=useState(false);

const [menuPublicacion,setMenuPublicacion]=useState(false);

const navigate = useNavigate();

const cerrarSesion = async()=>{

try{

await signOut(auth);

setMenuAbierto(false);

navigate("/");

}

catch(error){

console.log(error);

}

}

if(cargando){

return null;

}

if(!usuario){

return null;

}

return(

<div className="usuario-contenedor">

<button
className="boton-usuario"
onClick={()=>setMenuAbierto(!menuAbierto)}
>

{

usuario.fotoPerfil ?

<img
src={usuario.fotoPerfil}
className="foto-mini"
alt="perfil"
/>

:

<div className="foto-vacia">

👤

</div>

}

<div className="datos-mini">

<strong>

{usuario.nombre}

</strong>

<p>

{usuario.cargo}

</p>

</div>

<span>



</span>

</button>

{

menuAbierto && (

<div className="menu-usuario">

{

usuario.rol==="admin"

?

(

<>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/perfil-admin");

}}

>

Mi perfil

</button>
<button

onClick={()=>{

setMenuAbierto(false);

navigate("/mis-publicaciones");

}}

>

Mi contenido

</button>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/crear-publicacion");

}}

>

+ Crear publicación

</button>

<hr/>
<hr/>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/administradores");

}}

>

Administradores

</button>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/crear-administrador");

}}

>

+ Crear administrador

</button>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/docentes");

}}

>

Docentes

</button>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/crear-docente");

}}

>

+ Crear Docente

</button>

<button

onClick={()=>{

setMenuAbierto(false);

navigate("/configuracion");

}}

>

Configuración institucional

</button>


</>

)

:

(

<>

<button
onClick={()=>navigate("/perfil")}
>

Mi perfil

</button>

<button
onClick={()=>navigate("/mis-publicaciones")}
>

Mi contenido

</button>

<button
onClick={()=>{

setMenuAbierto(false);

navigate("/crear-publicacion");

}}

>

+ Nueva publicación

</button>

</>

)

}

<hr/>

<button
onClick={cerrarSesion}
>

Cerrar sesión

</button>

</div>

)

}


</div>

)

}

export default MenuUsuario;