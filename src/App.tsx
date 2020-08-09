import React, {useState, useEffect} from 'react';

// Redux
import {Provider} from 'react-redux';
import store from './store';

// Theme
import {ThemeProvider} from 'styled-components';
import {ThemeContext, getTheme} from './themes';

// Utils
import Store from './utils/store';

// Screens
import Home from './screens/home';
import ITheme from './themes/type';

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
          <Home />
        </ThemeContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}
