import styled from 'styled-components/native';

// Component
import {FlatList} from 'react-native';

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

export const Content = styled.View`
  flex: 1;
  margin-top: 80px;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 260px;
  border-color: #ccc;
  border-bottom-width: 1px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const FloatButtonContainer = styled.View`
  position: absolute;
`;

export const Row = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const Description = styled.Text`
  padding: 10px;
  color: #666;
`;

export const List = styled(FlatList as new () => FlatList)`
  margin-right: 10px;
  padding: 0px 10px;
`;

export const ListTitle = styled(Name)`
  padding: 10px;
  color: #666;
`;

export const ListItemContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-right: 10px;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 15px;
`;

export const ListItem = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #999;
`;

/**
 * Items
 */
export const ItemTitle = styled(Name)`
  padding: 10px;
`;

export const ItemImage = styled(Image)``;

export const ItemDescription = styled(Description)``;

export interface IItemButton {
  color: string;
}

export const ItemButton = styled.TouchableOpacity<IItemButton>`
  margin: 10px;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${({color}) => color};
  border-radius: 15px;
`;

export const ItemButtonLabel = styled(Name)`
  font-size: 18px;
  color: #fff;
`;
