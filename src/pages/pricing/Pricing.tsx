import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import CardPricing from './components/CardPricing';
import Bot01 from '../../assets/img/bots/bo01.webp'
import Bot02 from '../../assets/img/bots/bot02.webp'
import Bot03 from '../../assets/img/bots/bot03.webp'
import Bot04 from '../../assets/img/bots/bot04.webp'

const Pricing: React.FC = () => {
  return (
    <>
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '50px', marginTop: '-50px' }}
      >
        <Col>
          <h1
            style={{
              fontSize: '40px'
            }}
          >Precios orientados a <br/>objetivos que escalan contigo</h1>
          <div
            style={{ marginBottom: '30px' }}
          >Pruebe las funciones del plan Team durante 14 días · No se requiere tarjeta de crédito · No se necesita codificación</div>
          <Button type='primary'>Comienza tu prueba gratuita</Button>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xl={6} md={6}>
          <CardPricing
            title='Basico'
            subTitle='Pequeñas Empresas'
            image={Bot01}
            pricing={52}
            pricingMo={65}
          />
        </Col>
        <Col xl={6} md={6}>
          <CardPricing
            title='Team'
            subTitle='Equipo en una empresa en crecimiento'
            image={Bot02}
            pricing={142}
            pricingMo={169}
            mostPopular={true}
          />
        </Col>
        {/* <Col xl={4} md={6}>
          <CardPricing
            title='Empresarial'
            subTitle='Equipo en una gran empresa.'
            image={Bot03}
            pricing={424}
            pricingMo={499}
          />
        </Col>
        <Col xl={4} md={6}>
          <CardPricing
            title='Enterprise'
            subTitle='Empresas de gran escala'
            image={Bot04}
            pricing={600}
            pricingMo={650}
          />
        </Col> */}
      </Row>
    </>
  );
};

export default Pricing;
