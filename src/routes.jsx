import App from './App';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import CreateMessage from './components/CreateMessage/CreateMessage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'profile', element: <Profile /> },
      { path: 'messages', element: <Messages /> },
      { path: 'create-message', element: <CreateMessage />}
    ],
  },
];

export default routes;
