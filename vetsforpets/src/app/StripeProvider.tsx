"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PropsWithChildren } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function StripeProvider({ children }: PropsWithChildren) {
  return(
     <Elements stripe={stripePromise}>
        {children}
        </Elements>
 )
}

