import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px 10px;
  height: 160px;
  background-color: #fff;
  border-radius: 15px;
`;

export const Image = styled.Image`
  width: 140px;
  height: 160px;
  border-color: #f5f5f5;
  border-top-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const Content = styled.View`
  flex: 1;
  border-color: #f5f5f5;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Name = styled.Text`
  flex: 1;
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
`;

export const Description = styled.Text`
  flex: 1;
  padding: 10px;
  color: #666;
  align-items: flex-start;
  justify-content: center;
`;

export interface IText {
  color?: string;
  bold?: boolean;
}

export const Text = styled.Text<IText>`
  color: ${({color}) => (color ? color : '#666')};
  font-size: 12px;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;

export const Footer = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
