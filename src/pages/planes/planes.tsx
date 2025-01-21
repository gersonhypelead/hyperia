import { Card, Col, Row } from 'antd';
import React from 'react';
import TablePlanes from './components/TablePlanes';

const Planes: React.FC = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xl={24} md={24}>
            <TablePlanes />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Planes;
