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
const userData = useUserStore((state)=>state.userData)
const router = useRouter()


const postOrderButton = async (membershipId: string)=>{
  if(userData?.id && memberships?.length){
try {
  const order = await postOrder({
    userId: userData?.id,
    paymentMethod: "Credit Card",
    membership:[{id: membershipId}]
  }, userData.token)
  toast.success("orden realizada con exito", {
    duration: 3000,
    style: {
      color: "#fdf3b5",
      background: "#5c7c37",
      borderRadius: "8px",
      padding: "16px",
      border: "1px solid #f5c6cb",
    },
  }
)
console.log('====================================');
console.log("order:    ",order);
console.log('====================================');
router.push(`${order.checkoutSessionUrl}`)
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
          console.log('====================================');
          console.log(membershipData);
          console.log('====================================');
          setmembership(membershipData)

        }
      }
}
fetchMembership()
},[userData?.token])

  return (
    <div className='flex flex-wrap justify-center'>
    {memberships?.map((membership)=>{
      return(
    <div key={membership.id} className="flex flex-col items-center justify-center p-6">
      <div className="p-8 text-center bg-white shadow-lg border-1 max-w-80 max-h-1/2 rounded-2xl hover:border-yellow-900" >
        <h2 className="mb-10 text-2xl font-semibold text-customDarkGreen">Membresía {membership?.name}</h2>
        {membership?.benefits.map((benefit, index) => <p key={index} className="mt-2 text-gray-600">- {benefit}.</p>)}
        <p className="mt-2 text-gray-600">Disfruta de beneficios exclusivos con nuestra membresía premium.</p>
        <p className="mt-4 text-lg font-bold text-gray-800">Precio: ${membership?.price}</p>
        <button key={membership.id} onClick={()=>{
          postOrderButton(membership.id)
        }
        }
          className="px-6 py-2 mt-4 transition-all duration-500 rounded-lg text-customDarkGreen hover:bg-customHardBrown hover:text-customBeige"
        >
          Comprar Ahora
        </button>
      </div>
    </div>
      )
    })}
    </div>
  );
};
export default MembershipCard;