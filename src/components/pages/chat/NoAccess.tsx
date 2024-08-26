import React from 'react'
import ImgMoreBots from '../../../assets/img/bots/morebots.webp';
import { Col, Row } from 'antd';

const NoAccess = () => {
  return (
    <div>
      <Row>
        <Col xxl={4} xl={4} md={4} ></Col>
        <Col xxl={16} xl={16} md={16}>
          <div
            style={{
              width: '100%',
              height: '500px',
              backgroundImage: "radial-gradient(circle farthest-side at 100%, #340549, #240F4A)",
              position: 'relative',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              textAlign: "center",
              paddingTop: '10px'
            }}
          >
            <div
              style={{
                bottom: '0',
                position: 'absolute',
                width: '100%',
                // height: '100%'
              }}
            >
              <img
                src={ImgMoreBots}
                style={{
                  width: "70%",
                  bottom: '0',
                }}
              />
            </div>
            <h1
              style={{
                color: 'white'
              }}
            >
              Lo sentimos!<br />Debes crear primero un BOT para interactuar con este módulo
            </h1>
          </div>
        </Col>
        <Col xxl={4} xl={4} md={4}></Col>
      </Row>
    </div>
  )
}

export default NoAccess