import React from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Components
import ListEmpty from '../list-empty';
import ListItem from '../list-item';
import ListFooter from '../list-footer';

// Styles
import {List as ListBuild} from './styles';

export interface IList {
  onPress: (character: ICharacter) => void;
}

export default function List({onPress}: IList) {
  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const characters = useSelector(
    (state: IApplicationState) => state.characters,
  );

  const handleLoadMore = () => dispatch(actions.charactersRequest());

  return (
    <ListBuild
      data={characters.data}
      renderItem={({item}) => <ListItem character={item} onPress={onPress} />}
      keyExtractor={(item) => `${item.id}`}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<ListEmpty />}
      ListFooterComponent={<ListFooter />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
}
