import React from 'react';

// Icon
import Icon from 'react-native-vector-icons/MaterialIcons';

// Styles
import {Container, Title} from './styles';

export default function ListEmpty() {
  return (
    <Container>
      <Icon name="stars" size={150} color="#ff0000" />
      <Title>Marvel Heroes</Title>
    </Container>
  );
}
