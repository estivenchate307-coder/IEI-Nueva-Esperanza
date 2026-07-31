import "../styles/Galeria.css";
import DescripcionExpandible from "./DescripcionExpandible";
import { useEffect, useState } from "react";
import TarjetaPublicacion from "./TarjetaPublicacion";
import { db } from "../firebase/firebaseConfig";

import {

collection,

getDocs,

query,

where,

orderBy
}

from "firebase/firestore";

function GaleriaNoticias({ categoria }){

const [noticias,setNoticias]=useState([]);

useEffect(()=>{

cargarNoticias();

},[categoria]);


const cargarNoticias = async()=>{

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

setNoticias(lista);

}

catch(error){

console.log(error);

}

}


return(

<div>

{

noticias.map((publicacion)=>(

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

export default GaleriaNoticias;