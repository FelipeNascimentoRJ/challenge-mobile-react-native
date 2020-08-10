import React, {useMemo} from 'react';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Components
import ItemContent from '../list-item/content';

export interface IListItem {
  character: ICharacter;
  onPress: (character: ICharacter) => void;
}

const ListItem = ({character, onPress}: IListItem) => {
  return useMemo(
    () => (
      <ItemContent character={character} onPress={() => onPress(character)} />
    ),
    [character, onPress],
  );
};

export default ListItem;
