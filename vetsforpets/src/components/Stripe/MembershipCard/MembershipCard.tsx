"use client";
import { IMembershipResponse } from '@/interfaces/registerTypes';
import { fetchOrderData } from '@/services/servicesOrder';
import { useUserStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { postOrder } from '@/services/servicesOrder';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { fetchUserData } from '@/services/servicesUser';

const MembershipCard = () => {
  const [memberships, setMembership] = useState<IMembershipResponse[] | void>();
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const userData = useUserStore((state) => state.userData);
  const router = useRouter();

  const postOrderButton = async (membershipId: string) => {
    if (userData?.id && memberships?.length) {
      try {
        const order = await postOrder(
          {
            userId: userData?.id,
            paymentMethod: "Credit Card",
            membership: [{ id: membershipId }],
          },
          userData.token
        );
        toast.success("Orden realizada con éxito", {
          duration: 3000,
          style: {
            color: "#fdf3b5",
            background: "#5c7c37",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #f5c6cb",
          },
        });
        router.push(`${order.checkoutSessionUrl}`);
      } catch (error) {
        toast.error(`${error}`, {
          duration: 3000,
          style: {
            color: "#dc3545",
            background: "#f8d7da",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #f5c6cb",
          },
        });
      }
    }
  };

  useEffect(() => {
    const fetchMembership = async () => {
      if (userData?.token) {
        const membershipData: IMembershipResponse[] | void = await fetchOrderData(userData?.token);
        const userPremium = await fetchUserData(userData.id, userData.token);
        if (membershipData) {
          setMembership(membershipData);
          if (userPremium.isPremium) {
            setActiveButton(true);
          }
        }
      }
    };
    fetchMembership();
  }, [userData?.token]);

  return (
    <div className="flex flex-wrap justify-center px-6 py-10 gap-36">
    {memberships?.map((membership) => (
      <div
        key={membership.id}
        className="relative flex flex-col justify-between w-full h-screen max-w-sm p-6 align-middle transition-all duration-300 transform bg-white shadow-md border-customBrown rounded-3xl hover:shadow-xl"
      >
  
        {/* Contenido de la tarjeta */}
        <div className="text-center">
          <img className='w-24' src={membership.image} alt="icon" />
          <h2 className="mb-20 text-2xl font-bold text-customDarkGreen">Membresía {membership?.name}</h2>
          <div className='mb-16'>
            {membership?.price == "0.00" && <br/>}
          {membership?.benefits.map((benefit, index) => (
            <p key={index} className="mt-2 text-gray-700">- {benefit}.</p>
          ))}
          </div>
          <div>

          <p className="mt-6 text-2xl font-bold text-customDarkGreen">{membership?.price == "0.00" ? "Free" : `Precio: $${membership.price} `}</p>
          
          {/* Botón de compra */}
          <div className="relative group">
            {membership.price == "0.00" ? 
            <div>
            </div>
              : 
            <button
            onClick={() => postOrderButton(membership.id)}
            disabled={activeButton}
            className={`px-8 py-3 mt-6 text-lg font-semibold transition-all duration-300 rounded-2xl ${
              activeButton
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-customHardBrown to-customDarkGreen hover:from-customDarkGreen hover:to-customHardBrown"
            } text-customBeige hover:shadow-lg`}
            >
              Comprar Ahora
            </button>
            }
            {/* Popover para botón deshabilitado */}
            {activeButton && (
              <div className="absolute hidden px-4 py-10 mt-2 text-sm bg-gray-500 rounded-lg text-customBeige -top-27 right-2 group-hover:block opacity-70">
              <h1>Ya tienes una membresía activa.</h1>
            </div>
            )}
          </div>
            </div>
        </div>
      </div>
    ))}

  </div>
  );
};

export default MembershipCard;
