import React, {memo, useState, useEffect, useCallback, useContext} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux
import {useDispatch} from 'react-redux';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Types
import {ICharacter} from '../../services/marvel/types/characters';
import {IEventSummary} from '../../services/marvel/types/events';
import {ISeriesSummary} from '../../services/marvel/types/series';

// Theme
import {ThemeContext} from '../../themes';

// Components
import List from './list';
import Item from './item';

// Utils
import Favorite from '../../utils/favorite';

// Styles
import {
  Modal,
  Container,
  Content,
  Image,
  FloatButtonContainer,
  Scroll,
  Row,
  Name,
  Description,
} from './styles';

export interface IModalHero {
  show: boolean;
  character: ICharacter;
  onClose: () => void;
}

function ModalHero({show, character, onClose}: IModalHero) {
  // Theme
  const {theme} = useContext(ThemeContext);

  // Local States
  const [favState, setFavorite] = useState<boolean>(false);
  const [showModalItem, setShowModalItem] = useState<boolean>(false);
  const [item, setItem] = useState<IEventSummary | ISeriesSummary | null>(null);

  // Dispatch
  const dispatch = useDispatch();

  const {id, thumbnail, name, description, events, series} = character;

  // Style
  const iconStyles = {height: 30};

  // Press Item
  const handlePressItem = (itemSelected: IEventSummary | ISeriesSummary) => {
    setShowModalItem(true);
    setItem(itemSelected);
  };

  // Item close
  const handlePressItemClose = () => {
    setShowModalItem(false);
    setItem(null);
  };

  const addFavorite = useCallback(
    async (characterId: number) => {
      await Favorite.setFavorite(characterId);
      dispatch(actions.characterFavorite(characterId));
      setFavorite(true);
    },
    [dispatch],
  );

  const delFavorite = useCallback(
    async (characterId: number) => {
      await Favorite.delFavorite(characterId);
      dispatch(actions.characterNotFavorite(characterId));
      setFavorite(false);
    },
    [dispatch],
  );

  // Item favorite
  const handlePressFavorite = async () => {
    if (id !== undefined) {
      if (await Favorite.isFavorite(id)) {
        delFavorite(id);
      } else {
        addFavorite(id);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (id !== undefined) {
        if (await Favorite.isFavorite(id)) {
          addFavorite(id);
        } else {
          delFavorite(id);
        }
      }
    })();
  }, [addFavorite, delFavorite, id, favState]);

  return (
    <Modal
      animationType="slide"
      visible={show}
      statusBarTranslucent={true}
      transparent={true}>
      <Container>
        <Content>
          <Image
            source={{
              uri: `${thumbnail?.path}.${thumbnail?.extension}`,
            }}
          />
          <FloatButtonContainer>
            <Icon.Button
              name="close"
              size={30}
              color="#000"
              backgroundColor="transparent"
              iconStyle={iconStyles}
              borderRadius={20}
              onPress={onClose}
            />
          </FloatButtonContainer>
          <Row>
            <Name>{name}</Name>
            <Icon.Button
              name={favState ? 'favorite' : 'favorite-border'}
              size={30}
              color={favState ? theme.primary : theme.icon}
              backgroundColor={theme.background}
              iconStyle={iconStyles}
              borderRadius={200}
              onPress={handlePressFavorite}
            />
          </Row>
          <Scroll>
            <Description>{description}</Description>
            {events !== undefined ? (
              <List
                onPressItem={handlePressItem}
                title="Events"
                data={events}
              />
            ) : null}
            {series !== undefined ? (
              <List
                onPressItem={handlePressItem}
                title="Series"
                data={series}
              />
            ) : null}
          </Scroll>
        </Content>
      </Container>
      {item !== null ? (
        <Item show={showModalItem} item={item} onClose={handlePressItemClose} />
      ) : null}
    </Modal>
  );
}

export default memo(ModalHero);
