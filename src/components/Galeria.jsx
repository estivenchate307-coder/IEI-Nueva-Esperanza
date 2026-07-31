import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

import {
collection,
query,
where,
orderBy,
onSnapshot
} from "firebase/firestore";

import TarjetaPublicacion from "./TarjetaPublicacion";

function Galeria({ categoria }) {

const [fotos, setFotos] = useState([]);

useEffect(() => {

const cancelar = cargarFotos();

return () => cancelar();

}, [categoria]);

const cargarFotos = () => {

const consulta = query(
collection(db,"publicaciones"),
where("categoria","==",categoria),
where("estado","==","publicada"),
orderBy("fecha","desc")
);

const cancelar = onSnapshot(

consulta,

(snapshot) => {

const lista = [];

snapshot.forEach((doc) => {

lista.push({

id: doc.id,

tipo:"publicacion",

...doc.data()

});

});

setFotos(lista);

},

(error) => {

console.log(error);

}

);

return cancelar;

};

return (

<div>


{

fotos.map((foto) => (

<TarjetaPublicacion

key={foto.id}

publicacion={foto}

mostrarBotones={false}

/>

))

}

</div>

);

}

export default Galeria;