import React, { useEffect, useState } from 'react';
import { Table, Button , message, Form} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { FetchUsuariosReducer, setUsuariosPage, setUsuariosSort } from '../../../../redux/actions/users/usuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';
import CreateUserButton from './CreateUserButton';
import EditUserModal from './EditUserModal';
import { updateUser } from '../../../../redux/actions/users/usuariosActions';

const UsersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Definir el formulario aquí
  const {
    rex_users,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder
  } = useSelector(({ users }: any) => users);

  useEffect(() => {
    dispatch(
      FetchUsuariosReducer(
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
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const order = sorter.order === 'ascend' ? 'asc' : 'desc';
    if (['nombre', 'tipo_usuario', 'usuario', 'fecha_creacion', 'fecha_actualizacion'].includes(sorter.field)) {
      dispatch(setUsuariosSort(sorter.field, order));
    } else {
      dispatch(setUsuariosSort(rex_sortColumn, rex_sortOrder)); // Mantiene el orden actual si no hay cambios
    }
    dispatch(setUsuariosPage(pagination.current));
  };
  const handleView = (record: any) => {
    console.log('View:', record);
    // Implementa la funcionalidad para ver detalles aquí
  };
  const handleEdit = (record: any) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };
  const handleDelete = (record: any) => {
    console.log('Delete:', record);
  };

  const handleSave = async (values: any) => {
    const { nombre, apellido_paterno, apellido_materno, tipo_usuario_id, usuario } = values;
    const updatedUser = {
      id: editingUser.id, 
      nombre,
      apellido_paterno,
      apellido_materno,
      tipo_usuario_id,
      usuario,
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
        const currentPage = rex_meta.page; // Página actual
        const pageSize = rex_meta.limit;   // Tamaño de página (número de elementos por página)
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Nombres',
      key: 'nombre',
      sorter: true,
      dataIndex: 'nombre', // Cambia a dataIndex si solo ordenas por nombre
      render: (text: string, record: any) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
    },
    {
      title: 'Tipo Usuario',
      dataIndex: 'tipo_usuario',
      key: 'tipo_usuario',
      sorter: true,
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
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
      sorter: true,
      render: (fecha_creacion: string) => moment(fecha_creacion).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'fecha_actualizacion',
      key: 'fecha_actualizacion',
      sorter: true,
      render: (fecha_actualizacion: string) => moment(fecha_actualizacion).format('DD/MM/YYYY HH:mm'),
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
      <Table
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
        rowKey="usuario"
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
