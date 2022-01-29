import { v1 as uuidv1 } from 'uuid';
import CacheManager from './CacheManager';

export default class User {
  private uuid: string;
  private roundNumber: number;

  constructor(uuid: string, roundNumber: number) {
    this.uuid = uuid;
    this.roundNumber = roundNumber;
  }

  public static newUser() {
    return new User(uuidv1(), 0);
  }

  public getUuid() {
    return this.uuid;
  }

  public getRoundNumber() {
    return this.roundNumber;
  }

  public incrementRoundNumber() {
    this.roundNumber++;
  }

  public async addToCache(requestUrl: string) {
    return await CacheManager.put(requestUrl, this.getUuid(), this.toString());
  }

  public async updateCache(requestUrl: string) {
    return await CacheManager.update(requestUrl, this.getUuid(), this.toString());
  }

  public static async getUserFromCache(requestUrl: string) {
    const response = await CacheManager.match(requestUrl);
    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseParsedJson: any = await response.json();
      return new User(responseParsedJson.uuid, responseParsedJson.roundNumber);
    }
    return response;
  }

  public async removeFromCache(requestUrl: string) {
    return await CacheManager.delete(requestUrl);
  }

  public toString() {
    return JSON.stringify({
      uuid: this.getUuid(),
      roundNumber: this.getRoundNumber(),
    });
  }
}
