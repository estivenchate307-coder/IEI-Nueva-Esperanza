import Navbar from "../components/Navbar";
import ListaPublicaciones from "../components/ListaPublicaciones";

import { useState } from "react";

function MisPublicaciones(){

const [publicaciones,setPublicaciones]=useState([]);
const [filtro,setFiltro]=useState("todas");
const [busqueda,setBusqueda]=useState("");

const publicacionesTotales = publicaciones.length;

return(

<>

<Navbar/>

<div>

<h1>

Mis publicaciones

</h1>

<input

type="text"

placeholder="🔍 Buscar publicación..."

value={busqueda}

onChange={(e)=>setBusqueda(e.target.value)}

/>

<div>

<button
onClick={()=>setFiltro("todas")}
>

📄 Todas ({publicacionesTotales})

</button>

</div>

<hr/>

<ListaPublicaciones

publicaciones={publicaciones}

setPublicaciones={setPublicaciones}

filtro={filtro}

busqueda={busqueda}

/>

</div>

</>

)

}

export default MisPublicaciones;