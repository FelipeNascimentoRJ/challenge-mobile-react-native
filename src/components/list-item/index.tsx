import React from 'react';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Components
import ItemContent from '../list-item/content';

export interface IListItem {
  character: ICharacter;
  onPress: (character: ICharacter) => void;
}

const ListItem = ({character, onPress}: IListItem) => (
  <ItemContent character={character} onPress={() => onPress(character)} />
);

export default ListItem;
