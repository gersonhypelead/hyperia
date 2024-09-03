import React, { useState } from 'react';
import { Tabs, Card, Input, Button, Typography, Space, Upload, Row } from 'antd';
import { InfoCircleFilled, DownOutlined, UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const TabKnowledgeBase: React.FC = () => {
  const [textInput, setTextInput] = useState(
    'Eres un vendedor de componentes de computo, mouse, teclado, cable de red, parlantes, etc.'
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const totalCharacters = textInput.length;

  return (
    <Card>
      <Title style={{ marginTop: '-5px' }} level={4}>Fuentes de Datos</Title>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Texto" key="1" >
          <Space direction="vertical" size="large" style={{ width: '100%'}}>
            <Space size="middle">
              <Title level={5} style={{ color: '#aaa', marginTop: '-5px', marginBottom: '-10px' }}>
                Datos de Texto <InfoCircleFilled style={{ color: '#aaa' }} />
              </Title>
            </Space>
            <Input.TextArea
              value={textInput}
              onChange={handleInputChange}
              rows={6}
              style={{ fontSize: '16px', color: '#aaa', marginTop: '-20px' }} // Color gris para el texto
            />
            <Space size="middle" align="center">
              <Button
                icon={<DownOutlined />}
                style={{ borderColor: '#1a81d7', backgroundColor: '#fff', color: '#1a81d7', height: '20px' }} // Azul más oscuro para el botón
              />
              <Text style={{ color: '#aaa' }}>
                Numero total de caracteres (todas las fuentes de datos): {totalCharacters}
              </Text>
            </Space>
            <Button
              type="primary"
              style={{ borderRadius: '6px', backgroundColor: '#1a81d7', borderColor: '#1a81d7', height: '40px' }} // Azul más oscuro para el botón
            >
              Re-entrenar Chatbot
            </Button>
          </Space>
        </TabPane>
        <TabPane tab="Preguntas/Respuestas" key="2">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Card style={{ borderColor: '#d9d9d9', borderRadius: 0 }}>
              <Title level={5} style={{ color: '#aaa',  marginTop: '-10px' }}>
                Upload Q/A CSV File <InfoCircleFilled style={{ color: '#aaa' }} />
              </Title>
              <Row style={{ backgroundColor: '#fff', border: 'none', borderRadius: 4 }}>
                <Upload>
                  <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                </Upload>
              </Row>
              <Space size="middle" style={{ width: '100%', marginTop: '16px', justifyContent: 'space-between' }}>
                <Button type="primary" style={{ backgroundColor: '#1a81d7', borderColor: '#1a81d7' }}>
                  Upload
                </Button>
                <Button type="link" style={{ color: '#1890ff' }}>
                  Download Example CSV
                </Button>
              </Space>
            </Card>
            <Space direction="vertical" style={{ width: '100%', alignItems: 'flex-end' }}>
              <Button
                type="primary"
                style={{ backgroundColor: '#1a81d7', borderColor: '#1a81d7', marginTop: '16px' }} // Azul más oscuro
              >
                Añadir P/A
              </Button>
              <Button
                style={{ backgroundColor: '#e6f7ff', borderColor: '#91d5ff', color: '#000', marginTop: '8px' }}
              >
                Export Q/A
              </Button>
            </Space>
          </Space>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default TabKnowledgeBase;
