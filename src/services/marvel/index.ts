'use strict';

// Axios
import axios, {AxiosInstance, AxiosResponse} from 'axios';

// MD5
import md5 from 'md5';

// Types
import {ICharacterParameters, ICharacterDataWrapper} from './types/characters';

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
   * Axios Instance
   */
  private readonly instance: AxiosInstance;

  /**
   * constructor
   *
   * @param priKey string
   * @param pubKey string
   */
  constructor(priKey: string, pubKey: string) {
    this.priKey = priKey;
    this.pubKey = pubKey;

    this.instance = axios.create({
      baseURL: 'https://gateway.marvel.com/v1/public',
    });
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

    const uri = `/characters?${this.buildQuery(query)}`;

    return this.instance.get(uri);
  }
}
