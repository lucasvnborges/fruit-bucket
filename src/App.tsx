import { CSSProperties, useMemo, useState } from "react";
import useBucketStore from "./store/bucket.store";
import useFruitStore from "./store/fruit.store";
import { Alert, Button, Empty, Row } from "antd";
import {
  CreateBucketModal,
  CreateFruitModal,
  Bucket,
  Fruit,
} from "./components";

function App() {
  const { buckets } = useBucketStore();
  const { fruits } = useFruitStore();

  const [createBucketModal, setCreateBucketModal] = useState(false);
  const [createFruitModal, setCreateFruitModal] = useState(false);

  function toggleCreateBucketModal() {
    setCreateBucketModal(!createBucketModal);
  }

  function toggleCreateFruitModal() {
    setCreateFruitModal(!createFruitModal);
  }

  const renderBuckets = useMemo(
    () =>
      buckets
        .sort((a, b) => b.occupation - a.occupation)
        .map((bucket) => <Bucket key={bucket.id} bucket={bucket} />),
    [buckets]
  );

  const renderFruits = useMemo(
    () => fruits.map((fruit) => <Fruit key={fruit.id} fruit={fruit} />),
    [fruits]
  );

  return (
    <div style={{ ...container }}>
      <Row style={{ ...header }}>
        <h1>Balde de frutas</h1>

        <Row>
          <Button style={{ ...button }} onClick={toggleCreateFruitModal}>
            Criar fruta
          </Button>
          <Button type="primary" onClick={toggleCreateBucketModal}>
            Criar balde
          </Button>
        </Row>
      </Row>

      {buckets.length === 0 && fruits.length === 0 ? (
        <>
          <Alert
            showIcon
            type="info"
            message="Comece adicionando novos baldes ou frutas"
          />
          <Empty description={false} style={{ ...emptycontent }} />
        </>
      ) : (
        <>
          <Row>{renderBuckets}</Row>

          <Row>{renderFruits}</Row>

          {fruits.length > 0 && (
            <Alert
              showIcon
              type="info"
              style={{ ...alert }}
              message="Arraste e solte as frutas nos baldes."
            />
          )}
        </>
      )}

      <CreateBucketModal
        visibility={createBucketModal}
        toggleVisibility={toggleCreateBucketModal}
      />

      <CreateFruitModal
        visibility={createFruitModal}
        toggleVisibility={toggleCreateFruitModal}
      />
    </div>
  );
}

const container: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: "720px",
};

const header: CSSProperties = {
  padding: 4,
  marginBottom: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const button: CSSProperties = {
  marginRight: 12,
};

const emptycontent: CSSProperties = {
  marginTop: 24,
};

const alert: CSSProperties = {
  margin: 4,
};

export default App;
