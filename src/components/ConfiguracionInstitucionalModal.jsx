import { useEffect, useState } from "react";
import { subirArchivoCloudinary } from "../services/cloudinary";
import {

doc,
getDoc,
updateDoc,
collection,
addDoc,
serverTimestamp,
deleteDoc,
query,
orderBy,
onSnapshot

} from "firebase/firestore";
import BotonGuardar from "../components/ui/BotonGuardar";
import { db } from "../firebase/firebaseConfig";

function ConfiguracionInstitucionalModal({ cerrar }) {
const [seccion,setSeccion]=useState("general");
const [nuevaImagenCarrusel,setNuevaImagenCarrusel]=useState(null);
const [imagenesCarrusel,setImagenesCarrusel]=useState([]);
const [fundadores,setFundadores]=useState([]);
const [fotoFundador,setFotoFundador]=useState(null);

const [fundador,setFundador]=useState({

nombre:"",

nacimiento:"",

fallecimiento:"",

lugarNacimiento:"",

cargo:"",

biografia:""

});
const [editandoFundador,setEditandoFundador]=useState(null);
const [datos,setDatos]=useState({

nombre:"",

eslogan:"",

bienvenida:"",

quienesSomos:"",

direccion:"",

telefono:"",

correo:"",

facebook:"",

instagram:"",

youtube:"",

logo:"",

carrusel:[]

});
const [nuevoLogo, setNuevoLogo] = useState(null);
useEffect(()=>{

cargarDatos();

const consulta = query(

collection(db,"carrusel"),

orderBy("orden","asc")

);

const cancelar = onSnapshot(

consulta,

(snapshot)=>{

const lista=[];

snapshot.forEach((documento)=>{

lista.push({

id:documento.id,

...documento.data()

});

});

setImagenesCarrusel(lista);

}

);

const consultaFundadores = query(

collection(db,"fundadores"),

orderBy("orden","asc")

);

const cancelarFundadores = onSnapshot(

consultaFundadores,

(snapshot)=>{

const lista=[];

snapshot.forEach((documento)=>{

lista.push({

id:documento.id,

...documento.data()

});

});

setFundadores(lista);

}

);

return ()=>{

cancelar();

cancelarFundadores();

};

},[]);

const cargarDatos = async()=>{

try{

const documento = await getDoc(

doc(db,"configuracion","colegio")

);

if(documento.exists()){

setDatos(documento.data());

}

}catch(error){

console.log(error);

}

}


const cambiarDato=(e)=>{

setDatos({

...datos,

[e.target.name]:e.target.value

});

}
const cambiarFundador = (e)=>{

setFundador({

...fundador,

[e.target.name]:e.target.value

});

}
const guardarCambios=async()=>{

try{

await updateDoc(

doc(db,"configuracion","colegio"),

datos

);

alert("Configuración guardada correctamente.");

}catch(error){

console.log(error);

alert("Ocurrió un error.");

}

}

const cambiarLogo = async () => {

    if (!nuevoLogo) {
        alert("Selecciona una imagen.");
        return;
    }

    try {

        const resultado = await subirArchivoCloudinary(
            nuevoLogo,
            "foto"
        );

        await updateDoc(
            doc(db, "configuracion", "colegio"),
            {
                logo: resultado.url,
                logo_public_id: resultado.public_id
            }
        );

        setDatos({
            ...datos,
            logo: resultado.url
        });

        setNuevoLogo(null);

        alert("Logo actualizado correctamente.");

    } catch (error) {

        console.log(error);

        alert("Error al actualizar el logo.");

    }

};

const subirImagenCarrusel = async()=>{

try{

if(!nuevaImagenCarrusel){

alert("Selecciona una imagen.");

return;

}

const resultado = await subirArchivoCloudinary(

nuevaImagenCarrusel,

"foto"

);

await addDoc(

collection(db,"carrusel"),

{

url: resultado.url,

public_id: resultado.public_id,

visible:true,

orden:Date.now(),

fecha:serverTimestamp()

}

);

alert("✅ Imagen agregada al carrusel.");

setNuevaImagenCarrusel(null);



}

catch(error){

console.log(error);

alert("Error al subir la imagen.");

}

}
const guardarFundador = async()=>{

try{

if(!fotoFundador){

alert("Selecciona una foto.");

return;

}

const resultado = await subirArchivoCloudinary(

fotoFundador,

"foto"

);

await addDoc(

collection(db,"fundadores"),

{

nombre:fundador.nombre,

foto:resultado.url,

public_id:resultado.public_id,

nacimiento:fundador.nacimiento,

fallecimiento:fundador.fallecimiento,

lugarNacimiento:fundador.lugarNacimiento,

cargo:fundador.cargo,

biografia:fundador.biografia,

visible:true,

orden:Date.now(),

fecha:serverTimestamp()

}

);

alert("Fundador agregado.");

setFundador({

nombre:"",

nacimiento:"",

fallecimiento:"",

lugarNacimiento:"",

cargo:"",

biografia:""

});

setFotoFundador(null);

}

catch(error){

console.log(error);

alert("Error al guardar.");

}

}

const actualizarFundador = async()=>{

try{

await updateDoc(

doc(db,"fundadores",editandoFundador.id),

{

...fundador

}

);

alert("Fundador actualizado correctamente.");

setEditandoFundador(null);

setFundador({

nombre:"",

nacimiento:"",

fallecimiento:"",

lugarNacimiento:"",

cargo:"",

biografia:""

});

}

catch(error){

console.log(error);

alert("Error al actualizar.");

}

}

const seleccionarFundador = (persona)=>{

setFundador({

nombre:persona.nombre,

nacimiento:persona.nacimiento,

fallecimiento:persona.fallecimiento,

lugarNacimiento:persona.lugarNacimiento,

cargo:persona.cargo,

biografia:persona.biografia

});

setEditandoFundador(persona);

}
const cambiarVisibilidad = async (imagen) => {

try{

await updateDoc(

doc(db,"carrusel",imagen.id),

{

visible: !imagen.visible

}

);

}

catch(error){

console.log(error);

alert("Error al cambiar la visibilidad.");

}

}
const moverFundador = async (fundador,direccion)=>{

try{

const fundadoresOrdenados=[...fundadores]

.sort((a,b)=>a.orden-b.orden);

const indice=fundadoresOrdenados.findIndex(

(item)=>item.id===fundador.id

);

const nuevoIndice=indice+direccion;

if(

nuevoIndice<0 ||

nuevoIndice>=fundadoresOrdenados.length

){

return;

}

const otroFundador=fundadoresOrdenados[nuevoIndice];

await updateDoc(

doc(db,"fundadores",fundador.id),

{

orden:otroFundador.orden

}

);

await updateDoc(

doc(db,"fundadores",otroFundador.id),

{

orden:fundador.orden

}

);

}

catch(error){

console.log(error);

alert("Error al mover el fundador.");

}

}
const moverImagen = async (imagen, direccion) => {

try{

const imagenesOrdenadas = [...imagenesCarrusel]
.sort((a,b)=>a.orden-b.orden);

const indice = imagenesOrdenadas.findIndex(
(item)=>item.id===imagen.id
);

const nuevoIndice = indice + direccion;

if(
nuevoIndice<0 ||
nuevoIndice>=imagenesOrdenadas.length
){

return;

}

const otraImagen = imagenesOrdenadas[nuevoIndice];

await updateDoc(

doc(db,"carrusel",imagen.id),

{

orden: otraImagen.orden

}

);

await updateDoc(

doc(db,"carrusel",otraImagen.id),

{

orden: imagen.orden

}

);

}

catch(error){

console.log(error);

alert("Error al mover la imagen.");

}

}

const eliminarImagen = async(imagen)=>{

const confirmar = window.confirm(

"¿Deseas eliminar esta imagen del carrusel?"

);

if(!confirmar){

return;

}

try{

await deleteDoc(

doc(db,"carrusel",imagen.id)

);

alert("Imagen eliminada correctamente.");

}

catch(error){

console.log(error);

alert("Ocurrió un error.");

}

}
const eliminarFundador = async(fundador)=>{

const confirmar = window.confirm(

`¿Deseas eliminar al fundador "${fundador.nombre}"?`

);

if(!confirmar){

return;

}

try{

await deleteDoc(

doc(db,"fundadores",fundador.id)

);

alert("Fundador eliminado correctamente.");

}

catch(error){

console.log(error);

alert("Ocurrió un error al eliminar.");

}

}
const cambiarVisibilidadFundador = async(fundador)=>{

try{

await updateDoc(

doc(db,"fundadores",fundador.id),

{

visible: !fundador.visible

}

);

}

catch(error){

console.log(error);

alert("Error al cambiar la visibilidad.");

}

}
return(

<div className="contenedor-configuracion">


<h1 className="titulo-configuracion">

⚙️ Configuración Institucional

</h1>

<div className="menu-configuracion">

<button

onClick={()=>setSeccion("general")}

>

🏫 General

</button>

<button

onClick={()=>setSeccion("carrusel")}

>

🖼 Carrusel

</button>

<button

onClick={()=>setSeccion("contacto")}

>

📞 Contacto

</button>

<button

onClick={()=>setSeccion("redes")}

>

🌐 Redes Sociales

</button>
<button

onClick={()=>setSeccion("fundadores")}

>

👥 Fundadores

</button>
</div>



{

seccion==="general" && (

<>
<h3>

🏫 Nombre de la institución

</h3>

<input

type="text"

name="nombre"

value={datos.nombre}

onChange={cambiarDato}

/>

<hr/>

<h3>

✨ Eslogan

</h3>

<input

type="text"

name="eslogan"

value={datos.eslogan}

onChange={cambiarDato}

/>

<hr/>
<h3>

🖼 Logo Institucional

</h3>

{
datos.logo && (

<img
src={datos.logo}
width="120"
alt="Logo"
/>

)

}

<br/><br/>

<input

type="file"

accept="image/*"

onChange={(e)=>setNuevoLogo(e.target.files[0])}

/>

<br/><br/>

<button

onClick={cambiarLogo}

>

Actualizar logo

</button>

<hr/>



<h3>

👋 Bienvenida

</h3>

<textarea

name="bienvenida"

rows="5"

value={datos.bienvenida}

onChange={cambiarDato}

/>

<hr/>

<h3>

🏫 ¿Quiénes somos?

</h3>

<textarea

name="quienesSomos"

rows="5"

value={datos.quienesSomos}

onChange={cambiarDato}

/>

<hr/>

<BotonGuardar

texto="Guardar cambios"

onClick={guardarCambios}

/>

</>

)
}

{

seccion==="carrusel" && (

<>

<h2>

🖼 Administrar Carrusel

</h2>

<p>

Aquí podrás agregar, eliminar y ordenar las imágenes que aparecen en el inicio.

</p>

<hr/>

<input

type="file"

accept="image/*"

onChange={(e)=>setNuevaImagenCarrusel(e.target.files[0])}

/>

<br/><br/>

<button

onClick={subirImagenCarrusel}

>

⬆ Subir imagen

</button>

<hr/>

{
imagenesCarrusel.map((imagen)=>(

<div key={imagen.id}>

<img

src={imagen.url}

width="200"

alt="Carrusel"

/>

<p>

Orden: {imagen.orden}

</p>

<p>

{

imagen.visible

?

"🟢 Visible"

:

"🔴 Oculta"

}

</p>

<div>

<button

onClick={()=>moverImagen(imagen,-1)}

>

⬆ Subir

</button>

<button

onClick={()=>moverImagen(imagen,1)}

>

⬇ Bajar

</button>

<button

onClick={()=>cambiarVisibilidad(imagen)}

>

{

imagen.visible

?

"👁 Ocultar"

:

"👁 Mostrar"

}

</button>

<button

onClick={()=>eliminarImagen(imagen)}

>

🗑 Eliminar

</button>

</div>

<hr/>

</div>

))
}


<hr/>

</>

)

}

{
seccion==="contacto" && (

<>

<h2>

📞 Información de Contacto

</h2>

<p>

Esta información aparecerá en la página de contacto y en el pie de página del sitio.

</p>

<hr/>

<h3>

📍 Dirección

</h3>

<input

type="text"

name="direccion"

value={datos.direccion}

onChange={cambiarDato}

/>

<hr/>

<h3>

📞 Teléfono

</h3>

<input

type="text"

name="telefono"

value={datos.telefono}

onChange={cambiarDato}

/>

<hr/>

<h3>

📧 Correo electrónico

</h3>

<input

type="email"

name="correo"

value={datos.correo}

onChange={cambiarDato}

/>

<hr/>

<button

onClick={guardarCambios}

>

💾 Guardar información de contacto

</button>

</>

)
}

{
seccion==="redes" && (

<>

<h2>

🌐 Redes Sociales

</h2>

<p>

Configura las redes oficiales de la institución.

</p>

<hr/>

<h3>

📘 Facebook

</h3>

<input

type="text"

name="facebook"

value={datos.facebook}

onChange={cambiarDato}

placeholder="https://facebook.com/..."

/>

<hr/>

<h3>

📸 Instagram

</h3>

<input

type="text"

name="instagram"

value={datos.instagram}

onChange={cambiarDato}

placeholder="https://instagram.com/..."

/>

<hr/>

<h3>

▶ YouTube

</h3>

<input

type="text"

name="youtube"

value={datos.youtube}

onChange={cambiarDato}

placeholder="https://youtube.com/..."

/>

<hr/>

<button

onClick={guardarCambios}

>

💾 Guardar Redes Sociales

</button>

</>

)
}

{
seccion==="fundadores" && (

<>
<h2>

👥 Configuración de Fundadores

</h2>

<hr/>

<h3>

📷 Foto

</h3>

<input

type="file"

accept="image/*"

onChange={(e)=>setFotoFundador(e.target.files[0])}

/>

<hr/>

<h3>

👤 Nombre

</h3>

<input

type="text"

name="nombre"

value={fundador.nombre}

onChange={cambiarFundador}

/>

<hr/>

<h3>

🎂 Fecha de nacimiento

</h3>

<input

type="text"

name="nacimiento"

value={fundador.nacimiento}

onChange={cambiarFundador}

/>

<hr/>

<h3>

🕊 Fecha de fallecimiento

</h3>

<input

type="text"

name="fallecimiento"

value={fundador.fallecimiento}

onChange={cambiarFundador}

/>

<hr/>

<h3>

📍 Lugar de nacimiento

</h3>

<input

type="text"

name="lugarNacimiento"

value={fundador.lugarNacimiento}

onChange={cambiarFundador}

/>

<hr/>

<h3>

🎓 Cargo

</h3>

<input

type="text"

name="cargo"

value={fundador.cargo}

onChange={cambiarFundador}

/>

<hr/>

<h3>

📝 Biografía

</h3>

<textarea

rows="8"

name="biografia"

value={fundador.biografia}

onChange={cambiarFundador}

/>

<hr/>

<button

onClick={

editandoFundador

?

actualizarFundador

:

guardarFundador

}

>

{

editandoFundador

?

"💾 Actualizar Fundador"

:

"💾 Guardar Fundador"

}

</button>

<hr/>

<h2>

👥 Fundadores registrados

</h2>

<hr/>

{

fundadores.map((persona)=>(

<div key={persona.id}>

<img

src={persona.foto}

width="180"

alt={persona.nombre}

/>

<h3>

{persona.nombre}

</h3>

<p>

{persona.cargo}

</p>

<p>

{persona.nacimiento}

{

persona.fallecimiento

?

` - ${persona.fallecimiento}`

:

""

}

</p>

<p>

{persona.lugarNacimiento}

</p>

<br/>

<button

onClick={()=>seleccionarFundador(persona)}

>

✏ Editar

</button>

<button

onClick={()=>cambiarVisibilidadFundador(persona)}

>

{

persona.visible

?

"👁 Ocultar"

:

"👁 Mostrar"

}

</button>

<button

onClick={()=>moverFundador(persona,-1)}

>

⬆ Subir

</button>

<button

onClick={()=>moverFundador(persona,1)}

>

⬇ Bajar

</button>

<button

onClick={()=>eliminarFundador(persona)}

>

🗑 Eliminar

</button>

<hr/>

</div>

))

}

</>

)

}

</div>

)

}

export default ConfiguracionInstitucionalModal;