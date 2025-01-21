import React, { useEffect, useState } from 'react';
import { Card, Col, message, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPlanesReducer } from '../../../redux/actions/planes/planesActions';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import CardPricing from './CardPricing';
import Bot01 from '../../../assets/img/bots/bo01.webp'
import Bot02 from '../../../assets/img/bots/bot02.webp'
import Bot03 from '../../../assets/img/bots/bot03.webp'

const { Meta } = Card;

interface CardPlanesInterface {
  tiene_titulo?: boolean;
  version_pequena?: boolean
}

interface planesInterface {
  id: number,
  plan: string,
  total_mensaje: number,
  dias_disponible: number,
  price: number,
  estado: boolean
}
const CardPlanes: React.FC<CardPlanesInterface> = ({
  tiene_titulo = true,
  version_pequena = false
}) => {

  const {
    rex_planes,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,
  } = useSelector(({ planes }: RootState) => planes);

  const dispatch = useDispatch<AppDispatch>();

  const [dataPlanes, setDataPlanes] = useState<planesInterface[]>([{
    id: 0,
    plan: "",
    total_mensaje: 0,
    dias_disponible: 0,
    price: 0,
    estado: true
  }])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanes = async () => {
      await dispatch(
        FetchPlanesReducer(
          rex_meta?.page || 1,
          rex_meta?.limit || 10,
          rex_sortColumn,
          rex_sortOrder
        )
      );
      if (rex_planes.length === 0) {
        // message.info('No se encontraron planes.');
      }
    };
    fetchPlanes();

  }, []);

  useEffect(() => {
    if (rex_planes) {

      setDataPlanes(rex_planes)
    }
  }, [rex_planes]);

  const handleClick = (data: any) => {
    const plan = {
      id: data.id,
      nombre: data.plan,
      importe: data.price,
      suscripcion_id: 0,
      pago_id: data.id,
    }

    navigate('/checkout', { state: { plan } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {
        tiene_titulo && (
          <h1 style={{ margin: 0 }}>Planes</h1>
        )
      }

      <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {dataPlanes.map((data, index) => (
          <Col
            xxl={version_pequena ? 24 : 6}
            xl={version_pequena ? 24 : 6}
            md={version_pequena ? 24 : 6}
          >
            {/* <Card
              key={index}
              style={{ width: 240 }}
              onClick={() => handleClick(data)}
              hoverable
            >
              <Meta 
                title={data.plan} 
                description={data.price} 
              />
            </Card> */}
            <CardPricing
              title={data.plan}
              subTitle='Plan mensual'
              image={
                index == 0
                  ? Bot01
                  : index == 1
                    ? Bot02
                    : Bot03
              }
              pricing={data.price}
              pricingMo={0}
              index={index}
              version_pequena={version_pequena}
              estado={data.estado}
            />
          </Col>

        ))}
      </Row>
    </div>

  );
};

export default CardPlanes;
