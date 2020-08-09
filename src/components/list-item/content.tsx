import React, {useEffect} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux
import {useDispatch} from 'react-redux';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Components
import Image from './image';

// Utils
import TextLimit from '../../utils/text-limit';
import Shadow from '../../utils/shadow';
import Favorite from '../../utils/favorite';

// Styles
import {Container, Content, Name, Description, Text, Footer} from './styles';

export interface IContent {
  character: ICharacter;
  onPress: (character: ICharacter) => void;
}

export default function ItemContent({character, onPress}: IContent) {
  const {
    id,
    favorite,
    thumbnail,
    name,
    description,
    events,
    series,
  } = character;

  // Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (id !== undefined) {
        if (await Favorite.isFavorite(id)) {
          dispatch(actions.characterFavorite(id));
        } else {
          dispatch(actions.characterNotFavorite(id));
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check is favorite
  const icon = favorite ? 'favorite' : 'favorite-border';
  const color = favorite ? '#ff0000' : '#666';

  // Event
  const eventsLength = events?.items?.length;

  // Serie
  const seriesLength = series?.items?.length;

  return (
    <Container onPress={() => onPress(character)} style={Shadow}>
      <Image thumbnail={thumbnail} />
      <Content>
        {name ? <Name>{TextLimit.limit(name, 18)}</Name> : null}

        {description ? (
          <Description>{TextLimit.limit(description, 60)}</Description>
        ) : null}

        <Footer>
          {events ? (
            <Text
              color={eventsLength ? '#000' : '#666'}
              bold={eventsLength !== 0}>{`Events ${eventsLength}`}</Text>
          ) : null}

          {series ? (
            <Text
              color={seriesLength ? '#000' : '#666'}
              bold={seriesLength !== 0}>{`Series ${seriesLength}`}</Text>
          ) : null}

          <Text color={favorite ? '#000' : '#666'} bold={favorite}>
            Favorite <Icon name={icon} size={11} color={color} />
          </Text>
        </Footer>
      </Content>
    </Container>
  );
}
