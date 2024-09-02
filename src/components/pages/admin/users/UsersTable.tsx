import React, { useEffect, useRef, useState } from 'react';
import {
  Table, Button, message, Form,
  Modal,
  Space, Input, DatePicker
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  FetchUsuariosReducer,
  setUsuariosPage,
  setUsuariosSort,
  updateUserStatus
} from '../../../../redux/actions/users/usuariosActions';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { RootState, AppDispatch } from '../../../../redux/store/store';
import CreateUserButton from './CreateUserButton';
import EditUserModal from './EditUserModal';
import { updateUser } from '../../../../redux/actions/users/usuariosActions';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

interface DataType {
  key: string;
  nombre: string;
  apellido_materno: any;
  apellido_paterno: any;
  tipo_usuario: string;
  usuario: string;
  createdFrom: string;
  createdTo: string;
  updatedFrom: string;
  updatedTo: string;
}
type DataIndex = keyof DataType;
const { RangePicker } = DatePicker;

const UsersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const {
    rex_users,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ users }: any) => users);

  console.log('meta usuario:', rex_meta)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(
          FetchUsuariosReducer(
            rex_meta?.page || 1,
            rex_meta?.limit || 10,
            rex_sortColumn,
            rex_sortOrder
          )
        );

        if (rex_users.length === 0) {
          message.info('No se encontraron usuarios.');
        }
      } catch (error) {
        message.error('Error al cargar los usuarios.');
        console.error('Fetch failed:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    const order = sorter.order === 'ascend' ? 'desc' : 'asc';
    // Obtener los filtros actuales, incluyendo los filtros de fecha
    const updatedFilters = {
      nombre: filters.nombre || '',
      usuario: filters.usuario || '',
      tipo_usuario: filters.tipo_usuario || '',
      createdFrom: filters.createdFrom || '',
      createdTo: filters.createdTo || '',
      updatedFrom: filters.updatedFrom || '',
      updatedTo: filters.updatedTo || '',
    };

    const sortColumn = [
      'nombre',
      'tipo_usuario',
      'usuario',
      'fecha_creacion',
      'fecha_actualizacion'
    ].includes(sorter.field)
      ? sorter.field
      : rex_sortColumn;

    // Usar valores predeterminados si rex_meta es undefined
    const currentPage = rex_meta?.page || 1;
    const currentLimit = rex_meta?.limit || 10;

    dispatch(setUsuariosSort(sortColumn, order));
    dispatch(setUsuariosPage(pagination.current));
    dispatch(FetchUsuariosReducer(
      pagination.current || currentPage,
      currentLimit,
      sortColumn,
      order,
      updatedFilters
    )).then(() => {
      if (rex_users.length === 0) {
        message.info('No se encontraron resultados');
        // Restablecer a la página 1 si no hay resultados
        dispatch(setUsuariosPage(1));
      }
    });
  };

  const handleView = (record: any) => {
    console.log('View:', record);
  };

  const handleEdit = (record: any) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este usuario?',
      content: 'Esta acción desactivará al usuario, pero no lo eliminará permanentemente.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await dispatch(updateUserStatus(record.id, false));
          message.success('Usuario desactivado correctamente');
          dispatch(FetchUsuariosReducer(rex_meta.page, rex_meta.limit, rex_sortColumn, rex_sortOrder));
        } catch (error) {
          message.error('Error al desactivar el usuario');
        }
      },
    });
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
      if (dataIndex === 'nombre') {
        const fullName = `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`.toLowerCase();
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
              dispatch(FetchUsuariosReducer(
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

  const handleSave = async (values: any) => {
    const { nombre, apellido_paterno, apellido_materno, tipo_usuario_id, usuario, email } = values;
    const updatedUser = {
      id: editingUser.id,
      nombre,
      apellido_paterno,
      apellido_materno,
      tipo_usuario_id,
      usuario,
      email,

    };
    try {
      await dispatch(updateUser(updatedUser));
      message.success('Usuario actualizado correctamente');
    } catch (error) {
      message.error('Error al actualizar el usuario');
      console.error('Update failed:', error);
    } finally {
      setIsModalVisible(false);
      form.resetFields();
      dispatch(FetchUsuariosReducer(
        rex_meta.page,
        rex_meta.limit,
        rex_sortColumn,
        rex_sortOrder
      ));
    }
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
      title: 'Nombres',
      key: 'nombre',
      sorter: true,
      dataIndex: 'nombre',
      ...getColumnSearchProps('nombre'),
      render: (text: string, record: any) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
    },
    {
      title: 'Tipo Usuario',
      dataIndex: 'tipo_usuario',
      key: 'tipo_usuario',
      ...getColumnSearchProps('tipo_usuario'),
      sorter: true,
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
      ...getColumnSearchProps('usuario'),
      sorter: true,
    },
    {
      title: 'Contraseña',
      key: 'contraseña',
      render: () => '***************', // Valor estático
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',
      ...getDateRangeSearchProps('createdFrom', 'createdTo'),
      sorter: true,
      render: (fecha_creacion: string) => {
        if (!fecha_creacion) return '-';
        return moment(fecha_creacion).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'fecha_actualizacion',
      key: 'fecha_actualizacion',
      ...getDateRangeSearchProps('updatedFrom', 'updatedTo'),
      sorter: true,
      render: (fecha_actualizacion: string) => {
        if (!fecha_actualizacion) return '-';
        return moment(fecha_actualizacion).format('YYYY-MM-DD HH:mm');
      },
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
        <CreateUserButton />
      </div>
      <Button onClick={() => console.log(rex_users)} />
      <Table
        columns={columns}
        dataSource={rex_users}
        loading={rex_loading}
        pagination={{
          current: rex_meta.page || 1,
          pageSize: rex_meta.limit || 10,
          total: rex_meta.total || 0,
          onChange: (page) => dispatch(setUsuariosPage(page)),
        }}
        onChange={handleTableChange}
        rowKey="usuario"
        locale={{ emptyText: 'No se encontraron datos.' }}
      />
      <EditUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        user={editingUser}
      />
    </>
  );
};
export default UsersTable;