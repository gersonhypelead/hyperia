import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Modal, Dropdown, Menu, Row, Col, Skeleton } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AvatarRobot from '../../../assets/img/avatars/robot.avif';
import '../../../styles/pages/home/Home.css';
import {
  GetDataChatsBotsHomeReducer,
  SelectBotReducer
} from '../../../redux/actions/home/Home';
import { RootState, AppDispatch } from '../../../redux/store/store';

const { Meta } = Card;

const CardBot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chatbot_seleccionado, setChatbot_seleccionado] = useState("");

  useEffect(() => {
    dispatch(GetDataChatsBotsHomeReducer());
  }, []);

  const {
    rex_chatsbots,
    rex_loading,
    rex_error
  } = useSelector(({ home }: any) => home);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'editar') {
      console.log('Editar');
    } else if (key === 'duplicar') {
      console.log('Duplicar');
    } else if (key === 'eliminar') {
      console.log('Eliminar');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="editar">Editar</Menu.Item>
      <Menu.Item key="duplicar">Duplicar</Menu.Item>
      <Menu.Item key="eliminar">Eliminar</Menu.Item>
    </Menu>
  );

  return (
    <>
      {rex_loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Col key={index} xl={8} md={12} sm={24}>
              <Card
                className="custom-card"
                style={{ height: 270, overflow: 'hidden', marginBottom: '16px' }}
              >
                <Skeleton loading={rex_loading} avatar paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : rex_error ? (
        <p style={{ color: 'red' }}>Error: {rex_error}</p>
      ) : (
        rex_chatsbots.length > 0 && (
          <Row gutter={[16, 16]}>
            {rex_chatsbots.slice(0, 10).map((chatbot: any, index: number) => (
              <Col key={index} xl={8} md={12} sm={24}>
                <Card
                  className={
                    localStorage.getItem("chat_seleccionado") == chatbot.id ||
                      chatbot_seleccionado == chatbot.id
                      ? "custom-card-select"
                      : "custom-card"
                  }
                  style={
                    { height: 270, overflow: 'hidden', marginBottom: '16px' }
                  }
                  actions={[
                    <Button type="link" onClick={showModal}>Leer más</Button>
                  ]}
                  onClick={() => {
                    localStorage.setItem("chat_seleccionado", chatbot.id)
                    setChatbot_seleccionado(chatbot.id)
                    dispatch(SelectBotReducer(index, !chatbot.select))
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={AvatarRobot}
                        alt="Avatar del Robot"
                        style={{
                          borderRadius: '100%',
                          width: '60px',
                          marginRight: '10px',
                        }}
                      />
                      <span>{chatbot.nombre || "Nombre no disponible"}</span>
                    </div>
                    <Dropdown
                      overlay={menu}
                      trigger={['click']}
                    >
                      <MoreOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                    </Dropdown>
                  </div>
                  <div className="card-description" style={{ marginTop: '10px' }}>
                    {chatbot.descripcion || "Descripción no disponible"}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      )}

      <Modal
        title="InfoBot"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cerrar
          </Button>
        ]}
      >
        <p>Descripción detallada del chatbot...</p>
      </Modal>
    </>
  );
};

export default CardBot;
