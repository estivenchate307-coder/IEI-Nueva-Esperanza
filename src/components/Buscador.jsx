import { useState } from "react";
import "../styles/Buscador.css";

function Buscador() {

const [texto,setTexto]=useState("");
const [abierto,setAbierto]=useState(false);

return(

<div className="buscador">

<button
className="boton-buscador"
onClick={()=>setAbierto(!abierto)}
>

🔍

</button>

<div className={`panel-buscador ${abierto ? "activo" : ""}`}>

<input

type="text"

placeholder="Buscar publicaciones..."

value={texto}

onChange={(e)=>setTexto(e.target.value)}

autoFocus={abierto}

/>

</div>

</div>

);

}

export default Buscador;