export class StorageService<T> {
  private storage: Storage;
  private key: string;

  static storageTypes = Object.freeze({
    session: 'session',
    local: 'local',
  });

  constructor(storageType: keyof typeof StorageService.storageTypes, key: string) {
    switch (storageType) {
      case 'local': {
        this.storage = localStorage;
        break;
      }
      case 'session': {
        console.log('seesion storage created');
        this.storage = sessionStorage;
        break;
      }
      default: {
        this.storage = localStorage;
        break;
      }
    }
    this.key = key;
  }
  public getItems(): T | null {
    try {
      const data = this.storage.getItem(this.key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      throw new Error(`Failed to retrieve items from storage. Error: ${error}`);
    }
  }
  public setItems(items: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
    } catch (error) {
      throw new Error(`Failed to set items in storage. Error: ${error}`);
    }
  }

  public clearItems(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      throw new Error(`Failed to clear items from storage. Error: ${error}`);
    }
  }
}
