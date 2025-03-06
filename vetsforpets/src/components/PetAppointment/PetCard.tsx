import React, { useState } from 'react';
import { IPetApiResponse } from '@/services/servicesPetPrueba';

type PetCardProps = {
    pet: IPetApiResponse;
    invitee: any;
    pets: IPetApiResponse[];
};

const PetCard: React.FC<PetCardProps> = ({ pet}) => {
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };
    const [isImageVisible, setIsImageVisible] = useState(false);

    const handleImageClick = () => {
        setIsImageVisible(true);
    };

    const handleImageClose = () => {
        setIsImageVisible(false);
    };


    return (
        <div className="flex items-center justify-between p-4 rounded-lg card">

            <div className="flex items-center ml-4 right-side">
                <button
                    className="px-4 py-2 text-gray-800 bg-[#DDA15E] rounded-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={handleModalToggle}
                >
                    Mostrar datos de mascota
                </button>

            </div>
            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 modal"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleModalToggle();
                        }
                    }}
                >
                    <div className="p-6 bg-[#DDA15E] rounded-2xl shadow-xl modal-content w-80 h-[65vh] transition-transform transform hover:scale-105">
                        <button
                            className="absolute text-gray-500 transition-colors duration-300 top-2 right-2 hover:text-white"
                            onClick={handleModalToggle}
                        >
                            <span className="text-2xl font-bold">&times;</span>
                        </button>
                        <h4 className="mb-4 text-xl font-semibold text-gray-800">Datos de la Mascota</h4>

                        <div className="space-y-4 overflow-y-auto">
                            <p className="text-gray-800"><strong>Nombre:</strong> {pet.name}</p>
                            <p className="text-gray-800"><strong>Tipo de Animal:</strong> {pet.animalType}</p>
                            <p className="text-gray-800"><strong>Fecha de Nacimiento:</strong> {pet.birthdate}</p>
                            <p className="text-gray-800"><strong>Raza:</strong> {pet.breed}</p>
                            <p className="text-gray-800"><strong>Sexo:</strong> {pet.sex}</p>
                            <p className="text-gray-800"><strong>Esterilizado:</strong> {pet.isSterilized ? 'Sí' : 'No'}</p>
                            <p className="text-gray-800"><strong>Notas:</strong> {pet.notes}</p>

                            <div className="mt-4">
                                <button
                                    onClick={handleImageClick}
                                    className="text-gray-800 hover:text-gray-600"
                                >
                                    Ver Imagen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isImageVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
                    onClick={handleImageClose}
                >
                    <div
                        className="relative p-4 bg-[#DDA15E] rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute text-gray-500 top-2 right-2 hover:text-white"
                            onClick={handleImageClose}
                        >
                            <span className="text-2xl font-bold">&times;</span>
                        </button>
                        <img
                            src={pet.profileImg}
                            alt={`${pet.name} profile`}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-md"
                        />
                    </div>
                </div>
            )}




        </div>
    );
};

export default PetCard;
