"use client";
import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "@/services/servicesImage";
import Image from "next/image";

interface CloudinaryUploaderProps {
  onImageUpload: (url: string) => void;
}

function CloudinaryUploader({ onImageUpload }: CloudinaryUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        try {
          const uploadedImageUrl = await uploadImageToCloudinary(file);
          setImageUrl(uploadedImageUrl);
          onImageUpload(uploadedImageUrl);
          setFile(null);
        } catch (error) {
          console.error("Error durante el proceso de subida:", error);
        }
      };

      uploadImage();
    }
  }, [file, onImageUpload]);

  const isImage = (url: string) => /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
  const isPDF = (url: string) => url.endsWith(".pdf");

  return (
    <div className="mb-4">
      <label
        htmlFor="file-input"
        className="inline-flex items-center justify-center w-full max-w-full px-4 py-2 mx-auto my-3 text-sm text-center transition-all rounded-md shadow-md xs:text-xs sm:text-sm md:text-base lg:text-lg customButton hover: bg-customBrown"
      >
        Seleccionar archivo
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {imageUrl && (
        <div className="flex items-center justify-center mt-5">
          {isImage(imageUrl) ? (
            <Image
              src={imageUrl}
              alt="Imagen subida"
              width={160}
              height={160}
              className="object-cover w-40 h-40 mt-4 rounded-full shadow-md"
            />
          ) : isPDF(imageUrl) ? (
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              <button className="w-full px-4 py-2 transition-all rounded-md shadow-md sm:w-auto sm:text-xs sm:px-3 sm:py-2 md:text-sm lg:text-lg customButton hover:bg-gray-300">
                Ver PDF
              </button>
            </a>
          ) : (
            <p>El archivo subido no es una imagen ni un PDF.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CloudinaryUploader;

// "use client";
// import { useState, useEffect } from "react";
// import { uploadImageToCloudinary } from "@/services/servicesImage";
// import Image from "next/image";

// interface CloudinaryUploaderProps {
//   onImageUpload: (url: string) => void;
// }

// function CloudinaryUploader({ onImageUpload }: CloudinaryUploaderProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     setFile(selectedFile || null);
//   };

//   useEffect(() => {
//     if (file) {
//       const uploadImage = async () => {
//         try {
//           const uploadedImageUrl = await uploadImageToCloudinary(file);
//           setImageUrl(uploadedImageUrl);
//           onImageUpload(uploadedImageUrl);
//           setFile(null);
//         } catch (error) {
//           console.error("Error durante el proceso de subida:", error);
//         }
//       };

//       uploadImage();
//     }
//   }, [file, onImageUpload]);

//   // Función para verificar si la URL es de una imagen
//   const isImage = (url: string) => /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);

//   // Función para verificar si la URL es un PDF
//   const isPDF = (url: string) => url.endsWith(".pdf");

//   return (
//     <div className="mb-4">
//       {/* Botón para seleccionar archivo */}
//       <label
//         htmlFor="file-input"
//         className="w-full max-w-full px-4 py-2 mx-auto my-3 text-center transition-all rounded-md shadow-md sm:w-auto sm:text-xs sm:px-3 sm:py-2 md:text-sm lg:text-base customButton hover:bg-gray-300"
//       >
//         Seleccionar archivo
//       </label>
//       <input
//         id="file-input"
//         type="file"
//         accept="image/*,application/pdf"
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       {imageUrl && (
//         <div className="flex items-center justify-center mt-5">
//           {/* Mostrar imagen subida */}
//           {isImage(imageUrl) ? (
//             <Image
//               src={imageUrl}
//               alt="Imagen subida"
//               width={160}
//               height={160}
//               className="object-cover w-40 h-40 mt-4 rounded-full shadow-md"
//             />
//           ) : isPDF(imageUrl) ? (
//             // Mostrar botón para ver PDF
//             <a href={imageUrl} target="_blank" rel="noopener noreferrer">
//               <button className="w-full px-4 py-2 transition-all rounded-md shadow-md sm:w-auto sm:text-xs sm:px-3 sm:py-2 md:text-sm lg:text-lg customButton hover:bg-gray-300">
//                 Ver PDF
//               </button>
//             </a>
//           ) : (
//             <p>El archivo subido no es una imagen ni un PDF.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CloudinaryUploader;



// "use client";
// import { useState, useEffect } from "react";
// import { uploadImageToCloudinary } from "@/services/servicesImage";
// import Image from "next/image";

// interface CloudinaryUploaderProps {
//   onImageUpload: (url: string) => void;
// }

// function CloudinaryUploader({ onImageUpload }: CloudinaryUploaderProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     setFile(selectedFile || null);
//   };

//   useEffect(() => {
//     if (file) {
//       const uploadImage = async () => {
//         try {
//           const uploadedImageUrl = await uploadImageToCloudinary(file);
//           setImageUrl(uploadedImageUrl);
//           onImageUpload(uploadedImageUrl);
//           setFile(null);
//         } catch (error) {
//           console.error("Error durante el proceso de subida:", error);
//         }
//       };

//       uploadImage();
//     }
//   }, [file, onImageUpload]);

//   // Función para verificar si la URL es de una imagen
//   const isImage = (url: string) => /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);

//   // Función para verificar si la URL es un PDF
//   const isPDF = (url: string) => url.endsWith(".pdf");

//   return (
//     <div className="mb-1">
//       <label htmlFor="file-input" className="customButton">
//         Seleccionar archivo
//       </label>
//       <input
//         id="file-input"
//         type="file"
//         accept="image/*,application/pdf"
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       {imageUrl && (
//         <div className="flex items-center justify-center mt-5">
//           {isImage(imageUrl) ? (
//             <Image 
//               src={imageUrl} 
//               alt="Imagen subida" 
//               width={160} 
//               height={160} 
//               className="object-cover w-40 h-40 mt-4 rounded-full shadow-md" 
//             />
//           ) : isPDF(imageUrl) ? (
//             <a href={imageUrl} target="_blank" rel="noopener noreferrer">
//               <button className="customButton">Ver PDF</button>
//             </a>
//           ) : (
//             <p>El archivo subido no es una imagen ni un PDF.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CloudinaryUploader;

