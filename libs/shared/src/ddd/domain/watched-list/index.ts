import { BaseEntity, BaseException, ID } from '@lib/shared';

export abstract class WatchedList<T extends BaseEntity<any>> {
  constructor(items?: T[]) {
    this._currentItems = items ?? [];
    this._updatedItems = [];
  }

  private _currentItems: T[];

  public get currentItems() {
    return this._currentItems;
  }

  private _updatedItems: T[];

  public get updatedItems() {
    return this._updatedItems;
  }

  public add(item: T) {
    this._currentItems.push(item);
    this._updatedItems.push(item);
  }

  public abstract compare(item1: T, item2: T): boolean;

  public find(item: T) {
    return this._currentItems.find((currentItem) =>
      this.compare(currentItem, item),
    );
  }

  public findOneById(id: ID) {
    return this._currentItems.find((currentItem) => currentItem.id.equals(id));
  }

  public update(item: T, notFoundError?: BaseException) {
    const foundItemIndex = this._currentItems.findIndex((currentItem) =>
      this.compare(currentItem, item),
    );

    if (foundItemIndex < 0) {
      throw notFoundError;
    }

    this._currentItems[foundItemIndex] = item;
    this._updatedItems.push(item);
  }
}
