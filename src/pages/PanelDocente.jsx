import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "../styles/PanelDocente.css";
import { useNavigate } from "react-router-dom";
function PanelDocente(){

const [datos,setDatos]=useState(null);
const navigate = useNavigate();
const cerrarSesion = async()=>{

await signOut(auth);

window.location.href="/login-docente";

}

useEffect(()=>{

cargarDatos();

},[]);


const cargarDatos = async()=>{

try{

const usuario = auth.currentUser;if(!usuario){return;}

const uid = usuario.uid;console.log("UID:",uid);

const documento = await getDoc(doc(db,"usuarios",uid));if(documento.exists()){
    console.log(documento.data());
setDatos(documento.data());
}
else{

console.log("No existe documento");

}

}

catch(error){

console.log(error);

}

}


return(

<div>

<div className="encabezado">

<h1>Panel Docente</h1>

<button
onClick={cerrarSesion}
>

Cerrar Sesión

</button>

</div>


{

datos && (

<>

<h2>

Bienvenido {datos.nombre}

</h2>


<p>

Materia: {datos.materia}

</p>


<p>

Cargo: {datos.cargo}

</p>


<p>

Estado: {datos.estado}

</p>

</>

)

}
<h3>Permisos</h3>

<p>
Subir fotos:
{datos?.subirFotos ? " Sí" : " No"}
</p>

<p>
Subir videos:
{datos?.subirVideos ? " Sí" : " No"}
</p>

<p>
Publicar noticias:
{datos?.publicarNoticias ? " Sí" : " No"}
</p>

{
datos?.subirFotos && (
<button
onClick={()=>navigate("/subir-fotos")}
>

Subir Fotos

</button>
)
}

{
datos?.subirVideos && (
<button
onClick={()=>navigate("/subir-videos")}
>

Subir Videos

</button>
)
}

{
datos?.publicarNoticias && (
<button
onClick={()=>navigate("/crear-noticia")}
>

Crear Noticia

</button>
)
}

</div>

)

}


export default PanelDocente;