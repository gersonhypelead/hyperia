import { Button, Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/table/TableComponent'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { 
  FetchAnalyticsReducer, 
  FetchGeneralAnalyticsReducer, 
  setUsuariosSort 
} from '../../redux/actions/analytics/analytics';

const Analytics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { 
    rex_analytics,
    rex_general,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ analytics }: any) => analytics);

  useEffect(() => {
    dispatch(FetchAnalyticsReducer(
      rex_meta?.page || 1,
      rex_meta?.limit || 10,
      rex_sortColumn || 'bot',
      rex_sortOrder || 'asc'
    ));
    dispatch(FetchGeneralAnalyticsReducer());
  }, []);

  useEffect(() => {
    const selectedChatbotIds = selectedRows.map(row => row.bot);
    dispatch(FetchGeneralAnalyticsReducer(selectedChatbotIds));
  }, [selectedRows]);

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'ChatBot',
      dataIndex: 'chatbot',
      key: 'chatbot',
      sorter: true
    },
    {
      title: '% de Aceptación',
      dataIndex: 'tasaRetencionGeneral',
      key: 'tasaRetencionGeneral',
    },
    {
      title: '# Total de msj E/R',
      dataIndex: 'totalMensajes',
      key: 'totalMensajes',
      sorter: true
    },
    {
      title: 'Promedio de Valorac.',
      dataIndex: 'promedio_conversacion',
      key: 'promedio_conversacion',
      sorter: true
    },
    {
      title: 'Tiempo Promedio x Conversación',
      dataIndex: 'tiempo',
      key: 'tiempo',
      sorter: true
    },
  ];

  const columns2 = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'ChatBot',
      dataIndex: 'chatbot',
      key: 'chatbot',
      sorter: true
    },
    {
      title: '% de Confusión (CR)',
      dataIndex: '',
      key: '',
    },
    {
      title: '% Tasa de Rebote',
      dataIndex: 'tasaRebote',
      key: 'tasaRebote',
      sorter: true
    },
    {
      title: 'Tasa de retencion General',
      dataIndex: 'promedio_conversacion',
      key: 'promedio_conversacion',
      sorter: true
    },
    {
      title: 'Tiempo Promedio x Conversación',
      dataIndex: 'tiempo',
      key: 'tiempo',
      sorter: true
    },
  ];

  const tableData = rex_analytics.map((item: any, index: number) => ({
    ...item,
    item: index + 1,
    key: item.bot, // Añadiendo una key única para cada fila
  }));

  const handleGetData = (page: number, sortOrder: string, sortColumn: string) => {
    dispatch(setUsuariosSort(sortColumn, sortOrder));
    dispatch(FetchAnalyticsReducer(page, rex_meta?.limit || 10, sortColumn, sortOrder));
  };

  const handleSelectionChange = (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    setSelectedRows(selectedRows);
  };

  return (
    <div>
      {/* <Button
        onClick={()=>{
          console.log('data:',rex_general)
        }}
      >
        hola
      </Button> */}
      <Row gutter={16}>
        <Col xxl={8} xl={8}>
          <Card>
            <div>N° CONVERSACIONES</div>
            <div>{rex_general.total_conversations || 0}</div>
          </Card>
        </Col>
        <Col xxl={8} xl={8}>
          <Card>
            <div>N° MENSAJES E/R</div>
            <div>{rex_general.total_messages || 0}</div>
          </Card>
        </Col>
        <Col xxl={8} xl={8}>
          <Card>
            <div>MSJS E/R POR CONVERSACIÓN</div>
            <div>{rex_general.average_messages_per_conversation || 0}</div>
          </Card>
        </Col>

        <Col xxl={24} xl={24}>
          <TableComponent
            columns={columns}
            data={tableData}
            meta={rex_meta}
            currentPage={rex_meta?.page || 1}
            getData={handleGetData}
            onPageChange={(page: number) => dispatch(FetchAnalyticsReducer(page, rex_meta?.limit || 10, rex_sortColumn, rex_sortOrder))}
            pageSize={rex_meta?.limit || 10}
            onSelectionChange={handleSelectionChange}
          />
        </Col>

        <Col xxl={24} xl={24}>
          <TableComponent
            columns={columns2}
            data={tableData}
            meta={rex_meta}
            currentPage={rex_meta?.page || 1}
            getData={handleGetData}
            onPageChange={(page: number) => dispatch(FetchAnalyticsReducer(page, rex_meta?.limit || 10, rex_sortColumn, rex_sortOrder))}
            pageSize={rex_meta?.limit || 10}
            onSelectionChange={handleSelectionChange}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
