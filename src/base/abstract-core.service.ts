import {
  AbstractDocument,
  DeleteResultType,
  FindManyFilter,
  FindOneFilter,
  IdType
} from './abstract.type';

export abstract class AbstractCoreService<T> {
  public abstract count(filter: FindManyFilter<T>): Promise<number>;

  public abstract find(filter: FindManyFilter<T>): Promise<T[]>;

  public abstract findOne(filter: FindOneFilter<T>): Promise<T>;

  public abstract findById(id: IdType, filter?: FindOneFilter<T>): Promise<T>;

  public abstract create(doc: AbstractDocument<T>): Promise<T>;

  public abstract update(
    id: IdType,
    updatedDoc: AbstractDocument<T>,
  ): Promise<T>;

  public abstract delete(id: IdType): Promise<DeleteResultType<T>>;

  public abstract softDelete(id: IdType): Promise<DeleteResultType<T>>;
}
