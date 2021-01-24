import React, { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Rating } from "../../components";
import { ProductState } from "./model/products.types";
import { api } from "../../helpers/api";

type Params = {
  id: string;
};

const ProductScreen: FunctionComponent = () => {
  const { id } = useParams<Params>();
  const [product, setProduct] = React.useState<ProductState>();

  React.useEffect(() => {
    const getProduct = async () => {
      const { data } = await api.get(`/products/${id}`);

      setProduct(data);
    };

    getProduct();
  }, [id]);

  return !product ? (
    <h1>Not found</h1>
  ) : (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name} </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price} </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProductScreen;
