import { lazy, FC } from 'react';
import LayoutPage from 'pages/layout';
import WrapperRouteComponent from './config';
import { RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ 'pages/404'));
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ 'pages/guide'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Guide />} titleId="title.guide" />
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
