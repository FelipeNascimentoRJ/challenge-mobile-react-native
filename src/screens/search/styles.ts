import styled from 'styled-components/native';

import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const Screen = styled.SafeAreaView<IThemeExport>`
  flex: 1;
  background-color: ${themeProps('background')};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 25px;
`;

export const Header = styled.View<IThemeExport>`
  height: 56px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${themeProps('background')};
  border-color: ${themeProps('border')};
  border-bottom-width: 1px;
`;

export const Search = styled.View<IThemeExport>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border: ${themeProps('border')} solid 1px;
  border-radius: ${themeProps('radius')}px;
`;

export const Input = styled.TextInput<IThemeExport>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${themeProps('primary')};
  background-color: transparent;
`;

export const Loading = styled.View<IThemeExport>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${themeProps('background')};
`;
