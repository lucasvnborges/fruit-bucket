import { FC, useState } from "react";
import { useBucketStore } from "../store";
import { Form, InputNumber, Modal } from "antd";

type Props = {
  visibility: boolean;
  toggleVisibility: () => void;
};

export const CreateBucketModal: FC<Props> = ({
  visibility,
  toggleVisibility,
}: Props) => {
  const { addBucket } = useBucketStore();

  const [form] = Form.useForm();
  const [isBusy, setIsBusy] = useState(false);

  function handleCreateBucket() {
    const id = Date.now().toString();
    const fruitCapacity = form.getFieldValue("fruitCapacity");

    if (!fruitCapacity) return;

    const bucket = {
      id,
      fruits: [],
      occupation: 0,
      totalPrice: 0,
      fruitCapacity,
    };

    setIsBusy(true);
    addBucket(bucket);
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
      title="Criar novo balde"
      onOk={handleCreateBucket}
      onCancel={handleCloseModal}
      okButtonProps={{ loading: isBusy }}
    >
      <p>Informe abaixo o número limite de frutas possíveis nesse balde</p>
      <Form form={form} layout="vertical">
        <Form.Item
          name="fruitCapacity"
          rules={[
            {
              required: true,
              message: "Por favor insira um número!",
            },
            {
              type: "number",
              min: 1,
              message: "O número limite deve ser maior que zero!",
            },
          ]}
        >
          <InputNumber type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
