
import App from './App';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
];

export default routes;
