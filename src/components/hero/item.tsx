import React, {useState, useEffect} from 'react';

// Components
import {ActivityIndicator, Linking} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Types
import {AxiosResponse} from 'axios';
import {IEventSummary} from '../../services/marvel/types/events';
import {ISeriesSummary} from '../../services/marvel/types/series';
import {
  IItem,
  IItemDataWrapper,
  IItemDataContainer,
} from '../../services/marvel/types/item';

// API Marvel
import config from '../../../marvel.config.json';
import Marvel from '../../services/marvel';

// Styles
import {
  Modal,
  Container,
  Content,
  FloatButtonContainer,
  ItemImage,
  ItemTitle,
  ItemDescription,
  ItemButton,
  ItemButtonLabel,
} from './styles';

export interface IModalItem {
  show: boolean;
  item: IEventSummary | ISeriesSummary;
  onClose: () => void;
}

export default function ModalItem({show, item, onClose}: IModalItem) {
  // Local States
  const [loading, setLoading] = useState<boolean>(true);
  const [itemResult, setItemResult] = useState<IItem | null>(null);

  // Style
  const iconStyles = {height: 30};

  const handleOpenUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const loadingItem = async () => {
    if (item.resourceURI !== undefined) {
      // Instance
      const marvel = new Marvel(config.privateKey, config.publicKey);

      marvel
        .getItem(item.resourceURI)
        .then(({data: {data}}: AxiosResponse<IItemDataWrapper>) => {
          const {results} = data as IItemDataContainer;

          if (results !== undefined && results.length >= 1) {
            const [resItem] = results;

            setItemResult(resItem);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    loadingItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoading = () => {
    if (!loading) {
      return null;
    }

    return <ActivityIndicator size="large" />;
  };

  const renderItem = () => {
    if (itemResult === null) {
      return null;
    }

    const {thumbnail, title, description, urls} = itemResult;

    let renderButton = null;

    if (urls !== undefined && urls.length >= 1) {
      const [url] = urls;

      if (url.url !== undefined) {
        renderButton = (
          <ItemButton
            onPress={() =>
              handleOpenUrl(
                url.url !== undefined ? url.url : 'https://marvel.com',
              )
            }>
            <ItemButtonLabel>Access</ItemButtonLabel>
          </ItemButton>
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
  };

  return (
    <Modal
      animationType="slide"
      visible={show}
      statusBarTranslucent={true}
      transparent={true}>
      <Container background="transparent">
        <Content>{loading ? renderLoading() : renderItem()}</Content>
      </Container>
    </Modal>
  );
}
