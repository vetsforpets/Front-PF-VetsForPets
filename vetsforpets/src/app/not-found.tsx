import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-5">Página no encontrada</h1>
      <Link href="/" className="customButton">
        Ir al inicio
      </Link>
    </div>
  );
}
