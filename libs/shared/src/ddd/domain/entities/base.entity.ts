import { CUID, DateVO, ID } from '@lib/shared';
import { AggregateRoot } from '@nestjs/cqrs';

export interface BaseEntityProps {
  id: ID;
  updatedAt: DateVO;
  createdAt: DateVO;
  version: number;
}

export interface CreateEntityProps {
  updatedAt?: DateVO;
  createdAt?: DateVO;
  version?: number;
}

export abstract class BaseEntity<T> extends AggregateRoot {
  protected readonly _id: ID;
  protected _props: T & BaseEntityProps;

  constructor(props: T & CreateEntityProps, id?: ID) {
    super();
    const now = DateVO.now();
    const generatedId = id ? id : CUID.generate();
    this._id = generatedId;
    this._props = {
      ...props,
      id: generatedId,
      version: props.version || 0,
      createdAt: props.createdAt || now,
      updatedAt: props.updatedAt || now,
    };
  }

  get id() {
    return this._id;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get version() {
    return this._props.version;
  }

  static isEntity(object: any): object is BaseEntity<any> {
    return object instanceof BaseEntity;
  }

  public abstract validate();

  public getProps(): T & BaseEntityProps {
    const propsCopy = {
      ...this._props,
      id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version,
    };
    return Object.freeze(propsCopy);
  }

  public equals(entity?: BaseEntity<T>) {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    if (!BaseEntity.isEntity(entity)) {
      return false;
    }

    return this._id.equals(entity._id);
  }

  protected update() {
    this._props.updatedAt = DateVO.now();
    this._props.version += 1;
  }
}
