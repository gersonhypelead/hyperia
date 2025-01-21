import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, Modal, Progress, Table, Input, Button, Space, DatePicker, message, InputRef, TableColumnType } from 'antd';
import {
  RobotOutlined,
  SettingOutlined,
  CommentOutlined,
  SearchOutlined
} from '@ant-design/icons';
import ChatComponent from '../../../components/chat/ChatComponent';
import { FetchAdminReducer, setAdminPage, setAdminSort } from '../../../redux/actions/admin/adminActions';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { GetDataConversationsReducer } from '../../../redux/actions/chatBots/conversation/Conversation';
import { GetConversationReducer } from '../../../redux/actions/chatBots/Chat/Chat';
import moment from 'moment';
import { FilterDropdownProps } from 'antd/es/table/interface';

interface DataType {
  key: any;
  nombre: string;
  usuario: string;
  chatbot: string;
  descripcion: string;
  createdFrom: string;
  createdTo: string;
  updateFrom: string;
  updateTo: string;
}

type DataIndex = keyof DataType;
const { RangePicker } = DatePicker;

const TableAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chatbot_seleccionado, setChatbot_seleccionado] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);

  const { rex_chatsbots } = useSelector((state: RootState) => state.home);
  const { rex_conversation_chat } = useSelector((state: RootState) => state.tabChat);
  const { rex_chat_selecccionado  , rex_conversacion_seleccionada} = useSelector(({ home }: RootState) => home);
  const selectedChatbot = rex_chatsbots.find((bot: any) => bot.id === chatbot_seleccionado);
  
  const id_conversation = rex_conversacion_seleccionada
  const {
    rex_admins,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ admin }: any) => admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      await dispatch(
        FetchAdminReducer(
          rex_meta?.page || 1,
          rex_meta?.limit || 10,
          rex_sortColumn,
          rex_sortOrder
        )
      );
      if (rex_admins.length === 0) {
        // message.info('No se encontraron usuarios.');
      }
    };
    fetchAdmins();
  }, []);

  useEffect(() => {
    dispatch(GetDataConversationsReducer());
  }, [dispatch, rex_chat_selecccionado]);

  useEffect(() => {
    if (id_conversation) {
      GetConversation();
    }
  }, [id_conversation]);

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    const { current, pageSize } = pagination;
    let order = rex_sortOrder;
    let sortColumn = rex_sortColumn;

    if (sorter.order) {
      order = sorter.order === 'ascend' ? 'desc' : 'asc';
      sortColumn = sorter.field;
      dispatch(setAdminSort(sortColumn, order));
    }
    dispatch(setAdminPage(current));
    dispatch(FetchAdminReducer(current, pageSize, sortColumn, order, filters));
  };

  const showModal = (chatbotId: number) => {
    setChatbot_seleccionado(chatbotId);
    GetConversation();
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const GetConversation = async () => {
    await dispatch(GetConversationReducer());
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              setSearchText(selectedKeys[0] as string);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'nombre') {
        const fullName = `${record.nombre}`.toLowerCase();
        return fullName.includes((value as string).toLowerCase());
      }
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const getDateRangeSearchProps = (
    startDateIndex: DataIndex,
    endDateIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
          onChange={(dates, dateStrings) => {
            setSelectedKeys(dateStrings.length === 2 ? dateStrings : []);
          }}
          format="YYYY-MM-DD HH:mm"
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              const [startDate, endDate] = selectedKeys as string[];
              const newFilters = {
                ...filters,
                createdFrom: startDate,
                createdTo: endDate,
              };
              setFilters(newFilters);

              // Dispatch a single action with all parameters
              dispatch(FetchAdminReducer(
                rex_meta.page,
                rex_meta.limit,
                rex_sortColumn,
                rex_sortOrder,
                newFilters
              ));

            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => {
      if (Array.isArray(value) && value.length === 2) {
        const [startDate, endDate] = value as string[];
        const recordDate = moment(record[startDateIndex], 'YYYY-MM-DD HH:mm');
        const startMoment = moment(startDate, 'YYYY-MM-DD HH:mm');
        const endMoment = moment(endDate, 'YYYY-MM-DD HH:mm');
        return recordDate.isBetween(startMoment, endMoment, undefined, '[]');
      }
      return false;
    },
  });

  const columns = [
    {
      title: 'Item',
      key: 'item',
      render: (text: string, record: any, index: number) => {
        const currentPage = rex_meta.page;
        const pageSize = rex_meta.limit;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Nombre',
      key: 'nombre',
      dataIndex: 'nombre',
      sorter: true,
      ...getColumnSearchProps('nombre'),
    },
    {
      title: 'Usuario',
      key: 'usuario',
      dataIndex: 'usuario',
      sorter: true,
      ...getColumnSearchProps('usuario'),
    },
    {
      title: 'Chatbot',
      key: 'chatbot',
      dataIndex: 'chatbot',
      sorter: true,
      ...getColumnSearchProps('chatbot'),
    },
    {
      title: 'Descripción',
      key: 'descripcion',
      dataIndex: 'descripcion',
      sorter: true,
      ...getColumnSearchProps('descripcion'),
    },
    {
      title: '% de aceptación',
      key: 'porcentaje_aceptacion',
      dataIndex: 'porcentaje_aceptacion',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          <Progress percent={0} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        </div>
      )
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'creadoen',
      key: 'creadoen',
      sorter: true,
      ...getDateRangeSearchProps('createdFrom', 'createdTo'),
      render: (date: string) => date ? moment(date).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'actualizadoen',
      key: 'actualizadoen',
      sorter: true,
      ...getDateRangeSearchProps('updateFrom', 'updateTo'),
      render: (date: string) => date ? moment(date).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (_: any, record: any) => (
        <div className='Table-Contain-Text-Global'>
          <Tooltip title={'Chat'}>
            <RobotOutlined
              style={{ fontSize: '18px', marginRight: '10px', cursor: 'pointer' }}
              onClick={() => {
                showModal(record.id);
              }}
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

  return (
    <>

      <Table
        columns={columns}
        dataSource={rex_admins}
        loading={rex_loading}
        pagination={{
          current: rex_meta.page || 1,
          pageSize: rex_meta.limit || 10,
          total: rex_meta.total || 0,
          onChange: (page) => dispatch(setAdminPage(page)),
        }}
        onChange={handleTableChange}
        rowKey="id"
        locale={{ emptyText: 'No se encontraron datos.' }}
      />
      <Modal
        title="InfoBot"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <ChatComponent
          idConversation={id_conversation ? id_conversation : 0}
          data={rex_conversation_chat}
          editBubble={false}
          nombreChat={selectedChatbot?.nombre || ''}
          resetChat={true}
        />
      </Modal>
    </>
  );
};

export default TableAdmin;