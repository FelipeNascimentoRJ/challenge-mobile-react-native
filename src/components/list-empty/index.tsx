import React, {memo, useContext} from 'react';

// Icon
import Icon from 'react-native-vector-icons/MaterialIcons';

// Theme
import {ThemeContext} from '../../themes';

// Styles
import {Container, Title} from './styles';

function ListEmpty() {
  // Theme
  const {theme} = useContext(ThemeContext);

  return (
    <Container>
      <Icon name="stars" size={150} color={theme.primary} />
      <Title>Marvel Heroes</Title>
    </Container>
  );
}

export default memo(ListEmpty);
