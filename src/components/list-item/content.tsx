import React, {useState, useEffect} from 'react';

// Local Storage
import AsyncStorage from '@react-native-community/async-storage';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Components
import Image from './image';

// Utils
import TextLimit from '../../utils/text-limit';
import Shadow from '../../utils/shadow';

// Styles
import {Container, Content, Name, Description, Text, Footer} from './styles';

export interface IContent {
  character: ICharacter;
  onPress: (character: ICharacter) => void;
}

export default function ItemContent({character, onPress}: IContent) {
  const {id, thumbnail, name, description, events, series} = character;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const is = await AsyncStorage.getItem(`${id}:fav`);

      if (is) {
        setIsFavorite(true);
      }
    })();
  }, [id]);

  // Check is favorite
  const icon = isFavorite ? 'favorite' : 'favorite-border';
  const color = isFavorite ? '#ff0000' : '#666';

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

          <Text color={isFavorite ? '#000' : '#666'} bold={isFavorite}>
            Favorite <Icon name={icon} size={11} color={color} />
          </Text>
        </Footer>
      </Content>
    </Container>
  );
}
