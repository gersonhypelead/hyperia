import React from 'react';
import { Card, Col, Row } from 'antd';
import TypesUsersTable from '../../../components/pages/admin/typeUsers/TypesUsersTable';

const TypeUsersChat: React.FC = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xl={24} md={24}>
            <TypesUsersTable />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TypeUsersChat;
