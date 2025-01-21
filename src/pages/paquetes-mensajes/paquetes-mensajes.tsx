import { Card, Col, Row } from 'antd';
import React from 'react';
import TablePaquetesMensajes from './componentes/TablePaquetesMensajes';

const PaquetesMensajes: React.FC = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xl={24} md={24}>
            <TablePaquetesMensajes />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PaquetesMensajes;
