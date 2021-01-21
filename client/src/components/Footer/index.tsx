import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Shop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
