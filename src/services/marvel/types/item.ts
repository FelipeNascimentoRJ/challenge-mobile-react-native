import {IUrl, IImage} from './defaults';

export interface IItemDataWrapper {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: IItemDataContainer;
  etag?: string;
}

export interface IItemDataContainer {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Array<IItem>;
}

export interface IItem {
  title?: string;
  description?: string;
  urls?: Array<IUrl>;
  thumbnail?: IImage;
}
