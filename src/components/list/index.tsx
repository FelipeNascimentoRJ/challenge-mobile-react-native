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
  search?: string;
  onPress: (character: ICharacter) => void;
}

export default function List({search, onPress}: IList) {
  // Dispatch
  const dispatch = useDispatch();

  // Redux State
  const {characters, favorite} = useSelector(
    (state: IApplicationState) => state,
  );

  const handleLoadMore = () => {
    if (search !== undefined || favorite.enabled === true) {
      return;
    }

    dispatch(actions.charactersRequest());
  };

  // Filter Search
  const searching = () => {
    if (search !== undefined && characters.data !== null) {
      const loweSearch = search.toLowerCase();

      return characters.data.filter((character: ICharacter) => {
        if (
          character.name !== undefined &&
          character.name.toLowerCase().includes(loweSearch)
        ) {
          return true;
        }

        return false;
      });
    }

    return [];
  };

  const renderEmpty = <ListEmpty />;

  const renderRooter = () => {
    if (search !== undefined || favorite.enabled === true) {
      return null;
    }

    return <ListFooter />;
  };

  const keyExtractor = (item: ICharacter) => `${item.id}`;

  const renderItem = ({item}: {item: ICharacter}) => (
    <ListItem character={item} onPress={onPress} />
  );

  let data: Array<ICharacter> = [];

  if (search !== undefined) {
    data = searching();
  } else if (characters.data !== null && favorite.enabled) {
    data = characters.data.filter((character) => character.favorite === true);
  } else {
    data = characters.data !== null ? characters.data : [];
  }

  return (
    <ListBuild
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderRooter()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
}
