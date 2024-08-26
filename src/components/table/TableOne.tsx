import React, { useState } from 'react';
import { Table, Pagination, Row, Col } from 'antd';
import { ColumnsType } from 'antd/lib/table';
// import ProfileTypesFilterSelect from '../../Components/ProfileTypes/ProfileTypesFilterSelect';
// import TrashButtonGlobal from '../../Assets/Images/Global/TrashButtonGlobal';
// import DownloadButtonGlobal from '../../Assets/Images/Global/DownloadButtonGlobal';

interface TableGlobalProps {
  data: Array<any>;
  columns: Array<any>;
  setMouseOverRow?: (index: number | null) => void;
  showTrash?: boolean;
  showDownload?: boolean;
  functionDelete: (keys: React.Key[], setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>) => void;
  pageTableGlobal: number;
  pageSizeTableGlobal: number;
  setPageTableGlobal: (page: number) => void;
  setPageSizeTableGlobal: (size: number) => void;
  loading_data: boolean;
  actionOnRow: (record: any) => void;
}

const TableOne: React.FC<TableGlobalProps> = ({
  data,
  columns,
  setMouseOverRow,
  showTrash = true,
  showDownload = true,
  functionDelete,
  pageTableGlobal,
  pageSizeTableGlobal,
  setPageTableGlobal,
  setPageSizeTableGlobal,
  loading_data,
  actionOnRow,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [valueCheckbox, setValueCheckbox] = useState(false);

  const handleSelect = (record: any, selected: boolean) => {
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record.key]);
      if (selectedRowKeys.length + 1 === data.length) {
        setValueCheckbox(true);
      }
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.key);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
      setValueCheckbox(false);
    }
  };

  const toggleSelectAll = (valueCheckbox: boolean) => {
    setSelectedRowKeys(valueCheckbox ? data.map((r) => r.key) : []);
  };

  const rowSelection = {
    selectedRowKeys,
    type: 'checkbox' as 'checkbox',
    fixed: true as const,
    onSelect: handleSelect,
  };

  return (
    <>
      <Row className="Table-Container-Actions-Global">
        <Col className="Table-Col-Container-Actions-Global">
          <div className="Table-Col-Container-Actions-Global">
            {/* <ProfileTypesFilterSelect
              toggleSelectAll={toggleSelectAll}
              selectedRowKeys={selectedRowKeys}
              dataAmount={data.length}
              setSelectedRowKeys={setSelectedRowKeys}
              data={data}
              valueCheckbox={valueCheckbox}
              setValueCheckbox={setValueCheckbox}
            />
            {showTrash && (
              <TrashButtonGlobal functionDelete={() => functionDelete(selectedRowKeys, setSelectedRowKeys)} />
            )}
            {showDownload && <DownloadButtonGlobal />} */}
          </div>
        </Col>
        <Col>
          <Pagination
            total={data.length}
            showTotal={(total, range) => `${range[0]}-${range[1]} de ${total}`}
            defaultPageSize={10}
            defaultCurrent={pageTableGlobal}
            current={pageTableGlobal}
            className="Table-Pagination-Global"
            onChange={(page, pageSize) => {
              setPageTableGlobal(page === 0 ? 1 : page);
              setPageSizeTableGlobal(pageSize);
            }}
          />
        </Col>
      </Row>

      <Table
        scroll={{ x: 'max-content' }}
        rowSelection={rowSelection}
        className="Table-Global"
        columns={columns}
        dataSource={data}
        loading={loading_data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => actionOnRow(record),
            // onMouseEnter: () => setMouseOverRow && setMouseOverRow(rowIndex),
            // onMouseLeave: () => setMouseOverRow && setMouseOverRow(null),
          };
        }}
        rowClassName={(record) =>
          record.estid === 1 ? 'Table-Row-Global' : 'Table-Row-Disabled-Global'
        }
        pagination={{
          defaultCurrent: pageTableGlobal,
          current: pageTableGlobal,
          pageSize: pageSizeTableGlobal,
          position: ['topRight'],
        }}
      />
    </>
  );
};

export default TableOne;
