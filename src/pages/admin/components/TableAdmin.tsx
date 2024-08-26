import React, { useState } from 'react';
import { Progress, Tooltip, Modal } from 'antd';
import TableOne from '../../../components/table/TableOne';
import {
  RobotOutlined,
  SettingOutlined,
  CommentOutlined
} from '@ant-design/icons';
import ChatComponent from '../../../components/chat/ChatComponent';
const TableAdmin: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      align: 'center',
      render: (_: any, record: any, index: number) => (
        <div>
          {index + 1}
        </div>
      )
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          {record.usuario}
        </div>
      )
    },
    {
      title: 'Nombre del Chatbot',
      dataIndex: 'chatbot',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          {record.chatbot}
        </div>
      )
    },
    {
      title: '% de aceptación',
      dataIndex: 'porcentaje_aceptacion',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          <Progress percent={record.porcentaje_aceptacion} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        </div>
      )
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      align: 'center',
      width: '200px',
      render: (_: any, record: any) => (
        <div
          className='Table-Contain-Text-Global'
          style={{
            cursor: 'pointer'
          }}
          onClick={info}
        >
          <div
            style={{
              overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', width: '250px'
            }}
            title={record.descripcion}
          >
            {record.descripcion}
          </div>
        </div>
      )
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          <Tooltip title={'Chat'}>
            <RobotOutlined
              style={{ fontSize: '18px', marginRight: '10px', cursor: 'pointer' }}
              onClick={showModal}
            />
          </Tooltip>
          <Tooltip title={'Configuración'} placement="bottom">
            <SettingOutlined style={{ fontSize: '18px', marginRight: '10px', cursor: 'pointer' }} />
          </Tooltip>
          <Tooltip title={'Duplicar'}>
            <CommentOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
          </Tooltip>
        </div>
      )
    },
  ];

  const data = [
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '90',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '90',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "20/07/204 14:24pm"
    },
    {
      usuario: 'Mauricio Lopez',
      chatbot: 'InfoBot',
      porcentaje_aceptacion: '83',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "17/07/204 09:49 am"
    },
    {
      usuario: 'Hernando Rodriguez',
      chatbot: 'SofiBot',
      porcentaje_aceptacion: '98',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "10/07/204 23:10 pm"
    },
    {
      usuario: 'Jose Sanchez',
      chatbot: 'FactuBot',
      porcentaje_aceptacion: '70',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "02/07/204 17:41 pm"
    },
    {
      usuario: 'Paul Guitierrez',
      chatbot: 'PsiquiBot',
      porcentaje_aceptacion: '75',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "22/07/204 07:39 am"
    },
    {
      usuario: 'Pedro Escalante',
      chatbot: 'EcommerceBot',
      porcentaje_aceptacion: '88',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "11/07/204 10:05 am"
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'NaviBot',
      porcentaje_aceptacion: '92',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "19/07/204 22:41 pm"
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '82',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "12/07/204 08:24 am"
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '79',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "05/07/204 18:55pm"
    },
  ]

  const info = () => {
    Modal.info({
      title: 'Descripción',
      content: (
        <div>
          Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.
        </div>
      ),
      onOk() { },
    });
  };

  return (
    <>
      <TableOne
        data={data}
        columns={columns}
        loading_data={false}
        showTrash={true}
        showDownload={true}
        functionDelete={(values, resetValues) => {
          // deleteUser(values, resetValues)
        }}
        pageTableGlobal={10}
        pageSizeTableGlobal={50}
        setPageTableGlobal={() => { }}
        setPageSizeTableGlobal={() => { }}
        actionOnRow={() => { }}
      />

      <Modal
        title="ChatBot en vivo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      >
        <ChatComponent />
      </Modal>
    </>
  );
};

export default TableAdmin;
