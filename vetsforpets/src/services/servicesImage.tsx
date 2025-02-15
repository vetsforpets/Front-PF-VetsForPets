export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); 

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dwc27kmja/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url; // Retorna la URL de la imagen subida
    } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
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
