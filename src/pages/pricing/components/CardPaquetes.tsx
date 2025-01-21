import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { FetchPaquetesMensajesReducer } from '../../../redux/actions/paquetes_mensajes/paquetesMensajesAction';
const { Meta } = Card;

interface paqueteInterface {
  id: number,
  paquete: string,
  total_mensaje: number,
  precio_eur: number,
}

interface CardPaquetesInterface {
  tiene_titulo?: boolean;
}

const CardPaquetes: React.FC<CardPaquetesInterface> = ({
  tiene_titulo = true
}) => {

  const {
    rex_paquetes_mensajes,
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder,

  } = useSelector(({ paquetesMensajes }: RootState) => paquetesMensajes);

  const dispatch = useDispatch<AppDispatch>();
  const [dataPaquetes, setDataPaquetes] = useState<paqueteInterface[]>([{
    id: 0,
    paquete: "",
    total_mensaje: 0,
    precio_eur: 0
  }])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaquetesMensajes = async () => {
      await dispatch(
        FetchPaquetesMensajesReducer(
          rex_meta?.page || 1,
          rex_meta?.limit || 10,
          rex_sortColumn,
          rex_sortOrder
        )
      );
      if (rex_paquetes_mensajes.length === 0) {
        // message.info('No se encontraron paquetes de mensajes.');
      }
    };
    fetchPaquetesMensajes();
  }, []);

  useEffect(() => {
    if (rex_paquetes_mensajes) {

      setDataPaquetes(rex_paquetes_mensajes)
    }
  }, [rex_paquetes_mensajes]);
  const handleClick = (data: any) => {
    const plan = {
      id: data.data.id,
      nombre: data.data.paquete,
      importe: data.data.precio_eur,
      suscripcion_id: data.data.id,
      pago_id: 0,
    }
    navigate('/checkout', { state: { plan } });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {
        tiene_titulo && (
          <h1 style={{ margin: 0 }}>Paquetes</h1>
        )
      }

      <div
        style={{
          display: 'flex',
          gap: '20px',
          // justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {dataPaquetes.map((data, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: 240 }}
            onClick={() => handleClick({ data })}
          >
            <Meta title={data.paquete} description={"$ " + data.precio_eur} />
          </Card>
        ))}
      </div>
    </div>

  );
};

export default CardPaquetes;






