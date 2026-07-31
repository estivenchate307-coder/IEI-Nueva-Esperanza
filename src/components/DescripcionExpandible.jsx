import { useState } from "react";
import "../styles/TarjetaPublicacion.css";
function DescripcionExpandible({ texto = "" }) {

const [expandido, setExpandido] = useState(false);

const LIMITE = 180;

const esLargo = texto.length > LIMITE;

const descripcion = expandido
  ? texto
  : texto.slice(0, LIMITE);

return (

<div>

<p>

{expandido
? texto
: texto.slice(0,180) + (esLargo ? "..." : "")}

</p>

{

esLargo && (

<button
className="boton-ver-mas"
type="button"
type="button"
onClick={() => setExpandido((valorAnterior) => !valorAnterior)}
>

{expandido ? "▲ Mostrar menos" : "▼ Ver más"}

</button>

)

}

</div>

);

}

export default DescripcionExpandible; 