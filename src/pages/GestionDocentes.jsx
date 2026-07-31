import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase/firebaseConfig";
import TarjetaDocente from "../components/TarjetaDocente";
import {

collection,

getDocs,

query,

where

} from "firebase/firestore";
import "../styles/GestionDocentes.css";
function GestionDocentes(){

const [docentes,setDocentes]=useState([]);

useEffect(()=>{

console.log("Cargando docentes...");

cargarDocentes();

},[]);

const cargarDocentes = async()=>{

    
try{

const consulta = await getDocs(

query(

collection(db,"usuarios"),

where("rol","==","docente")

)

);

const lista=[];

consulta.forEach((documento)=>{

lista.push({

id:documento.id,

...documento.data()

});

});

setDocentes([...lista]);

}

catch(error){

console.log(error);

}

}
return(

<>

<Navbar/>

<div className="gestion-docentes">

<h1>

👨‍🏫 Gestión de Docentes

</h1>

<hr/>

<h2>🟢 Docentes Activos</h2>

<div className="lista-docentes">

{
docentes
.filter((docente)=>docente.estado==="Activo")
.map((docente)=>(

<TarjetaDocente
key={docente.id}
docente={docente}
cargarDocentes={cargarDocentes}
/>

))
}
</div>
<hr/>

<h2>🔴 Docentes Inactivos</h2>

<div className="lista-docentes">

{
docentes
.filter((docente)=>docente.estado==="Inactivo")
.map((docente)=>(

<TarjetaDocente
key={docente.id}
docente={docente}
cargarDocentes={cargarDocentes}
/>

))
}

</div>

</div>

</>

);

}

export default GestionDocentes;