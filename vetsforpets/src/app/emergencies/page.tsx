"use client";

// import PetDetails from "@/components/pet/petDetails";
import { VetEmergencies } from "@/components/VetEmergencies/VetEmergencies";
// import { ChatComponent } from "@/components/Chat/ChatComponent";
// import { useUserStore, useVetStore } from "@/store";
import { useUserStore } from "@/store";
import React from "react";

export default function Emergencies() {
  const { userData } = useUserStore();
  // const { vetId } = useVetStore();

  return (
    <>
      <VetEmergencies />

      {
        userData?.role === "PETSHOP" ? <VetEmergencies /> : null
        // <Map />
        // <ChatComponent userId={userData?.id} vetId={vetId} />
      }
    </>
  );
}
