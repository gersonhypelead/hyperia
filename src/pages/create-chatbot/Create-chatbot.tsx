import React, { useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Steps,
  theme,
  Modal,
  Card,
  TimePicker,
  Skeleton,
} from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { submitFormData, sendFormDataToEndpoint } from '../../redux/actions/home/homeActions';
import { notification } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

type LabelRender = SelectProps['labelRender'];

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

const CreateChatBot: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    rex_chatsbots,
    rex_chatbot_seleccionado
  } = useSelector(({ home }: any) => home);


  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const initialActivityHours = () => {
    const defaultSchedule = '00:00 - 23:59';
    const [start, end] = defaultSchedule.split(' - ');

    return [dayjs(start, 'HH:mm'), dayjs(end, 'HH:mm')];
  };

  const comportamientotext = `Aviso del sistema base (instrucciones personalizadas) *
  
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

  const [initialValues, setInitialValues] = useState<any>(
    {
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
      mondayHours: initialActivityHours(),
      tuesdayHours: initialActivityHours(),
      wednesdayHours: initialActivityHours(),
      thursdayHours: initialActivityHours(),
      fridayHours: initialActivityHours(),
      saturdayHours: initialActivityHours(),
      sundayHours: initialActivityHours(),
      comportamiento: rex_chatbot_seleccionado?.comportamiento || comportamientotext,
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
      const formatHours = (hours: any) => {
        if (hours && hours.length === 2) {
          const [start, end] = hours;
          const formattedStart = dayjs(start).format('HH:mm');
          const formattedEnd = dayjs(end).format('HH:mm');
          return `${formattedStart} - ${formattedEnd}`;
        }
        return '';
      };

      const formattedMondayHours = formatHours(values.mondayHours);
      const formattedTuesdayHours = formatHours(values.tuesdayHours);
      const formattedWednesdayHours = formatHours(values.wednesdayHours);
      const formattedThursdayHours = formatHours(values.thursdayHours);
      const formattedFridayHours = formatHours(values.fridayHours);
      const formattedSaturdayHours = formatHours(values.saturdayHours);
      const formattedSundayHours = formatHours(values.sundayHours);

      const formData = {
        ...values,
        mondayHours: formattedMondayHours,
        tuesdayHours: formattedTuesdayHours,
        wednesdayHours: formattedWednesdayHours,
        thursdayHours: formattedThursdayHours,
        fridayHours: formattedFridayHours,
        saturdayHours: formattedSaturdayHours,
        sundayHours: formattedSundayHours

      };


      // Enviar los datos
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
          description: 'Lo sentimos, no pudimos crear el bot correctamente.',
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



  const handleTimeChange = (values: any, setFieldValue: any, day: string) => {
    if (values && values.length === 2) {
      const [start, end] = values;
      // Solo se pasan los objetos dayjs sin formatear
      setFieldValue(`${day}Hours`, [start, end]);
    } else {
      setFieldValue(`${day}Hours`, []);
    }
  };


  const steps = [
    {
      title: 'Primer Paso',
      content: (
        <div>
          <Row
            gutter={[16, 16]}
          >
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <b>Nombre del Chat <QuestionCircleOutlined onClick={info} /></b>
              </div>
              <Field name="chatName">
                {({ field }: any) => <Input {...field} />}
              </Field>
              <ErrorMessage name="chatName" component="div" className="error" />
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <b>Día y Horario de Actividad <QuestionCircleOutlined onClick={info} /></b>
              </div>
              <Row gutter={8}>
                {[
                  { day: 'Lunes', value: 'monday' },
                  { day: 'Martes', value: 'tuesday' },
                  { day: 'Miércoles', value: 'wednesday' },
                  { day: 'Jueves', value: 'thursday' },
                  { day: 'Viernes', value: 'friday' },
                  { day: 'Sábado', value: 'saturday' },
                  { day: 'Domingo', value: 'sunday' },
                ].map(({ day, value }) => (
                  <React.Fragment key={value}>
                    <Col span={12}>
                      <div>{day}</div>
                    </Col>
                    <Col span={12}>
                      <Field name={`${value}Hours`}>
                        {({ field, form }: any) => {

                          return (
                            <TimePicker.RangePicker
                              value={field.value}
                              format="HH:mm"
                              onChange={(values) => {
                                console.log('TimePicker onChange values:', values);
                                handleTimeChange(values, form.setFieldValue, value);
                              }}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage name={`${value}Hours`} component="div" className="error" />
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <b>
                  Descripción del Chatbot{' '}
                  <QuestionCircleOutlined onClick={infoDesc} />
                </b>
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
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}></Col>
            <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <b>
                  Mensaje de Bienvenida{' '}
                  <QuestionCircleOutlined onClick={infoBien} />
                </b>
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
        {({ isSubmitting }) => (
          <Form>
            <Row style={{ marginBottom: '35px' }}>
              <Col xxl={12} xl={12} md={12}>
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

export default CreateChatBot;
