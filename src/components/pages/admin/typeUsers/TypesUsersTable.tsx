import React, { useEffect, useState } from 'react';
import { Table, Button , message, Form, Modal} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { fetchTiposUsuarios, setTypeUsuariosPage, setTypeUsuariosSort, deleteTypeUser } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';
import CreateTypeUserButton from './CreateTypeUserButton';
import EditTypeUserModal from './EditTypeUserModal';
import { updateTypeUser } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import AuditoriaModal from './AuditoriaModal';
import { findAuditoriaTableUser } from '../../../../redux/actions/auditorias/auditoriasActions';


const TypesUsersTable: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTypeUser, setEditingTypeUser] = useState<any | null>(null);
  const [viewUserModalVisible, setViewUserModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<any | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    dispatch(setTypeUsuariosPage(pagination.current));

    if (sorter.field === 'tipo_usuario' || sorter.field === 'createdAt' || sorter.field === 'updatedAt') {
      dispatch(setTypeUsuariosSort(sorter.field, sorter.order === 'ascend' ? 'asc' : 'desc'));
    }
  };

  const {
    rex_tiposUsuarios,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  console.log('totalmeta:', rex_tiposUsuarios)
  console.log('meta:', rex_meta)
 
  useEffect(() => {
    dispatch(
        fetchTiposUsuarios(
        rex_meta.page,
        rex_meta.limit,
        rex_sortColumn,
        rex_sortOrder
      )
    );
  }, [
    dispatch,
    rex_meta.page,
    rex_meta.limit,
    rex_sortColumn,
    rex_sortOrder
  ]);
  
  const handleView = (record: any) => {
    setSelectedUserId(record.id);
    setViewUserModalVisible(true); 
  };
  const handleEdit = (record: any) => {
    setEditingTypeUser(record);
    setIsModalVisible(true);

  };

  const handleSave = async (values: any) => {
    const { tipo_usuario } = values;
    const updatedUser = {
      id: editingTypeUser.id, 
      tipo_usuario,   
    };

    try {
      await dispatch(updateTypeUser(updatedUser));
      message.success('Tipo de Usuario actualizado correctamente'); 
    } catch (error) {
      message.error('Error al actualizar el tipo usuario'); 
      console.error('Update failed:', error);
    } finally {
      setIsModalVisible(false);
      form.resetFields();
      dispatch(fetchTiposUsuarios(rex_meta.page,rex_meta.limit,));
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este tipo de usuario?',
      content: 'Esta eliminara el tipo de usuario.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await dispatch(deleteTypeUser(record.id)); 
          message.success('Tipo de Usuario eliminado correctamente');
          dispatch(fetchTiposUsuarios(rex_meta.page, rex_meta.limit));
        } catch (error) {
          message.error('Error al elimnar el usuario');
        } 
      },
    });
  };

  const handleViewPermissions = (tipoUsuarioId: number) => {
    navigate(`/tipos-usuarios/${tipoUsuarioId}/permisos`); // Asegúrate de que la ruta sea correcta
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
      sorter: true,
      dataIndex: 'tipo_usuario',
      
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
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt: string) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: (updatedAt: string) => moment(updatedAt).format('DD/MM/YYYY HH:mm'),
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
          current: rex_meta.page,
          pageSize: rex_meta.limit,
          total: rex_meta.total,
          onChange: (page) => dispatch(setTypeUsuariosPage(page)),
        }}
        onChange={handleTableChange}
        rowKey="usuario"
      />

      <EditTypeUserModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSave}
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
