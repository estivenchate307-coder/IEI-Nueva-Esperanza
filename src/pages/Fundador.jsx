import Navbar from "../components/Navbar";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";

import {

doc,

onSnapshot

} from "firebase/firestore";
import BotonVolver from "../components/BotonVolver";
import "../styles/Fundador.css";
function Fundador(){

const { id } = useParams();

const navigate = useNavigate();

const [fundador,setFundador]=useState(null);

useEffect(()=>{

const cancelar = onSnapshot(

doc(db,"fundadores",id),

(documento)=>{

if(documento.exists()){

setFundador(documento.data());

}

}

);

return ()=>cancelar();

},[id]);

if(!fundador){

return(

<>

<Navbar/>

<h2>

Cargando fundador...

</h2>

</>

);

}

return(

<>
<Navbar/>

<BotonVolver

destino="/informacion"

/>

<div className="contenedor-fundador">

<img

src={fundador.foto}

className="foto-fundador"

alt={fundador.nombre}

/>

<h1 className="nombre-fundador">

{fundador.nombre}

</h1>

<h3 className="cargo-fundador">

{fundador.cargo}

</h3>

<div className="info-fundador">

<p>

📅

{fundador.nacimiento}

{

fundador.fallecimiento

?

` - ${fundador.fallecimiento}`

:

""

}

</p>

<p>

📍 {fundador.lugarNacimiento}

</p>

</div>

<div className="biografia-fundador">

<h2>

📖 Biografía

</h2>

<p>

{fundador.biografia}

</p>

</div>

</div>

</>

);

}

export default Fundador;