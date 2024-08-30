import { Col, Row, Button, Divider } from 'antd';
import React from 'react';
import CardBot from '../../components/pages/home/CardBot';
import CardTokens from '../../components/pages/home/CardTokens';
import ChartDonut from '../../components/pages/home/ChartDonut';
import { PlusOutlined, IdcardTwoTone, MessageTwoTone } from '@ant-design/icons';
import Bot01 from '../../assets/img/bots/bo01.webp';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const {
    rex_user_auth
  } = useSelector(({ auth }: any) => auth);

  const donutChartData = [
    { name: 'N° Mensajes E/R', value: 11 },
    { name: 'Mensajes Disponibles', value: 89 }
  ];

  return (
    <>
      <h2
        onClick={() => console.log(rex_user_auth)} className='text-hola'
      >Hola {rex_user_auth?.personas?.nombre + " " + rex_user_auth?.personas?.apellido_paterno + " " + rex_user_auth?.personas?.apellido_materno}</h2>

      {/* Distribución horizontal de las cartas */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          {/* Columna para CardTokens y CardBot */}
          <Row justify="center" gutter={[16, 16]} style={{ marginBottom: '20px'}}>
            <Col xl={4} md={12} className='graficoDonut' style={{ paddingBottom: '20px',backgroundColor: '#fff', borderRadius:'25px', boxShadow: '0 4px 8px rgba(12,12,12, 0.2)'}}>
              {/* Columna para el gráfico tipo Donut */}
              {/* <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}> */}
              {/* <h3 style={{ marginBottom: '20px' }}>
                  Mensajes Enviados y Disponibles
                </h3> */}
              <ChartDonut
                data={donutChartData}
                innerRadius={20}
                outerRadius={80}
                paddingAngle={5}
              />
              {/* </div> */}
            </Col>
            <Col xl={5} md={12} className='cardTokens'>
              <CardTokens
                title="Nº CONVERSACIONES"
                value={102}
                tokens={3890}
                icon={<IdcardTwoTone />}
              />
            </Col>
            <Col xl={5} md={12} className='cardTokens'>
              <CardTokens
                title="Nº MENSAJES E/R"
                value={2577}
                tokens={3890}
                icon={<MessageTwoTone />}
              />
            </Col>
            <Col xl={5} md={12} className='cardTokens'>
              <CardTokens
                title="MSJ/S E/R POR CONVERSACIÓN"
                value={13}
                tokens={44}
              />
            </Col>
            <Col xl={5} md={12} className='cardTokens'>
              <div
                style={{
                  width: '100%',
                  height: '130px',
                  backgroundImage: "linear-gradient(137deg, rgba(34, 242, 255, 1) 0%, rgba(0, 255, 194, 1) 100%)",
                  position: 'relative',
                  borderRadius: '25px',
                  boxShadow: '0 4px 8px rgba(12, 12, 12, 0.2)',
                  paddingLeft: '20px',
                  marginBottom: '20px'
                }}
              >
                <Row>
                  <Col xl={12}
                    style={{
                      position: 'static'
                    }}
                  >
                    <div
                      style={{
                        color: '#0C5257',
                      }}
                    >
                      <h3>
                        Plan Basico
                      </h3>

                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px'
                        }}
                      >
                        <div>
                          {/* $39/month */}
                          Free
                        </div>
                        <span>
                          Actualice tu plan aquí.
                        </span>
                        <div style={{ marginTop: '5px', display: 'flex' }}>
                          <b>ACTIVADO</b>
                          <div
                            style={{
                              background: 'green',
                              width: '15px',
                              height: '15px',
                              borderRadius: "100%",
                              marginLeft: '5px'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>


              </div>
            </Col>
          </Row>
          <Divider />
          {/* Botón "Ver más detalles" alineado a la izquierda */}
          <Row style={{ marginBottom: '20px' }} className='btn-container'>
            <Col xl={12} md={12}>
              <Button type="primary">Ver más detalles</Button>
            </Col>
            <Col xl={12} md={12}>
              {/* Botón "Crear un nuevo chatbot" */}
              <div style={{ float: 'right' }}>
                <Button
                  type="primary" icon={<PlusOutlined />} style={{ display: 'flex', alignItems: 'center' }}
                  onClick={() => {
                    navigate('/chats');
                  }}
                >
                  Crear un nuevo chatbot
                </Button>
              </div>
            </Col>
          </Row>

          {/* Sección de CardBot */}
          <Row justify="center" gutter={[16, 16]} className='cardbots'>
            <Col xs={24}>
              <CardBot />
            </Col>
          </Row>
        </Col>
        <Col xs={24} lg={6}>
          {/* <div
            style={{
              width: '100%',
              height: '150px',
              backgroundImage: "radial-gradient(circle farthest-side at 100%, #0ea5e9, #0c4a6e)",
              position: 'relative',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              paddingLeft: '20px',
              marginBottom: '20px'
            }}
          >
            <Row>
              <Col xl={12}
                style={{
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    color: 'white',
                  }}
                >
                  <h3>
                    Plan Basico
                  </h3>
                  <br />

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px'
                    }}
                  >
                    <div>
                      Free
                    </div>
                    <span>
                      Actualice tu plan aquí.
                    </span>
                    <div style={{ marginTop: '5px', display: 'flex' }}>
                      <b>ACTIVADO</b>
                      <div
                        style={{
                          background: 'green',
                          width: '15px',
                          height: '15px',
                          borderRadius: "100%",
                          marginLeft: '5px'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xl={12}
                style={{
                  position: 'relative',
                  height: '150px'
                }}
              >
                <img
                  src={Bot01}
                  style={{
                    position: 'absolute',
                    width: '150px',
                    objectFit: 'cover',
                    objectPosition: "50% 15%",
                    maxWidth: 'none',
                    height: '100%',
                    display: 'block',
                    inset: "0% 0% 0% auto",
                  }}
                />
              </Col>
            </Row>
          </div> */}
          {/* <div style={{
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h3 style={{ marginBottom: '20px' }}>
              Mensajes Enviados y Disponibles
            </h3>
            <ChartDonut
              data={donutChartData}
              innerRadius={20}
              outerRadius={80}
              paddingAngle={5}
            />
          </div> */}
        </Col>
      </Row>
    </>
  );
};

export default Home;
