import React, {memo, useMemo, useCallback} from 'react';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Components
import ListEmpty from '../list-empty';
import ListItem from '../list-item';
import ListFooter from '../list-footer';

// Styles
import {List as ListBuild} from './styles';

export interface IList {
  data: Array<ICharacter>;
  onLoadMore?: () => void;
  onPress: (character: ICharacter) => void;
}

function List({data, onLoadMore, onPress}: IList) {
  const keyExtractor = (item: ICharacter) => `${item.id}`;

  const renderItem = useCallback(
    ({item}: {item: ICharacter}) => (
      <ListItem character={item} onPress={onPress} />
    ),
    [onPress],
  );

  return useMemo(
    () => (
      <ListBuild
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmpty />}
        ListFooterComponent={<ListFooter />}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
      />
    ),
    [data, onLoadMore, renderItem],
  );
}

export default memo(List);
