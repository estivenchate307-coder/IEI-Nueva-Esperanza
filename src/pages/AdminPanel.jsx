import { useNavigate } from "react-router-dom";
import "../styles/AdminPanel.css";
import MenuAdministrador from "../components/MenuAdministrador";
function AdminPanel(){
const navigate = useNavigate();
return(

<div className="panel">

<h1>

Panel del Administrador

</h1>

<MenuAdministrador/>

<div className="botones">


<button

onClick={()=>navigate("/crear-docente")}

>

Crear Docente

</button>


<button>

Subir Fotos

</button>


<button>

Subir Videos

</button>



<button>

Publicar Noticias

</button>



<button>

Modificar Carrusel

</button>



<button

onClick={()=>navigate("/cambiar-logo")}

>

Cambiar Logo

</button>



</div>



</div>

)

}

export default AdminPanel;