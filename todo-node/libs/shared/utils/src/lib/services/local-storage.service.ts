import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

    /**
     * returns item from the storage by its key
     * @param key item key in the storage
     */
    public getItem(key: string): any {
        return JSON.parse(localStorage.getItem(key)) || undefined;
    }

    /**
     *
     * @param key key for the item to store
     * @param item item to store
     */
    public setItem(key: string, item: any): void {
        localStorage.setItem(key, JSON.stringify(item));
    }

    /**
     * removes item from the storage
     * @param key key of the item to remove
     */
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * clears storage competely
     */
    public clear(): void {
        localStorage.clear();
    }
}
