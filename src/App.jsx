import CambiarLogo from "./pages/CambiarLogo";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import CrearDocente from "./pages/CrearDocente";
import LoginDocente from "./pages/LoginDocente";
import PanelDocente from "./pages/PanelDocente";
import Deportes from "./pages/Deportes";
import Musica from "./pages/Musica";
import Eventos from "./pages/Eventos";
import Noticias from "./pages/Noticias";
import Contacto from "./pages/Contacto";
import MisPublicaciones from "./pages/MisPublicaciones";
import EditarPublicacion from "./pages/EditarPublicacion";
import PerfilUsuario from "./pages/PerfilUsuario";
import Fundador from "./pages/Fundador";
import { Routes, Route } from "react-router-dom";
import ConfiguracionInstitucional from "./pages/ConfiguracionInstitucional";
import SubirFotos from "./pages/SubirFotos";
import SubirVideos from "./pages/SubirVideos";
import CrearNoticia from "./pages/CrearNoticia";
import GestionAdministradores from "./pages/GestionAdministradores";
import CrearAdministrador from "./pages/CrearAdministrador";
import GestionDocentes from "./pages/GestionDocentes";
import CrearPublicacion from "./pages/CrearPublicacion";
function App() {

  return (

    <Routes>

      <Route path="/" element={<Inicio />} />

      <Route path="/login-admin" element={<Login />} />

      <Route path="/admin" element={<AdminPanel />} />

      <Route path="/crear-docente"element={<CrearDocente/>}/>
     
      <Route path="/login-docente" element={<LoginDocente/>}/>
      
      <Route path="/docente"element={<PanelDocente/>}/>

      <Route path="/subir-fotos" element={<SubirFotos/>}/>

      <Route path="/subir-videos" element={<SubirVideos/>}/>

      <Route path="/crear-noticia" element={<CrearNoticia/>}/>

      <Route path="/cambiar-logo" element={<CambiarLogo/>}/>

      <Route path="/deportes" element={<Deportes/>}/>

<Route path="/musica" element={<Musica/>}/>

<Route path="/eventos" element={<Eventos/>}/>

<Route path="/noticias" element={<Noticias/>}/>

<Route path="/informacion" element={<Contacto/>}/>

<Route path="/mis-publicaciones" element={<MisPublicaciones/>}/>

<Route
path="/perfil"
element={<PerfilUsuario/>}
/>

<Route path="/editar-publicacion/:tipo/:id" element={<EditarPublicacion/>}/>

<Route
path="/perfil-admin"
element={<PerfilUsuario/>}
/>

<Route

path="/docentes"

element={<GestionDocentes/>}

/>


<Route

path="/crear-administrador"

element={<CrearAdministrador/>}

/>
<Route

path="/fundador/:id"

element={<Fundador/>}

/>
<Route

path="/administradores"

element={<GestionAdministradores/>}

/>

<Route
path="/crear-publicacion"
element={<CrearPublicacion/>}
/>

<Route
path="/configuracion"
element={<ConfiguracionInstitucional/>}
/>
    </Routes>

    

)

}

export default App;



