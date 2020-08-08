import React from 'react';

// Components
import {ActivityIndicator} from 'react-native';

// Redux
import {useSelector} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Styles
import {Container} from './styles';

export default function ListFooter() {
  const characters = useSelector(
    (state: IApplicationState) => state.characters,
  );

  if (!characters.loading) {
    return null;
  }

  return (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  );
}
