import React, {useState, useEffect, useCallback, useContext} from 'react';

// Components
import {StatusBar, ActivityIndicator} from 'react-native';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import List from '../../components/list';

// Types
import {AxiosResponse} from 'axios';
import {
  ICharacter,
  ICharacterDataContainer,
  ICharacterDataWrapper,
} from '../../services/marvel/types/characters';

// API Marvel
import config from '../../../marvel.config.json';
import Marvel from '../../services/marvel';

// Theme
import {ThemeContext} from '../../themes';

// Modals
import ModalHero from '../../components/hero';

// Styles
import {Screen, Container, Header, Search, Input, Loading} from './styles';

export default function SearchScreen() {
  // Navigation
  const navigation = useNavigation();

  // Theme
  const {theme} = useContext(ThemeContext);

  // Local States
  const [loading, setLoading] = useState<boolean>(false);
  const [listCharacters, setListCharacters] = useState<Array<ICharacter>>([]);
  const [search, setSearch] = useState<string>('');

  const [showModalHero, setShowModalHero] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  // Loading characters API Marvel
  const loadingSearch = useCallback(() => {
    setLoading(true);
    setListCharacters([]);

    // Instance
    const marvel = new Marvel(config.privateKey, config.publicKey);

    marvel
      .getCharacters({nameStartsWith: search})
      .then(({data: {data}}: AxiosResponse<ICharacterDataWrapper>) => {
        const {results} = data as ICharacterDataContainer;

        if (results !== undefined && results.length >= 1) {
          setListCharacters(results);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  // Back HomeScreen
  const handleBack = () => {
    handleClear();
    navigation.goBack();
  };

  // Clear Search
  const handleClear = useCallback(() => {
    setSearch('');
    setListCharacters([]);
  }, []);

  // Hero close
  const handlePressHeroClose = () => {
    setShowModalHero(false);
    setCharacter(null);
  };

  // Press Character
  const handlePressCharacter = useCallback((characterSelected: ICharacter) => {
    setSearch('');
    setListCharacters([]);
    setShowModalHero(true);
    setCharacter(characterSelected);
  }, []);

  // Change search text
  const handleChangeSearchText = (text: string) => setSearch(text);

  // Style
  const iconStyles = {height: 30};

  useEffect(() => {
    if (search !== '') {
      setTimeout(() => loadingSearch(), 2000);
    } else {
      setListCharacters([]);
    }
  }, [search, loadingSearch]);

  return (
    <Screen>
      <StatusBar barStyle={theme.status} backgroundColor={theme.background} />
      <Container>
        <Header>
          <Search>
            <Icon.Button
              name="arrow-back"
              size={30}
              color={theme.icon}
              backgroundColor="transparent"
              iconStyle={iconStyles}
              borderRadius={20}
              onPress={handleBack}
            />
            <Input
              autoFocus={false}
              keyboardType="default"
              placeholder="Search..."
              placeholderTextColor={theme.text}
              value={search}
              onChangeText={handleChangeSearchText}
            />
            {search !== '' ? (
              <Icon.Button
                name="close"
                size={30}
                color={theme.icon}
                backgroundColor="transparent"
                iconStyle={iconStyles}
                borderRadius={20}
                onPress={handleClear}
              />
            ) : null}
          </Search>
        </Header>
        {loading === false ? (
          <List data={listCharacters} onPress={handlePressCharacter} />
        ) : (
          <Loading>
            <ActivityIndicator size="large" />
          </Loading>
        )}
        {character !== null ? (
          <ModalHero
            show={showModalHero}
            character={character}
            onClose={handlePressHeroClose}
          />
        ) : null}
      </Container>
    </Screen>
  );
}
