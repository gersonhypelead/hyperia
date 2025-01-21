import React, { useState } from 'react';
import { Button, Card, message, Steps, theme } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import StepOne from '../../../../assets/img/integrations/step_one.png'
import StepTwo from '../../../../assets/img/integrations/step_two.png'
import StepThree from '../../../../assets/img/integrations/step_three.png'
import StepFourth from '../../../../assets/img/integrations/step_fourth.png'
import StepFive from '../../../../assets/img/integrations/step_five.png'
import StepSix from '../../../../assets/img/integrations/whatsapp/step_six.png'
import StepSeven from '../../../../assets/img/integrations/whatsapp/step_seven.png';
import StepEch from '../../../../assets/img/integrations/whatsapp/step_ech.png';
import StepNine from '../../../../assets/img/integrations/whatsapp/step_nine.png';
import StepTen from '../../../../assets/img/integrations/whatsapp/step_ten.png';
import StepOnce from '../../../../assets/img/integrations/facebook/step_once.png';
import StepDoce from '../../../../assets/img/integrations/facebook/step_doce.png';
import { AppDispatch } from '../../../../redux/store/store';
import { useDispatch } from 'react-redux';
import { GetIntegrationWhatsAppReducer } from '../../../../redux/actions/integrations/WhatsappIntegration';
import config from '../../../../config';

const API_URL = config.API_URL;

const FacebookIntegration = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [datosConexion, setDatosConexion] = useState({
    token: "",
    url: "",
    integrationId: 0
  });
  const [stepCompleted, setStepCompleted] = useState(0);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'Paso 1: Crear una App en Facebook',
      content: <>
        <div>
          <div>
            1) Ingresamemos al siguiente link: https://developers.facebook.com/?no_redirect=1, e iniciamos sesión o creamos una cuenta (como sea correspondiente de no contar con una cuenta de Meta)
          </div>
          <img src={StepOne} />
          <div>
            2) Crear o iniciar sesión
          </div>
          <img src={StepTwo} style={{ width: "350px" }} />
          <div>
            3) Una vez iniciado sesión vamos a la opción de "Mis apps"
          </div>
          <img src={StepThree} />
          <div>
            4) Una vez dentro de Meta pasamos a crear la aplicación
          </div>
          <img src={StepFourth} style={{ width: '750px' }} />
          <div>
            5) Confirmamos la creación de la app
          </div>
          <img src={StepFive} style={{ width: '550px' }} />
          {/* <img src={StepSix} /> */}
          {/* <Button
            type="text"
            icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 1 ? '#C4C4C4' : "#52c41a"} />}
            style={{ borderRadius: '100%' }}
            onClick={() => setStepCompleted(1)}
          /> */}
        </div>
      </>,
    },
    {
      title: 'Paso 2: Agregar el producto de Messenger',
      content: <>
        <div>
          1) Pasamos a configurar la aplicación, para ello marcamos la opción de "Otro" cuando nos pregunte que es lo que queremos hacer con nuestra app
        </div>
        <img src={StepSix} style={{ width: '650px' }} />
        <div>
          2) Seleccionamos el tipo de App de "Negocios"
        </div>
        <img src={StepSeven} style={{ width: '650px' }} />
        <div>
          3) Ingresamos un nombre a la aplicación
        </div>
        <img src={StepEch} style={{ width: '650px' }} />
        <div>
          4) Finalmente agregamos el producto de Messenger a nuestra aplicación
        </div>
        <img src={StepNine} />
      </>,
    },
    {
      title: 'Paso 3: Configurar Messenger',
      content: <>
        <div>
          1) Generar token de acceso, selccionamos la pagina web la cual queremos que se enlace el messenger y pasamos a darle permiso
        </div>
        <img src={StepOnce} />
      </>,
    },
  
    {
      title: 'Paso 4: Conexión con la aplicación',
      content: <>
        <div>
          1) Generamos un token y una url especifica para nuestra aplicación. La cual ingesamos en el panel de meta
        </div>
        <Button
          onClick={async () => {
            const rpta: {
              response: boolean;
              data: {
                tokenVerificacion: string;
                endpoint: string;
                id: number
              }
            } = await dispatch(GetIntegrationWhatsAppReducer());
  
            setDatosConexion({
              ...datosConexion,
              token: rpta.data.tokenVerificacion,
              url: API_URL + rpta.data.endpoint,
              integrationId: rpta.data.id
            })
  
          }}
        >Generar Token</Button>
        <div><b>Token:</b> {datosConexion.token}</div>
        <div><b>URL de devolución de llamada:</b> {datosConexion.url}</div>
        <img src={StepDoce} />
      </>,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>


      <Steps current={current} items={items} />
      <Card style={{ marginTop: 24 }}>
        <div style={{ marginTop: 24 }}>
          {
            steps[current].content
          }
        </div>
      </Card>

      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Enviar
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
      </div>













      {/* <Steps current={stepCompleted}>
        <Step
          title="Paso 1: Crear una App en Facebook"
          description={
            <div>
              <div>
                Ingresamemos al siguiente link: https://developers.facebook.com/?no_redirect=1, e iniciamos sesión o creamos una cuenta (como sea correspondiente de no contar con una cuenta de Meta)
              </div>
              <img src={StepOne} />
              <div>
                Crear o iniciar sesión
              </div>
              <img src={StepTwo} />
              <div>
                Una vez iniciado sesión vamos a la opción de "Mis apps"
              </div>
              <img src={StepThree} />
              <div>
                Una vez dentro de Meta pasamos a crear la aplicación
              </div>
              <img src={StepFourth} />
              <div>
                Confirmamos la creación de la app
              </div>
              <img src={StepFive} />
              <img src={StepSix} />
              <Button
                type="text"
                icon={<CheckCircleTwoTone twoToneColor={stepCompleted < 1 ? '#C4C4C4' : "#52c41a"} />}
                style={{ borderRadius: '100%' }}
                onClick={() => setStepCompleted(1)}
              />
            </div>
          }
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
      </Steps> */}
    </>
  )
}

export default FacebookIntegration