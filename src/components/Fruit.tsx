import { useEffect, useRef, type CSSProperties } from "react";
import { useDrag } from "react-dnd";
import { useBucketStore, useFruitStore } from "../store";
import { Button, Card, Row } from "antd";

export interface Props {
  fruit: Fruit;
}

interface DropTarget {
  id: string;
}

export function Fruit({ fruit }: Props) {
  const { addFruitToBucket } = useBucketStore();
  const { deleteFruit } = useFruitStore();

  const bucketsRef = useRef(useBucketStore.getState().buckets);

  useEffect(
    () =>
      useBucketStore.subscribe((state) => (bucketsRef.current = state.buckets)),
    []
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { name: fruit.name },
    end: (item, monitor) => {
      const dropTarget = monitor.getDropResult<DropTarget>();

      if (item && dropTarget) {
        const bucketId = dropTarget.id;
        const bucket = bucketsRef.current.find((b) => b.id === bucketId);

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
      style={{ ...container, opacity }}
    >
      <Row>
        <span style={{ ...fruitname }}>
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
}

const container: CSSProperties = {
  margin: 4,
  marginTop: 16,
  marginRight: 6,
  marginBottom: 6,
  cursor: "move",
};

const fruitname: CSSProperties = {
  marginRight: 6,
  textTransform: "capitalize",
};
