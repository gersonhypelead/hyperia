import { Card, Col, Collapse, Row, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import CardBot from '../../../../components/pages/home/CardBot';

const SelectChatBot: React.FC = () => {

  return (
    <>
      <Card>
        <CardBot chatWithBot={false} />
      </Card>
    </>
  );
};

export default SelectChatBot;
