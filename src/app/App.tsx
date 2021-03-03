import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NoAuthTemplate } from 'themes';
import { Async } from 'components/common';
import router from './routes';

const App = () => {
  const availabelRoutes = router;

  const routeRenderer = (Layout: FC, pageComponent: string, noAuth = false) => (
    <Layout>
      <Async page={pageComponent} />
    </Layout>
  );

  const routeListRedenrer = () =>
    availabelRoutes.map(({ noAuth, path, pageComponent, layout, isExact = false }, index) => {
      const template = layout || NoAuthTemplate;
      return (
        <Route
          key={`${pageComponent}-root`}
          path={path}
          exact={isExact}
          render={() => routeRenderer(template, pageComponent, noAuth)}
        />
      );
    });

  return (
    <div className="App">
      <Router>
        <Switch>{routeListRedenrer()}</Switch>
      </Router>
    </div>
  );
};

export default App;
