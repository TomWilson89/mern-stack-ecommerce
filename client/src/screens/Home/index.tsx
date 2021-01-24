import React, { FunctionComponent } from "react";
import { Row, Col } from "react-bootstrap";

import { Product } from "../../components";
import { api } from "../../helpers/api";
import { ProductState } from "../Product/model/products.types";

const Home: FunctionComponent = () => {
  const [products, setProducts] = React.useState<ProductState[]>([]);

  React.useEffect(() => {
    const getList = async () => {
      const { data } = await api.get("/products");

      setProducts(data);
    };

    getList();
  }, []);
  return (
    <>
      <h1>latest products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
