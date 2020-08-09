import {createContext} from 'react';

import ITheme, {IThemeExport} from './type';
import DarkTheme from './dark';
import LightTheme from './light';

export const ThemeContext = createContext({
  theme: LightTheme,
  themeToggle: () => {},
});

export function getTheme(theme: string): ITheme {
  if (theme === 'dark') {
    return DarkTheme;
  }

  return LightTheme;
}

// @ts-ignore
export const themeProps = (key: string) => ({
  theme,
}: Omit<IThemeExport, 'themeToggle'>): any => theme[key];
