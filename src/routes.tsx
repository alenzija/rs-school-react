import { App } from './app';
import { FormWithUncontolledComponents, ReactHookForm } from './pages';

export const routes = [
  {
    path: '/',
    element: <App />,
  },
  { path: '/form', element: <FormWithUncontolledComponents /> },
  { path: '/react-hook-form', element: <ReactHookForm /> },
];
