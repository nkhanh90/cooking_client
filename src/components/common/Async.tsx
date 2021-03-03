import React, { lazy, FC, Suspense } from 'react';
import Loader from './Loader';

type Props = {
  page: string;
};

const AsyncComponent: FC<Props> = ({ page }) => {
  const MainComponent = lazy(() => import(`containers/${page}`));
  return (
    <Suspense fallback={<Loader />}>
      <MainComponent />
    </Suspense>
  );
};

export default AsyncComponent;
