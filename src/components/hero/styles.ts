import styled from 'styled-components/native';

// Component
import {FlatList} from 'react-native';

import {IThemeExport} from '../../themes/type';
import {themeProps} from '../../themes';

export const Modal = styled.Modal`
  flex: 1;
`;

export interface IContainer {
  background?: string;
}

export const Container = styled.View<IContainer>`
  flex: 1;
  background-color: ${({background}) =>
    background ? background : 'rgba(0, 0, 0, 0.3)'};
`;

export const Content = styled.View<IThemeExport>`
  flex: 1;
  margin-top: 80px;
  background-color: ${themeProps('background')};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Image = styled.Image<IThemeExport>`
  width: 100%;
  height: 260px;
  border-color: ${themeProps('border')};
  border-bottom-width: 1px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const FloatButtonContainer = styled.View`
  position: absolute;
`;

export const Scroll = styled.ScrollView.attrs(() => ({
  horizontal: false,
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 10,
  },
}))``;

export const Row = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.Text<IThemeExport>`
  font-size: 22px;
  font-weight: bold;
  color: ${themeProps('heading')};
`;

export const Description = styled.Text<IThemeExport>`
  padding: 10px;
  color: ${themeProps('text')};
`;

export const List = styled(FlatList as new () => FlatList)`
  margin-right: 10px;
  padding: 0px 10px;
`;

export const ListTitle = styled(Name)`
  padding: 10px;
`;

export const ListItemContainer = styled.TouchableOpacity<IThemeExport>`
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  margin-right: 10px;
  padding: 30px;
  background-color: ${themeProps('shape')};
  border-radius: ${themeProps('radius')}px;
`;

export const ListItem = styled.Text<IThemeExport>`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: ${({theme: {text}}) => text};
`;

/**
 * Items
 */
export const ItemTitle = styled(Name)`
  padding: 10px;
`;

export const ItemImage = styled(Image)``;

export const ItemDescription = styled(Description)``;

export interface IItemButton extends IThemeExport {
  color: string;
}

export const ItemButton = styled.TouchableOpacity<IItemButton>`
  margin: 10px;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${({color}) => color};
  border-radius: ${themeProps('radius')}px;
`;

export interface IItemButton {
  color: string;
}

export const ItemButtonLabel = styled(Name)<IItemButton>`
  font-size: 18px;
  font-weight: bold;
  color: ${({color}) => color};
`;
