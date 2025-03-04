"use client";

import { RequestEmergencyButton } from "@/components/EmergencyButton/EmergencyButton";
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
      {userData?.role === "PETSHOP" ? (
        <VetEmergencies />
      ) : (
        <RequestEmergencyButton petshopId="5925284a-cf5d-4fe4-89fc-88fa93e37cd4" />
      )}
    </>
  );
}
