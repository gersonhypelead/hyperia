import React, { useEffect, useRef, useState } from 'react';
import {
  Table, Button, message, Form,
  Modal,
  Space, Input, DatePicker,
  Row,
  Col,
  Tooltip
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
  SearchOutlined,
  CodeSandboxOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { RootState, AppDispatch } from '../../../../redux/store/store';
import CreateUserButton from './CreateUserButton';
import EditUserModal from './EditUserModal';
import { updateUser } from '../../../../redux/actions/users/usuariosActions';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import ViewPlanModal from './ViewPlanModal';
import UpdatePlanModal from './UpdatePlanUserModal'
import PlanesMensajesModal from './PlanesMensajesModal';
import PaquetesUsuariosTable from './PaquetesUsuariosTable';
import AuditoriaUsuarios from './AuditoriaUsuariosTable';

interface DataType {
  key: string;
  plan: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  tipo_usuario: string;
  usuario: string;
  createdAt: string;
  updatedAt: string;
}

type DataIndex = keyof DataType;
const { RangePicker } = DatePicker;

const UsersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [isUpdatePlanModalVisible, setIsUpdatePlanModalVisible] = useState(false);
  const [isPaquetesMensajesModalVisible, setIsPaquetesMensajesModalVisible] = useState(false);
  const [selectedUserPlanData, setSelectedUserPlanData] = useState<any>(null);

  const [selectedUserPaqueteData, setSelectedUserPaqueteData] = useState<any>(null);
  const [isPaqueteModalVisible, setIsPaqueteModalVisible] = useState(false);

  const [viewAuditoriaUserModalVisible, setViewAuditoriaUserModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<any | null>(null);

  const {
    rex_users,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ users }: RootState) => users);

  const {
    rex_paquetes_mensajes,
  } = useSelector(({ paquetesMensajes }: RootState) => paquetesMensajes);




  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    const order = sorter.order === 'ascend' ? 'asc' : 'desc';
    const updatedFilters = {
      ...filters,
      nombre: filters.nombre?.[0] || '',
      usuario: filters.usuario?.[0] || '',
      tipo_usuario: filters.tipo_usuario?.[0] || '',
      createdFrom: filters.createdAt?.[0] || '',
      createdTo: filters.createdAt?.[1] || '',
      updatedFrom: filters.updatedAt?.[0] || '',
      updatedTo: filters.updatedAt?.[1] || '',
    };

    const sortColumn = sorter.field || rex_sortColumn;

    dispatch(setUsuariosSort(sortColumn, order));
    dispatch(setUsuariosPage(pagination.current));
    dispatch(FetchUsuariosReducer(
      pagination.current,
      pagination.pageSize,
      sortColumn,
      order,
      updatedFilters
    ));
  };

  const handleView = (record: any) => {
    setSelectedUserId(record.id);
    setViewAuditoriaUserModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };

  const handleEditPlan = (record: any) => {
    console.log(record)
    const planUsuario = record.planes_usuarios[0];
    setSelectedUserPlanData({
      id: record.id,
      mensajes_disponibles: planUsuario?.mensajes_disponibles || 0,
      mensajes_enviados: planUsuario?.mensajes_enviados || 0,
      mensajes_recibidos: planUsuario?.mensajes_recibidos || 0,
      plan_nombre: record.planes?.plan,
      plan_id: record.planes?.id,
    });
    setIsUpdatePlanModalVisible(true);
  };

  const handlePaquetesMensajes = (record: any) => {
    const planUsuario = rex_paquetes_mensajes?.[0];
    setSelectedUserPlanData({
      id: record.id,
    });
    setIsPaquetesMensajesModalVisible(true);
  };

  const handleClosePaquetesMensajesModal = () => {
    setIsPaquetesMensajesModalVisible(false);
    // Aquí puedes realizar la acción de recargar la tabla
    dispatch(FetchUsuariosReducer(rex_meta.page, rex_meta.limit, rex_sortColumn, rex_sortOrder));
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
          dispatch(FetchUsuariosReducer(rex_meta.page, rex_meta.limit, rex_sortColumn, rex_sortOrder, filters));
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

  const getDateRangeSearchProps = (
    dataIndex: 'createdAt' | 'updatedAt'
  ): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
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
              confirm();
              const [startDate, endDate] = selectedKeys as string[];
              const newFilters = {
                ...filters,
                [`${dataIndex}From`]: startDate,
                [`${dataIndex}To`]: endDate,
              };
              setFilters(newFilters);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              setFilters({
                ...filters,
                [`${dataIndex}From`]: undefined,
                [`${dataIndex}To`]: undefined,
              });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
  });

  const handleViewPlan = (record: any) => {
    const planUsuario = record.planes_usuarios[0];
    if (record.planes && planUsuario) {
      setSelectedUserPlanData({
        mensajes_disponibles: record.mensajes_disponibles,
        mensajes_enviados: record.mensajes_enviados,
        mensajes_recibidos: record.mensajes_recibidos,
        fecha_inicio: planUsuario.fecha_inicio || 0,
        fecha_fin: planUsuario.fecha_fin || 0,
        plan: record.planes.plan,
      });
      setIsPlanModalVisible(true);
    } else {
      // message.error('No se encontraron datos del plan para este usuario');
    }
  };

  const handleViewPaquetes = (record: any) => {
    const paqueteUsuario = record.paquetes_usuarios;
    if (paqueteUsuario && paqueteUsuario.length > 0) {
      const paqueteConUsuarioYPlan = paqueteUsuario.map((paquete: any) => {
        const paqueteMensaje = paquete.paquetes_mensajes;
        return {
          ...paquete,
          plan: record.planes.plan,
          usuario: record.usuario,
          nombrePaquete: paqueteMensaje ? paqueteMensaje.paquete : 'Nombre no disponible',
        };
      });

      setSelectedUserPaqueteData(paqueteConUsuarioYPlan);
      setIsPaqueteModalVisible(true);
    } else {
      // message.error('No se encontraron datos del paquete para este usuario');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(
          FetchUsuariosReducer(
            rex_meta?.page || 1,
            rex_meta?.limit || 10,
            rex_sortColumn,
            rex_sortOrder,
            filters
          )
        );
      } catch (error) {
        message.error('Error al cargar los usuarios.');
        console.error('Fetch failed:', error);
      }
    };
    fetchUsers();

  }, [dispatch, rex_meta?.page, rex_meta?.limit, rex_sortColumn, rex_sortOrder, filters,]);

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
      title: 'Plan',
      key: 'plan',
      render: (text: string, record: any) => (
        <Button
          onClick={() => handleViewPlan(record)}
          disabled={!record.planes}
        >
          {record.planes?.plan || 'Sin plan'}
        </Button>
      ),
    },
    {
      title: 'Paquetes',
      key: 'paquetes_usuarios',
      render: (text: string, record: any) => {
        const ultimoPaquete = record.paquetes_usuarios && record.paquetes_usuarios.length > 0
          ? record.paquetes_usuarios[record.paquetes_usuarios.length - 1]
          : null;

        const nombrePaquete = ultimoPaquete && ultimoPaquete.paquetes_mensajes
          ? ultimoPaquete.paquetes_mensajes.paquete || 'Sin paquete'
          : 'Sin paquete';
        return (
          <Button
            onClick={() => handleViewPaquetes(record)}
            disabled={!record.paquetes_usuarios}
          >
            {nombrePaquete}
          </Button>
        );
      },
    },
    {
      title: 'Nombres',
      key: 'nombre',
      sorter: true,
      ...getColumnSearchProps('nombre'),
      render: (text: string, record: any) => `${record.personas.nombre} ${record.personas.apellido_paterno} ${record.personas.apellido_materno}`,
    },
    {
      title: 'Tipo Usuario',
      dataIndex: ['tipos_usuarios', 'tipo_usuario'],
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
      render: () => '***************',
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...getDateRangeSearchProps('createdAt'),
      sorter: true,
      render: (createdAt: string) => moment(createdAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      ...getDateRangeSearchProps('updatedAt'),
      sorter: true,
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text: string, record: any) => (
        <span>
          <Tooltip title="Ver Auditoria">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Plan">
            <Button icon={<WalletOutlined />} onClick={() => handleEditPlan(record)} />
          </Tooltip>
          <Tooltip title="Paquete">
            <Button icon={<CodeSandboxOutlined />} onClick={() => handlePaquetesMensajes(record)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <>
      {/* <Button
        onClick={() => {

        }}
      >

      </Button> */}
      <div style={{ marginBottom: 16 }}>
        <CreateUserButton />
      </div>
      <div
        style={{
          // background: 'red'
        }}
      >
        <Row>
          <Col
            xxl={24}
            xl={24}
            md={24}
            sm={24}
          >
            <Table
              style={{
                position: 'relative'
              }}
              columns={columns}
              dataSource={rex_users}
              loading={rex_loading}
              pagination={{
                current: rex_meta.page,
                pageSize: rex_meta.limit,
                total: rex_meta.total,
                onChange: (page) => dispatch(setUsuariosPage(page)),
              }}
              onChange={handleTableChange}
              rowKey="id"
              locale={{ emptyText: 'No se encontraron datos.' }}
              scroll={{ x: 100 }}
            />
          </Col>
        </Row>
      </div>
      <EditUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        user={editingUser}
      />
      <ViewPlanModal
        visible={isPlanModalVisible}
        onClose={() => setIsPlanModalVisible(false)}
        userData={selectedUserPlanData}
      />
      <UpdatePlanModal
        visible={isUpdatePlanModalVisible}
        onClose={() => {
          setIsUpdatePlanModalVisible(false);
          setSelectedUserPlanData(null);
        }}
        userData={selectedUserPlanData}
      />
      <PlanesMensajesModal
        visible={isPaquetesMensajesModalVisible}
        onClose={handleClosePaquetesMensajesModal}
        userData={selectedUserPlanData}
      />
      <PaquetesUsuariosTable
        visible={isPaqueteModalVisible}
        onClose={() => setIsPaqueteModalVisible(false)}
        userData={selectedUserPaqueteData}
      />
      <AuditoriaUsuarios
        visible={viewAuditoriaUserModalVisible}
        onClose={() => setViewAuditoriaUserModalVisible(false)}
        userId={selectedUserId}
      />

    </>
  );
};
export default UsersTable;