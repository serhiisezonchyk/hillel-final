import CryptoJS from 'crypto-js';

export class StorageService<T> {
  private storage: Storage;
  private key: string;
  private secretKey?: string;
  static storageTypes = Object.freeze({
    session: 'session',
    local: 'local',
  });

  constructor(storageType: keyof typeof StorageService.storageTypes, key: string, secretKey?: string) {
    switch (storageType) {
      case 'local': {
        this.storage = localStorage;
        break;
      }
      case 'session': {
        this.storage = sessionStorage;
        break;
      }
      default: {
        this.storage = localStorage;
        break;
      }
    }
    this.key = key;
    this.secretKey = secretKey;
  }
  public getItems(): T | null {
    try {
      const data = this.storage.getItem(this.key);
      if (!data) return null;
      if (this.secretKey) {
        const decryptedData = this.decryptData(data, this.secretKey);
        return decryptedData;
      } else {
        return JSON.parse(data) as T;
      }
    } catch (error) {
      throw new Error(`Failed to retrieve items from storage. Error: ${error}`);
    }
  }
  public setItems(items: T): void {
    try {
      const jsonData = JSON.stringify(items);
      if (this.secretKey) {
        const encryptedData = this.encryptData(jsonData, this.secretKey);
        this.storage.setItem(this.key, encryptedData);
      } else {
        this.storage.setItem(this.key, jsonData);
      }
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
  private encryptData = (data: string, secretKey: string): string => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };
  private decryptData = (cipherText: string, secretKey: string): T | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData as T;
    } catch (error) {
      console.error('Decryption failed', error);
      return null;
    }
  };
}
