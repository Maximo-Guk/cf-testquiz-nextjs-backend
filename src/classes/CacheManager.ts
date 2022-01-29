const cache = caches.default;

export default class CacheManager {
  public static async put(requestUrl: string, uuid: string, cacheObject: string) {
    const cacheUrl = `${requestUrl}/${uuid}`;

    const response = new Response(cacheObject);
    response.headers.append('Cache-Control', 's-maxage=1800');

    return await cache.put(cacheUrl, response);
  }

  public static async update(requestUrl: string, uuid: string, cacheObject: string) {
    await cache.delete(requestUrl);
    return await this.put(requestUrl, uuid, cacheObject);
  }

  public static async match(requestUrl: string) {
    return await cache.match(requestUrl);
  }

  public static async delete(requestUrl: string) {
    return await cache.delete(requestUrl);
  }
}
