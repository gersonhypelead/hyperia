import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';

interface TableProps {
  columns: {
    title: string,
    key: string,
    dataIndex?: string,
    render?: (text: string, record: any, index: number) => React.ReactNode,
    sorter?: boolean
  }[]
  data: any[]
  meta: {
    total: number
  }
  currentPage: number
  getData: (page: number, sortOrder: string, sortColumn: string) => void
  onPageChange: (page: number) => void
  pageSize: number
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  meta,
  currentPage,
  getData,
  onPageChange,
  pageSize,
  onSelectionChange
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    const { current } = pagination;
    const order = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : '';
    const column = sorter.field || '';
    getData(current, order, column);
  };

  const sortableColumns = columns.map(column => ({
    ...column,
    sorter: column.sorter
  }));

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
      if (onSelectionChange) {
        onSelectionChange(selectedRowKeys, selectedRows);
      }
    },
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={sortableColumns}
      dataSource={data}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: meta.total,
        onChange: onPageChange,
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
      }}
      onChange={handleTableChange}
    />
  );
};

export default TableComponent;