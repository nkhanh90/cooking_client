import React from 'react';
import { Container } from 'reactstrap';
import styles from 'styled-components';

const Header = () => (
  <Div>
    <Container>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="How to graphql" height="44" />
          {/* <Logan>How to Graphql</Logan> */}
        </div>
      </div>
    </Container>
  </Div>
);

const Div = styles.div`
  padding: 5px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

// const Logan = styles.div`
//   margin-left: 5px;
//   color: #e00082;
//   font-weight: 600;
//   text-transform: uppercase;
// `;

export default Header;
