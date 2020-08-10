import React, {memo} from 'react';

// Components
import {ActivityIndicator} from 'react-native';

// Redux
import {useSelector} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Styles
import {Container} from './styles';

function ListFooter() {
  const {characters, favorite} = useSelector(
    (state: IApplicationState) => state,
  );

  if (!characters.loading || favorite.enabled === true) {
    return null;
  }

  return (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  );
}

export default memo(ListFooter);
