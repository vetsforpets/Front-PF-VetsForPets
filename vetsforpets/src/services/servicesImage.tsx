export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); 
    formData.append("resource_type", "auto"); // Detecta si es imagen o PDF

    // Verifica si es una imagen o un PDF y asigna la carpeta correcta
    const folderName = file.type.startsWith("image/") ? "imagenes" : "pdfs";
    formData.append("folder", folderName);

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dwc27kmja/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url; 
    } catch (error) {
        console.error("Error al subir el archivo a Cloudinary:", error);
        throw error; 
    }
};



// export const saveImageToBackend = async (imageUrl: string) => {
//     try {
//         const response = await fetch("/api/save-image", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 imageUrl, // Enviar la URL de la imagen
//             }),
//         });

//         const data = await response.json();
//         return data; // Retorna la respuesta del backend
//     } catch (error) {
//         console.error("Error al guardar la imagen en el backend:", error);
//         throw error; // Lanza el error para manejarlo en el componente
//     }
// };
