import { useNavigate } from "react-router-dom";

function BotonVolver({

destino,

texto="⬅ Volver"

}){

const navigate = useNavigate();

const volver = ()=>{

if(destino){

navigate(destino);

}

else{

navigate(-1);

}

}

return(

<button

onClick={volver}

className="boton-volver"

>

{texto}

</button>

);

}

export default BotonVolver;