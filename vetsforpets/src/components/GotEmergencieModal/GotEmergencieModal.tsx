import Link from "next/link";

const GotEmergencieModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99] w-full h-full overflow-y-auto bg-customBeige bg-opacity-80">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 py-8 border-2 shadow-xl text-customDarkGreen bg-customLightBrown rounded-2xl border-customBeige">
          <h3 className="text-2xl text-center text-gray-900">
            ¡Te han solicitado una Emergencia!
          </h3>
          <div className="flex justify-evenly mt-8 space-x-3">
            <button
              className="text-black focus:outline-none rounded-full px-5 py-2.5 text-center bg-customBeige hover:bg-customBrown hover:text-white shadow-lg"
              onClick={onClose}
            >
              Cerrar
            </button>
            <Link
              href="/emergencies"
              className="text-black focus:outline-none rounded-full px-5 py-2.5 text-center bg-customBeige hover:bg-customBrown hover:text-white shadow-lg"
            >
              Ir a Emergencias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GotEmergencieModal;
