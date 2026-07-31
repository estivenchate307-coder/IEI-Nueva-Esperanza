function BotonGuardar({

onClick,

modo="guardar",

texto,

type="button",

disabled=false

}){

const iconos={

guardar:"💾",

actualizar:"✏",

crear:"➕",

aceptar:"✔"

};

const textos={

guardar:"Guardar",

actualizar:"Actualizar",

crear:"Crear",

aceptar:"Aceptar"

};

return(

<button

type={type}

onClick={onClick}

disabled={disabled}

>

{iconos[modo] ?? "💾"} {texto ?? textos[modo]}

</button>

);

}

export default BotonGuardar;