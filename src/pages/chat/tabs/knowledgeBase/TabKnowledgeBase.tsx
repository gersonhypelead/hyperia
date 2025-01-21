import React, { useEffect, useState } from 'react';
import { Tabs, Card, Input, Button, Typography, Space, Upload, Row, Checkbox, message } from 'antd';
import { InfoCircleFilled, DownOutlined, UploadOutlined } from '@ant-design/icons';
import { submitFormDataEntrenamiento, UploadTrainingData } from '../../../../redux/actions/chatBots/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store/store';
import { RcFile } from 'antd/es/upload';
import { updateChatbotBehavior } from '../../../../redux/actions/home/homeActions';
import ModalText from './ModalText'


const { TabPane } = Tabs;
const { Title, Text } = Typography;

const TabKnowledgeBase: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  
  const [file, setFile] = useState<File | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [textInput, setTextInput] = useState(
    'Eres un vendedor de componentes de computo, mouse, teclado, cable de red, parlantes, etc.'
  );
  const [visibleModal, setVisibleModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [modalText, setModalText] = useState(textInput); // Estado para controlar el texto dentro del modal


  const {
    rex_chatbot_seleccionado
  } = useSelector(({ home }: any) => home);

  useEffect(() => {
    if (rex_chatbot_seleccionado) {
      setTextInput(rex_chatbot_seleccionado.comportamiento || '');
    }
  }, [rex_chatbot_seleccionado]);

 
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };


  const handleInputClick = () => {
    setModalText(textInput); // Asegura que el modal se cargue con el texto actual
    setVisibleModal(true); // Muestra el modal
  };

  const handleModalConfirm = () => {
    setTextInput(modalText); // Al confirmar, actualizamos el valor de textInput
    setVisibleModal(false); // Cerrar el modal
  };

  const handleModalCancel = () => {
    setVisibleModal(false); // Solo cierra el modal sin hacer cambios
  };
  
  const handleModalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalText(e.target.value); // Actualiza el texto mientras el usuario escribe en el modal
    setTextInput(e.target.value); // También actualiza el texto en el Input principal
  };

  const handleFileChange = (info: any) => {
    const { file } = info;
    if (file.status === 'removed') {
      setFile(null);
    } else {
      setFile(file);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isCSV = file.type === 'text/csv';
    if (!isCSV) {
      console.error('Solo se permiten archivos CSV');
    }
    return false;
  };

  const handleCheckboxChange = (e: any) => {
    setOverwrite(e.target.checked);
  };

  const handleSubmit = async () => {
    if (!file) {
      message.error('Por favor, seleccione un archivo CSV antes de subir.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('sobrescribir', overwrite.toString());
      formData.append('archivo', file);


      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      

      const data = await dispatch(submitFormDataEntrenamiento(formData));
      const response = await dispatch(UploadTrainingData(formData));

      if (response) {
        message.success('Archivo subido exitosamente');
      } else {
        message.error('Error al subir el archivo');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      message.error('Ocurrió un error al subir el archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetrainChatbot = async () => {
    if (!rex_chatbot_seleccionado || !rex_chatbot_seleccionado.id) {
      message.error('No hay chatbot seleccionado para actualizar.');
      return;
    }

    const success = await dispatch(updateChatbotBehavior(textInput, rex_chatbot_seleccionado.id));

    if (success) {
      message.success('El comportamiento del chatbot ha sido actualizado.');
    } else {
      message.error('Error al actualizar el comportamiento del chatbot.');
    }
  };

  const handleDownloadExampleCSV = () => {
    const fileUrl = '/uploads/Lista.xlsx';  // Ruta correcta al archivo
  
    // Crear un enlace de descarga y hacer click en él programáticamente
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Lista.xlsx';  // Nombre del archivo descargado
    link.click();
  };
  

  const totalCharacters = textInput.length;

  return (
    <Card>
      <Title style={{ marginTop: '-5px' }} level={4}>Base de Conocimientos (Fuentes de Datos)</Title>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Texto" key="1" >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Space size="middle">
              <Title level={5} style={{ color: '#aaa', marginTop: '-5px', marginBottom: '-10px' }}>
                Datos de Texto <InfoCircleFilled style={{ color: '#aaa' }} />
              </Title>
            </Space>
            <Input.TextArea
              value={textInput}
              onChange={handleInputClick}
              rows={15}
              style={{ fontSize: '16px', color: 'black', marginTop: '-20px' }} // Color gris para el texto
            />
            <Space size="middle" align="center">
              <Text style={{ color: '#aaa' }}>
                Numero total de caracteres (todas las fuentes de datos): {totalCharacters}
              </Text>
            </Space>
            <Button
              type="primary"
              style={{ borderRadius: '6px', backgroundColor: '#1a81d7', borderColor: '#1a81d7', height: '40px' }}
              onClick={handleRetrainChatbot} 
            >
              Re-entrenar Chatbot
            </Button>
          </Space>
        </TabPane>
        <TabPane tab="Preguntas/Respuestas" key="2">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Card style={{ borderColor: '#d9d9d9', borderRadius: 0 }}>
              <Title level={5} style={{ color: '#aaa', marginTop: '-10px' }}>
                Upload Q/A CSV File <InfoCircleFilled style={{ color: '#aaa' }} />
              </Title>
              <Row style={{ backgroundColor: '#fff', border: 'none', borderRadius: 4 }}>
                <Upload // Usar `customRequest` para manejar la carga del archivo
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                  accept=".csv"

                >
                  <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                </Upload>
              </Row>
              <Checkbox
                style={{ marginTop: '16px' }}
                onChange={handleCheckboxChange}
                checked={overwrite}
              >Sobrescribir Datos</Checkbox>
              <Space size="middle" style={{ width: '100%', marginTop: '16px', justifyContent: 'space-between' }}>
                <Button
                  onClick={handleSubmit}
                  loading={isUploading}
                  type="primary" style={{ backgroundColor: '#1a81d7', borderColor: '#1a81d7' }}>
                  Upload
                </Button>
                <Button type="link" style={{ color: '#1890ff' }} onClick={handleDownloadExampleCSV}>
                  Download Example CSV
                </Button>
              </Space>
            </Card>
          </Space>
          
        </TabPane>
      </Tabs>
      <ModalText
        visible={visibleModal}
        onClose={handleModalCancel}
        textInput={modalText}
        onChange={handleModalChange}
      />
    </Card>
  );
};

export default TabKnowledgeBase;
