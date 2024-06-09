import type { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { Button, Col, Row } from "antd";
import useBucketStore from "../store/bucket.store";

export interface Props {
  bucket: Bucket;
}

export const Bucket: FC<Props> = ({ bucket }) => {
  const { deleteBucket } = useBucketStore();

  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop: () => ({}),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

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
          <p>
            Total: <b>R$ {bucket.totalPrice}</b>
          </p>
          <p style={{ marginLeft: 6 }}>
            {bucket.fruits.length}/{bucket.fruitCapacity}
          </p>
        </Row>
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
