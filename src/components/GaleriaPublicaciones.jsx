import { useEffect, useState } from "react";
import {
collection,
query,
where,
orderBy,
onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import TarjetaPublicacion from "./TarjetaPublicacion";

function GaleriaPublicaciones({ categoria }) {

const [publicaciones, setPublicaciones] = useState([]);

useEffect(() => {

const consulta = query(

collection(db, "publicaciones"),

where("categoria", "==", categoria),

where("estado", "==", "publicada"),

orderBy("fecha", "desc")

);

const cancelar = onSnapshot(

consulta,

(snapshot) => {

const lista = [];

snapshot.forEach((doc) => {

lista.push({

id: doc.id,

...doc.data()

});

});

setPublicaciones(lista);

},

(error) => {

console.log(error);

}

);

return () => cancelar();

}, [categoria]);

return (

<div>

{

publicaciones.map((publicacion) => (

<TarjetaPublicacion

key={publicacion.id}

publicacion={publicacion}

mostrarBotones={false}

/>

))

}

</div>

);

}

export default GaleriaPublicaciones;