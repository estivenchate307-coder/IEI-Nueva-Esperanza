import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";

import { doc, onSnapshot } from "firebase/firestore";

import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import MenuUsuario from "./MenuUsuario";
import Buscador from "./Buscador";
function Navbar(){

const [configuracion,setConfiguracion]=useState(null);

const [menuAbierto,setMenuAbierto]=useState(false);

const [sesionIniciada,setSesionIniciada]=useState(false);

useEffect(() => {

const cancelarSesion = onAuthStateChanged(auth,(usuario)=>{

setSesionIniciada(!!usuario);

});

const cancelarConfiguracion = onSnapshot(

doc(db,"configuracion","colegio"),

(snapshot)=>{

if(snapshot.exists()){

setConfiguracion(snapshot.data());

}

},

(error)=>{

console.log(error);

}

);

return ()=>{

cancelarSesion();

cancelarConfiguracion();

};

},[]);


return(

<nav className="navbar">

{

configuracion && (

<>

<div className="navbar-superior">

<div className="logo-container">

{
configuracion.logo && (

<img
src={configuracion.logo}
alt="Logo"
className="logo"
/>

)
}

<div className="info-institucion">

<h2>

{configuracion.nombre}

</h2>

</div>

</div>

<div className="usuario-navbar">

<MenuUsuario/>

{

!sesionIniciada && (

<button

className="boton-menu"

onClick={()=>setMenuAbierto(!menuAbierto)}

>

☰

</button>

)

}

</div>

</div>

<div className="barra-menu">

<ul className="menu">

<li><Link to="/">Inicio</Link></li>

<li><Link to="/deportes">Deportes</Link></li>

<li><Link to="/musica">Música</Link></li>

<li><Link to="/eventos">Eventos</Link></li>

<li><Link to="/noticias">Noticias</Link></li>

<li title="Información Institucional">

<Link to="/informacion">

🏛

</Link>

</li>

</ul>

<div className="buscador-navbar">

<Buscador/>

</div>

</div>

{

!sesionIniciada && menuAbierto && (

<div className="menu-login">

<h3>

Acceso

</h3>

<hr/>

<ul>

<li>

<Link

to="/login-docente"

onClick={()=>setMenuAbierto(false)}

>

👨‍🏫 Iniciar sesión Docente

</Link>

</li>

<li>

<Link

to="/login-admin"

onClick={()=>setMenuAbierto(false)}

>

👨‍💼 Iniciar sesión Administrador

</Link>

</li>

</ul>

<button

onClick={()=>setMenuAbierto(false)}

>

Cerrar menú

</button>

</div>

)

}

</>

)

}

</nav>

)

}

export default Navbar;