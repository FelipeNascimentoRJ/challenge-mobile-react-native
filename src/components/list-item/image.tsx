import React from 'react';

// Types
import {IImage} from '../../services/marvel/types/defaults';

// Styles
import {Image} from './styles';

export interface IItemImage {
  thumbnail: IImage | undefined;
}

export default function ItemImage({thumbnail}: IItemImage) {
  return (
    <Image
      source={{
        uri: `${thumbnail?.path}.${thumbnail?.extension}`,
      }}
    />
  );
}
