import { UpperBody } from "@/components/Home/UpperBody/UpperBody";
import  MostrarNoticia from "@/components/Home/News"

export default function Home() {
  return (
    <>
      <div>
        <UpperBody />
        <MostrarNoticia/>
      </div>
    </>
  );
}
