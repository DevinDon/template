import { Controller } from '@rester/core';
import { getMongoRepository as repo } from 'typeorm';
import { Pagination } from '../interfaces';
import { MottoEntity as Entity } from './motto.entity';
import { MottoID, MottoParamInsert, MottoParamUpdate } from './motto.model';

// insert, delete, update, select
// one, more

@Controller()
export class MottoController {

  async insertOne(motto: MottoParamInsert) {
    const id = await repo(Entity)
      .insert(motto)
      .then(result => result.identifiers[0]);
    return repo(Entity).findOne(id);
  }

  async deleteOneByID(id: MottoID) {
    await repo(Entity).delete(id);
    return [id];
  }

  async updateOne(id: MottoID, motto: MottoParamUpdate) {
    await repo(Entity).update(id, motto);
    return repo(Entity).findOne(id);
  }

  async selectOneByID(id: MottoID) {
    return repo(Entity).findOne(id);
  }

  async selectMany({ skip, take }: Pagination) {
    return repo(Entity)
      .find({ skip, take });
  }

  async selectManyByRandom(length: number) {
    return repo(Entity)
      .find({
        where: {
          $sample: { size: length }
        }
      });
  }

}
