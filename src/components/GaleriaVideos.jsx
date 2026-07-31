import "../styles/Galeria.css";
import DescripcionExpandible from "./DescripcionExpandible";
import { useEffect, useState } from "react";
import TarjetaPublicacion from "./TarjetaPublicacion";
import { db } from "../firebase/firebaseConfig";

import {

collection,

getDocs,

query,
orderBy,
where

}

from "firebase/firestore";

function GaleriaVideos({ categoria }){

const [videos,setVideos]=useState([]);

useEffect(()=>{

cargarVideos();

},[categoria]);


const cargarVideos = async()=>{

try{

const consulta = await getDocs(

query(

collection(db,"publicaciones"),

where("categoria","==",categoria),
where("estado","==","publicada"),
orderBy("fecha","desc")

)

);

const lista=[];

consulta.forEach((doc)=>{

lista.push({

id:doc.id,

tipo:"publicacion",

...doc.data()

});

});

setVideos(lista);

}

catch(error){

console.log(error);

}

}


return(

<div>

{

videos.map((publicacion)=>(

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

export default GaleriaVideos;