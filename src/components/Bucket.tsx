import type { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { Button, Card, Col, Flex, Progress, Row } from "antd";
import useBucketStore from "../store/bucket.store";

export interface Props {
  bucket: Bucket;
}

export const Bucket: FC<Props> = ({ bucket }) => {
  const { deleteBucket, removeFruitFromBucket } = useBucketStore();

  const [, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ id: bucket.id }),
  }));

  return (
    <Col xs={24} md={12}>
      <div ref={drop} style={{ ...container }}>
        <Row>
          <Button
            danger
            size="small"
            type="dashed"
            onClick={() => deleteBucket(bucket.id)}
          >
            x
          </Button>
        </Row>
        <Row style={{ ...header }}>
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
              <span style={{ ...rightspace }}>{fruit.name}</span>

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

const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const rightspace: CSSProperties = {
  marginRight: 6,
};

const progress: CSSProperties = {
  marginTop: 6,
};
