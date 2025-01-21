import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  ColorPicker,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import ChatComponent from '../../../../components/chat/ChatComponent';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { Field, Formik, FormikHelpers, Form, useFormikContext, FormikHandlers } from 'formik';
import { UploadChangeParam } from 'antd/es/upload';

import { AppDispatch, RootState } from '../../../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetOneDesingChatReducer, UpdateDesingChatReducer } from '../../../../redux/actions/chatBots/Chat/ChatDesing';
import { notification } from 'antd';
interface FormValues {
  fontSize: string;
  fontFamily: string;
  nombreChat: string;
  inputPlaceholder: string;
  logo: File | null;
  icono: File | null;
  iconoRuta: string;
  logoRuta: string;
  colorHeader: string;
  colorTitulo: string;
  colorEmisor: string;
  colorReceptor: string;
  estado: boolean;
  colorEstado: string;
  estadoHorario: boolean;
}
type LabelRender = SelectProps['labelRender'];
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const options = [
  { label: 'Disponible', value: true },
  { label: 'Deshabilitado', value: false },
];

const fontFamilies = [
  'Arial',
  'Roboto',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Georgia',
  'Palatino',
  'Garamond',
  'Bookman',
  'Comic Sans MS',
];
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const labelRender: LabelRender = ({ label, value }) => {
  return <span>{value ? 'Disponible' : 'Deshabilitado'}</span>;
};

const TabDesign: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [iconoPreview, setIconoPreview] = useState<string | null>(null);
  const { rex_design_chat, rex_design_status, rex_styles } = useSelector((state: RootState) => state.design);
  const dispatch: AppDispatch = useDispatch();
  const { Option } = Select;
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);

  const [initialValues, setInitialValues] = useState<FormValues>({
    fontSize: '',
    fontFamily: '',
    nombreChat: '',
    inputPlaceholder: '',
    logo: null,
    icono: null,
    iconoRuta: '',
    logoRuta: '',
    colorHeader: '#1677ff',
    colorTitulo: '#1677ff',
    colorEmisor: '#1677ff',
    colorReceptor: '#1677ff',
    estado: false,
    colorEstado: '#0BF732',
    estadoHorario: true
  });

  const handleFileChange = (
    info: UploadChangeParam<any>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    fieldName: keyof FormValues,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = info.fileList[0]?.originFileObj || null; // Obtiene la imagen seleccionada
    setFieldValue(fieldName, file); // Establece el archivo en Formik

    // Si hay una nueva imagen seleccionada, actualizamos el preview.
    if (file) {
      setPreview(URL.createObjectURL(file)); // Crea el URL de la imagen para el preview
    } else {
      setPreview(null); // Si se elimina la imagen, limpiamos el preview
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Subir</div>
    </button>
  );


  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setInitialValues(values);


    const response = await dispatch(UpdateDesingChatReducer(values, values.icono, values.logo))
    if (response) {
      notification.success({
        message: 'Éxito',
        description: 'El diseño se actualizo correctamnete',
        placement: 'topRight',
      });
      // navigate('/home');
    } else {
      notification.error({
        message: 'Error',
        description: 'Lo sentimos, no pudimos actualizar su Chatbot',
        placement: 'topRight',
      });
    }


    dispatch(UpdateDesingChatReducer(values, values.icono, values.logo))
    setSubmitting(false);
    resetForm();

  };
  useEffect(() => {
    dispatch(GetOneDesingChatReducer());
  }, [dispatch, rex_styles]);
  useEffect(() => {
    if (rex_design_chat) {
      setInitialValues({
        fontSize: rex_design_chat.tamanoLetra || '',
        fontFamily: rex_design_chat.fuente || '',
        nombreChat: rex_design_chat.nombre || '',
        inputPlaceholder: rex_design_chat.placeholder || '',
        logo: null,
        icono: null,
        iconoRuta: rex_design_chat.iconoEnvio || '',
        logoRuta: rex_design_chat.logo || '',
        colorHeader: rex_design_chat.colorCabecera || '#1677ff',
        colorTitulo: rex_design_chat.colorTitulo || '#1677ff',
        colorEmisor: rex_design_chat.colorTextoEmisor || '#1677ff',
        colorReceptor: rex_design_chat.colorTextoReceptor || '#1677ff',
        estado: rex_design_chat.estado || false,
        colorEstado: rex_design_chat.colorEstado || '#0BF732',
        estadoHorario: rex_design_chat.estadoHorario
      });
    }
  }, [rex_design_chat, rex_styles]);


  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    handleChange: FormikHandlers['handleChange'],
    setInitialValues: React.Dispatch<React.SetStateAction<FormValues>>
  ) => {
    const { name, value } = e.target;

    handleChange(e);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  const handleColorChange = (
    color: any,
    fieldName: keyof FormValues,
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
    setInitialValues: React.Dispatch<React.SetStateAction<FormValues>>
  ) => {
    const colorHex = color.toHexString();
    setFieldValue(fieldName, colorHex);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [fieldName]: colorHex
    }));
  };
  const handleSelectChange = (
    value: boolean,
    name: string,
    handleChange: FormikHandlers['handleChange'],
    setInitialValues: React.Dispatch<React.SetStateAction<FormValues>>
  ) => {
    // Crea un evento sintético para pasar a handleChange de Formik
    const syntheticEvent = { target: { name, value: value.toString() } } as unknown as ChangeEvent<HTMLInputElement>;

    handleChange(syntheticEvent);
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChangeFont = (
    name: string,
    value: string,
    handleChange: FormikHandlers['handleChange'],
    setInitialValues: React.Dispatch<React.SetStateAction<FormValues>>
  ) => {
    handleChange({ target: { name, value } });
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChangeSize = (
    name: string,
    value: string | number, // Acepta tanto cadenas como números
    handleChange: FormikHandlers['handleChange'],
    setInitialValues: React.Dispatch<React.SetStateAction<FormValues>>
  ) => {
    handleChange({ target: { name, value: String(value) } }); // Asegúrate de que sea una cadena
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: String(value), // Convierte a cadena antes de actualizar el estado
    }));
  };
  return (
    <>
      {
        rex_chat_selecccionado ? (
          <Card>
            <Row>
              {
                !rex_design_status ? (
                  <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                    {/* <Row>
                      <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                        <span>Selecciona un chat</span>
                        <Select
                          labelRender={labelRender}
                          defaultValue={ values.estado  }
                          style={{ width: '100%' }}
                          options={options}
                        />
                      </Col>

                    </Row> */}

                    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} >
                      {({ values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                          <Row>
                            <Col xl={24} md={24} style={{ paddingRight: '10px' }}>
                              <h3 style={{ lineHeight: '0.5' }}>Personaliza tu Chatbot</h3>
                            </Col>
                            {/* <Col xl={24} md={24} style={{ paddingLeft: '10px' }}>
                              <span>Selecciona el estado</span>
                              <Select
                                labelRender={labelRender}
                                defaultValue={values.estado ? true : false}
                                style={{ width: '100%' }}
                                options={options}
                                onChange={(value) => handleSelectChange(value, 'estado', handleChange, setInitialValues)}

                              />
                            </Col> */}

                          </Row>
                          <Row gutter={[16, 16]} >
                            <Col xxl={12} xl={12} md={12}>
                              <span>Tamaño de fuente</span>
                              <InputNumber
                                name="fontSize"
                                onBlur={handleBlur}
                                onChange={(value) => {
                                  handleInputChangeSize('fontSize', String(value), handleChange, setInitialValues);
                                }}
                                value={values.fontSize ? Number(values.fontSize) : 0} // Convierte la cadena a número para mostrar
                                style={{ width: '100%' }}
                                min={1}
                                parser={(value) => Math.floor(Number(value))} // Asegura que solo acepte enteros
                              />
                            </Col>

                            <Col xxl={12} xl={12} md={12}>
                              <span>Familia de fuentes</span>
                              <Select

                                onBlur={handleBlur}
                                onChange={(value) => {
                                  handleSelectChangeFont('fontFamily', value, handleChange, setInitialValues);
                                }}
                                value={values.fontFamily}
                                style={{ width: '100%' }}
                              >
                                {fontFamilies.map((font) => (
                                  <Option key={font} value={font}>
                                    {font}
                                  </Option>
                                ))}
                              </Select>
                            </Col>
                            <Col xxl={12} xl={24} md={12}>
                              <span>Nombre del chat</span>
                              <Input
                                name="nombreChat"
                                onBlur={handleBlur}
                                onChange={(e) => handleInputChange(e, handleChange, setInitialValues)}
                                value={values.nombreChat}
                              />
                            </Col>
                            <Col
                              xxl={12}
                              xl={24}
                              md={12}
                            >
                              <span>Texto de fondo de enviar mensaje</span>
                              <Input
                                name="inputPlaceholder"
                                onBlur={handleBlur}
                                onChange={(e) => handleInputChange(e, handleChange, setInitialValues)}
                                value={values.inputPlaceholder}
                              />
                            </Col>

                            <Col xxl={12} xl={10} md={12}>
                              <span>Logo del Chat</span>
                              <Upload
                                key={logoPreview} // Cambiar el key para forzar la actualización
                                name="logo"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => false} // Evita la subida automática
                                onChange={(info) => handleFileChange(info, setFieldValue, 'logo', setLogoPreview)}
                              >
                                {logoPreview ? (
                                  <img
                                    src={logoPreview}
                                    alt="Logo"
                                    style={{ width: '100%' }}
                                  />
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                            </Col>

                            <Col
                              xxl={12}
                              xl={14}
                              md={12}
                            >
                              <span>Icono de botón enviar mensaje</span>
                              <Upload
                                key={iconoPreview} // Cambiar el key para forzar la actualización
                                name="icono"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => false} // Evita la subida automática
                                onChange={(info) => handleFileChange(info, setFieldValue, 'icono', setIconoPreview)}
                              >
                                {iconoPreview ? (
                                  <img
                                    src={iconoPreview}
                                    alt="Icono"
                                    style={{ width: '100%' }}
                                  />
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                            </Col>

                            <Col xxl={8} xl={12} md={8}>
                              <div>
                                <span style={{ marginBottom: '-15px' }}>Fondo del encabezado</span>
                                <br />
                                <ColorPicker
                                  defaultValue={values.colorHeader}
                                  size="small"
                                  showText
                                  onChange={(color) => handleColorChange(color, 'colorHeader', setFieldValue, setInitialValues)}
                                />
                              </div>
                            </Col>

                            <Col xxl={8} xl={12} md={8}>
                              <div>
                                <span style={{ marginBottom: '-15px' }}>Color del nombre del chat</span>
                                <br />
                                <ColorPicker
                                  defaultValue={values.colorTitulo}
                                  size="small"
                                  showText
                                  onChange={(color) => handleColorChange(color, 'colorTitulo', setFieldValue, setInitialValues)}
                                />
                              </div>
                            </Col>

                            <Col xxl={8} xl={12} md={8}>
                              <div>
                                <span style={{ marginBottom: '-15px' }}>Color del texto del Emisor</span>
                                <br />
                                <ColorPicker
                                  defaultValue={values.colorEmisor}
                                  size="small"
                                  showText
                                  onChange={(color) => handleColorChange(color, 'colorEmisor', setFieldValue, setInitialValues)}
                                />
                              </div>
                            </Col>

                            <Col xxl={8} xl={12} md={8}>
                              <div>
                                <span style={{ marginBottom: '-15px' }}>Color del texto del Receptor</span>
                                <br />
                                <ColorPicker
                                  defaultValue={values.colorReceptor}
                                  size="small"
                                  showText
                                  onChange={(color) => handleColorChange(color, 'colorReceptor', setFieldValue, setInitialValues)}
                                />
                              </div>
                            </Col>
                            <Col xxl={8} xl={12} md={8}>
                              <div>
                                <span style={{ marginBottom: '-15px' }}>Color del Texto del Estado</span>
                                <br />
                                <ColorPicker
                                  defaultValue={values.colorEstado}
                                  size="small"
                                  showText
                                  onChange={(color) => handleColorChange(color, 'colorEstado', setFieldValue, setInitialValues)}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                            Guardar Configuración
                          </Button>
                        </Form>
                      )}
                    </Formik>

                  </Col>
                ) :
                  (
                    <p>cargando ...</p>
                  )
              }
              {/* <p>{initialValues.iconoRuta} XXXXXX</p> */}
              <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                <ChatComponent
                  editBubble={false}
                  modeBot={true}
                  fontSize={initialValues.fontSize}
                  fontFamily={initialValues.fontFamily}
                  nombreChat={initialValues.nombreChat}
                  inputPlaceholder={initialValues.inputPlaceholder}
                  iconoEnviarChat={initialValues.iconoRuta}
                  logoChat={initialValues.logoRuta}
                  estadoChat={initialValues.estado}
                  iconoPreview={iconoPreview}
                  logoPreview={logoPreview}
                  resetChat={false}
                  coloresStyle={
                    {
                      colorCabecera: initialValues.colorHeader,
                      colorTextoEmisor: initialValues.colorEmisor,
                      colorTextoReceptor: initialValues.colorReceptor,
                      colorTitulo: initialValues.colorTitulo,
                      colorEstado: initialValues.colorEstado
                    }
                  }
                  estadoHorario={initialValues.estadoHorario}
                />

              </Col>
            </Row>
          </Card>
        ) : (
          <NoAccess />
        )
      }
    </>
  );
};

export default TabDesign;
