"use client"
import { IMembershipResponse } from '@/interfaces/registerTypes';
import { fetchOrderData } from '@/services/servicesOrder';
import { useUserStore } from '@/store';
import React, { useEffect, useState } from 'react'
import { postOrder } from '@/services/servicesOrder';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const MembershipCard = () => {
const [memberships, setmembership] = useState<IMembershipResponse[] | void>()
const [idSelected, setIdSelected] = useState("")
const userData = useUserStore((state)=>state.userData)
const router = useRouter()

const postOrderButton = async ()=>{
  if(userData?.id && memberships?.length){
try {
  const order = await postOrder({
    userId: userData?.id,
    paymentMethod: "Credit Card",
    membership:[{id: idSelected}]
  }, userData.token)
  toast.success("orden realizada con exito", {
    duration: 3000,
    style: {
      color: "#dc3545",
      background: "#f8d7da",
      borderRadius: "8px",
      padding: "16px",
      border: "1px solid #f5c6cb",
    },
  }
)
router.push(`${order.url}`)
} catch (error) {
  toast.error(`Error: ${error}`, {
    duration: 3000,
    style: {
      color: "#dc3545",
      background: "#f8d7da",
      borderRadius: "8px",
      padding: "16px",
      border: "1px solid #f5c6cb",
    },
  })
}
  }
}

useEffect(()=>{
  const fetchMembership = async () =>{
      if(userData?.token){
        const membershipData:IMembershipResponse[] | void = await fetchOrderData(userData?.token)
        if(membershipData){
          const newMembership = membershipData
          console.log('====================================');
          console.log(newMembership);
          console.log('====================================');
          setmembership(newMembership)

        }
      }
}
fetchMembership()
},[userData?.token])

  return (
    <>
    {memberships?.map((membership, index)=>{
    <div onSelect={()=> setIdSelected(index.toString())} key={membership.id} className="flex flex-col items-center justify-center p-6 min-h-scree">
      <div className="max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
        <h2 className="mb-10 text-2xl font-semibold text-customDarkGreen">Membresía {membership?.name}</h2>
        {membership?.benefits.map((benefit, index) => <p key={index} className="mt-2 text-gray-600">- {benefit}.</p>)}
        <p className="mt-2 text-gray-600">Disfruta de beneficios exclusivos con nuestra membresía premium.</p>
        <p className="mt-4 text-lg font-bold text-gray-800">Precio: ${membership?.price}</p>
        <button onClick={postOrderButton}
          className="mt-4 bg-blue-600∫ text-customDarkGreen px-6 py-2 rounded-lg hover:bg-customHardBrown hover:text-customBeige transition-all duration-500"
        >
          Comprar Ahora
        </button>
      </div>
    </div>
    })}
    </>
  );
};
export default MembershipCard;