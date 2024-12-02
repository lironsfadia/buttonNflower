import { FloweringReport } from '~/screens/ReportsScreen/reports';

export class DataCache {
  private static instance: DataCache;

  private cache: Map<number, FloweringReport[]> = new Map();
  private watchlistCache: Map<number, FloweringReport> = new Map();

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

  setWhitelistItem(report: FloweringReport): void {
    this.watchlistCache.set(report.id, report);
    this.expiryTime.set(`whitelist_${report.id}`, Date.now() + this.ITEM_CACHE_DURATION);
  }

  deleteWhitelistItem(report: FloweringReport): void {
    this.watchlistCache.delete(report.id);
    this.expiryTime.delete(`whitelist_${report.id}`);
  }

  getWatchlistItem(id: number): FloweringReport | null {
    if (!this.watchlistCache.has(id)) return null;
    // const expiry = this.expiryTime.get(`whitelist_${id}`);
    // if (expiry && Date.now() > expiry) {
    //   this.whilelistCache.delete(id);
    //   this.expiryTime.delete(`whitelist_${id}`);
    //   return null;
    // }
    return this.watchlistCache.get(id) || null;
  }

  getWatchlist(): FloweringReport[] {
    return Array.from(this.watchlistCache.values());
  }

  removeWatchlistItem(id: number) {
    return this.watchlistCache.delete(id);
  }

  clear(): void {
    this.cache.clear();
    this.watchlistCache.clear();
    this.expiryTime.clear();
  }
}
