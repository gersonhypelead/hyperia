import { Col, Row, Button, Divider } from 'antd';
import React, { useEffect } from 'react';
import CardBot from '../../components/pages/home/CardBot';
import CardTokens from '../../components/pages/home/CardTokens';
import ChartDonut from '../../components/pages/home/ChartDonut';
import { PlusOutlined, IdcardTwoTone, MessageTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store/store';
import {
  GetaverAgeConversationsMessagesHomeReducer,
  GetCountConversacionesHomeReducer,
  GetCountMessagesHomeReducer,
  GetCountTokensHomeReducer,
  GetUserMessagesInfoReducer
} from '../../redux/actions/home/Home';
import MiPlan from '../../components/plan/MiPlan';

const Home: React.FC = () => {

  const [donutChartData, setDonutChartData] = React.useState<{ name: string, value: number }[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const {
    rex_user_auth
  } = useSelector(({ auth }: any) => auth);

  useEffect(() => {
    dispatch(GetCountConversacionesHomeReducer());
    dispatch(GetCountMessagesHomeReducer());
    dispatch(GetaverAgeConversationsMessagesHomeReducer());
    dispatch(GetUserMessagesInfoReducer())
    dispatch(GetCountTokensHomeReducer())
  }, [location]);

  const {
    rex_count_conversations,
    rex_count_messages,
    rex_average,
    rex_messages,
    rex_tokens
    /* rex_count_conversations_by_user_chat,
    rex_count_messages_by_user_chat */
  } = useSelector(({ home }: any) => home)


  // const donutChartData = [
  //   { name: 'N° Mensajes E/R', value: 11 },
  //   { name: 'Mensajes Disponibles', value: 23 }
  // ];
  useEffect(() => {
    if (rex_messages?.data?.length) {

      const mensajesEnviadosRecibidos = rex_messages.data[0].mensajes_enviados + rex_messages.data[0].mensajes_recibidos;
      const mensajesDisponibles = rex_messages.data[0].mensajes_disponibles;

      setDonutChartData([
        { name: 'N° Mensajes E/R', value: mensajesEnviadosRecibidos },
        { name: 'Mensajes Disponibles', value: mensajesDisponibles }
      ]);
    }
  }, [rex_messages]);

  const userStatus = rex_user_auth?.estado_user;
  const isUserInactive = userStatus === 'Inactivo';
  const statusText = isUserInactive ? 'Inactivo' : 'Activo';

  return (
    <>
      <h2
        onClick={() => { }} className='text-hola '
      >Hola {rex_user_auth?.personas?.nombre + " " + rex_user_auth?.personas?.apellido_paterno + " " + rex_user_auth?.personas?.apellido_materno}</h2>

      <h3 style={{
        fontSize: '13px', // Tamaño más pequeño
        color: '#4a4a4a',
        fontWeight: '400', // Normal, sin negrita
        letterSpacing: '1px',
        margin: '0',
        lineHeight: '1.5',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // Sombra más suave
        fontFamily: `'Poppins', sans-serif`, // Fuente moderna
        marginBottom: '40px'
      }}>
        <b>IMPORTANTE:</b> Los datos mostrados son del mes actual.
      </h3>


      {/* Distribución horizontal de las cartas */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          {/* Columna para CardTokens y CardBot */}
          <Row
            justify="center"
            gutter={[16, 16]}
          // style={{ marginBottom: '20px' }}
          >
            <Col
              xxl={4} xl={6} md={12}
              className='graficoDonut'
              style={{
                // paddingBottom: '20px',
                backgroundColor: '#fff',
                borderRadius: '50px',
                boxShadow: '0 4px 8px rgba(12,12,12, 0.2)'
              }}
            >
              <ChartDonut
                data={donutChartData}
                innerRadius={20}
                outerRadius={80}
                paddingAngle={5}
              />
              {/* </div> */}
            </Col>
            <Col
              xxl={15}
              xl={13}
              md={12}
            >
              <Row gutter={[16, 16]}>
                <Col xxl={8} xl={12} md={12} className='cardTokens'>
                  <CardTokens
                    title="Nº CONVERSACIONES"
                    value={rex_count_conversations.data?.[0]?.count}
                    tokens={rex_tokens}
                    icon={<IdcardTwoTone />}
                  />
                </Col>
                <Col xxl={8} xl={12} md={12} className='cardTokens'>
                  <CardTokens
                    // title="Nº MENSAJES E/R"
                    title="Nº MENSAJES ENVIADOS"
                    value={rex_count_messages.data?.[0]?.count}
                    tokens={rex_tokens}
                    icon={<MessageTwoTone />}
                  />
                </Col>
                <Col xxl={8} xl={24} md={12} className='cardTokens'>
                  <CardTokens
                    title="N° MENSAJES ENVIADOS POR CONVERSACIÓN"
                    value={rex_average.data?.[0]?.average}
                    tokens={rex_tokens}
                  />
                </Col>
                {/* <Col
                  xxl={6} xl={5} md={12} className='cardTokens'
                >
                  <MiPlan statusText={statusText} />
                </Col> */}
              </Row>
            </Col>

            <Col
              xxl={5} xl={5} md={12} className='cardTokens'
            >
              <MiPlan statusText={statusText} />
            </Col>
          </Row>
          <Divider />

          {/* Sección de CardBot */}
          <Row justify="center" gutter={[16, 16]} className='cardbots'>
            <Col xl={24}>
              {/* Botón "Ver más detalles" alineado a la izquierda */}
              <Row style={{ marginBottom: '20px' }} className='btn-container'>
                <Col xl={12} md={12}>
                  {/* Botón "Crear un nuevo chatbot" */}
                  <div style={{ float: 'left' }}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={() => {
                        navigate('/crear-chatbot');
                      }}
                    >
                      Crear un nuevo chatbot
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <CardBot chatWithBot={true} />
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
