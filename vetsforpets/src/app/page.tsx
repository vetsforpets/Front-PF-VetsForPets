import { UpperBody } from "@/components/Home/UpperBody/UpperBody";
import News from "@/components/Home/News";
import AdminVet from "@/components/AdminProfile/AdminVet";

export default function Home() {
  return (
    <>
      <div>
        <UpperBody />
        <News/>
        <AdminVet/>
      </div>
    </>
  );
}
