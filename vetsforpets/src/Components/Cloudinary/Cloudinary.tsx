"use client";
import { useState } from "react";

function Cloudinary() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();

                if (!file) {
                    console.log("No se seleccionó ningún archivo.");
                    return;
                }

                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                console.log(data);
            }}>
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Cloudinary;


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