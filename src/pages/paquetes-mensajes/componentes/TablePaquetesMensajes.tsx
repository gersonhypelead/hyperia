import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Space, message, InputRef, TableColumnType, Tooltip, Modal } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { DisablePaquetesMensajesReducer, FetchPaquetesMensajesReducer, setPaquetesMensajesPage, setPaquetesMensajesSort } from '../../../redux/actions/paquetes_mensajes/paquetesMensajesAction';
import CreatePaquetesMensajesButton from '../../../components/pages/paquetes-mensajes/CreatePaquetesMensajes';
import EditPaqueteMensajesModal from '../../../components/pages/paquetes-mensajes/EditPaquetesMensajesModal';

interface DataType {
  key: any;
  paquete: string;
  total_mensaje: string;
  precio_eur: string;
}

type DataIndex = keyof DataType;

const TablePaquetesMensajes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [editingPaqueteMensajes, setEditingPaqueteMensajes] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    rex_paquetes_mensajes,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ paquetesMensajes }: RootState) => paquetesMensajes);

  useEffect(() => {
    const fetchPaquetesMensajes = async () => {
      await dispatch(
        FetchPaquetesMensajesReducer(
          rex_meta?.page || 1,
          rex_meta?.limit || 10,
          rex_sortColumn,
          rex_sortOrder
        )
      );
      if (rex_paquetes_mensajes.length === 0) {
        // message.info('No se encontraron paquetes de mensajes.');
      }
    };
    fetchPaquetesMensajes();
  }, []);

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
      dispatch(setPaquetesMensajesSort(sortColumn, order));
    }
    dispatch(setPaquetesMensajesPage(current));
    dispatch(FetchPaquetesMensajesReducer(current, pageSize, sortColumn, order, filters));
  };

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
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            confirm();
            setSearchText(selectedKeys[0] as string);
          }}
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const handleView = (record: any) => {
  };

  const handleEdit = (record: any) => {
    setEditingPaqueteMensajes(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este paquete?',
      content: 'Esta acción desactivará el paquete, pero no lo eliminará permanentemente.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await dispatch(DisablePaquetesMensajesReducer(record.id));
          message.success('Usuario desactivado correctamente');
          dispatch(FetchPaquetesMensajesReducer(rex_meta.page, rex_meta.limit, rex_sortColumn, rex_sortOrder, filters));
        } catch (error) {
          message.error('Error al desactivar el paquete');
        }
      },
    });
  };
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
      title: 'Paquete',
      key: 'paquete',
      dataIndex: 'paquete',
      sorter: true,
      ...getColumnSearchProps('paquete'),
    },
    {
      title: 'Total Mensajes',
      key: 'total_mensaje',
      dataIndex: 'total_mensaje',
      sorter: true,
      ...getColumnSearchProps('total_mensaje'),
    },
    {
      title: 'Precio EU',
      key: 'precio_eur',
      dataIndex: 'precio_eur',
      sorter: true,
      ...getColumnSearchProps('precio_eur'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text: string, record: any) => (
        <span>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
        </span>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <CreatePaquetesMensajesButton/>
      </div>
      <Table
        columns={columns}
        dataSource={rex_paquetes_mensajes}
        loading={rex_loading}
        pagination={{
          current: rex_meta.page || 1,
          pageSize: rex_meta.limit || 10,
          total: rex_meta.total || 0,
          onChange: (page) => dispatch(setPaquetesMensajesPage(page)),
        }}
        onChange={handleTableChange}
        rowKey="paquete"
        locale={{ emptyText: 'No se encontraron datos.' }}
      />
      <EditPaqueteMensajesModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        paqueteMensajes={editingPaqueteMensajes}
      />
    </>
  );
};

export default TablePaquetesMensajes;