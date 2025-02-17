const ConfirmModal: React.FC<{
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
  }> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-customBeige bg-opacity-80 overflow-y-auto h-full w-full z-50">
        <div className="flex items-center justify-center min-h-screen ">
          <div className= "text-customDarkGreen bg-customLightBrown rounded-2xl py-8 border-2 border-customBeige shadow-xl p-6 w-full max-w-md">
            <h3 className="text-2xl text-gray-900 text-center">¿Está seguro que desea guardar los cambios?</h3>
            <div className="mt-8 flex justify-end space-x-3">

              <button
                className="text-black focus:outline-none rounded-full px-5 py-2.5 text-center bg-customBeige hover:bg-customBrown dark:bg-customBeige dark:hover:bg-customBrown hover:text-white shadow-lg"

                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="text-black focus:outline-none rounded-full px-5 py-2.5 text-center bg-customBeige hover:bg-customBrown dark:bg-customBeige dark:hover:bg-customBrown hover:text-white shadow-lg"
                onClick={onConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
 export default ConfirmModal  

