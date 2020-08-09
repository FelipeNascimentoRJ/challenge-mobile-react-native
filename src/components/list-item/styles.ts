import styled from 'styled-components/native';

import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const Container = styled.TouchableOpacity<IThemeExport>`
  flex-direction: row;
  margin: 10px 10px;
  height: 160px;
  background-color: ${themeProps('shape')};
  border-radius: ${themeProps('radius')}px;
`;

export const Image = styled.Image<IThemeExport>`
  width: 140px;
  height: 160px;
  border-color: ${themeProps('border')};
  border-top-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-top-left-radius: ${themeProps('radius')}px;
  border-bottom-left-radius: ${themeProps('radius')}px;
`;

export const Content = styled.View<IThemeExport>`
  flex: 1;
  border-color: ${themeProps('border')};
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-top-right-radius: ${themeProps('radius')}px;
  border-bottom-right-radius: ${themeProps('radius')}px;
`;

export const Name = styled.Text<IThemeExport>`
  flex: 1;
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
  color: ${themeProps('heading')};
`;

export const Description = styled.Text<IThemeExport>`
  flex: 1;
  padding: 10px;
  color: ${themeProps('text')};
  align-items: flex-start;
  justify-content: center;
`;

export interface IText extends IThemeExport {
  bold?: boolean;
}

export const Text = styled.Text<IText>`
  color: ${themeProps('text')};
  font-size: 12px;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;

export const Footer = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
