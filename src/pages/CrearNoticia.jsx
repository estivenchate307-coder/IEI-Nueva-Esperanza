import { db, auth } from "../firebase/firebaseConfig";
import BotonVolver from "../components/BotonVolver";
import useUsuario from "../hooks/useUsuario";
import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc
} from "firebase/firestore";

import { useState, useEffect } from "react";

function CrearNoticia() {

    const [imagen, setImagen] = useState(null);

    const [titulo, setTitulo] = useState("");

    const [descripcion, setDescripcion] = useState("");

    const [urlImagen, setUrlImagen] = useState("");

    const [categoria, setCategoria] = useState("Deportes");

    const { usuario, cargando } = useUsuario();

    const publicarNoticia = async () => {

    console.log("Entró a publicarNoticia");

    try{

        const usuario = auth.currentUser;

        if(!usuario){

            alert("Debes iniciar sesión.");

            return;

        }

        if(cargando){

alert("Cargando información del usuario...");

return;

}

if(!usuario){

alert("No se encontró la información del usuario.");

return;

}

        let url = "";

        let public_id = "";

        if(imagen){

            console.log("Hay imagen");

            const datos = new FormData();

            datos.append("file",imagen);

            datos.append(

                "upload_preset",

                "colegio_nueva_esperanza"

            );

            const respuesta = await fetch(

                "https://api.cloudinary.com/v1_1/drysqaxwu/image/upload",

                {

                    method:"POST",

                    body:datos

                }

            );

            const resultado = await respuesta.json();

            console.log(resultado);

            url = resultado.secure_url;

            public_id = resultado.public_id;

            setUrlImagen(url);

        }

        console.log("Guardando noticia...",datosDocente);

        await addDoc(

            collection(db,"noticias"),

            {

                titulo,

                descripcion,

                url,

                public_id,

                uid: usuario.uid,

                nombre: usuario.nombre,

                correo: usuario.correo,

                materia: usuario.materia,

                cargo: usuario.cargo,

                fotoPerfil: usuario.fotoPerfil || "",

                categoria,

                estado:"publicada",

                fecha: serverTimestamp(),

                fechaTexto:new Date().toLocaleDateString(),

                horaTexto:new Date().toLocaleTimeString()

            }

        );

        alert("Noticia publicada correctamente");

        setTitulo("");

        setDescripcion("");

        setImagen(null);

        setUrlImagen("");

        setCategoria("Noticias");

    }

    catch(error){

        console.log(error);

        alert("Error al publicar la noticia");

    }

}


    const seleccionarImagen = (e) => {

        setImagen(

            e.target.files[0]

        );

    }


    return (

        <div>

            <h1>

                Crear Noticias

            </h1>
<BotonVolver/>

            <input

                type="file"

                accept="image/*"

                onChange={seleccionarImagen}

            />




            <input

                placeholder="Título de la publicación"

                value={titulo}

                onChange={(e) => setTitulo(e.target.value)}

            />

            <textarea

                placeholder="Descripción"

                value={descripcion}

                onChange={(e) => setDescripcion(e.target.value)}

                rows="5"

            />

            <select

                value={categoria}

                onChange={(e) => setCategoria(e.target.value)}

            >

                <option>Deportes</option>

<option>Música</option>

<option>Eventos</option>

<option>Noticias</option>

            </select>

            <button

                onClick={publicarNoticia}

            >

                Publicar Noticia

            </button>

            {

                urlImagen && (

                    <img

                        src={urlImagen}

                        width="300"

                    />

                )

            }


        </div>

    )

}


export default CrearNoticia;