import {IUrl, IImage} from './defaults';
import {IComicList} from './comics';
import {IStoryList} from './stories';
import {IEventList} from './events';
import {ISeriesList} from './series';

export interface ICharacterParameters {
  name?: string;
  nameStartsWith?: string;
  modifiedSince?: Date;
  comics?: number;
  series?: number;
  events?: number;
  stories?: number;
  orderBy?: 'name' | 'modified' | '-name' | '-modified';
  limit?: number;
  offset?: number;
}

export interface ICharacterDataWrapper {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: ICharacterDataContainer;
  etag?: string;
}

export interface ICharacterDataContainer {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Array<ICharacter>;
}

export interface ICharacter {
  id?: number;
  name?: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: Array<IUrl>;
  thumbnail?: IImage;
  comics?: IComicList;
  stories?: IStoryList;
  events?: IEventList;
  series?: ISeriesList;
}
