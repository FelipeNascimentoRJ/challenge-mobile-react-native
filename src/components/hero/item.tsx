import React, {memo, useState, useEffect, useCallback} from 'react';

// Components
import {ActivityIndicator} from 'react-native';

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

// Components
import ModalItemContent from './content';

// Styles
import {Modal, Container, Content} from './styles';

export interface IModalItem {
  show: boolean;
  item: IEventSummary | ISeriesSummary;
  onClose: () => void;
}

function ModalItem({show, item, onClose}: IModalItem) {
  // Local States
  const [loading, setLoading] = useState<boolean>(true);
  const [itemResult, setItemResult] = useState<IItem | null>(null);

  const loadingItem = useCallback(async () => {
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
  }, [item.resourceURI]);

  useEffect(() => {
    loadingItem();
  }, [loadingItem]);

  const renderLoading = () => {
    if (!loading) {
      return null;
    }

    return <ActivityIndicator size="large" />;
  };

  const renderItem = () => {
    if (itemResult !== null) {
      return <ModalItemContent item={itemResult} onClose={onClose} />;
    }

    return null;
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

export default memo(ModalItem);
