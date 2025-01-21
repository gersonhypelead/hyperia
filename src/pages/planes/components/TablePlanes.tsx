import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Space, message, InputRef, TableColumnType, Tooltip, Modal } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { FetchPlanesReducer, setUsuariosPage, setUsuariosSort } from '../../../redux/actions/planes/planesActions';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { FilterDropdownProps } from 'antd/es/table/interface';
import CreatePlanesButton from '../../../components/pages/planes/CreatePlanesButton';

interface DataType {
  key: any;
  plan: string;
  total_mensaje: string;
  dias_disponible: string;
}

type DataIndex = keyof DataType;

const TablePlanes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);

  const {
    rex_planes,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ planes }: RootState) => planes);

  useEffect(() => {
    const fetchPlanes = async () => {
      await dispatch(
        FetchPlanesReducer(
          rex_meta?.page || 1,
          rex_meta?.limit || 10,
          rex_sortColumn,
          rex_sortOrder
        )
      );
      if (rex_planes.length === 0) {
        // message.info('No se encontraron planes.');
      }
    };
    fetchPlanes();
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
      dispatch(setUsuariosSort(sortColumn, order));
    }
    dispatch(setUsuariosPage(current));
    dispatch(FetchPlanesReducer(current, pageSize, sortColumn, order, filters));
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
    console.log('View:', record);
  };

  const handleEdit = (record: any) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record: any) => {
    console.log('eleminar:', record);
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
      title: 'Plan',
      key: 'plan',
      dataIndex: 'plan',
      sorter: true,
      ...getColumnSearchProps('plan'),
    },
    {
      title: 'Total Mensajes',
      key: 'total_mensaje',
      dataIndex: 'total_mensaje',
      sorter: true,
      ...getColumnSearchProps('total_mensaje'),
    },
    {
      title: 'Dias Disponibles',
      key: 'dias_disponible',
      dataIndex: 'dias_disponible',
      sorter: true,
      ...getColumnSearchProps('dias_disponible'),
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
        <CreatePlanesButton />
      </div>
      <Table
        columns={columns}
        dataSource={rex_planes}
        loading={rex_loading}
        pagination={{
          current: rex_meta.page || 1,
          pageSize: rex_meta.limit || 10,
          total: rex_meta.total || 0,
          onChange: (page) => dispatch(setUsuariosPage(page)),
        }}
        onChange={handleTableChange}
        rowKey="plan"
        locale={{ emptyText: 'No se encontraron datos.' }}
      />
    </>
  );
};

export default TablePlanes;