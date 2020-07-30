import * as React from 'react';
import {Notifications} from 'react-native-notifications';

import Containter from './src/navigation/Stack.js';

const App = () => {
  Notifications.registerRemoteNotifications();
  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    (event: RegistrationError) => {
      console.error(event);
    },
  );
  return <Containter />;
};

export default App;
