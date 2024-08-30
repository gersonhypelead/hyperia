import React, { useEffect, useState } from 'react';
import { Collapse, Checkbox, Spin, Button, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchPermisosTipoUsuario, createOrUpdatePermisosUsuario } from '../../../../redux/actions/permisos/permisosUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';

const { Panel } = Collapse;

const PermisosPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { tipoUsuarioId } = useParams<{ tipoUsuarioId: any }>();
  const tipoUsuarioIdNumber = parseInt(tipoUsuarioId, 10);

  const { permisos, loading } = useSelector((state: RootState) => state.permisosTiposUsuarios);

  const [localPermisos, setLocalPermisos] = useState<any[]>([]);

  useEffect(() => {
    dispatch(FetchPermisosTipoUsuario(tipoUsuarioIdNumber));
  }, [dispatch, tipoUsuarioIdNumber]);

  useEffect(() => {
    setLocalPermisos(permisos);
  }, [permisos]);

  const handleCheckboxChange = (permisoId: number, selected: boolean) => {
    const updatedPermisos = localPermisos.map((tipoPermiso) => ({
      ...tipoPermiso,
      permisos: tipoPermiso.permisos.map((permiso: any) =>
        permiso.id === permisoId ? { ...permiso, seleccionado: selected } : permiso
      ),
    }));
    setLocalPermisos(updatedPermisos);
  };

  const handleGeneralCheckboxChange = (tipoPermisoId: number, selected: boolean) => {
    const updatedPermisos = localPermisos.map((tipoPermiso) =>
      tipoPermiso.id === tipoPermisoId
        ? {
            ...tipoPermiso,
            permisos: tipoPermiso.permisos.map((permiso: any) => ({
              ...permiso, seleccionado: selected
            })),
          }
        : tipoPermiso
    );
    setLocalPermisos(updatedPermisos);
  };

  

  const handleSavePermisos = () => {
    const permisoIds = localPermisos.flatMap((tipoPermiso) =>
      tipoPermiso.permisos
        .filter((permiso: any) => permiso.seleccionado)
        .map((permiso: any) => permiso.id)
    );

    const data = {
      permiso_id: permisoIds,
      tipo_usuario_id: tipoUsuarioIdNumber,
    };

    dispatch(createOrUpdatePermisosUsuario(data));

    message.success('Permisos guardados exitosamente');
  };

  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: '20px' }}>
        <Col>
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleSavePermisos}>Guardar Cambios</Button>
        </Col>
      </Row>
      <h2>Permisos para el Tipo de Usuario {tipoUsuarioIdNumber}</h2>
      {loading ? (
        <Spin />
      ) : (
        <Collapse>
          {localPermisos.map((tipoPermiso) => {
            const allSelected = tipoPermiso.permisos.every((permiso: any) => permiso.seleccionado);
            const someSelected = tipoPermiso.permisos.some((permiso: any) => permiso.seleccionado);

            return (
              <Panel
                header={
                  <Checkbox
                    indeterminate={someSelected && !allSelected}
                    checked={allSelected}
                    onChange={(e) => handleGeneralCheckboxChange(tipoPermiso.id, e.target.checked)}
                  >
                    {tipoPermiso.tipo_permiso}
                  </Checkbox>
                }
                key={tipoPermiso.id}
              >
                {tipoPermiso.permisos.map((permiso: any) => (
                  <Checkbox
                    key={permiso.id}
                    checked={permiso.seleccionado}
                    onChange={(e) => handleCheckboxChange(permiso.id, e.target.checked)}
                  >
                    {permiso.permiso}
                  </Checkbox>
                ))}
              </Panel>
            );
          })}
        </Collapse>
      )}
    </div>
  );
};

export default PermisosPage;
