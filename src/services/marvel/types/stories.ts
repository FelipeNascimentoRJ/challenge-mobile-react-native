export interface IStoryList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items: Array<IStorySummary>;
}

export interface IStorySummary {
  resourceURI?: string;
  name?: string;
  type?: string;
}
