import { Card, Col, Row } from 'antd';
import React from 'react';
import TableOurChats from './components/TableOurChats';

const OurChats: React.FC = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xl={24} md={24}>
            <TableOurChats />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default OurChats;
