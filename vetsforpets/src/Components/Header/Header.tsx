import Link from "next/link";

export function Header() {
  return (
    <>
      <div className="flex justify-evenly items-center m-7 p-2 rounded-full font-tenor shadowFull">
        <div className="flex-col">
          <img src="/images/logo.png" className="w-20 " alt="Logo" />
        </div>
        <div>
          <Link href={"/vets"} className="customButton">
            Veterinarias
          </Link>
        </div>
        <div>
          <Link href={"/register"} className="flex flex-col items-center">
            <img
              src="/images/emergency.png"
              className="w-10 bg-yellow-200 rounded-full"
              alt="sirena"
            />
            <p className="font-kiwi">URGENCIA</p>
          </Link>
        </div>
        <div className="flex gap-5">
          <Link href={"/login"} className="customButton">
            Iniciar Sesión
          </Link>
          <Link href={"/register"} className="customButton">
            Crear Cuenta
          </Link>
        </div>
      </div>
    </>
  );
}
