import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Login(){

const [correo,setCorreo]=useState("");
const [clave,setClave]=useState("");
const navigate = useNavigate();

const ingresar = async () => {

    try {

        const usuario = await signInWithEmailAndPassword(
            auth,
            correo,
            clave
        );

        const uid = usuario.user.uid;

        const documento = await getDoc(
            doc(db, "usuarios", uid)
        );

        if (!documento.exists()) {

            alert("No existe información del usuario.");

            await signOut(auth);

            return;

        }

        const datos = documento.data();

        if (datos.rol !== "admin") {

            alert("No tienes permisos de administrador.");

            await signOut(auth);

            return;

        }

        if (datos.estado === "Inactivo") {

    alert("Tu cuenta de administrador está desactivada.");

    await signOut(auth);

    return;

}

        navigate("/");

    }

    catch (error) {

        alert(error.message);

    }

}


return(

<div className="login">


<h1>Administrador</h1>


<input

type="email"

placeholder="Correo"

onChange={(e)=>setCorreo(e.target.value)}

/>



<input

type="password"

placeholder="Contraseña"

onChange={(e)=>setClave(e.target.value)}

/>



<button

onClick={ingresar}

>

Ingresar

</button>


</div>

)


}


export default Login;