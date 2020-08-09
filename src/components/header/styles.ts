import styled from 'styled-components/native';

import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const Container = styled.View<IThemeExport>`
  height: 56px;
  padding: 10px 0px 10px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${themeProps('background')};
  border-color: ${themeProps('border')};
  border-bottom-width: 1px;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 38px;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
