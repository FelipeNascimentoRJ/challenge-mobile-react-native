import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Redux
import {Provider} from 'react-redux';
import store from './store';

// Theme
import ITheme from './themes/type';
import {ThemeProvider} from 'styled-components';
import {ThemeContext, getTheme} from './themes';

// Utils
import Store from './utils/store';

// Screens
import HomeScreen from './screens/home';
import SearchScreen from './screens/search';

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState<ITheme>(getTheme('light'));

  const changeTheme = async (name: string) => {
    setTheme(getTheme(name));
    await Store.set('theme', name);
  };

  const themeToggle = async () => {
    if (theme.title === 'light') {
      changeTheme('dark');
    } else {
      changeTheme('light');
    }
  };

  useEffect(() => {
    (async () => {
      const themeStore = await Store.get('theme');
      setTheme(getTheme(themeStore !== null ? themeStore : 'light'));
    })();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={{theme, themeToggle}}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}
