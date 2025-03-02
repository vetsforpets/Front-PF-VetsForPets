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

