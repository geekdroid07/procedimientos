import React, { useState } from 'react';
import { Button, Empty, Table, Modal, Input, Form } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const Procedimientos = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [procedures, setProcedures] = useState([
      { key: 0, procedure: 'Esclerosis', code: '3425', claimed: 'RD$ 500', difference: 'RD$ 500', authorized: 'RD$ 500' },
    ]);
    const [nextKey, setNextKey] = useState(1);

  
    const handleEditClick = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const handleSaveChanges = () => {
      form.validateFields().then((values) => {
        setProcedures(values.procedures);
        setIsModalVisible(false);
      });
    };
  
    const handleAddProcedure = () => {
      const newProcedures = [...form.getFieldValue('procedures'), { key: nextKey, procedure: '', code: '', claimed: '', difference: '', authorized: '' }];
      form.setFieldsValue({ procedures: newProcedures });
      setNextKey(nextKey + 1);
    };
  
    const handleRemoveProcedure = (key) => {
        const procedures = form.getFieldValue('procedures');
        const newProcedures = form.getFieldValue('procedures').filter((item) => item.key !== procedures[key]?.key);
        form.setFieldsValue({ procedures: newProcedures });
        setNextKey(nextKey - 1);
    };
  
    const dataSource = procedures;
  
    const columns = [
        {
            title: 'Procedimiento 01',
            dataIndex: 'procedure',
            key: 'procedure',
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Reclamado',
            dataIndex: 'claimed',
            key: 'claimed',
        },
        {
            title: 'Diferencia RD$',
            dataIndex: 'difference',
            key: 'difference',
        },
        {
            title: 'Autorizado RD$',
            dataIndex: 'authorized',
            key: 'authorized',
        },
    ];

    return (

        <div>

            <Modal
                width={1000}
                title={<div>Procedimientos <Button type="link" icon={<PlusOutlined />} onClick={handleAddProcedure}>Añadir procedimiento</Button></div>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="save" type="primary" onClick={handleSaveChanges}>Guardar cambios</Button>,
                ]}
            >
                <Form form={form} initialValues={{ procedures }} layout="vertical">
                <Form.List name="procedures">
                    {(fields) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => {
                        return (
                        <div key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}>
                            <Form.Item {...restField} name={[name, 'procedure']} fieldKey={[fieldKey, 'procedure']} label={`Procedimiento ${name + 1}`} style={{ flex: 1, marginRight: 8 }}>
                            <Input placeholder="Ej: 4563523" />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'code']} fieldKey={[fieldKey, 'code']} label="Código" style={{ flex: 1, marginRight: 8 }}>
                            <Input placeholder="Ej: 4563523" />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'claimed']} fieldKey={[fieldKey, 'claimed']} label="Reclamado RD$" style={{ flex: 1, marginRight: 8 }}>
                            <Input placeholder="Ej: 4563523" />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'difference']} fieldKey={[fieldKey, 'difference']} label="Diferencia RD$" style={{ flex: 1, marginRight: 8 }}>
                            <Input placeholder="Ej: 4563523" />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'authorized']} fieldKey={[fieldKey, 'authorized']} label="Autorizado RD$" style={{ flex: 1, marginRight: 8 }}>
                            <Input placeholder="Ej: 4563523" />
                            </Form.Item>
                            <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleRemoveProcedure(key)} />
                        </div>
                        )})}
                    </>
                    )}
                </Form.List>
                </Form>
            </Modal>

        {dataSource.length > 0 ? 
             <div style={{ padding: 30, height: '100vh', backgroundColor: '#f5f5f5' }}>
             <h1 style={{ marginBottom: '2rem' }}>Procedimientos</h1>
             <Table
               dataSource={dataSource}
               columns={columns}
               pagination={false}
               bordered
               style={{ marginBottom: '2rem' }}
             />
             <Button type="primary" onClick={handleEditClick} icon={<EditOutlined />}>
               Editar procedimientos
             </Button>
           </div> :            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
                <h1 style={{ marginBottom: '2rem' }}>Procedimientos</h1>
                <Empty description="No hay datos que mostrar">
                    <Button type="primary" onClick={handleEditClick} icon={<EditOutlined />}>
                    Editar procedimientos
                    </Button>
                </Empty>
            </div>
            }
        </div>
    );
};

export default Procedimientos;
