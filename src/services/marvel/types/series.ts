export interface ISeriesList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<ISeriesSummary>;
}

export interface ISeriesSummary {
  resourceURI?: string;
  name?: string;
}