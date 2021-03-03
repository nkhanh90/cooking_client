import { FC } from 'react';
import AuthTemplate from 'themes/AuthTemplate';

interface IRouterPattern {
  path: string;
  noAuth?: boolean;
  pageComponent: string;
  isExact?: boolean;
  layout?: FC;
}

const routes: IRouterPattern[] = [
  {
    path: '/login',
    noAuth: true,
    pageComponent: 'Login',
  },
  {
    path: '/recipes',
    pageComponent: 'recipes/list',
    layout: AuthTemplate,
  },
  {
    path: '/recipe/:id/edit',
    pageComponent: 'recipes/form',
    layout: AuthTemplate,
  },
  {
    path: '/recipe/:id',
    pageComponent: 'recipes/detail',
    layout: AuthTemplate,
  },
];

export default routes;
