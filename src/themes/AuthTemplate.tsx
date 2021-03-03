import Header from 'components/common/Header';
import React, { FC } from 'react';
import styles from 'styled-components';
import { Container } from 'reactstrap';

type AuthTemplateProps = {
  children?: FC;
};

const AuthTemplate: FC<AuthTemplateProps> = ({ children }) => (
  <Main>
    <Header />
    <Container>
      <div
        style={{
          marginTop: '60px',
          paddingTop: '30px',
        }}
      >
        {children}
      </div>
    </Container>
  </Main>
);

const Main = styles.div`
  background-color: #f5f9fb;
  min-height: 95vh;
`;

export default AuthTemplate;
