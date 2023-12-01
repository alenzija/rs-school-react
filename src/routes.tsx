import { App } from './app';
import { Layout } from './components/layout';
import {
  FormWithUncontolledComponents,
  ReactHookForm,
} from './components/forms';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/form', element: <FormWithUncontolledComponents /> },
      { path: '/react-hook-form', element: <ReactHookForm /> },
    ],
  },
];
