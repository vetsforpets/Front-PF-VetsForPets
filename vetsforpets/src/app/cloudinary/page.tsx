"use client"
import React from "react";
import CloudinaryUploader from "@/Components/Cloudinary/Cloudinary";

export default function Dashboard() {
  return (
    <CloudinaryUploader onImageUpload={(url: string) => console.log("Imagen subida:", url)} />
  );
}
