import type { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";
import useBucketStore from "../store/bucket.store";
import useFruitStore from "../store/fruit.store";
import { Button, Card, Row } from "antd";

const style: CSSProperties = {
  margin: 4,
  marginTop: 16,
  marginRight: 6,
  marginBottom: 6,
  cursor: "move",
};

export interface Props {
  fruit: Fruit;
}

interface DropTarget {
  id: string;
}

export const Fruit: FC<Props> = function Fruit({ fruit }) {
  const { buckets, addFruitToBucket } = useBucketStore();
  const { deleteFruit } = useFruitStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { name: fruit.name },
    end: (item, monitor) => {
      const dropTarget = monitor.getDropResult<DropTarget>();

      if (item && dropTarget) {
        const bucketId = dropTarget.id;
        const bucket = buckets.find((b) => b.id === bucketId);

        if (bucket && bucket.occupation < 100) {
          addFruitToBucket(bucketId, fruit);
          deleteFruit(fruit.id);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Card
      ref={drag}
      size="small"
      data-testid="box"
      style={{ ...style, opacity }}
    >
      <Row>
        <span style={{ marginRight: 6 }}>
          <b>{fruit.name}</b>
        </span>

        <Button
          size="small"
          type="dashed"
          onClick={() => deleteFruit(fruit.id)}
        >
          x
        </Button>
      </Row>

      <span>R$ {fruit.price}</span>
    </Card>
  );
};
