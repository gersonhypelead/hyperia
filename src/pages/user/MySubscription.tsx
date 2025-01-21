import { Button, Col, Divider, Radio, Row, Space } from 'antd'
import React from 'react'
import MiPlan from '../../components/plan/MiPlan'
import CardPaquetes from '../pricing/components/CardPaquetes'
import CardPlanes from '../pricing/components/CardPlanes'

const MySubscription: React.FC = () => {
  return (
    <div>
      <h1>Mi Subcripción</h1>
      <Row gutter={[16, 16]}>
        <Col xxl={6} xl={6}>
          <Row>
            <Col xxl={24} xl={24} md={24} className='cardTokens'>
              <h3>Tu Plan Actual:</h3>
              <MiPlan 
                statusText={"Activo"} 
              />
            </Col>

            <Col xxl={24} xl={24} md={24} className='cardTokens'>
              <div
                style={{
                  border: '5px solid #BCFBFF',
                  paddingLeft: '10px',
                  paddingBottom: '15px',
                  borderRadius: '10px',
                  background: 'white'
                }}
              >
                <h3>Tu Metodo de Pago:</h3>
                <Divider />
                <div>
                  <Radio.Group
                    // onChange={onChange} 
                    value={1}
                  >
                    <Space direction="vertical">
                      <Radio value={1}>
                        Tarjeta Visa
                      </Radio>
                      <Radio value={2} disabled>
                        Paypal
                      </Radio>
                      <Radio value={3} disabled>
                        Transferencia Bancaria
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
            </Col>
            <Divider />
            <div>
              <Button
                danger
                onClick={async () => {

                }}
                disabled
              >
                Cancelar Suscripción
              </Button>
            </div>
          </Row>
        </Col>
        <Col xxl={18} xl={18}>
          <Row gutter={[16, 16]}>
            <Col xxl={12} xl={12}>
              <h3>Mejora tu plan</h3>
              <CardPlanes
                tiene_titulo={false}
                version_pequena={true}
              />
            </Col>

            <Col xxl={12} xl={12}>
              <h3>Compra un paquete</h3>
              <CardPaquetes tiene_titulo={false} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default MySubscription