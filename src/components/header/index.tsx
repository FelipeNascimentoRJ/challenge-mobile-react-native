import React, {memo, useContext} from 'react';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// Store
import {IApplicationState} from '../../store';

// Actions
import * as actions from '../../store/ducks/rootActions';

// Utils
import Shadow from '../../utils/shadow';

// Styles
import {Container, Logo, Actions} from './styles';

// Theme
import {ThemeContext} from '../../themes';

// Logo
import logo from '../../assets/logo.png';

function Header() {
  // Navigation
  const navigation = useNavigation();

  // Theme
  const {theme, themeToggle} = useContext(ThemeContext);

  // Dispatch
  const dispatch = useDispatch();

  // Redux States
  const {favorite} = useSelector((state: IApplicationState) => state);

  // Toggle Favorite Button
  const handleToggleFavorite = () => {
    if (favorite.enabled) {
      dispatch(actions.favoriteDisabled());
    } else {
      dispatch(actions.favoriteEnabled());
    }
  };

  // Navigate SearchScreen
  const handlerSearchScreen = () => navigation.navigate('Search');

  // Style
  const iconStyles = {height: 30};

  return (
    <Container style={Shadow}>
      <Logo source={logo} />
      <Actions>
        <Icon.Button
          name="brightness-4"
          size={30}
          color={theme.icon}
          backgroundColor={theme.background}
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={themeToggle}
        />
        <Icon.Button
          name={favorite.enabled ? 'favorite' : 'favorite-border'}
          size={30}
          color={favorite.enabled ? theme.primary : theme.icon}
          backgroundColor={theme.background}
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={handleToggleFavorite}
        />
        <Icon.Button
          name="search"
          size={30}
          color={theme.icon}
          backgroundColor={theme.background}
          iconStyle={iconStyles}
          borderRadius={200}
          onPress={handlerSearchScreen}
        />
      </Actions>
    </Container>
  );
}

export default memo(Header);
