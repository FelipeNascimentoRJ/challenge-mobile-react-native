'use strict';

// Axios
import axios, {AxiosResponse} from 'axios';

// MD5
import md5 from 'md5';

// Types
import {ICharacterParameters, ICharacterDataWrapper} from './types/characters';
import {IItemDataWrapper} from './types/item';

export default class Marvel {
  /**
   * API Private Key
   */
  private readonly priKey: string;

  /**
   * API Public Key
   */
  private readonly pubKey: string;

  /**
   * constructor
   *
   * @param priKey string
   * @param pubKey string
   */
  constructor(priKey: string, pubKey: string) {
    this.priKey = priKey;
    this.pubKey = pubKey;
  }

  private getTimeStamp = () => parseInt(`${Date.now() / 1000}`, 10);

  private getHash(timestamp: number) {
    const data = timestamp + this.priKey + this.pubKey;
    const hash = md5(data);

    return hash;
  }

  private getQuery() {
    const ts = this.getTimeStamp();
    const hash = this.getHash(ts);

    return {
      ts,
      hash,
      apikey: this.pubKey,
    };
  }

  private buildQuery = (params: any): string =>
    Object.keys(params)
      .sort()
      .map((key: string) => `${key}=${params[key]}`)
      .join('&');

  public async getCharacters(
    params?: ICharacterParameters,
  ): Promise<AxiosResponse<ICharacterDataWrapper>> {
    let query = this.getQuery();

    if (params) {
      query = {
        ...query,
        ...params,
      };
    }

    const uri = `https://gateway.marvel.com/v1/public/characters?${this.buildQuery(
      query,
    )}`;

    return axios.get(uri);
  }

  public async getItem(url: string): Promise<AxiosResponse<IItemDataWrapper>> {
    let query = this.getQuery();

    const uri = `${url}?${this.buildQuery(query)}`;

    return axios.get(uri);
  }
}
