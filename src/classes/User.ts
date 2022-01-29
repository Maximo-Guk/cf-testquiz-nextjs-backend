import { v1 as uuidv1 } from 'uuid';
import CacheManager from './CacheManager';

export default class User {
  private uuid: string;
  private roundNumber: number;
  private age: number;

  constructor(uuid: string, roundNumber: number, age: number) {
    this.uuid = uuid;
    this.roundNumber = roundNumber;
    this.age = age;
  }

  public static newUser() {
    return new User(uuidv1(), 0, 0);
  }

  public getUuid() {
    return this.uuid;
  }

  public getRoundNumber() {
    return this.roundNumber;
  }

  public getAge() {
    return this.age;
  }

  public incrementRoundNumber() {
    this.roundNumber++;
  }

  public async addToCache(requestUrl: string) {
    return await CacheManager.put(requestUrl, this.getUuid(), this.toString());
  }

  public async updateCache(requestUrlWithUuid: string) {
    return await CacheManager.update(requestUrlWithUuid, this.toString(), this.getAge());
  }

  public static async getUserFromCache(requestUrlWithUuid: string) {
    const response = await CacheManager.match(requestUrlWithUuid);
    if (response) {
      const age = response.headers.get('age');
      if (age) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseParsedJson: any = await response.json();
        return new User(
          responseParsedJson.uuid,
          responseParsedJson.roundNumber,
          Number.parseInt(age),
        );
      }
    }
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
