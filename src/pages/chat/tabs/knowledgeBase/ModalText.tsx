import React from 'react';
import { Modal, Input } from 'antd';
import IconClosed from "../../../../assets/IconClosed.svg";

interface ModalTextProps {
  visible: boolean;
  onClose: () => void;
  textInput: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ModalText: React.FC<ModalTextProps> = ({ visible, onClose, textInput, onChange }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      width="70%"
      bodyStyle={{ borderRadius: "12px" }}
    >
      <img
        src={IconClosed}
        alt="Cerrar"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "34px",
          right: "34px",
          cursor: "pointer",
          width: "28px",
          height: "28px",
        }}
      />
      <div className="text-center mx-[100px] my-[35px]">
        <h3 
         style={{
          fontSize: '24px'
        }}
        >Editar Datos de Texto</h3>
        <Input.TextArea
          value={textInput}
          onChange={onChange}
          rows={20}
          style={{ fontSize: '16px', color: 'black' }}
        />
      </div>
    </Modal>
  );
};

export default ModalText;
