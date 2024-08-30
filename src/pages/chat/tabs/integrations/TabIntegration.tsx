import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button, Steps } from 'antd';
import ImgFacebook from '../../../../assets/img/socialNetworks/facebook.png'
import ImgInstagram from '../../../../assets/img/socialNetworks/instagram.jpg'
import ImgWhatsapp from '../../../../assets/img/socialNetworks/whatsapp.png'
import ImgWebsite from '../../../../assets/img/socialNetworks/website.avif'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';

const { Step } = Steps;

const TabIntegration: React.FC = () => {

  const [isModalFacebook, setIsModalFacebook] = useState(false);
  const [isModalInstagram, setIsModalInstagram] = useState(false);
  const [isModalWhatsapp, setIsModalWhatsapp] = useState(false);
  const [isModalWebsite, setIsModalWebsite] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(0);

  const socialNetworks = [
    { logo: ImgFacebook, title: 'Facebook Messenger', subTitle: 'Conecta tu chatbot con Facebook', action: () => setIsModalFacebook(true) },
    { logo: ImgInstagram, title: 'Instagram', subTitle: 'Conecta tu chatbot con Instagram', action: () => setIsModalInstagram(true) },
    { logo: ImgWhatsapp, title: 'Whatsapp', subTitle: 'Conecta tu chatbot con Whatsapp', action: () => setIsModalWhatsapp(true) },
    { logo: ImgWebsite, title: 'Website', subTitle: 'Conecta tu chatbot con tu website', action: () => setIsModalWebsite(true) }
  ];

  return (
    <>
      <Row>
        <Col xl={24} md={24}>
          {
            socialNetworks.map((social) => {
              return (
                <Card style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={social.action}>
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        width: '80px', height: '80px',
                      }}
                    >
                      <img
                        src={social.logo}
                        style={{
                          borderRadius: '10px', width: '100%',
                          height: '100%', objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: '20px', alignContent: 'center' }}>
                      <h3 style={{ lineHeight: '0.1px' }}>{social.title}</h3>
                      <span>{social.subTitle}</span>
                    </div>
                  </div>
                </Card>
              )
            })
          }
        </Col>
      </Row>

      {/* Facebook */}
      <Modal
        title="Integración del Chatbot en Facebook Messenger"
        visible={isModalFacebook}
        onOk={() => setIsModalFacebook(false)}
        onCancel={() => setIsModalFacebook(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalFacebook(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsModalFacebook(false)}>
            Aceptar
          </Button>,
        ]}
      >
        <Steps direction="vertical" current={stepCompleted}>
          <Step
            title="Paso 1: Crear una App en Facebook"
            description={<div>
              Ve a la sección de desarrolladores de Facebook y crea una nueva aplicación. Asigna un nombre a tu aplicación y proporciona tu correo electrónico.
              <Button
                type="text"
                icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 1 ? '#C4C4C4' : "#52c41a"} />}
                style={{ borderRadius: '100%' }}
                onClick={() => setStepCompleted(1)}
              />
            </div>}
          />
          <Step
            title="Paso 2: Configurar el Messenger"
            description={
              <div>
                Dentro del panel de tu nueva aplicación, agrega el producto Messenger y configura la URL del webhook, así como el token de verificación.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 2 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(2)}
                />
              </div>
            }
          />
          <Step
            title="Paso 3: Obtener credenciales de OpenAI"
            description={
              <div>
                Accede a tu cuenta en la plataforma de OpenAI y obtén las credenciales necesarias para integrar tu chatbot (API key y URL del endpoint).
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 3 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(3)}
                />
              </div>
            }
          />
          <Step
            title="Paso 4: Desplegar el Webhook"
            description={
              <div>
                Despliega un servidor que maneje las solicitudes del webhook de Facebook Messenger. Este servidor debe estar configurado para interactuar con la API de OpenAI.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 4 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(4)}
                />
              </div>
            }
          />
          <Step
            title="Paso 5: Probar la Integración"
            description={
              <div>
                Envía un mensaje a tu página de Facebook para verificar que el chatbot está respondiendo correctamente a las interacciones.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 5 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(5)}
                />
              </div>
            }
          />
        </Steps>
      </Modal>

      {/* Instagram */}
      <Modal
        title="Integración del Chatbot en Instagram"
        visible={isModalInstagram}
        onOk={() => setIsModalInstagram(false)}
        onCancel={() => setIsModalInstagram(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalInstagram(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsModalInstagram(false)}>
            Aceptar
          </Button>,
        ]}
      >
        <Steps direction="vertical" current={stepCompleted}>
          <Step
            title="Paso 1: Crear una App en Facebook"
            description={<div>
              Ve a la sección de desarrolladores de Facebook y crea una nueva aplicación. Asigna un nombre a tu aplicación y proporciona tu correo electrónico.
              <Button
                type="text"
                icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 1 ? '#C4C4C4' : "#52c41a"} />}
                style={{ borderRadius: '100%' }}
                onClick={() => setStepCompleted(1)}
              />
            </div>}
          />
          <Step
            title="Paso 2: Configurar Instagram Basic Display"
            description={
              <div>
                Dentro del panel de tu nueva aplicación, agrega el producto 'Instagram Basic Display' y configura la URL del webhook, así como el token de verificación.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 2 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(2)}
                />
              </div>
            }
          />
          <Step
            title="Paso 3: Obtener credenciales de OpenAI"
            description={
              <div>
                Accede a tu cuenta en la plataforma de OpenAI y obtén las credenciales necesarias para integrar tu chatbot (API key y URL del endpoint).
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 3 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(3)}
                />
              </div>
            }
          />
          <Step
            title="Paso 4: Desplegar el Webhook"
            description={
              <div>
                Despliega un servidor que maneje las solicitudes del webhook de Instagram. Este servidor debe estar configurado para interactuar con la API de OpenAI.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 4 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(4)}
                />
              </div>
            }
          />
          <Step
            title="Paso 5: Probar la Integración"
            description={
              <div>
                Envía un mensaje a tu cuenta de Instagram para verificar que el chatbot está respondiendo correctamente a las interacciones.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 5 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(5)}
                />
              </div>
            }
          />
        </Steps>
      </Modal>

      {/* Whatsapp */}
      <Modal
        title="Integración del Chatbot con Whatsapp"
        visible={isModalWhatsapp}
        onOk={() => setIsModalWhatsapp(false)}
        onCancel={() => setIsModalWhatsapp(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalWhatsapp(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsModalWhatsapp(false)}>
            Aceptar
          </Button>,
        ]}
      >
        <Steps direction="vertical" current={stepCompleted}>
          <Step
            title="Paso 1: Crear una cuenta en Twilio"
            description={<div>
              Regístrate en Twilio y crea una nueva cuenta. Twilio es un servicio que permite la integración de WhatsApp con tu chatbot.
              <Button
                type="text"
                icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 1 ? '#C4C4C4' : "#52c41a"} />}
                style={{ borderRadius: '100%' }}
                onClick={() => setStepCompleted(1)}
              />
            </div>}
          />
          <Step
            title="Paso 2: Configurar el Sandbox de WhatsApp"
            description={
              <div>
                Dentro de tu cuenta de Twilio, configura el Sandbox de WhatsApp. Esto te permitirá probar tu integración en un entorno de desarrollo.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 2 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(2)}
                />
              </div>
            }
          />
          <Step
            title="Paso 3: Obtener credenciales de OpenAI"
            description={
              <div>
                Accede a tu cuenta en la plataforma de OpenAI y obtén las credenciales necesarias para integrar tu chatbot (API key y URL del endpoint)."
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 3 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(3)}
                />
              </div>
            }
          />
          <Step
            title="Paso 4: Desplegar el Webhook"
            description={
              <div>
                Despliega un servidor que maneje las solicitudes del webhook de Twilio. Este servidor debe estar configurado para interactuar con la API de OpenAI.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 4 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(4)}
                />
              </div>
            }
          />
          <Step
            title="Paso 5: Probar la Integración"
            description={
              <div>
                Envía un mensaje a tu número de WhatsApp Sandbox para verificar que el chatbot está respondiendo correctamente a las interacciones.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 5 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(5)}
                />
              </div>
            }
          />
        </Steps>
      </Modal>

      {/* Website */}
      <Modal
        title="Integración del Chatbot en tu Página Web"
        visible={isModalWebsite}
        onOk={() => setIsModalWebsite(false)}
        onCancel={() => setIsModalWebsite(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalWebsite(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsModalWebsite(false)}>
            Aceptar
          </Button>,
        ]}
      >
        <Steps direction="vertical" current={stepCompleted}>
          <Step
            title="Paso 1: Obtener credenciales de OpenAI"
            description={<div>
              Accede a tu cuenta en la plataforma de OpenAI y obtén las credenciales necesarias para integrar tu chatbot (API key y URL del endpoint).
              <Button
                type="text"
                icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 1 ? '#C4C4C4' : "#52c41a"} />}
                style={{ borderRadius: '100%' }}
                onClick={() => setStepCompleted(1)}
              />
            </div>}
          />
          <Step
            title="Paso 2: Crear un servidor para manejar las solicitudes"
            description={
              <div>
                Despliega un servidor que maneje las solicitudes de tu sitio web. Este servidor debe estar configurado para interactuar con la API de OpenAI.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 2 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(2)}
                />
              </div>
            }
          />
          <Step
            title="Paso 3: Implementar el cliente de chat en tu página web"
            description={
              <div>
                Utiliza JavaScript y HTML para agregar un cliente de chat a tu página web. Este cliente debe enviar y recibir mensajes del servidor que configuraste en el paso anterior.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 3 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(3)}
                />
              </div>
            }
          />
          <Step
            title="Paso 4: Estilizar el cliente de chat"
            description={
              <div>
                Aplica estilos CSS para hacer que el cliente de chat se integre bien con el diseño de tu página web."
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 4 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(4)}
                />
              </div>
            }
          />
          <Step
            title="Paso 5: Probar la Integración"
            description={
              <div>
                Envía un mensaje a tu número de WhatsApp Sandbox para verificar que el chatbot está respondiendo correctamente a las interacciones.
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 5 ? '#C4C4C4' : "#52c41a"} />}
                  style={{ borderRadius: '100%' }}
                  onClick={() => setStepCompleted(5)}
                />
              </div>
            }
          />
        </Steps>
      </Modal>
    </>
  );
};

export default TabIntegration;
