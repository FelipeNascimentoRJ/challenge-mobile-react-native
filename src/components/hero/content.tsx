import React, {memo, useContext} from 'react';

// Components
import {Linking, Share} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Theme
import {ThemeContext} from '../../themes';

import {IItem} from '../../services/marvel/types/item';

// Styles
import {
  FloatButtonContainer,
  ItemImage,
  ItemTitle,
  ItemDescription,
  ItemButton,
  ItemButtonLabel,
} from './styles';

export interface IModalItemContent {
  item: IItem;
  onClose: () => void;
}

function ModalItemContent({item, onClose}: IModalItemContent) {
  // Theme
  const {theme} = useContext(ThemeContext);

  const {thumbnail, title, description, urls} = item;

  let renderButton = null;

  // Style
  const iconStyles = {height: 30};

  const handleOpenUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleShareUrl = async (text: string, url: string) => {
    const content = `${url} \n\n ${text} \n\n Powered By *App Marvel Heroes*`;

    await Share.share({
      title: content, // android
      message: content, // ios
      url,
    });
  };

  if (urls !== undefined && urls.length >= 1) {
    const [url] = urls;

    if (url.url !== undefined) {
      renderButton = (
        <>
          <ItemButton
            color={theme.primary}
            onPress={() =>
              handleOpenUrl(
                url.url !== undefined ? url.url : 'https://marvel.com',
              )
            }>
            <ItemButtonLabel color="#fff">Access</ItemButtonLabel>
          </ItemButton>
          <ItemButton
            color={theme.shape}
            onPress={() =>
              handleShareUrl(
                title !== undefined ? title : 'Marvel',
                url.url !== undefined ? url.url : 'https://marvel.com',
              )
            }>
            <ItemButtonLabel color={theme.textButton}>Share</ItemButtonLabel>
          </ItemButton>
        </>
      );
    }
  }

  return (
    <>
      <ItemImage
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
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
      {renderButton}
    </>
  );
}

export default memo(ModalItemContent);
