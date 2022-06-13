import {
  DeepPartial,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { AbstractEntity } from './base.entity';

export type AbstractDocument<T> = T extends AbstractEntity
  ? T & DeepPartial<T>
  : any;
export type IdType = string | number;
export type UpdateResultType<T> = T extends AbstractEntity ? UpdateResult : any;

export type DeleteResultType<T> = T extends AbstractEntity ? DeleteResult : any;

export type FindManyFilter<T> = T extends AbstractEntity
  ? FindManyOptions<T> & FindOneOptions<T>
  : any;
export type FindOneFilter<T> = T extends AbstractEntity
  ? FindOneOptions<T>
  : any;
