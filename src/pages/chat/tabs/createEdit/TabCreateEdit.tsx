import React, { useState } from 'react';
import {
  Button, Col, Divider, Input, Row, Select,
  Steps, theme, Modal, Card, Switch,
  TimePicker
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux'
import {
  GetDataChatsBotsHomeReducer,
  UpdateVarMundoReducer
} from '../../../../redux/actions/home/Home';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { submitFormData, sendFormDataToEndpoint } from '../../../../redux/actions/home/homeActions';
import { notification } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

type LabelRender = SelectProps['labelRender'];

const labelRender: LabelRender = (props) => {
  const { label, value } = props;
  if (label) {
    return value;
  }
  return <span>Selecciona</span>;
};

const ValidationSchema = Yup.object().shape({
  // chatName: Yup.string().required('El nombre del chat es requerido'),
  // activityHours: Yup.string().required('El horario de actividad es requerido'),
  // chatbotDescription: Yup.string().required('La descripción del chatbot es requerida'),
  // welcomeMessage: Yup.string().required('El mensaje de bienvenida es requerido'),
  // responseTime: Yup.number().required('El tiempo de respuesta es requerido'),
  // typingAnimation: Yup.boolean(),
  // retrasoRespuesta: Yup.number().required('El retraso de respuesta es requerido'),
  // missionBot: Yup.string().required('La misión del bot es requerida'),
  // visionBot: Yup.string().required('La visión del bot es requerida'),
  // missionCompany: Yup.string().required('La misión de la empresa es requerida'),
  // visionCompany: Yup.string().required('La visión de la empresa es requerida'),
  // benefits: Yup.string().required('Los beneficios son requeridos'),
  // targetAudience: Yup.string().required('El público objetivo es requerido'),
  // gptEngine: Yup.string().required('El motor GPT es requerido'),
});

const TabCreateEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    rex_chatsbots,
    rex_mundo
  } = useSelector(({ home }: any) => home);


  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const initialValues = {
    chatName: '',
    activityHours: '',
    chatbotDescription: '',
    welcomeMessage: '',
    responseTime: '',
    typingAnimation: true,
    missionBot: '',
    visionBot: '',
    missionCompany: '',
    visionCompany: '',
    benefits: '',
    targetAudience: '',
    gptEngine: '1',
    retrasoRespuesta: 0,
    comportamiento: ` // Este es un comentario y la IA no lo leerá.
// Puede reemplazar el siguiente contenido con la información de su propia empresa o
// explorar el mercado en busca de una variedad de bots que incluyan indicaciones del sistema básico listas para usar.

// RECUERDE: cree sus indicaciones de manera iterativa (un cambio a la vez). Realice un cambio y luego pruébelo. Etc...

// Reemplace estos marcadores de posición con su propia información
Usted es un asistente útil para {INSERT_YOUR_COMPANY_NAME} y su nombre es {INSERT_AGENT_NAME}.

Su trabajo es responder las preguntas que le envían los clientes. Para ello, se le han dado instrucciones sobre cómo acceder a la base de conocimientos.

Si no tiene la respuesta a una pregunta y está en la base de conocimientos, infórmele al usuario que no tiene la respuesta a la pregunta. Puede decir algo como: "Hum, no estoy seguro".

Mantenga sus respuestas lo más concisas posible sin dejar de brindar la información requerida.

No interrumpa el carácter.

Evite responder preguntas que no sean relevantes para el negocio.

// Programación de citas basada en enlaces (elimine el comentario de la línea siguiente, si es necesario)
// Si un usuario desea programar una reunión o reservar una cita, envíelo a este enlace: {YOUR_CALENDLY_LINK}

// Los mensajes deben estar escritos en inglés y luego puede solicitarle al agente que los traduzca (si es necesario para su caso de uso)
// Este ejemplo maneja todos los idiomas
Hable con el usuario en el idioma en el que le habla.

// O puede ser más específico:
// Este mensaje está en inglés, pero quiero que interactúe con los usuarios en español`
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const info = () => {
    Modal.info({
      title: 'Horario de Actividad',
      content: (
        <div>
          Configurar las horas y días en que el chatbot estará activo
        </div>
      ),
      onOk() { },
    });
  };

  const infoDesc = () => {
    Modal.info({
      title: 'Descripción del Chatbot',
      content: (
        <div>
          Un campo para que los usuarios puedan describir brevemente el propósito y las funcionalidades del chatbot.
        </div>
      ),
      onOk() { },
    });
  };

  const handleSubmit = async (values: any, setSubmitting: any) => {
    try {
      console.log("activityHours");
      console.log(values);
      values.horarioActividad = "124";
      
      await dispatch(submitFormData(values));
      const response = await dispatch(sendFormDataToEndpoint(values));

      if (response) {
        notification.success({
          message: 'Éxito',
          description: 'Los datos se han enviado correctamente.',
          placement: 'topRight',
        });
        navigate('/home');
      } else {
        notification.error({
          message: 'Error',
          description: 'Lo sentimos no pudimos crear el bot correctamente.',
          placement: 'topRight',
        });
      }


    } catch (error) {
      console.error('Error al enviar los datos:', error);
      notification.error({
        message: 'Error',
        description: 'Hubo un problema al enviar los datos.',
        placement: 'topRight',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    {
      title: 'Primer Paso',
      content: (
        <div>
          <Row>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Nombre del Chat <QuestionCircleOutlined onClick={info} />
              </div>
              <Field name="chatName">
                {({ field }: any) => (
                  <Input {...field} />
                )}
              </Field>
              <ErrorMessage name="chatName" component="div" className="error" />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Horario de Actividad <QuestionCircleOutlined onClick={info} />
              </div>
              <TimePicker.RangePicker
                onChange={(e) => {
                  console.log(e);

                }}
              />
              {/* <Field name="activityHours">
                {({ field }: any) => (
                  <TimePicker.RangePicker {...field}/>
                )}
              </Field> */}
              <ErrorMessage name="activityHours" component="div" className="error" />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Descripción del Chatbot <QuestionCircleOutlined onClick={infoDesc} />
              </div>
              <Field name="chatbotDescription">
                {({ field }: any) => (
                  <Input.TextArea {...field} />
                )}
              </Field>
              <ErrorMessage name="chatbotDescription" component="div" className="error" />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Mensaje de Bienvenida <QuestionCircleOutlined />
              </div>
              <Field name="welcomeMessage">
                {({ field }: any) => (
                  <Input.TextArea {...field} />
                )}
              </Field>
              <ErrorMessage name="welcomeMessage" component="div" className="error" />
            </Col>
          </Row>
        </div>
      ),
    },
    // {
    //   title: 'Segundo Paso',
    //   content: (
    //     <div>
    //       <Row justify="center" gutter={[16, 16]}>
    //         <Col xl={12} md={12}>
    //           <div>¿Cuál es la misión del bot?</div>
    //           <Field name="missionBot">
    //             {({ field }: any) => (
    //               <Input.TextArea {...field} />
    //             )}
    //           </Field>
    //           <ErrorMessage name="missionBot" component="div" className="error" />
    //         </Col>
    //         <Col xl={12} md={12}>
    //           <div>¿Cuál es la visión del bot?</div>
    //           <Field name="visionBot">
    //             {({ field }: any) => (
    //               <Input.TextArea {...field} />
    //             )}
    //           </Field>
    //           <ErrorMessage name="visionBot" component="div" className="error" />
    //         </Col>
    //       </Row>

    //       <Row justify="center" gutter={[16, 16]}>
    //         <Col xl={12} md={12}>
    //           <div>¿Cuál es la misión de la empresa?</div>
    //           <Field name="missionCompany">
    //             {({ field }: any) => (
    //               <Input.TextArea {...field} />
    //             )}
    //           </Field>
    //           <ErrorMessage name="missionCompany" component="div" className="error" />
    //         </Col>
    //         <Col xl={12} md={12}>
    //           <div>¿Cuál es la visión de la empresa?</div>
    //           <Field name="visionCompany">
    //             {({ field }: any) => (
    //               <Input.TextArea {...field} />
    //             )}
    //           </Field>
    //           <ErrorMessage name="visionCompany" component="div" className="error" />
    //         </Col>
    //       </Row>

    //       <div>Indica los beneficios de tus servicios o productos</div>
    //       <Field name="benefits">
    //         {({ field }: any) => (
    //           <Input.TextArea {...field} />
    //         )}
    //       </Field>
    //       <ErrorMessage name="benefits" component="div" className="error" />

    //       <div>Describe a tu público objetivo</div>
    //       <Field name="targetAudience">
    //         {({ field }: any) => (
    //           <Input.TextArea {...field} />
    //         )}
    //       </Field>
    //       <ErrorMessage name="targetAudience" component="div" className="error" />

    //     </div>
    //   ),
    // },
    {
      title: 'Último Paso',
      content: (
        <div style={{ textAlign: 'left' }}>
          <Row gutter={[16, 16]}>
            <Col xl={24} md={24}>
              <h3>Configuración Inicial</h3>
            </Col>
            <Col xl={24} md={24}>
              <div>Aviso del sistema base (instrucciones personalizadas) *</div>
              <Field name="comportamiento">
                {({ field }: any) => (
                  <Input.TextArea
                    {...field}
                    autoSize={{ minRows: 10 }}
                  />
                )}
              </Field>

              <ErrorMessage name="gptEngine" component="div" className="error" />
            </Col>
          </Row>
        </div>
      ),
    }
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 16,
  };

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <Divider />
            <div style={{ marginTop: 24 }}>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Siguiente
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Anterior
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Card>

  );
};

export default TabCreateEdit;
