import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, message, Form, Modal, Input, Select, DatePicker, InputRef, TableColumnType, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { 
  FetchTiposUsuariosReducer, 
  setTypeUsuariosPage, 
  setTypeUsuariosSort, 
  deleteTypeUser,
} from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { AppDispatch } from '../../../../redux/store/store';
import CreateTypeUserButton from './CreateTypeUserButton';
import EditTypeUserModal from './EditTypeUserModal';
import AuditoriaModal from './AuditoriaModal';
import { FilterDropdownProps } from 'antd/es/table/interface';

interface DataType {
  key: any;
  tipo_usuario: string;
  createdFrom: string;
  createdTo: string;
  updateFrom: string;
  updateTo: string;
}

type DataIndex = keyof DataType;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TypesUsersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [editingTypeUser, setEditingTypeUser] = useState<any | null>(null);
  const [viewUserModalVisible, setViewUserModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<any | null>(null);
  const navigate = useNavigate();

  const {
    rex_tiposUsuarios,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  useEffect(() => {
    const fetchTipos_Usuarios = async () => {
      await dispatch(
        FetchTiposUsuariosReducer(
          rex_meta?.page || 1,
          rex_meta?.limit || 10,
          rex_sortColumn,
          rex_sortOrder
        )
      );
    };
    fetchTipos_Usuarios();
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
      const columnMapping: { [key: string]: string } = {
        tipo_usuario: 'tipo_usuario',
        fecha_creacion: 'createdAt',
        fecha_actualizacion: 'updatedAt'
      };
      sortColumn = columnMapping[sorter.field] || 'id';
      dispatch(setTypeUsuariosSort(sortColumn, order));
    }
    dispatch(setTypeUsuariosPage(current));
    dispatch(FetchTiposUsuariosReducer(current, pageSize, sortColumn, order, filters));
  };

  const handleView = (record: any) => {
    setSelectedUserId(record.id);
    setViewUserModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingTypeUser(record);
    setIsModalVisible(true);
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
      if (dataIndex === 'tipo_usuario') {
        const fullName = `${record.tipo_usuario}`.toLowerCase();
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
    filterDropdown: ({ 
      setSelectedKeys, 
      selectedKeys, 
      clearFilters 
    }: FilterDropdownProps) => (
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
              dispatch(FetchTiposUsuariosReducer(
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

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este tipo de usuario?',
      content: 'Esta acción eliminará el tipo de usuario.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await dispatch(deleteTypeUser(record.id));
          message.success('Tipo de Usuario eliminado correctamente');
          dispatch(FetchTiposUsuariosReducer(rex_meta.page, rex_meta.limit, rex_sortColumn, rex_sortOrder));
        } catch (error) {
          message.error('Error al eliminar el usuario');
        }
      },
    });
  };

  const handleViewPermissions = (tipoUsuarioId: number) => {
    navigate(`/tipos-usuarios/${tipoUsuarioId}/permisos`);
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
      title: 'Tipo Usuarios',
      key: 'tipo_usuario',
      dataIndex: 'tipo_usuario',
      sorter: true,
      ...getColumnSearchProps('tipo_usuario'),
    },
    {
      title: 'Permisos',
      key: 'permisos',
      render: (text: string, record: any) => (
        <Button onClick={() => handleViewPermissions(record.id)}>
          Ver Permisos
        </Button>
      ),
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'fecha_creacion',
      key: 'createdAt',
      sorter: true,
      ...getDateRangeSearchProps('createdFrom', 'createdTo'),
      render: (date: string) => date ? moment(date).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'fecha_actualizacion',
      key: 'updatedAt',
      sorter: true,
      ...getDateRangeSearchProps('updateFrom', 'updateTo'),
      render: (date: string) => date ? moment(date).format('YYYY-MM-DD HH:mm') : '-',
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
        <CreateTypeUserButton />
      </div>
      <Table
        columns={columns}
        dataSource={rex_tiposUsuarios}
        loading={rex_loading}
        pagination={{
          current: rex_meta.page || 1,
          pageSize: rex_meta.limit || 10,
          total: rex_meta.total || 0,
          onChange: (page) => dispatch(setTypeUsuariosPage(page)),
        }}
        onChange={handleTableChange}
        rowKey="id"
        locale={{ emptyText: 'No se encontraron datos.' }}
      />
      <EditTypeUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        user={editingTypeUser}
      />
      <AuditoriaModal
        visible={viewUserModalVisible}
        onClose={() => setViewUserModalVisible(false)}
        userId={selectedUserId}
      />
    </>
  );
};

export default TypesUsersTable;