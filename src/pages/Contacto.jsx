import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";

import {

doc,
collection,
query,
where,
orderBy,
onSnapshot

} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Contacto.css";
function Contacto(){

const [datos,setDatos]=useState(null);
const [fundadores,setFundadores]=useState([]);
const navigate = useNavigate();

useEffect(()=>{

const cancelar = onSnapshot(

doc(db,"configuracion","colegio"),

(documento)=>{

if(documento.exists()){

setDatos(documento.data());

}

}

);

const consultaFundadores = query(

collection(db,"fundadores"),

where("visible","==",true),

orderBy("orden","asc")

);

const cancelarFundadores = onSnapshot(

consultaFundadores,

(snapshot)=>{

const lista=[];

snapshot.forEach((documento)=>{

lista.push({

id:documento.id,

...documento.data()

});

});

setFundadores(lista);

}

);

return ()=>{

cancelar();

cancelarFundadores();

};

},[]);

if(!datos){

return(

<>

<Navbar/>

<h2>Cargando información...</h2>

</>

);

}

return(

<>

<Navbar/>

<div className="informacion-institucion">

<div className="encabezado-institucion">
<h1>

🏛 Información Institucional

</h1>

<hr/>

<h2>

🏫 {datos.nombre}

</h2>

<h3>

✨ {datos.eslogan}

</h3>

<hr/>

<h2>

👋 Bienvenida

</h2>

<p>

{datos.bienvenida}

</p>

<hr/>

<h2>

🏫 ¿Quiénes Somos?

</h2>

<p>

{datos.quienesSomos}

</p>

<hr/>

<h2>

📞 Información de Contacto

</h2>

<p>

📍 Dirección: {datos.direccion}

</p>

<p>

📞 Teléfono: {datos.telefono}

</p>

<p>

📧 Correo: {datos.correo}

</p>

<hr/>

<h2>

🌐 Redes Sociales

</h2>

<p>

📘 Facebook

</p>

<p>

{datos.facebook}

</p>

<br/>

<p>

📸 Instagram

</p>

<p>

{datos.instagram}

</p>

<br/>

<p>

▶ YouTube

</p>

<p>

{datos.youtube}

</p>

<hr/>
<div className="titulo-fundadores">
<h2>

👥 Fundadores

</h2>
</div>
<hr/>
<div className="contenedor-fundadores">
{

fundadores.length===0

?

(

<p>

No hay fundadores registrados.

</p>

)

:

(

fundadores.map((persona)=>(

<div
className="tarjeta-fundador"

key={persona.id}

onClick={()=>navigate(`/fundador/${persona.id}`)}
>

<img

src={persona.foto}

width="180"

alt={persona.nombre}

/>

<h3>

{persona.nombre}

</h3>

<p>

🎓 {persona.cargo}

</p>

<p>

📅 {persona.nacimiento}

{

persona.fallecimiento

?

` - ${persona.fallecimiento}`

:

""

}

</p>

<p>

📍 {persona.lugarNacimiento}

</p>

<hr/>

</div>



))

)

}
</div>
</div>
</div>
</>

);

}

export default Contacto;