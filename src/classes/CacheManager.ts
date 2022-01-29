const cache = caches.default;

export default class CacheManager {
  public static async put(requestUrl: string, uuid: string, cacheObject: string) {
    const cacheUrl = `${requestUrl}/${uuid}`;

    const response = new Response(cacheObject);
    response.headers.append('Cache-Control', 's-maxage=1800');

    return await cache.put(cacheUrl, response);
  }

  public static async update(
    requestUrlWithUuid: string,
    cacheObject: string,
    age: number,
  ) {
    const updatedResponse = new Response(cacheObject);
    updatedResponse.headers.append('Cache-Control', 's-maxage=1800');
    updatedResponse.headers.set('age', age.toString());

    return await cache.put(requestUrlWithUuid, updatedResponse);
  }

  public static async match(requestUrlWithUuid: string) {
    return await cache.match(requestUrlWithUuid);
  }

  public static async delete(requestUrlWithUuid: string) {
    return await cache.delete(requestUrlWithUuid);
  }
}
