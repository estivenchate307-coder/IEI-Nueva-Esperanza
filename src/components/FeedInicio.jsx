import { useEffect, useState } from "react";
import "../styles/FeedInicio.css";

import {

collection,
getDocs,
query,
orderBy

} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import TarjetaPublicacion from "./TarjetaPublicacion";

function FeedInicio(){

const [publicaciones,setPublicaciones]=useState([]);

useEffect(()=>{

cargarPublicaciones();

},[]);

const cargarPublicaciones = async()=>{

try{

const consulta = await getDocs(

query(

collection(db,"publicaciones"),

orderBy("fecha","desc")

)

);

const lista=[];

consulta.forEach((doc)=>{

lista.push({

id:doc.id,

...doc.data()

});

});

setPublicaciones(lista);

}

catch(error){

console.log(error);

}

}
return(

<div className="feed-inicio">

{

publicaciones.map((publicacion)=>(

<TarjetaPublicacion
    key={publicacion.id}
    publicacion={publicacion}
    mostrarBotones={false}
/>

))

}

</div>

)

}

export default FeedInicio;