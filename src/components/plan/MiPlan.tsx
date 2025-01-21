import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

interface MiPlanInterface {
  statusText: string;
}

const MiPlan: React.FC<MiPlanInterface> = ({ 
  statusText
}) => {

  const { rex_user_auth } = useSelector(({ auth }: RootState) => auth);

  const currentPlan = rex_user_auth?.planes?.[0];
  const planUsuario = currentPlan?.planes_usuarios?.[0];

  return (
    <div
      style={{
        width: '100%',
        height: '130px',
        backgroundImage: "linear-gradient(137deg, rgba(34, 242, 255, 1) 0%, rgba(0, 255, 194, 1) 100%)",
        position: 'relative',
        borderRadius: '50px',
        boxShadow: '0 4px 8px rgba(12, 12, 12, 0.2)',
        paddingLeft: '40px',
        marginBottom: '20px',
        cursor: 'pointer'
      }}
      onClick={() => {
        console.log("Información completa del usuario:", rex_user_auth);
      }}
    >
      <Row>
        <Col xl={12}
          style={{
            position: 'static'
          }}
        >
          <div
            style={{
              color: '#0C5257'
            }}
          >
            <h3>
              Plan {currentPlan?.plan || "No disponible"}
            </h3>

            <div
              style={{
                position: 'absolute',
                bottom: '5px'
              }}
            >
              {planUsuario?.dias_restantes !== undefined ? (
                <span>{planUsuario.dias_restantes} días restantes</span>
              ) : (
                <span>No hay información de días restantes</span>
              )}
              <div style={{ marginTop: '5px' }}>
                <span>
                  Actualice tu plan aquí.
                </span>
              </div>
              <div style={{ marginTop: '5px', display: 'flex' }}>
                <b>{statusText}</b>
                <div
                  style={{
                    background: 'green',
                    width: '15px',
                    height: '15px',
                    borderRadius: "100%",
                    marginLeft: '5px',
                    marginTop: '4px'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MiPlan;
