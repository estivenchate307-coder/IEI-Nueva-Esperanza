import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase/firebaseConfig";
import TarjetaAdministrador from "../components/TarjetaAdministrador";
import {

collection,

getDocs,

query,

where

} from "firebase/firestore";
import "../styles/GestionAdministradores.css";
function GestionAdministradores(){

const [Administradores,setAdministradores]=useState([]);

useEffect(()=>{

console.log("Cargando Administradores...");

cargarAdministradores();

},[]);

const cargarAdministradores = async()=>{

    
try{

const consulta = await getDocs(

query(

collection(db,"usuarios"),

where("rol","==","admin")

)

);

const lista=[];

consulta.forEach((documento)=>{

lista.push({

id:documento.id,

...documento.data()

});

});

setAdministradores([...lista]);

}

catch(error){

console.log(error);

}

}
return(

<>

<Navbar/>

<div>

<h1>

👥 Gestión de Administradores

</h1>

<hr/>

<h2 className="titulo-seccion-admin">
🟢 Administradores Activos
</h2>

{

Administradores

.filter((Administrador)=>Administrador.estado==="Activo")

.map((Administrador)=>(

<TarjetaAdministrador

key={Administrador.id}

Administrador={Administrador}

cargarAdministradores={cargarAdministradores}
/>

))

}

<hr/>

<h2 className="titulo-seccion-admin">
🔴 Administradores Inactivos
</h2>

{

Administradores

.filter((Administrador)=>Administrador.estado==="Inactivo")

.map((Administrador)=>(

<TarjetaAdministrador

key={Administrador.id}

Administrador={Administrador}

cargarAdministradores={cargarAdministradores}

/>

))

}

</div>

</>

);

}

export default GestionAdministradores;