import { BaseEntity, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { AbstractCoreService } from './abstract-core.service';
import { AbstractEntity } from './base.entity';
import {
  FindManyFilter,
  FindOneFilter,
  IdType,
  AbstractDocument,
  UpdateResultType,
  DeleteResultType,
} from './abstract.type';

export class BaseService<T extends AbstractEntity | BaseEntity>
  implements AbstractCoreService<T>
{

  protected repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async softDelete(id: IdType): Promise<DeleteResultType<T>> {
    await this.findById(id);
    return this.repository.softDelete(id);
  }

  public count(filter: FindManyFilter<T>): Promise<number> {
    return this.repository.count(filter);
  }

  public find(filter: FindManyOptions<T> = {}): Promise<T[]> {
    return this.repository.find(filter);
  }

  public findOne(filter: FindOneFilter<T>): Promise<T> {
    return this.repository.findOne(filter);
  }

  /**
   * 
   * @description find entity with id, of not found throw error
   * 
   * @param id 
   * @param filter 
   * @returns 
   */
  public async findById(id: IdType, filter?: FindOneFilter<T>): Promise<T> {
    filter = {
      ...filter,
      where: { id },
    };
    const item = await this.repository.findOne(filter);
    if (item) return item;

    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: "http.clientError.notFound",
      errors: []
    })
  }

  /**
   * 
   * @param doc 
   * @returns 
   */
  public create(doc: AbstractDocument<T> | any): Promise<T> {
    const entity = this.repository.create(doc);    
    return this.repository.save(entity as any);
  }

  /**
   * 
   * @param id 
   * @param updatedDoc 
   * @returns 
   */
  public async update(
    id: IdType,
    updatedDoc: AbstractDocument<T> | any,
  ): Promise<T> {
    const entity = this.repository.create({id, ...updatedDoc});        
    await this.repository.save(entity as any);
    return this.findById(id)
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  public async delete(id: IdType): Promise<DeleteResultType<T>> {

    await this.findById(id);

    return this.repository.delete(id);
  }

  /**
   * 
   * @param where 
   * @param updatedDoc 
   * @returns 
   */
  public async updateBy(
    where: FindOptionsWhere<T>,
    updatedDoc: AbstractDocument<T> | any,
  ): Promise<UpdateResultType<T>> {
    return this.repository.update(where, updatedDoc);
  }
}
