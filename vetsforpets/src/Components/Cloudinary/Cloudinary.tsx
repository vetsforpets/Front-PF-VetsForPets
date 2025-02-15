"use client";
import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "@/services/servicesImage";

interface CloudinaryUploaderProps {
  onImageUpload: (url: string) => void;
}

function CloudinaryUploader({ onImageUpload }: CloudinaryUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Función para manejar la subida de la imagen
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  // Subir la imagen al seleccionar el archivo
  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        try {
          const uploadedImageUrl = await uploadImageToCloudinary(file);
          setImageUrl(uploadedImageUrl);
          onImageUpload(uploadedImageUrl); // Se pasa kla URL al formulario
          setFile(null); // Limpia el estado para evitar que se repita la carga de la imaggen
        } catch (error) {
          console.error("Error durante el proceso de subida:", error);
        }
      };
  
      uploadImage();
    }
  }, [file, onImageUpload]);

  return (
    <div>
      <label htmlFor="file-input" className="customButton">
        Seleccionar archivo
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {imageUrl && (
        <div className="flex justify-center items-center mt-5">
          <img 
            src={imageUrl} 
            alt="Imagen subida" 
            className="w-40 h-40 rounded-full object-cover shadow-md mt-4" 
          />
        </div>
      )}
    </div>
  );
  
}

export default CloudinaryUploader;



















// // CloudinaryUploader.tsx
// "use client";
// import { useState } from "react";
// import { uploadImageToCloudinary, } from "@/services/servicesImage"; 

// function CloudinaryUploader() {
//     const [file, setFile] = useState<File | null>(null);
//     const [imageUrl, setImageUrl] = useState<string | null>(null);

//     const handleUpload = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!file) {
//             console.log("No se seleccionó ningún archivo.");
//             return;
//         }

//         try {
//             // Subir la imagen a Cloudinary
//             const uploadedImageUrl = await uploadImageToCloudinary(file);
//             setImageUrl(uploadedImageUrl); // Guarda la URL de la imagen subida
//             console.log("Imagen subida:", uploadedImageUrl);

//             // Enviar la URL al backend
//             // const backendResponse = await saveImageToBackend(uploadedImageUrl);
//             // console.log("Imagen guardada en el backend:", backendResponse);
//         } catch (error) {
//             console.error("Error durante el proceso de subida y guardado:", error);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleUpload}>
//                 <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//                 <button type="submit">Subir imagen</button>
//             </form>
            
//             {imageUrl && (
//                 <div>
//                     <p>Imagen subida:</p>
//                     <img src={imageUrl} alt="Imagen subida" style={{ maxWidth: "300px", marginTop: "10px" }} />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CloudinaryUploader;



































// "use client";
// import { useState } from "react";

// function Cloudinary() {
//     const [file, setFile] = useState<File | null>(null);

//     return (
//         <div>
//             <form onSubmit={async (e) => {
//                 e.preventDefault();

//                 if (!file) {
//                     console.log("No se seleccionó ningún archivo.");
//                     return;
//                 }

//                 const formData = new FormData();
//                 formData.append("file", file);

//                 const response = await fetch("/api/upload", {
//                     method: "POST",
//                     body: formData,
//                 });

//                 const data = await response.json();
//                 console.log(data);
//             }}>
//                 <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//                 <button type="submit">Enviar</button>
//             </form>
//         </div>
//     );
// }

// export default Cloudinary;


/*

"use client";

import { useState } from "react";

function Cloudinary() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImagesUrl]= useState(null)

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();

                if (!file) {
                    console.log("No se seleccionó ningún archivo.");
                    return;
                }

                const formData = new FormData();
                formData.append("file", file); // Asegúrate de que coincide con el backend

                try {
                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Error en la subida:", errorData.message);
                        return;
                    }

                    const data = await response.json();
                    console.log("Imagen subida:", data);
                    setImagesUrl(data.url)
                } catch (error) {
                    console.error("Error al enviar la solicitud:", error);
                }
            }}>
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <button type="submit">Enviar</button>
            </form>
           { imageUrl && (
                <img src="{imageUrl}"/>
            )}
        </div>
    );
}

export default Cloudinary;

*/