import React, { FC } from 'react';
import { Container, Row, Spinner } from 'reactstrap';

type Props = {
  inline?: boolean;
};

const Loader: FC<Props> = (props) => (
  <Container fluid className="vh-100 d-flex align-items-center">
    <Row className="justify-content-center align-self-center w-100 text-center">
      <Spinner color="primary" />
    </Row>
  </Container>
);

export default Loader;
