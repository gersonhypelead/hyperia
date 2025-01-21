import React, { useCallback, useState } from 'react';
import { CardElement, useStripe, useElements, EmbeddedCheckoutProvider, EmbeddedCheckout ,  } from '@stripe/react-stripe-js';
import config from './../../../config'
import { loadStripe } from '@stripe/stripe-js';
interface Plan {
  id: number;
  nombre: string;
  importe: number;
  suscripcion_id: number;
  pago_id: number;
}
interface CheckoutFormProps {
  plan: Plan;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ plan }) => {
  const fetchClientSecret = useCallback(async () => {

    let rpta
    if (plan.pago_id > 0) {

      await fetch(`${config.API_URL}stripe/pago/sesion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'pago_id': `${plan.pago_id}`,
          'suscripcion_id':'0',
        },
        body: JSON.stringify([{
          id: plan.id,
          nombre: plan.nombre,
          importe: plan.importe
        }]),
      })
        .then((res) => res.json())
        .then((data) => {
          rpta = data.clientSecret
        });
    }
    if (plan.suscripcion_id > 0) {
      await fetch(`${config.API_URL}stripe/pago/sesion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'pago_id':'0',
          'suscripcion_id':`${plan.suscripcion_id}`
        },
        body: JSON.stringify([{
          id: plan.id,
          nombre: plan.nombre,
          importe: plan.importe
        }]),
      })
        .then((res) => res.json())
        .then((data) => {
          rpta = data.clientSecret
        });
    }


    return rpta + ""
  }, []);

  const options = { fetchClientSecret };
  const stripePromise = loadStripe(config.API_KEY_STRIPE)
  return (
    <>
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options} 
          
          
        >
          <EmbeddedCheckout   />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
};

export default CheckoutForm;
