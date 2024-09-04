import React, { useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Steps,
  theme,
  Modal,
  Card,
  Switch,
  TimePicker,
  Skeleton,
} from 'antd';
import {
  QuestionCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import type { SelectProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetDataChatsBotsHomeReducer,
  SelectBotReducer,
  UpdateVarMundoReducer,
} from '../../../../redux/actions/home/Home';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import {
  submitFormData,
  sendFormDataToEndpoint,
} from '../../../../redux/actions/home/homeActions';
import { notification } from 'antd';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { GetConversationReducer, ResetBotSelectedReducer, ResetConversationReducer } from '../../../../redux/actions/chatBots/Chat/Chat';

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
    rex_chatbot_seleccionado
  } = useSelector(({ home }: any) => home);

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [activityHours, setActivityHours] = useState<string>('');
  const [initialValues, setInitialValues] = useState<any>(
    {
      chatName: rex_chatbot_seleccionado?.nombre,
      activityHours: rex_chatbot_seleccionado?.horarioActividad,
      chatbotDescription: rex_chatbot_seleccionado?.descripcion,
      welcomeMessage: rex_chatbot_seleccionado?.mensajeInicial,
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
      comportamiento: rex_chatbot_seleccionado?.comportamiento || `Aviso del sistema base (instrucciones personalizadas) *
  
  // Este es un comentario interno y la Inteligencia Artificial que alimenta los Chatbots no la tendrá en cuenta.
  
  // Puedes reemplazar el siguiente contenido con la información de tu propio negocio, empresa o proyecto.
  
  // Te recomendamos explorar el mercado e investigar a tus competidores para encontrar Chatbots que incluyan indicaciones que te sirvan de referencia para crear el tuyo propio.
  
  // RECUERDA: crea tus indicaciones de manera individual, es decir, un cambio cada vez. Realiza el cambio que necesites, pruébalo y si toda funciona como quieres, aplica un nuevo cambio.
  
  // Sustituye la información entre 0 con tu propia información:
  
  Eres es un Chatbot para (INTRODUCE_ NOMBRE_NEGOCIO) y tu nombre es (INTRODUCE NOMBRE CHATBOT) .
  
  Tu trabajo es responder las preguntas que envían los clientes. Para ello, se te han dado instrucciones sobre cómo acceder a la base de conocimientos.
  
  Si no tienes la respuesta a una pregunta y está en la base de conocimientos, comunica al usuario que no tienes respuesta a su pregunta. Puedes decir algo como: "Hum, no estoy seguro".
  
  Mantén tus respuestas lo más concisas posibles sin dejar de facilitar la información solicitada.
  
  No interrumpas el carácter.
  
  Evita responder preguntas que no sean relevantes para el negocio.
  
  // Programación de citas basada en enlaces (elimina el comentario de la línea siguiente si es necesario).
  
  // Si un usuario desea programar una reunión o reservar una cita, envíalo a este enlace: (YOUR_CALENDLY LINK)
  
  // Los mensajes deben estar escritos en inglés y luego puede solicitarle al Chatbot que los traduzca (si es necesario para tu caso de uso).
  
  // Este ejemplo maneja todos los idiomas:`,
    }
  );
  const [showForm, setShowForm] = useState(true);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const info = () => {
    Modal.info({
      title: 'Nombre del Chatbox',
      content: (
        <div>
          Asigna un nombre al chatbox que te permita identificarlo con
          facilidad.
        </div>
      ),
      onOk() { },
    });
  };

  const infoHora = () => {
    Modal.info({
      title: 'Horario de Actividad',
      content: <div>Configurar las horas de actividad del chatbox.</div>,
      onOk() { },
    });
  };

  const infoDesc = () => {
    Modal.info({
      title: 'Descripción del Chatbot',
      content: (
        <div>Describe brevemente el objetivo y las funciones del chatbox.</div>
      ),
      onOk() { },
    });
  };

  const infoBien = () => {
    Modal.info({
      title: 'Mensaje de Bienvenida',
      content: (
        <div>
          Escribe el mensaje que recibirán los usuarios al interactuar con el
          chatbox por primera vez.
        </div>
      ),
      onOk() { },
    });
  };

  const handleSubmit = async (values: any, setSubmitting: any, resetForm: any) => {
    try {
      const formData = { ...values, activityHours };
      await dispatch(submitFormData(formData));
      const response = await dispatch(sendFormDataToEndpoint(formData));

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

  const handleTimeChange = (values: any) => {
    if (values && values.length === 2) {
      const [start, end] = values;
      const formattedStart = start.format('HH:mm:ss');
      const formattedEnd = end.format('HH:mm:ss');
      setActivityHours(`${formattedStart} - ${formattedEnd}`);

    } else {
      setActivityHours('');
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
                {({ field }: any) => <Input {...field} />}
              </Field>
              <ErrorMessage name="chatName" component="div" className="error" />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Horario de Actividad{' '}
                <QuestionCircleOutlined onClick={infoHora} />
              </div>
              <TimePicker.RangePicker onChange={handleTimeChange} format="HH:mm:ss" />
              <ErrorMessage name="activityHours" component="div" className="error" />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Descripción del Chatbot{' '}
                <QuestionCircleOutlined onClick={infoDesc} />
              </div>
              <Field name="chatbotDescription">
                {({ field }: any) => <Input.TextArea {...field} />}
              </Field>
              <ErrorMessage
                name="chatbotDescription"
                component="div"
                className="error"
              />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                Mensaje de Bienvenida{' '}
                <QuestionCircleOutlined onClick={infoBien} />
              </div>
              <Field name="welcomeMessage">
                {({ field }: any) => <Input.TextArea {...field} />}
              </Field>
              <ErrorMessage
                name="welcomeMessage"
                component="div"
                className="error"
              />
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
                  <Input.TextArea {...field} autoSize={{ minRows: 10 }} />
                )}
              </Field>

              <ErrorMessage
                name="gptEngine"
                component="div"
                className="error"
              />
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 16,
  };

  const options = rex_chatsbots?.map((chatbot: any) => ({
    label: chatbot.nombre,
    value: chatbot.nombre
  }));

  const GetConversation = async () => {
    await dispatch(GetConversationReducer());
  }

  return (
    <Card>
      {/* <ExternalResetButton /> */}
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmit(values, setSubmitting, resetForm)
        }
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Row style={{ marginBottom: '35px' }}>
              <Col xxl={12} xl={12} md={12}>
                {
                  showForm ? (
                    <Select
                      labelRender={labelRender}
                      // defaultValue={options?.length > 0 ? options[0].value : ""} // Asegúrate de que haya una opción predeterminada
                      defaultValue={
                        options?.length > 0
                          ? localStorage.getItem('chat_seleccionado')
                            ? rex_chatsbots.find((option: any) => option.id == localStorage.getItem('chat_seleccionado')).nombre
                            : ""
                          : ""
                      } // Asegúrate de que haya una opción predeterminada
                      style={{ width: '200px' }}
                      options={options}
                      onChange={(value) => {
                        rex_chatsbots.map((chatbot: any, index: number) => {
                          if (chatbot.nombre === value) {
                            setShowForm(false)
                            setTimeout(() => setShowForm(true), 1000)
                            resetForm({
                              values: {
                                chatName: chatbot.nombre,
                                activityHours: chatbot?.horarioActividad,
                                chatbotDescription: chatbot?.descripcion,
                                welcomeMessage: chatbot?.mensajeInicial,
                                comportamiento: chatbot?.comportamiento
                              }
                            })
                            localStorage.setItem("chat_seleccionado", chatbot.id)
                            dispatch(SelectBotReducer(index, !chatbot.select))
                            if (chatbot.conversacionId) {
                              localStorage.setItem("TAB_CHAT_CONVERSACION_ID", chatbot.conversacionId);
                              GetConversation()
                            } else {
                              localStorage.removeItem("TAB_CHAT_CONVERSACION_ID");
                              dispatch(ResetConversationReducer());
                            }
                          }
                        });
                      }}
                    />
                  ) : null
                }
              </Col>
              <Col
                xxl={12} xl={12} md={12}
                style={{
                  display: "flex",
                  justifyContent: "right"
                }}
              >
                {
                  rex_chatbot_seleccionado ? (
                    <Button
                      type="primary" icon={<PlusOutlined />}
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={() => {
                        setShowForm(false)
                        dispatch(ResetBotSelectedReducer());
                        setTimeout(() => setShowForm(true), 1000)
                        resetForm({
                          values: {
                            chatName: '',
                            comportamiento: `Aviso del sistema base (instrucciones personalizadas) *
  
  // Este es un comentario interno y la Inteligencia Artificial que alimenta los Chatbots no la tendrá en cuenta.
  
  // Puedes reemplazar el siguiente contenido con la información de tu propio negocio, empresa o proyecto.
  
  // Te recomendamos explorar el mercado e investigar a tus competidores para encontrar Chatbots que incluyan indicaciones que te sirvan de referencia para crear el tuyo propio.
  
  // RECUERDA: crea tus indicaciones de manera individual, es decir, un cambio cada vez. Realiza el cambio que necesites, pruébalo y si toda funciona como quieres, aplica un nuevo cambio.
  
  // Sustituye la información entre 0 con tu propia información:
  
  Eres es un Chatbot para (INTRODUCE_ NOMBRE_NEGOCIO) y tu nombre es (INTRODUCE NOMBRE CHATBOT) .
  
  Tu trabajo es responder las preguntas que envían los clientes. Para ello, se te han dado instrucciones sobre cómo acceder a la base de conocimientos.
  
  Si no tienes la respuesta a una pregunta y está en la base de conocimientos, comunica al usuario que no tienes respuesta a su pregunta. Puedes decir algo como: "Hum, no estoy seguro".
  
  Mantén tus respuestas lo más concisas posibles sin dejar de facilitar la información solicitada.
  
  No interrumpas el carácter.
  
  Evita responder preguntas que no sean relevantes para el negocio.
  
  // Programación de citas basada en enlaces (elimina el comentario de la línea siguiente si es necesario).
  
  // Si un usuario desea programar una reunión o reservar una cita, envíalo a este enlace: (YOUR_CALENDLY LINK)
  
  // Los mensajes deben estar escritos en inglés y luego puede solicitarle al Chatbot que los traduzca (si es necesario para tu caso de uso).
  
  // Este ejemplo maneja todos los idiomas:`
                          }
                        });

                      }}
                    >
                      Crear un nuevo chatbot
                    </Button>
                  ) : null
                }
              </Col>
            </Row>
            {
              showForm ? (
                <>
                  <Steps current={current} items={items} />
                  <div style={contentStyle}>{steps[current].content}</div>
                </>
              ) : <Skeleton active />
            }
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
    </Card >
  );
};

// const ExternalResetButton = () => {
//   const { resetForm } = useFormikContext();

//   return (
//     <button type="button" onClick={resetForm}>
//       Reset Form
//     </button>
//   );
// };

export default TabCreateEdit;
