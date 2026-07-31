import Navbar from "../components/Navbar";

import Galeria from "../components/Galeria";

import Carrusel from "../components/Carrusel";

import { useNavigate } from "react-router-dom";
import FeedInicio from "../components/FeedInicio";

import { useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";

import { doc, onSnapshot } from "firebase/firestore";
function Inicio(){

    const navigate = useNavigate();
const [configuracion,setConfiguracion]=useState(null);

useEffect(()=>{

const cancelar = onSnapshot(

doc(db,"configuracion","colegio"),

(snapshot)=>{

if(snapshot.exists()){

setConfiguracion(snapshot.data());

}

}

);

return ()=>cancelar();

},[]);

return (

<>
<Navbar/>

<div className="hero-texto">

</div>
<Carrusel/>
<FeedInicio/>

<section className="accesos">

</section>

<section className="nosotros">

<h1>

¿Quiénes Somos?

</h1>

<p>

{configuracion?.quienesSomos}

</p>

</section>

</>

)


}


export default Inicio;