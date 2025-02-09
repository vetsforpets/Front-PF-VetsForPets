import Image from "next/image";
import dog2 from "@/../public/images/dog2.png";
import lupa from "@/../public/images/lupa.png"

export function UpperBody() {
    return (
        <>
            <div className="bg-[#DDA15E] h-[700px] flex justify-evenly items-center">
                <div>
                    <Image
                        src={dog2}
                        width={600}
                        height={500}
                        alt="Perro corriendo"
                        className="mb-[115px]"
                    />
                </div>
                <div className="text-black text-5xl flex items-center flex-col">
                    <p className="p-2">Encontrá tu</p>
                    <p className="p-2"><strong>VETERINARIA</strong></p>
                    <p className="p-2">más</p>
                    <p className="p-2"><strong>CERCANA</strong></p>
                    <div className="flex items-center mt-4">
                        <input
                            type="text"
                            placeholder="Tu zona o ubicación"
                            className="p-2 rounded-md w-[100px] md:w-[300px] border-none focus:outline-none focus:ring-2 focus:ring-[#F4A300]"
                        />
                        <button className="ml-2">
                            <Image
                                src={lupa}
                                width={30}
                                height={30}
                                alt="Lupa"
                            />
                        </button>
                    </div>
                </div>

            </div>



        </>
    );
}
