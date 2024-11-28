import { FloweringReport } from '~/screens/ReportsScreen/reports';

export class DataCache {
  private static instance: DataCache;

  private cache: Map<number, FloweringReport[]> = new Map();
  private whilelistCache: Map<number, FloweringReport> = new Map();

  private expiryTime: Map<number | string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly ITEM_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for individual items

  static getInstance(): DataCache {
    // Singleton pattern
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }

  set(page: number, data: FloweringReport[]): void {
    this.cache.set(page, data);
    this.expiryTime.set(page, Date.now() + this.CACHE_DURATION);
  }

  get(page: number): FloweringReport[] | null {
    if (!this.cache.has(page)) return null;
    const expiry = this.expiryTime.get(page);
    if (expiry && Date.now() > expiry) {
      this.cache.delete(page);
      this.expiryTime.delete(page);
      return null;
    }
    return this.cache.get(page) || null;
  }

  setWhitelistItem(movie: FloweringReport): void {
    this.whilelistCache.set(movie.id, movie);
    this.expiryTime.set(`whitelist_${movie.id}`, Date.now() + this.ITEM_CACHE_DURATION);
  }

  deleteWhitelistItem(movie: FloweringReport): void {
    this.whilelistCache.delete(movie.id);
    this.expiryTime.delete(`whitelist_${movie.id}`);
  }

  getWhitelistItem(id: number): FloweringReport | null {
    if (!this.whilelistCache.has(id)) return null;
    // const expiry = this.expiryTime.get(`whitelist_${id}`);
    // if (expiry && Date.now() > expiry) {
    //   this.whilelistCache.delete(id);
    //   this.expiryTime.delete(`whitelist_${id}`);
    //   return null;
    // }
    return this.whilelistCache.get(id) || null;
  }

  getWhitelist(): FloweringReport[] {
    return Array.from(this.whilelistCache.values());
  }

  removeWhitelistItem(id: number) {
    return this.whilelistCache.delete(id);
  }

  clear(): void {
    this.cache.clear();
    this.whilelistCache.clear();
    this.expiryTime.clear();
  }
}
