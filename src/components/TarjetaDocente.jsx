import { db } from "../firebase/firebaseConfig";

import {

doc,

updateDoc

} from "firebase/firestore";
import "../styles/TarjetaDocente.css";
function TarjetaDocente({

docente,

cargarDocentes

}){

    const cambiarEstado = async(estado)=>{

console.log("Estado que voy a guardar:", estado);

try{

await updateDoc(

doc(db,"usuarios",docente.id),

{

estado

}

);

await cargarDocentes();

}

catch(error){

console.log(error);

}

}

return(

<div className="tarjeta-docente">

{

docente.fotoPerfil ?

<img

src={docente.fotoPerfil}

width="80"

alt="Perfil"

/>

:

<div>

👤

</div>

}

<h3>

{docente.nombre}

</h3>

<p>

💼 {docente.cargo}

</p>

<p>

📚 {docente.materia}

</p>

<p>

📧 {docente.correo}

</p>

<p>

📱 {docente.telefono}

</p>

<p>

📝 {docente.descripcion || "Sin descripción"}

</p>

<p>

Estado:

{

docente.estado==="Activo"
?

" 🟢 Activo"

:

" 🔴 Inactivo"

}

</p>

<hr/>

{

docente.estado==="Activo"

?

(

<button

onClick={()=>cambiarEstado("Inactivo")}

>

⛔ Desactivar

</button>

)

:

(

<button

onClick={()=>cambiarEstado("Activo")}

>

✅ Activar

</button>

)

}

</div>

);

}

export default TarjetaDocente;