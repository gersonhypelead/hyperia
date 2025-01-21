import React from 'react';
import { Button, Card, Col, Divider, Row, message } from 'antd';
import {
  CheckOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
interface CardPricingProps {
  title?: string;
  subTitle?: string;
  image?: string;
  pricing?: number;
  pricingMo?: number;
  mostPopular?: boolean;
  index?: number;
  version_pequena: boolean;
  estado: boolean;
}

const CardPricing: React.FC<CardPricingProps> = ({
  title,
  subTitle,
  image,
  pricing,
  pricingMo,
  mostPopular,
  index,
  version_pequena,
  estado = true
}) => {

  const items = index == 0 ? [
    "1,000 mensajes",
    "3 Chatbots",
    "Conversaciones Ilimitadas",
    "Integraciones Ilimitadas",
  ] : index == 1 ? [
    "10,000 mensajes",
    "Chatbots Ilimitados",
    "Conversaciones Ilimitadas",
    "Integraciones Ilimitadas",
  ] : index == 2 ? [
    "Opción para seleccionar el motor de Chatbot",
    "20,000 mensajes",
    "Chatbots Ilimitados",
    "Conversaciones Ilimitadas",
    "Integraciones Ilimitadas",
  ] : []

  const handleClick = () => {
    if (estado) {
      const plan = {
        id: 2,
        nombre: title,
        importe: pricing
      }

      navigate('/checkout', { state: { plan } });
    } else {
      message.warning('Lo sentimos la compra de este plan no esta disponible')
    }

  };
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={
          mostPopular ?
            {
              position: 'relative',
              border: '2px solid #0C5257 ',
              background: 'linear-gradient(137deg, rgba(34, 242, 255, 1) 0%, rgba(0, 255, 194, 1) 100%)',
              // cursor: 'pointer'

            } : {
              background: 'rgba(34, 242, 255, 0.1)',
              border: '1px solid #0C5257',
              cursor: estado ? 'pointer' : 'not-allowed'
            }
        }
        onClick={handleClick}
        className='cursor-pointer'
      >
        {
          mostPopular ? (
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                width: '100%',
                textAlignLast: 'center',
                left: 0,
                color: 'white',
              }}
            >
              <Button
                style={{
                  background: '#0C5257',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '10px',
                  border: 'none',
                  fontWeight: '500',
                }}
              >
                MAS POPULAR
              </Button>
            </div>
          ) : null
        }

        <div
          style={{
            textAlign: 'center'
          }}
        >

          <Row>
            <Col
              xxl={version_pequena ? 12 : 24}
              xl={version_pequena ? 12 : 24}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}
              >
                {title}
              </div>
              <div
                style={{
                  height: '40px'
                }}
              >
                {subTitle}
              </div>

              {
                !version_pequena && (
                  <div>
                    <img style={{ width: '150px' }} src={image} />
                  </div>
                )
              }

              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '50px'
                }}
              >
                <span
                  style={{
                    fontSize: '20px'
                  }}
                >$</span>{pricing}/m
              </div>
              {
                pricingMo !== 0 && (
                  <>
                    <div>si contratas al año</div>
                    <div>O <b>${pricingMo}</b> mensual</div>
                  </>
                )
              }
            </Col>
            {
              !version_pequena && (
                <Divider />
              )
            }

            <Col
              xxl={version_pequena ? 12 : 24}
              xl={version_pequena ? 12 : 24}
            >
              <div
                style={{
                  textAlignLast: 'left'
                }}
              >
                {
                  items.map((text) => {
                    return (
                      <div
                        style={{
                          marginBottom: '10px'
                        }}
                      >
                        <CheckOutlined
                          style={{ fontWeight: 'bold', marginRight: '10px' }}
                        />
                        {text}
                      </div>
                    )
                  })
                }
              </div>
            </Col>
          </Row>

        </div>


      </Card>
    </>
  );
};

export default CardPricing;
