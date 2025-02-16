import Link from "next/link";
import React from "react";

const SuccessTransaction = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <img
          src="/success.png" 
          alt="Success"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-green-600">¡Pago Exitoso!</h2>
        <p className="text-gray-600 mt-2">Tu transacción ha sido completada con éxito.</p>
        <br />
        <Link href="/" className="customButton">
        Ir al inicio
      </Link>
      </div>
    </div>
  );
};

export default SuccessTransaction;