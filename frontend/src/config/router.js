import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import ChatOverlay from '../components/ChatOverlay';
import RegistrationModal from '../components/RegistrationModal';
import PublicOnlyRoute from '../components/PublicOnlyRoute';
import PrivateRoute from '../components/PrivateRoute';
import NoChatSelectedPlug from '../components/NoChatSelectedPlug';

export const router = createBrowserRouter([
  {
    Component: PrivateRoute,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/',
            Component: NoChatSelectedPlug,
          },
          {
            path: '/chat/:chatId',
            Component: ChatOverlay,
          },
        ],
      },
    ],
  },
  {
    Component: PublicOnlyRoute,
    children: [
      {
        path: '/registration',
        Component: RegistrationModal,
      },
    ],
  },
]);
