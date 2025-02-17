"use client"
import { IMembershipResponse } from '@/interfaces/registerTypes';
import { fetchOrderData } from '@/services/servicesOrder';
import { useUserStore } from '@/store';
import React, { useEffect, useState } from 'react'


const MembershipCard = () => {
const [membership, setmembership] = useState<IMembershipResponse | void>()
const userData = useUserStore((state)=>state.userData)



useEffect(()=>{
  const fetchMembership = async () =>{
      if(userData?.token){
        const membershipData:IMembershipResponse[] | void = await fetchOrderData(userData?.token)
        if(membershipData){
          const newMembership = membershipData[1]
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
    <div className="flex flex-col items-center justify-center min-h-scree p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h2 className="text-2xl mb-10 font-semibold text-customDarkGreen">Membresía {membership?.name}</h2>
        {membership?.benefits.map((benefit, index) => <p key={index} className="text-gray-600 mt-2">- {benefit}.</p>)}
        <p className="text-gray-600 mt-2">Disfruta de beneficios exclusivos con nuestra membresía premium.</p>
        <p className="text-gray-800 font-bold text-lg mt-4">Precio: ${membership?.price}</p>
        <button 
          className="mt-4 bg-blue-600∫ text-customDarkGreen px-6 py-2 rounded-lg hover:bg-customHardBrown hover:text-customBeige transition-all duration-500"
        >
          Comprar Ahora
        </button>
      </div>
    </div>
  );
};
export default MembershipCard;