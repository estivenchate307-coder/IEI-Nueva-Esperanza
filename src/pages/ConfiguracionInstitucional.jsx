import Navbar from "../components/Navbar";
import BotonVolver from "../components/BotonVolver";
import ConfiguracionInstitucionalModal from "../components/ConfiguracionInstitucionalModal";
import "../styles/ConfiguracionInstitucional.css";
function ConfiguracionInstitucional(){

return(

<>

<Navbar/>

<BotonVolver destino="/admin"/>

<div className="pagina-configuracion">

<ConfiguracionInstitucionalModal/>

</div>

</>

)

}

export default ConfiguracionInstitucional;