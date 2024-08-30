import React from 'react';
import { Card, Col, Row } from 'antd';
import UsersTable from '../../../components/pages/admin/users/UsersTable';

const UsersChat: React.FC = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xl={24} md={24}>
            <UsersTable />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UsersChat;
