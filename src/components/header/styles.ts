import styled from 'styled-components/native';

export const Container = styled.View`
  height: 56px;
  padding: 10px 0px 10px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-color: #f5f5f5;
  border-bottom-width: 1px;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 30px;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
