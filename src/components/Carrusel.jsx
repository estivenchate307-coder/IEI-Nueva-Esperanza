import { useState, useEffect } from "react";

import "../styles/Carrusel.css";

import { db } from "../firebase/firebaseConfig";
import {

    doc,

collection,

onSnapshot,

query,

where,

orderBy

} from "firebase/firestore";

function Carrusel(){


const [actual,setActual]=useState(0);

const [imagenes,setImagenes]=useState([]);
const [configuracion,setConfiguracion]=useState(null);

useEffect(()=>{

const cancelarConfiguracion = onSnapshot(

doc(db,"configuracion","colegio"),

(documento)=>{

if(documento.exists()){

setConfiguracion(documento.data());

}

}

);

const consulta = query(

collection(db,"carrusel"),

where("visible","==",true),

orderBy("orden","asc")

);

const cancelar = onSnapshot(

consulta,

(snapshot)=>{

const lista=[];

snapshot.forEach((documento)=>{

lista.push({

id:documento.id,

...documento.data()

});

});

setImagenes(lista);

},

(error)=>{

console.log(error);

}

);

return ()=>{

cancelar();

cancelarConfiguracion();

};

},[]);

useEffect(()=>{

if(imagenes.length===0){

return;

}

const intervalo = setInterval(()=>{

setActual((anterior)=>

(anterior+1)%imagenes.length

);

},4000);

return ()=>clearInterval(intervalo);

},[imagenes]);




const siguiente=()=>{

if(imagenes.length===0){

return;

}

setActual(

(actual+1)%imagenes.length

);

};



const anterior=()=>{

if(imagenes.length===0){

return;

}

setActual(

(actual-1+imagenes.length)%imagenes.length

);

};





return(


<div className="carrusel">


<img

src={imagenes[actual]?.url}

alt="Carrusel"

/>

<div className="texto-carrusel">

{

configuracion && (

<p>

{configuracion.eslogan}

</p>

)

}

</div>



<button

className="izquierda"

onClick={anterior}

>

◀


</button>



<button

className="derecha"

onClick={siguiente}


>

▶


</button>




<div className="puntos">


{

imagenes.map((_,indice)=>(


<span


key={indice}


className={

indice===actual


?"activo"

:""

}



>


●


</span>



))

}



</div>



</div>

)


}



export default Carrusel;