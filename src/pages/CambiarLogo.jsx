import { useState } from "react";

import { db } from "../firebase/firebaseConfig";

import { doc, updateDoc } from "firebase/firestore";

function CambiarLogo(){

const [imagen,setImagen]=useState(null);

const [urlLogo,setUrlLogo]=useState("");

const seleccionarImagen = (e)=>{

setImagen(e.target.files[0]);

}

const subirLogo = async()=>{

if(!imagen){

alert("Selecciona una imagen");

return;

}

const datos = new FormData();

datos.append("file",imagen);

datos.append(

"upload_preset",

"colegio_nueva_esperanza"

);

try{

const respuesta = await fetch(

"https://api.cloudinary.com/v1_1/drysqaxwu/image/upload",

{

method:"POST",

body:datos

}

);

const resultado = await respuesta.json();

const url = resultado.secure_url;

setUrlLogo(url);

await updateDoc(

doc(db,"configuracion","colegio"),

{

logo:url

}

);

alert("Logo actualizado correctamente");

}

catch(error){

console.log(error);

alert("Error al actualizar el logo");

}

}

return(

<div>

<h1>

Cambiar Logo

</h1>

<input

type="file"

accept="image/*"

onChange={seleccionarImagen}

/>

<button

onClick={subirLogo}

>

Subir Logo

</button>

{

urlLogo && (

<img

src={urlLogo}

width="200"

alt="Logo"

/>

)

}

</div>

)

}

export default CambiarLogo;