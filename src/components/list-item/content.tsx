import React, {useEffect, useContext} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux
import {useDispatch} from 'react-redux';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Theme
import {ThemeContext} from '../../themes';

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

function ItemContent({character, onPress}: IContent) {
  // Theme
  const {theme} = useContext(ThemeContext);

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
        // Need to warn redux
        if (await Favorite.isFavorite(id)) {
          dispatch(actions.characterFavorite(id));
        } else {
          dispatch(actions.characterNotFavorite(id));
        }
      }
    })();
  }, [dispatch, id]);

  // Check is favorite
  const icon = favorite ? 'favorite' : 'favorite-border';
  const color = favorite ? theme.primary : theme.icon;

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
            <Text bold={eventsLength !== 0}>{`Events ${eventsLength}`}</Text>
          ) : null}

          {series ? (
            <Text bold={seriesLength !== 0}>{`Series ${seriesLength}`}</Text>
          ) : null}

          <Text bold={favorite}>
            Favorite <Icon name={icon} size={11} color={color} />
          </Text>
        </Footer>
      </Content>
    </Container>
  );
}

export default ItemContent;
