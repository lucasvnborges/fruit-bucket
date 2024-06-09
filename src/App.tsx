import { CSSProperties, useState } from "react";
import { Button, Row } from "antd";
import { Bucket } from "./components/Bucket";
import CreateBucketModal from "./components/CreateBucketModal";
import useBucketStore from "./store/bucket.store";

function App() {
  const { buckets } = useBucketStore();

  const [createBucketModal, setCreateBucketModal] = useState(false);

  function toggleCreateBucketModal() {
    setCreateBucketModal(!createBucketModal);
  }

  return (
    <div style={{ ...container }}>
      <Row style={{ ...header }}>
        <h1>Balde de frutas</h1>

        <Row>
          <Button style={{ ...button }}>Criar fruta</Button>
          <Button type="primary" onClick={toggleCreateBucketModal}>
            Criar balde
          </Button>
        </Row>
      </Row>

      <Row>
        {buckets.map((bucket) => (
          <Bucket key={bucket.id} bucket={bucket} />
        ))}
      </Row>

      <CreateBucketModal
        visibility={createBucketModal}
        toggleVisibility={toggleCreateBucketModal}
      />
    </div>
  );
}

const container: CSSProperties = {
  height: "100vh",
  maxWidth: "720px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
};

const header: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 4,
  marginBottom: 6,
};

const button: CSSProperties = {
  marginRight: 12,
};

export default App;
