import React from 'react';
import { Button, Card, Divider } from 'antd';
import {
  CheckOutlined
} from '@ant-design/icons';

interface CardPricingProps {
  title?: string;
  subTitle?: string;
  image?: string;
  pricing?: number;
  pricingMo?: number;
  mostPopular?: boolean;
}

const CardPricing: React.FC<CardPricingProps> = ({
  title,
  subTitle,
  image,
  pricing,
  pricingMo,
  mostPopular
}) => {
  return (
    <>
      <Card style={
        mostPopular ?
          {
            borderRadius: '10px', position: 'relative',
            border: '2px solid #FFD000'
          } : {}
      }>
        {
          mostPopular ? (
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                width: '100%',
                textAlignLast: 'center',
                left: 0,
                color: 'white'
              }}
            >
              <Button
                style={{
                  background: 'black',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '10px'
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
          <div>
            <img style={{ width: '150px' }} src={image} />
          </div>
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
          <div>si contratas al año</div>
          <div>O <b>${pricingMo}</b> mensual</div>
        </div>
        <Divider />
        {
          [
            "1 active chatbot",
            "1,000 valid chats/mo",
            "Unlimited number of stories",
            "7-day training history",
            "Basic reporting",
            "Data security"
          ].map((text) => {
            return (
              <div
                style={{
                  marginBottom: '10px'
                }}
              >
                <CheckOutlined style={{ fontWeight: 'bold', marginRight: '10px' }} />
                {text}
              </div>
            )
          })
        }
      </Card>
    </>
  );
};

export default CardPricing;
