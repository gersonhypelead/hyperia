import React, { useState } from 'react';
import {
  Card,
  Col,
  ColorPicker,
  Input,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import ChatComponent from '../../../../components/chat/ChatComponent';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import NoAccess from '../../../../components/pages/chat/NoAccess';

type LabelRender = SelectProps['labelRender'];
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const options = [
  { label: 'gold', value: 'gold' },
  { label: 'lime', value: 'lime' },
  { label: 'green', value: 'green' },
  { label: 'cyan', value: 'cyan' },
];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>value</span>;
};

const TabDesign: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fontSize, setFontSize] = useState<string>();
  const [fontFamily, setFontFamily] = useState<string>();
  const [nombreChat, setNombreChat] = useState<string>();
  const [inputPlaceholder, setInputPlaceholder] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      {
        localStorage.getItem("chat_seleccionado") ? (
          <Card>
            <Row>
              <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                <Row>
                  <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                    <span>Selecciona un chat</span>
                    <Select
                      labelRender={labelRender}
                      defaultValue="1"
                      style={{ width: '100%' }}
                      options={options}
                    />
                  </Col>
                  <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                    <span>Exporta un chat de ejemplo</span>
                    <Select
                      labelRender={labelRender}
                      defaultValue="1"
                      style={{ width: '100%' }}
                      options={options}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xl={24} md={24} style={{ paddingRight: '10px' }}>
                    <h3 style={{ lineHeight: '0.5' }}>Customiza tu chat</h3>
                  </Col>
                  <Col xl={12} md={12}>
                    <span>Font Size</span>
                    <Input onBlur={(e) => setFontSize(e.target.value)} />
                  </Col>
                  <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                    <span>Font Family</span>
                    <Input onBlur={(e) => setFontFamily(e.target.value)} />
                  </Col>

                  {/*  */}

                  <Col xl={12} md={12} style={{ marginTop: '10px' }}>
                    <span>Nombre del chat</span>
                    <Input onBlur={(e) => setNombreChat(e.target.value)} />
                  </Col>
                  <Col
                    xl={12}
                    md={12}
                    style={{ paddingLeft: '10px', marginTop: '10px' }}
                  >
                    <span>Input placeholder</span>
                    <Input onBlur={(e) => setInputPlaceholder(e.target.value)} />
                  </Col>

                  {/*  */}

                  <Col xl={12} md={12} style={{ marginTop: '10px' }}>
                    <span>Logo del Chat</span>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Col>
                  <Col
                    xl={12}
                    md={12}
                    style={{ paddingLeft: '10px', marginTop: '10px' }}
                  >
                    <span>Icono de boton enviar mensaje</span>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Col>

                  <Col
                    xl={6}
                    md={6}
                    style={{ paddingLeft: '10px', marginTop: '10px' }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ marginBottom: '-15px' }}>C. del Header</div>
                      <br />
                      <ColorPicker defaultValue="#1677ff" size="small" showText />
                    </div>
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    style={{ paddingLeft: '10px', marginTop: '10px' }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ marginBottom: '-15px' }}>C. del Titulo</div>
                      <br />
                      <ColorPicker defaultValue="#1677ff" size="small" showText />
                    </div>
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    style={{ paddingLeft: '10px', marginTop: '10px' }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ marginBottom: '-15px' }}>
                        C. del T. del Emisor
                      </div>
                      <br />
                      <ColorPicker defaultValue="#1677ff" size="small" showText />
                    </div>
                  </Col>
                  <Col
                    xl={6}
                    md={6}
                    style={{ paddingLeft: '10px', marginTop: '10px' }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ marginBottom: '-15px' }}>
                        C. T. del Receptor
                      </div>
                      <br />
                      <ColorPicker defaultValue="#1677ff" size="small" showText />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                <ChatComponent
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  nombreChat={nombreChat}
                  inputPlaceholder={inputPlaceholder}
                />
              </Col>
            </Row>
          </Card>
        ) : (
          <NoAccess />
        )
      }
    </>
  );
};

export default TabDesign;
