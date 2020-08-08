import React, {useState} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Types
import {ICharacter} from '../../services/marvel/types/characters';
import {IEventSummary} from '../../services/marvel/types/events';
import {ISeriesSummary} from '../../services/marvel/types/series';

// Components
import List from './list';
import Item from './item';

// Styles
import {
  Modal,
  Container,
  Content,
  Image,
  FloatButtonContainer,
  Row,
  Name,
  Description,
} from './styles';

export interface IModalHero {
  show: boolean;
  character: ICharacter;
  onPressFavorite: (character: ICharacter) => void;
  onClose: () => void;
}

export default function ModalHero({
  show,
  character,
  onPressFavorite,
  onClose,
}: IModalHero) {
  // Local States
  const [showModalItem, setShowModalItem] = useState<boolean>(false);
  const [item, setItem] = useState<IEventSummary | ISeriesSummary | null>(null);

  const {thumbnail, name, description, events, series} = character;

  // Temporary
  const favoriteEnabled = true;

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
              name={favoriteEnabled ? 'favorite' : 'favorite-border'}
              size={30}
              color={favoriteEnabled ? '#ff0000' : '#666'}
              backgroundColor="#fff"
              iconStyle={iconStyles}
              borderRadius={200}
              onPress={() => onPressFavorite(character)}
            />
          </Row>
          <Description>{description}</Description>
          {events !== undefined ? (
            <List onPressItem={handlePressItem} title="Events" data={events} />
          ) : null}
          {series !== undefined ? (
            <List onPressItem={handlePressItem} title="Series" data={series} />
          ) : null}
        </Content>
      </Container>
      {item !== null ? (
        <Item show={showModalItem} item={item} onClose={handlePressItemClose} />
      ) : null}
    </Modal>
  );
}