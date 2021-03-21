import { BaseController, Controller, HTTP404Exception } from '@rester/core';
import { ObjectID } from 'mongodb';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AphorismEntity } from './aphorism.entity';
import { AphorismID, AphorismInsertParams, AphorismUpdateParams } from './aphorism.model';

// insert, delete, update, select
// one, more

@Controller()
export class AphorismController extends BaseController {

  private repo!: MongoRepository<AphorismEntity>;

  async init() {
    this.repo = getMongoRepository(AphorismEntity);
  }

  async insertOne(aphorism: AphorismInsertParams) {
    const key = await this.repo
      .insert(aphorism)
      .then(result => result.identifiers[0]);
    return this.repo.findOne(key);
  }

  async deleteOneByID(id: AphorismID) {
    const _id: any = new ObjectID(id);
    await this.repo.deleteOne({ _id });
    return [id];
  }

  async updateOne(id: AphorismID, aphorism: AphorismUpdateParams) {
    const _id: any = new ObjectID(id);
    await this.repo.updateOne({ _id }, { $set: aphorism });
    return this.repo.findOne({ _id });
  }

  async selectOneByID(id: AphorismID) {
    const _id: any = new ObjectID(id);
    return this.repo.findOneOrFail({ _id })
      .catch(() => { throw new HTTP404Exception('Aphorism not found.'); });
  }

  async selectManyByRandom(length: number) {
    return this.repo
      .aggregateEntity([{ $sample: { size: length } }])
      .toArray();
  }

}
