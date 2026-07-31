import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function useUsuario(){

const [usuario,setUsuario]=useState(null);

const [cargando,setCargando]=useState(true);

useEffect(()=>{

const cancelar = onAuthStateChanged(auth, async(usuarioActual)=>{

if(!usuarioActual){

setUsuario(null);

setCargando(false);

return;

}

try{

const documento = await getDoc(

doc(db,"usuarios",usuarioActual.uid)

);

if(documento.exists()){

setUsuario({

uid:usuarioActual.uid,

...documento.data()

});

}

else{

setUsuario(null);

}

}

catch(error){

console.log(error);

}

setCargando(false);

});

return ()=>cancelar();

},[]);

return{

usuario,

cargando

};

}

export default useUsuario;