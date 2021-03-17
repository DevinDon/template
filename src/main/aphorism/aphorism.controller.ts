import { Logger } from '@iinfinity/logger';
import { BaseController, Controller, Rester } from '@rester/core';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AphorismEntity } from './aphorism.entity';
import { AphorismID, AphorismParamInsert, AphorismParamUpdate } from './aphorism.model';

// insert, delete, update, select
// one, more

@Controller()
export class AphorismController extends BaseController {

  protected rester!: Rester;

  protected logger!: Logger;

  private repo!: MongoRepository<AphorismEntity>;

  async init() {
    this.repo = getMongoRepository(AphorismEntity);
  }

  async insertOne(aphorism: AphorismParamInsert) {
    const key = await this.repo
      .insert(aphorism)
      .then(result => result.identifiers[0]);
    return this.repo.findOne(key);
  }

  async deleteOneByID(_id: AphorismID) {
    await this.repo.delete({ _id });
    return [_id];
  }

  async updateOne(_id: AphorismID, aphorism: AphorismParamUpdate) {
    await this.repo.update(_id, aphorism);
    return this.repo.findOne(_id);
  }

  async selectOneByID(_id: AphorismID) {
    return this.repo.findOne(_id);
  }

  async selectManyByRandom(length: number) {
    return this.repo
      .aggregateEntity([{ $sample: { size: length } }])
      .toArray();
  }

}
