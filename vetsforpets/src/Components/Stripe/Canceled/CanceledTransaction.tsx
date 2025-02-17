import Image from "next/image";
import Link from "next/link";
import React from "react";

const CanceledTransaction = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <Image
          src="/cancel.png"
          alt="Canceled"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-red-600">Pago Cancelado</h2>
        <p className="text-gray-600 mt-2">Tu transacción ha sido cancelada.</p>
        <Link href="/">
          <span className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer">
            Volver al Inicio
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CanceledTransaction;
