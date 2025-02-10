import PetForm from "../Components/PetForm/PetForm"

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-3 py-10 items-center justify-center">
        <h1 className="customButton text-4xl font-bold">VETS FOR PETS</h1>
        <p>Inicio</p>
        <PetForm />
      </div>
    </>
  );
}
