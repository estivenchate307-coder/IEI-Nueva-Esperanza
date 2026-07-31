import { useNavigate } from "react-router-dom";

function MenuAdministrador(){

const navigate = useNavigate();

return(

<div className="menu-administrador">

<button
onClick={()=>navigate("/perfil-admin")}
>

👤 Mi perfil

</button>

<button
onClick={()=>navigate("/administradores")}
>

👥 Administradores

</button>

<button
onClick={()=>navigate("/docentes")}
>

👨‍🏫 Docentes

</button>



<button
onClick={()=>navigate("/configuracion")}
>

⚙ Configuración

</button>

<button
onClick={()=>navigate("/logs")}
>

📊 Registro de actividad

</button>

<button
onClick={()=>navigate("/papelera")}
>

🗑 Papelera

</button>

</div>

)

}

export default MenuAdministrador;