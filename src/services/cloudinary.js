export const subirArchivoCloudinary = async (archivo, tipo) => {

    const datos = new FormData();

    datos.append("file", archivo);

    datos.append(
        "upload_preset",
        "colegio_nueva_esperanza"
    );

    const endpoint =
        tipo === "video"
            ? "https://api.cloudinary.com/v1_1/drysqaxwu/video/upload"
            : "https://api.cloudinary.com/v1_1/drysqaxwu/image/upload";

    const respuesta = await fetch(endpoint, {
        method: "POST",
        body: datos
    });

    const resultado = await respuesta.json();

    console.log("Respuesta Cloudinary:", resultado);

    if (!respuesta.ok) {
        throw new Error(resultado.error?.message || "Error al subir archivo");
    }

    return {
        url: resultado.secure_url,
        public_id: resultado.public_id
    };

};