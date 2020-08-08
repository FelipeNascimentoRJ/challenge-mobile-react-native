import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  height: 56px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-color: #ccc;
  border-bottom-width: 1px;
`;

export const Search = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border: #ccc solid 1px;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: red;
  background-color: transparent;
`;
