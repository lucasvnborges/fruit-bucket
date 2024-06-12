import type { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { useBucketStore } from "../store";
import { Button, Card, Col, Flex, Progress, Row, message } from "antd";

export interface Props {
  bucket: Bucket;
}

export const Bucket: FC<Props> = ({ bucket }) => {
  const { deleteBucket, removeFruitFromBucket } = useBucketStore();

  const [toast, contextToaster] = message.useMessage();
  const [, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ id: bucket.id }),
  }));

  function handleDeleteBucket() {
    if (bucket.fruits.length > 0)
      return toast.warning("O balde precisa estar vazio para ser excluído.");

    deleteBucket(bucket.id);
  }

  return (
    <Col xs={24} md={12}>
      {contextToaster}

      <div ref={drop} style={{ ...container }}>
        <Row style={{ ...row }}>
          <Button
            danger
            size="small"
            type="dashed"
            onClick={handleDeleteBucket}
          >
            x
          </Button>

          <span>
            {bucket.fruits.length === bucket.fruitCapacity &&
              "Alcançou a capacidade máxima"}
          </span>
        </Row>

        <Row style={{ ...row }}>
          <p style={{ ...rightspace }}>
            Total: <b>R$ {bucket.totalPrice}</b>
          </p>
          <p>
            {bucket.fruits.length}/{bucket.fruitCapacity}
          </p>
        </Row>

        <Flex wrap gap={4}>
          {bucket.fruits.map((fruit, index) => (
            <Card size="small" key={fruit.id + index}>
              <span style={{ ...fruitname }}>{fruit.name}</span>

              <Button
                size="small"
                type="dashed"
                onClick={() => removeFruitFromBucket(bucket.id, fruit.id)}
              >
                x
              </Button>
            </Card>
          ))}
        </Flex>

        <Progress
          style={{ ...progress }}
          percent={bucket.occupation}
          steps={bucket.fruitCapacity}
        />
      </div>
    </Col>
  );
};

const container: CSSProperties = {
  margin: 4,
  padding: 12,
  color: "#222",
  borderRadius: 8,
  fontSize: "1rem",
  minHeight: "6rem",
  textAlign: "center",
  lineHeight: "normal",
  border: "1px solid #f0f0f0",
};

const row: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const rightspace: CSSProperties = {
  marginRight: 6,
};

const progress: CSSProperties = {
  marginTop: 6,
};

const fruitname: CSSProperties = {
  marginRight: 6,
  textTransform: "capitalize",
};
