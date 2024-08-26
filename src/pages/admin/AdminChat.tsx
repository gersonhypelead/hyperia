import { Card, Col, Row } from 'antd';
import React from 'react';
import TableAdmin from './components/TableAdmin';

const AdmChat: React.FC = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xl={24} md={24}>
            <TableAdmin />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AdmChat;
