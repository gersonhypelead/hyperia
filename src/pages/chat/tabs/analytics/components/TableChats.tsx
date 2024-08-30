import React from 'react';
import TableOne from '../../../../../components/table/TableOne';
import { Progress } from 'antd';

const TableChats: React.FC = () => {

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
      title: '# de mensajes de entrada',
      dataIndex: 'numero_entrada',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          {record.numero_entrada}
        </div>
      )
    },
    {
      title: '% de mensajes de entrada',
      dataIndex: 'porcentaje_entrada',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          <Progress percent={record.porcentaje_entrada} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        </div>
      )
    },
    {
      title: '# de mensajes de salida',
      dataIndex: 'numero_salida',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          {record.numero_salida}
        </div>
      )
    },
    {
      title: '% de mensajes de salida',
      dataIndex: 'porcentaje_salida',
      align: 'center',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          <Progress percent={record.porcentaje_salida} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        </div>
      )
    }
  ];

  const data = [
    {
      chatbot: 'VentasBot',
      porcentaje_aceptacion: '90',
      numero_entrada: '1,872',
      porcentaje_entrada: '40',
      numero_salida: '2,152',
      porcentaje_salida: '60'
    },
    {
      chatbot: 'MarketBot',
      porcentaje_aceptacion: '90',
      numero_entrada: '1,872',
      porcentaje_entrada: '40',
      numero_salida: '2,152',
      porcentaje_salida: '60'
    },
    {
      chatbot: 'UlisesBot',
      porcentaje_aceptacion: '90',
      numero_entrada: '1,872',
      porcentaje_entrada: '40',
      numero_salida: '2,152',
      porcentaje_salida: '60'
    },
    {
      chatbot: 'Prueba',
      porcentaje_aceptacion: '90',
      numero_entrada: '1,872',
      porcentaje_entrada: '40',
      numero_salida: '2,152',
      porcentaje_salida: '60'
    },
    {
      chatbot: 'Psiquibot',
      porcentaje_aceptacion: '90',
      numero_entrada: '1,872',
      porcentaje_entrada: '40',
      numero_salida: '2,152',
      porcentaje_salida: '60'
    },
    {
      chatbot: 'MotherBot',
      porcentaje_aceptacion: '90',
      numero_entrada: '1,872',
      porcentaje_entrada: '40',
      numero_salida: '2,152',
      porcentaje_salida: '60'
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

export default TableChats;
