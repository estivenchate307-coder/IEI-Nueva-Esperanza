import { db } from "../firebase/firebaseConfig";

import {

doc,

updateDoc

} from "firebase/firestore";
import "../styles/TarjetaAdministrador.css";
function TarjetaAdministrador({

Administrador,

cargarAdministradores

}){

    const cambiarEstado = async(estado)=>{

console.log("Estado que voy a guardar:", estado);

try{

await updateDoc(

doc(db,"usuarios",Administrador.id),

{

estado

}

);

await cargarAdministradores();

}

catch(error){

console.log(error);

}

}

return(

<div className="tarjeta-Administrador">

{

Administrador.fotoPerfil ?

<img

src={Administrador.fotoPerfil}

width="80"

alt="Perfil"

/>

:

<div className="foto-vacia-administrador">
👤
</div>

}

<h3>

{Administrador.nombre}

</h3>

<p>

💼 {Administrador.cargo}

</p>

<p>

📚 {Administrador.materia}

</p>

<p>

📧 {Administrador.correo}

</p>

<p>

📱 {Administrador.telefono}

</p>

<p>

📝 {Administrador.descripcion || "Sin descripción"}

</p>

<p>

Estado:

{

Administrador.estado==="Activo"
?

" 🟢 Activo"

:

" 🔴 Inactivo"

}

</p>

<hr/>

{

Administrador.estado==="Activo"

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

export default TarjetaAdministrador;