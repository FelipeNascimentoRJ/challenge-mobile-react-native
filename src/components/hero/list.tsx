import React, {memo} from 'react';

// Types
import {IEventList, IEventSummary} from '../../services/marvel/types/events';
import {ISeriesList, ISeriesSummary} from '../../services/marvel/types/series';

// Styles
import {ListTitle, List, ListItemContainer, ListItem} from './styles';

export interface IList {
  title: string;
  data: IEventList | ISeriesList;
  onPressItem: (item: IEventSummary | ISeriesSummary) => void;
}

function ListBuild({title, data, onPressItem}: IList) {
  const {items} = data;

  if (items?.length === 0) {
    return null;
  }

  const renderItem = (item: IEventSummary | ISeriesSummary) => (
    <ListItemContainer onPress={() => onPressItem(item)}>
      <ListItem>{item.name}</ListItem>
    </ListItemContainer>
  );

  return (
    <>
      <ListTitle>{title}</ListTitle>
      <List
        data={items}
        horizontal={true}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item) => `${item.name}${Math.random()}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

export default memo(ListBuild);
