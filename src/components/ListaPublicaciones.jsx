import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import TarjetaPublicacion from "./TarjetaPublicacion";
import {

collection,

getDocs,

query,

where

} from "firebase/firestore";

function ListaPublicaciones({

publicaciones,

setPublicaciones,

filtro,

busqueda

}){

useEffect(()=>{

const cancelar = onAuthStateChanged(auth,(usuario)=>{

if(usuario){

cargarPublicaciones(usuario.uid);

}else{

setPublicaciones([]);

}

});

return ()=>cancelar();

},[]);

const cargarPublicaciones = async(uid)=>{

try{

console.log("Usuario:", uid);

const consulta = await getDocs(

query(

collection(db,"publicaciones"),

where("uid","==",uid)

)

);

const lista = [];

consulta.forEach((documento)=>{

lista.push({

id: documento.id,

tipo:"publicacion",

...documento.data()

});

});

console.log(lista);

lista.sort((a,b)=>{

const fechaA = a.fecha?.seconds || 0;

const fechaB = b.fecha?.seconds || 0;

return fechaB - fechaA;

});

setPublicaciones(lista);


}

catch(error){

console.log(error);

}

}

const publicacionesFiltradas = publicaciones.filter((publicacion)=>{

const coincideFiltro =

filtro==="todas"

||

publicacion.tipo===filtro;

const texto = (

(publicacion.titulo || "") +

" " +

(publicacion.descripcion || "") +

" " +

(publicacion.categoria || "")

).toLowerCase();

const coincideBusqueda =

texto.includes(busqueda.toLowerCase());

return coincideFiltro && coincideBusqueda;

});

return(

<div>
{

publicacionesFiltradas.map((publicacion)=>(

<TarjetaPublicacion

key={publicacion.id}

publicacion={publicacion}

cargarPublicaciones={cargarPublicaciones}

/>

))

}

</div>

)

}

export default ListaPublicaciones;