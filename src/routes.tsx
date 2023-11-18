import { ShouldRevalidateFunctionArgs } from 'react-router-dom';
import { Page404 } from './components/404';
import { App } from './components/app';
import { LeftSidePanel, getPlanetLoader } from './components/left-side-panel';

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
        shouldRevalidate: (args: ShouldRevalidateFunctionArgs) => {
          const { currentParams, nextParams } = args;
          return currentParams.name !== nextParams.name;
        },
      },
    ],
  },
];
