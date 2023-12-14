import { Page404 } from './components/404';
import { App } from './components/app';
import { LeftSidePanel, getPlanetLoader } from './components/left-side-panel';
import { Spinner } from './components/spinner';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/planets/:name',
        include: ['/', '/planets'],
        element: <LeftSidePanel />,
        loader: getPlanetLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <Spinner />,
  },
];
