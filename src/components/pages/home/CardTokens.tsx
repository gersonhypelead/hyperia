import React from 'react';
import { Card, Typography, Space } from 'antd';
import { ReactNode } from 'react';

const { Text, Title } = Typography;

// Props para el componente
interface CardTokensProps {
  title: string;
  value: number | string;
  tokens: number | string;
  icon?: ReactNode; // Nuevo prop para pasar un icono opcional
}

const CardTokens: React.FC<CardTokensProps> = ({
  title,
  value,
  tokens,
  icon,
}) => {
  return (
    <Card
      bordered={true}
      style={{
        border: 'none',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px',
      }}
    >
      <Space align="center">
        <div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {title}
          </Text>
          {icon && (
          <span style={{ fontSize: '20px', marginLeft: '8px' }}>
            {icon}
          </span>
        )}
          <Title level={4} style={{ margin: 0 }}>
            {value}
          </Title>
        </div>
      </Space>
      <Text
        style={{
          backgroundColor: '#e6f7ff',
          color: '#1890ff',
          padding: '4px 60px',
          borderRadius: '4px',
          fontWeight: 500,
          textAlign: 'center', // Centrar el texto en el token
          display: 'block', // Para asegurar que el ancho y centrar funcione correctamente
        }}
      >
        {tokens} tokens
      </Text>
    </Card>
  );
};

export default CardTokens;
