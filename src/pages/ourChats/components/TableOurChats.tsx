import React from 'react';
import { Avatar, Progress, Tooltip } from 'antd';
import TableOne from '../../../components/table/TableOne';
import {
  RobotOutlined,
  SettingOutlined,
  CommentOutlined
} from '@ant-design/icons';
import Bot01 from '../../../assets/img/bots/bo01.webp';
import Bot02 from '../../../assets/img/bots/bot02.webp';
import Bot03 from '../../../assets/img/bots/bot03.webp';
import Bot04 from '../../../assets/img/bots/bot04.webp';
import Bot05 from '../../../assets/img/bots/bot05.webp';
import Bot06 from '../../../assets/img/bots/bot06.webp';
import Bot07 from '../../../assets/img/bots/bot07.webp';

const TableOurChats: React.FC = () => {

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
      title: 'Chatbot',
      dataIndex: 'chatbot',
      align: 'left',
      render: (_: any, record: any) => (
        <div 
          className='Table-Contain-Text-Global'
          
        >
          {/* <img
            src={record.bot}
            style={{
              width: '30px',
              borderRadius: '100%',
              border: '1px solid #c4c4c4'
            }}
          /> */}
          <Avatar 
            src={record.bot} 
            style={{
              marginRight: '10px'
            }}
          />
          {record.chatbot}
        </div>
      )
    },
    {
      title: 'Creador',
      dataIndex: 'usuario',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          {record.usuario}
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
            // overflow: 'hidden', textOverflow: 'ellipsis',
            // whiteSpace: 'nowrap', background: 'red', width: '250px'
          }}
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
      title: 'Fec. Creación',
      dataIndex: 'fec_creacion',
      align: 'center',
      width: '200px',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          {record.fec_creacion}
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
      fec_creacion: "20/07/204 14:24pm",
      bot: Bot01
    },
    {
      usuario: 'Mauricio Lopez',
      chatbot: 'InfoBot',
      porcentaje_aceptacion: '83',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "17/07/204 09:49 am",
      bot: Bot02
    },
    {
      usuario: 'Hernando Rodriguez',
      chatbot: 'SofiBot',
      porcentaje_aceptacion: '98',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "10/07/204 23:10 pm",
      bot: Bot03
    },
    {
      usuario: 'Jose Sanchez',
      chatbot: 'FactuBot',
      porcentaje_aceptacion: '70',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "02/07/204 17:41 pm",
      bot: Bot04
    },
    {
      usuario: 'Paul Guitierrez',
      chatbot: 'PsiquiBot',
      porcentaje_aceptacion: '75',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "22/07/204 07:39 am",
      bot: Bot05
    },
    {
      usuario: 'Pedro Escalante',
      chatbot: 'EcommerceBot',
      porcentaje_aceptacion: '88',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "11/07/204 10:05 am",
      bot: Bot06
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'NaviBot',
      porcentaje_aceptacion: '92',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "19/07/204 22:41 pm",
      bot: Bot07
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '82',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "12/07/204 08:24 am",
      bot: Bot02
    },
    {
      usuario: 'Rodolfo Rodriguez',
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '79',
      descripcion: "Un chatbot que recomienda instrumentos musicales está diseñado para ayudar a los usuarios a encontrar el instrumento perfecto basado en sus preferencias y necesidades. El chatbot interactúa con los usuarios mediante preguntas sobre sus gustos musicales, nivel de experiencia, presupuesto, y otros factores relevantes. Luego, utiliza esta información para ofrecer recomendaciones personalizadas de instrumentos musicales, incluyendo detalles sobre las características, ventajas, y dónde pueden comprarlos. Este tipo de chatbot facilita la búsqueda de instrumentos musicales adecuados y proporciona asesoramiento experto de manera rápida y accesible.",
      fec_creacion: "05/07/204 18:55pm",
      bot: Bot03
    },
  ]

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
    </>
  );
};

export default TableOurChats;
