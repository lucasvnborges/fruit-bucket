import { useState } from "react";
import { Form, Input, Modal } from "antd";
import useFruitStore from "../store/fruit.store";

type Props = {
  visibility: boolean;
  toggleVisibility: () => void;
};

export default function CreateFruitModal({
  visibility,
  toggleVisibility,
}: Props) {
  const { addFruit } = useFruitStore();

  const [form] = Form.useForm();
  const [isBusy, setIsBusy] = useState(false);

  function handleCreateFruit() {
    const id = Date.now().toString();
    const name = form.getFieldValue("name");
    const price = Number(form.getFieldValue("price"));
    const fruit = { id, name, price };

    if (!name || !price) return

    setIsBusy(true);
    addFruit(fruit);
    handleCloseModal();
  }

  function handleCloseModal() {
    setIsBusy(false);
    form?.resetFields();
    toggleVisibility();
  }

  return (
    <Modal
      open={visibility}
      okText="Confirmar"
      cancelText="Cancelar"
      title="Criar nova fruta"
      onOk={handleCreateFruit}
      onCancel={handleCloseModal}
      okButtonProps={{ loading: isBusy }}
    >
      <p>Informe os dados abaixo para criar uma nova fruta</p>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor insira o nome de uma fruta!",
            },
          ]}
        >
          <Input placeholder="Nome da fruta" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Por favor insira um preço!",
            },
          ]}
        >
          <Input
            prefix="R$"
            type="number"
            placeholder="Preço"
            autoComplete="off"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
