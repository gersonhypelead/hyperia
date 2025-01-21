import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm';
import { Layout, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useLocation } from 'react-router-dom';
const stripePromise = loadStripe('pk_test_51Q5qv2K7xHa4ykgCxnJ7oZTWGbpYoX9JsIQPAtS9afLUmbIsdbPBAIrp76xOUmgPS2WPL74897tPzvCcGh6WiCy000iZ3ppFnT');

// Define las props de plan correctamente
interface Plan {
  id: number;
  nombre: string;
  importe: number;
  suscripcion_id: number;
  pago_id: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const plan: Plan = location.state?.plan || {
    id: 2,
    nombre: 'error a al cargar plan',
    importe: 100,
    suscripcion_id: 0,
    pago_id: 0,
  };



  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Payment Form
        </Title>
        <Elements stripe={stripePromise}>
          {/* Aquí pasamos el plan al formulario de pago */}
          <CheckoutForm plan={plan} />
        </Elements>
      </Content>
    </Layout>
  );
};

export default Checkout;