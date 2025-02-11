import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


// import { v2 as cloudinary } from "cloudinary";

// // Usar variables de entorno para la configuración de Cloudinary
// cloudinary.config({ 
//     cloud_name: 'dwc27kmja', 
//     api_key: '572712623251272', 
//     api_secret: 'CLOUDINARY_URL=cloudinary://572712623251272:pHqaePdnSUwEtOAXEYSfs1BYWQ0@dwc27kmja' 
// });


//! Función POST para manejar la subida de archivos
export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ message: "No se ha recibido archivo" }, { status: 400 });
    }

    // Convertir el archivo a buffer
    const buffer = await file.arrayBuffer();
    
    // Obtener el nombre del archivo
    const fileName = file.name;

    // Definir la ruta donde se guardará el archivo (en la carpeta 'public')
    const filePath = path.join(process.cwd(), "public", fileName);

    // Guardar el archivo en el sistema de archivos
    try {
        fs.writeFileSync(filePath, Buffer.from(buffer));
        console.log(`Imagen guardada en: ${filePath}`);
        return NextResponse.json({ message: "Imagen subida correctamente" });
    } catch (error) {
        console.error("Error al guardar la imagen:", error);
        return NextResponse.json({ message: "Error al subir la imagen" }, { status: 500 });
    }
}


/*
// Importaciones necesarias
import { NextResponse } from "next/server"; // Para crear respuestas HTTP en Next.js
import { writeFile } from "fs/promises"; // Para escribir archivos de manera asincrónica
import path from "path"; // Para manejar las rutas de archivos

import { v2 as cloudinary } from "cloudinary"; // Para interactuar con el servicio de Cloudinary

// Configuración de Cloudinary utilizando variables de entorno
cloudinary.config({ 
    cloud_name: 'dwc27kmja', // Nombre de tu cuenta de Cloudinary
    api_key: '572712623251272', // Tu clave de API de Cloudinary
    api_secret: 'CLOUDINARY_URL=cloudinary://572712623251272:pHqaePdnSUwEtOAXEYSfs1BYWQ0@dwc27kmja' // Tu clave secreta de API de Cloudinary
});

// Función que maneja la solicitud POST para subir imágenes
export async function POST(request: Request) {
  // Obtiene los datos del formulario enviado en la solicitud
  const data = await request.formData();
  const image = data.get("file"); // Asegúrate de que 'file' coincida con el nombre del campo en el formulario del frontend

  // Verifica si no se ha subido ninguna imagen o si el archivo no es una instancia de 'File'
  if (!image || !(image instanceof File)) {
    // Si no se ha subido una imagen, retorna un error con un mensaje
    return NextResponse.json({ message: "No se ha subido ninguna imagen" }, { status: 400 });
  }

  // Convierte la imagen a un array de bytes (para poder manejar el archivo)
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes); // Convierte el array de bytes a un buffer para manejarlo como archivo

  // Guarda temporalmente la imagen en el servidor en la carpeta 'public'
  const filePath = path.join(process.cwd(), "public", image.name); // Obtiene la ruta absoluta para guardar el archivo
  await writeFile(filePath, buffer); // Escribe el archivo en el servidor

  try {
    // Intenta subir la imagen a Cloudinary usando su API
    const response = await cloudinary.uploader.upload(filePath);
    console.log(response); // Muestra la respuesta de Cloudinary en la consola

    // Retorna una respuesta con la URL segura de la imagen subida a Cloudinary
    return NextResponse.json({ message: "Imagen subida correctamente", url: response.secure_url });
  } catch (error) {
    // Si ocurre un error al subir la imagen a Cloudinary, lo maneja y retorna un error
    console.error("Error al subir la imagen:", error);
    return NextResponse.json({ message: "Error al subir la imagen" }, { status: 500 });
  }
}

*/