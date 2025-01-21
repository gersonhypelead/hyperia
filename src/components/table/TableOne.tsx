import React from 'react';
import { Table } from 'antd';

interface TableGlobalProps {
  data: any[];
  columns: any[];
  loading_data: boolean;
  showTrash?: boolean;
  showDownload?: boolean;
  functionDelete: (keys: React.Key[], setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>) => void;
  pageTableGlobal: number;
  pageSizeTableGlobal: number;
  setPageTableGlobal: (page: number, pageSize?: number) => void;
  setPageSizeTableGlobal: (size: number) => void;
  actionOnRow: (record: any) => void;
}

const TableOne: React.FC<TableGlobalProps> = ({
  data,
  columns,
  loading_data,
  showTrash = true,
  showDownload = true,
  functionDelete,
  pageTableGlobal,
  pageSizeTableGlobal,
  setPageTableGlobal,
  setPageSizeTableGlobal,
  actionOnRow,
}) => {
  return (
    <Table
      scroll={{ x: 'max-content' }}
      className="Table-Global"
      columns={columns}
      dataSource={data}
      loading={loading_data}
      onRow={(record) => ({
        onClick: () => actionOnRow(record),
      })}
      rowClassName={(record) =>
        record.estid === 1 ? 'Table-Row-Global' : 'Table-Row-Disabled-Global'
      }
      pagination={{
        current: pageTableGlobal,
        pageSize: pageSizeTableGlobal,
        onChange: (page, pageSize) => {
          setPageTableGlobal(page, pageSize ?? pageSizeTableGlobal);
          if (pageSize) setPageSizeTableGlobal(pageSize);
        },
        position: ['topRight'],
      }}
    />
  );
};

export default TableOne;
