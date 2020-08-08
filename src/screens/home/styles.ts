import styled from 'styled-components/native';
import {FlatList} from 'react-native';

export const Screen = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  height: 56px;
  padding: 10px 0px 10px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-color: #f5f5f5;
  border-bottom-width: 1px;
`;

export const HeaderLogo = styled.Image`
  width: 150px;
  height: 30px;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const CharacterList = styled(FlatList as new () => FlatList)`
  background-color: #fff;
`;

export const CharacterContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px 10px;
  height: 160px;
  background-color: #fff;
  border-radius: 15px;
`;

export const CharacterImage = styled.Image`
  width: 140px;
  height: 160px;
  border-color: #f5f5f5;
  border-top-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const CharacterContent = styled.View`
  flex: 1;
  border-color: #f5f5f5;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const CharacterTitle = styled.Text`
  flex: 1;
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
`;

export const CharacterDescription = styled.Text`
  flex: 1;
  padding: 10px;
  color: #666;
  align-items: flex-start;
  justify-content: center;
`;

export const CharacterFooter = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export interface ICharacterText {
  color?: string;
  bold?: boolean;
}

export const CharacterText = styled.Text<ICharacterText>`
  color: ${({color}) => (color ? color : '#666')};
  font-size: 12px;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;
