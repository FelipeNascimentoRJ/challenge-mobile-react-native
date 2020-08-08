import React, {useState} from 'react';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import List from '../list';

// Types
import {ICharacter} from '../../services/marvel/types/characters';

// Styles
import {Modal, Container, Header, Search, Input} from './styles';

export interface IModalSearch {
  show: boolean;
  onPress: (character: ICharacter) => void;
  onClose: () => void;
}

export default function ModalSearch({show, onPress, onClose}: IModalSearch) {
  const [search, setSearch] = useState<string>('');
  // Style
  const iconStyles = {height: 30};

  return (
    <Modal animationType="slide" visible={show}>
      <Container>
        <Header>
          <Search>
            <Icon.Button
              name="arrow-back"
              size={30}
              color="#ccc"
              backgroundColor="transparent"
              iconStyle={iconStyles}
              borderRadius={20}
              onPress={onClose}
            />
            <Input
              autoFocus={true}
              keyboardType="default"
              placeholder="Search..."
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            {search !== '' ? (
              <Icon.Button
                name="close"
                size={30}
                color="#ccc"
                backgroundColor="transparent"
                iconStyle={iconStyles}
                borderRadius={20}
                onPress={() => setSearch('')}
              />
            ) : null}
          </Search>
        </Header>
        <List search={search} onPress={onPress} />
      </Container>
    </Modal>
  );
}
