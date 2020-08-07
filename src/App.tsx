import 'react-native-gesture-handler';
import React from 'react';

// Redux
import {Provider} from 'react-redux';
import store from './store';

// Screens
import Home from './screens/home';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
